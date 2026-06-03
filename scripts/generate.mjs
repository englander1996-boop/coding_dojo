// 問題ジェネレータ。
// 方針: 「真に異なるタスク(別計算)」を CATALOG に集め、各タスクを最大3問のクラスタ
// （似た問題は3問まで許可）に展開する。参照解は Python で一括実行して期待値を自動生成
// するので、validate は定義上必ず通る。
//
// 1タスク = 1概念。ins(入力例群)を3つに分割して ①②③ の3問にする。
// 出力: src/data/generated.json （Problem[] 相当。generated.ts が読み込む）
// 使い方: node scripts/generate.mjs
import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { CATALOG as C1 } from './catalog-tasks.mjs'
import { CATALOG as C2 } from './catalog-tasks2.mjs'
import { CATALOG as C3 } from './catalog-tasks3.mjs'
import { CATALOG as C4 } from './catalog-tasks4.mjs'
import { CATALOG as C5 } from './catalog-tasks5.mjs'
import { CATALOG as C6 } from './catalog-tasks6.mjs'
import { CATALOG as C7 } from './catalog-tasks7.mjs'
import { CATALOG as C8 } from './catalog-tasks8.mjs'
import { CATALOG as C9 } from './catalog-tasks9.mjs'
import { CATALOG as C10 } from './catalog-tasks10.mjs'
import { CATALOG as C11 } from './catalog-tasks11.mjs'
import { CATALOG as C12 } from './catalog-tasks12.mjs'
import { CATALOG as C13 } from './catalog-tasks13.mjs'
import { CATALOG as C14 } from './catalog-tasks14.mjs'
import { CATALOG as C15 } from './catalog-tasks15.mjs'
import { CATALOG as C16 } from './catalog-tasks16.mjs'
import { CATALOG as C17 } from './catalog-tasks17.mjs'
import { CATALOG as C18 } from './catalog-tasks18.mjs'
import { CATALOG as C19 } from './catalog-tasks19.mjs'
import { CATALOG as C20 } from './catalog-tasks20.mjs'
import { CATALOG as C21 } from './catalog-tasks21.mjs'
import { CATALOG as C22 } from './catalog-tasks22.mjs'
import { CATALOG as C23 } from './catalog-tasks23.mjs'
import { CATALOG as C24 } from './catalog-tasks24.mjs'
import { CATALOG as C25 } from './catalog-tasks25.mjs'
import { CATALOG as C26 } from './catalog-tasks26.mjs'
import { CATALOG as C27 } from './catalog-tasks27.mjs'
import { CATALOG as C28 } from './catalog-tasks28.mjs'
import { CATALOG as C29 } from './catalog-tasks29.mjs'
import { CATALOG as C30 } from './catalog-tasks30.mjs'
import { CATALOG as C31 } from './catalog-tasks31.mjs'
import { CATALOG as C32 } from './catalog-tasks32.mjs'
import { CATALOG as C33 } from './catalog-tasks33.mjs'
import { CATALOG as C34 } from './catalog-tasks34.mjs'
import { CATALOG as C35 } from './catalog-tasks35.mjs'
import { CATALOG as C36 } from './catalog-tasks36.mjs'
import { CATALOG as C37 } from './catalog-tasks37.mjs'
import { CATALOG as C38 } from './catalog-tasks38.mjs'
import { CATALOG as C39 } from './catalog-tasks39.mjs'
import { CATALOG as C40 } from './catalog-tasks40.mjs'
import { CATALOG as C41 } from './catalog-tasks41.mjs'
import { CATALOG as C42 } from './catalog-tasks42.mjs'
import { CATALOG as C43 } from './catalog-tasks43.mjs'
import { CATALOG as C44 } from './catalog-tasks44.mjs'
import { CATALOG as C45 } from './catalog-tasks45.mjs'
import { CATALOG as C46 } from './catalog-tasks46.mjs'
import { CATALOG as C47 } from './catalog-tasks47.mjs'
import { CATALOG as C48 } from './catalog-tasks48.mjs'
import { CATALOG as C49 } from './catalog-tasks49.mjs'
import { CATALOG as C50 } from './catalog-tasks50.mjs'

const CATALOG = [...C1, ...C2, ...C3, ...C4, ...C5, ...C6, ...C7, ...C8, ...C9, ...C10, ...C11, ...C12, ...C13, ...C14, ...C15, ...C16, ...C17, ...C18, ...C19, ...C20, ...C21, ...C22, ...C23, ...C24, ...C25, ...C26, ...C27, ...C28, ...C29, ...C30, ...C31, ...C32, ...C33, ...C34, ...C35, ...C36, ...C37, ...C38, ...C39, ...C40, ...C41, ...C42, ...C43, ...C44, ...C45, ...C46, ...C47, ...C48, ...C49, ...C50]

const __dirname = dirname(fileURLToPath(import.meta.url))

