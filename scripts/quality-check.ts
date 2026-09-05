// 出題データの品質検査。validate（参照解が期待値を再現するか）では絶対に見つからない
// 種類の欠陥を、全問題（生成＋手書き）に対して機械的に洗う。
//
//   npx tsx scripts/quality-check.ts          … 検査して一覧を出す
//   npx tsx scripts/quality-check.ts --strict … 重大な指摘が1件でもあれば exit 1
//
// なぜ必要か: 期待値は参照解の実行結果から自動生成されるので、参照解そのものが
// 間違っていても validate は必ず通る。ここでは「参照解が正しいか」は判定できないが、
// その周辺（答えが定数になっていないか、出典名が露出していないか、同じ問題が
// 二重に置かれていないか）は機械的に確かめられる。
import { ALL_PROBLEMS } from '../src/data/index.ts'

type P = (typeof ALL_PROBLEMS)[number]

const strict = process.argv.includes('--strict')

type Finding = { sev: 'high' | 'medium' | 'low'; kind: string; detail: string }
const findings: Finding[] = []
const add = (sev: Finding['sev'], kind: string, detail: string) => findings.push({ sev, kind, detail })

// ---- 1問ずつ見る検査 ----
const PLATFORMS = /atcoder|leetcode|codeforces|project ?euler|cses|aoj|topcoder|hackerrank|paiza|yukicoder/i
const visibleOf = (p: P) =>
  [p.title, p.concept, p.statement, p.tip ?? '', ...(p.hints ?? []), ...p.testCases.map((c) => c.input)].join('\n')

for (const p of ALL_PROBLEMS) {
  const where = `lv${p.level} ${p.id} 「${p.title}」`

  // 全ケースの期待値が同一 → 定数を print するだけで通る
  const exp = p.testCases.map((c) => c.expected.trim())
  if (exp.length >= 3 && new Set(exp).size === 1) {
    add('high', '定数解', `${where} — ${exp.length}件すべて ${JSON.stringify(exp[0]).slice(0, 30)}`)
  }

  // 期待値が空文字 → 出力規則が書かれているか怪しい
  const blanks = p.testCases.filter((c) => c.expected.trim() === '').length
  if (blanks > 0) add('medium', '空の期待値', `${where} — ${blanks}件の期待値が空文字`)

  // テストケースが少なすぎる
  if (p.testCases.length < 3) add('medium', 'ケース不足', `${where} — テストケース${p.testCases.length}件`)
  if (!p.testCases.some((c) => c.sample)) add('low', 'サンプル無し', where)

  // 参照解の作法
  if (/(^|[^.\w])exit\s*\(/.test(p.reference) && !/sys\.exit/.test(p.reference)) {
    add('medium', '素のexit()', `${where} — sys.exit() を使うこと`)
  }
  // 期待値・参照解の非ASCII（cp932 で化ける）
  if (/[^\x00-\x7F]/.test(p.reference)) add('medium', 'ref非ASCII', where)
  const nonAsciiExp = p.testCases.filter((c) => /[^\x00-\x7F]/.test(c.expected)).length
  if (nonAsciiExp > 0) add('low', '期待値非ASCII', `${where} — ${nonAsciiExp}件`)

  // 出典名の露出
  const m = visibleOf(p).match(PLATFORMS)
  if (m) add('high', '出典名の露出', `${where} — "${m[0]}"`)

  // ヒント・解説の欠落
  if (!p.hints || p.hints.length < 3) add('low', 'ヒント不足', `${where} — ${p.hints?.length ?? 0}段`)
  if (!p.statement || p.statement.trim().length < 10) add('medium', '問題文が短すぎる', where)
}

// ---- 横断の検査 ----
const byTitle = new Map<string, P[]>()
const byRef = new Map<string, P[]>()
const byConcept = new Map<string, P[]>()
for (const p of ALL_PROBLEMS) {
  const norm = p.reference.replace(/\s+/g, ' ').trim()
  ;(byTitle.get(p.title) ?? byTitle.set(p.title, []).get(p.title)!).push(p)
  ;(byRef.get(norm) ?? byRef.set(norm, []).get(norm)!).push(p)
  ;(byConcept.get(p.concept) ?? byConcept.set(p.concept, []).get(p.concept)!).push(p)
}

for (const [t, ps] of byTitle) {
  if (ps.length < 2) continue
  const levels = new Set(ps.map((p) => p.level))
  if (levels.size === 1) {
    add('high', '同一レベル内の同名', `lv${ps[0].level} 「${t}」 — ${ps.map((p) => p.id).join(', ')}`)
  } else {
    add('medium', 'レベルまたぎの同名', `「${t}」 — ${ps.map((p) => `lv${p.level}(${p.id})`).join(' / ')}`)
  }
}
for (const [, ps] of byRef) {
  if (ps.length >= 2) {
    add('high', '参照解が完全一致', ps.map((p) => `lv${p.level} ${p.id}「${p.title}」`).join(' / '))
  }
}
for (const [c, ps] of byConcept) {
  if (ps.length >= 2 && new Set(ps.map((p) => p.level)).size >= 2) {
    add('medium', '概念名の重複', `「${c}」 — ${ps.map((p) => `lv${p.level}`).join(' / ')}`)
  }
}

// ---- 出力 ----
const order = { high: 0, medium: 1, low: 2 } as const
findings.sort((a, b) => order[a.sev] - order[b.sev] || a.kind.localeCompare(b.kind))
const byKind = new Map<string, Finding[]>()
for (const f of findings) (byKind.get(f.kind) ?? byKind.set(f.kind, []).get(f.kind)!).push(f)

console.log(`=== 品質検査: ${ALL_PROBLEMS.length}問 ===`)
for (const [kind, fs] of [...byKind].sort((a, b) => order[a[1][0].sev] - order[b[1][0].sev])) {
  console.log(`\n[${fs[0].sev}] ${kind}: ${fs.length}件`)
  for (const f of fs.slice(0, 12)) console.log('  ' + f.detail)
  if (fs.length > 12) console.log(`  ... 他 ${fs.length - 12}件`)
}
const high = findings.filter((f) => f.sev === 'high').length
const med = findings.filter((f) => f.sev === 'medium').length
console.log(`\n合計: high ${high} / medium ${med} / low ${findings.filter((f) => f.sev === 'low').length}`)
if (strict && high > 0) process.exit(1)