function normalize(s) {
  return s
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .map((l) => l.replace(/[ \t]+$/, ''))
    .join('\n')
    .replace(/\n+$/, '')
}

const DEFAULT_STARTER = '# ここにコードを書こう\n'

// ---- 1 task = 1 problem（複数の入力はその問題のテストケース。①②③の水増しはしない）----
const specs = []
for (const t of CATALOG) {
  if (!t.ins || t.ins.length < 1) throw new Error(`task has no inputs: ${t.title}`)
  const sample = t.ins[0]
  const statement = `${t.io}\n\n${t.ask}\n\n入力例:\n${sample.replace(/\n$/, '')}`
  specs.push({
    lv: t.lv,
    concept: t.concept,
    title: t.title,
    tags: t.tags,
    statement,
    starter: t.starter ?? DEFAULT_STARTER,
    hints: [t.h1, t.h2, '答え:\n' + t.ref],
    explanation: (t.exp ? t.exp + '\n\n' : '') + '模範解答:\n' + t.ref,
    reference: t.ref,
    tip: t.tip,
    ins: t.ins,
  })
}

// ---- 重複チェック（問題かぶり厳禁）: 参照解・概念・タイトルが被っていないか ----
{
  const byRef = new Map()
  const byConcept = new Map()
  const dups = []
  for (const s of specs) {
    const rk = normalize(s.reference)
    if (byRef.has(rk)) dups.push(`同一の参照解: "${s.title}" と "${byRef.get(rk)}"`)
    else byRef.set(rk, s.title)
    if (byConcept.has(s.concept)) dups.push(`同一の概念名: "${s.title}" と "${byConcept.get(s.concept)}" (concept=${s.concept})`)
    else byConcept.set(s.concept, s.title)
  }
  if (dups.length) {
    console.error(`\n重複を検出 (${dups.length}):`)
    for (const d of dups.slice(0, 40)) console.error('  ' + d)
    process.exit(1)
  }
}

// ---- run all (reference, input) pairs through Python in one process ----
const pairs = []
for (const s of specs) for (const inp of s.ins) pairs.push({ code: s.reference, input: inp })

console.log(`expanding ${CATALOG.length} tasks -> ${specs.length} problems; evaluating ${pairs.length} cases...`)
const outJson = execFileSync('py', [join(__dirname, 'eval_batch.py')], {
  input: JSON.stringify(pairs),
  encoding: 'utf8',
  maxBuffer: 1 << 30,
})
const outputs = JSON.parse(outJson)

// ---- attach expected, detect errors, build final Problem[] ----
const problems = []
const errors = []
let k = 0
const indexByLevel = new Map()
for (const s of specs) {
  const cases = []
  for (let i = 0; i < s.ins.length; i++) {
    const got = outputs[k++]
    if (typeof got === 'string' && got.startsWith('__ERR__')) {
      errors.push(`${s.title} [lv${s.lv}] input=${JSON.stringify(s.ins[i])} -> ${got}`)
      continue
    }
    cases.push({ input: s.ins[i], expected: normalize(got), sample: i === 0 })
  }
  if (cases.length === 0) continue
  const idx = (indexByLevel.get(s.lv) ?? 0) + 1
  indexByLevel.set(s.lv, idx)
  problems.push({
    id: `gen-${String(s.lv).padStart(3, '0')}-${String(idx).padStart(3, '0')}`,
    level: s.lv,
    index: idx,
    title: s.title,
    statement: s.statement,
    tags: s.tags,
    concept: s.concept,
    starterCode: s.starter,
    hints: s.hints,
    explanation: s.explanation,
    testCases: cases,
    reference: s.reference,
    tip: s.tip,
  })
}

if (errors.length) {
  console.error(`\n${errors.length} reference solution error(s):`)
  for (const e of errors.slice(0, 50)) console.error('  ' + e)
  process.exit(1)
}

const json = JSON.stringify(problems)
// inspection copy
writeFileSync(join(__dirname, '..', 'src', 'data', 'generated.json'), json)
// TS module that loads the data via JSON.parse (robust in Node/tsc/Vite; no JSON import attribute needed, fast typecheck)
const ts =
  `import type { Problem } from '../../types'\n\n` +
  `/**\n * 自動生成された問題（\`node scripts/generate.mjs\` が再生成する。手で編集しない）。\n` +
  ` * 各タスクは別計算(オリジナル)で、似た問題は①②③の最大3問クラスタに展開される。\n` +
  ` * 期待値は参照解を Python 一括実行して埋めているため validate は定義上通る。\n` +
  ` * 問題を増やすには scripts/catalog-tasks.mjs にタスクを足して再生成する。\n */\n` +
  `export const generatedProblems: Problem[] = JSON.parse(\n  ${JSON.stringify(json)},\n) as Problem[]\n`
writeFileSync(join(__dirname, '..', 'src', 'data', 'problems', 'generated.ts'), ts)
console.log(`wrote ${problems.length} problems -> src/data/problems/generated.ts`)
