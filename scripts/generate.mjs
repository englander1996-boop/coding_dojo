// 問題ジェネレータ。
// 方針: 「真に異なるタスク(別計算)」を CATALOG に集め、各タスクを最大3問のクラスタ
// （似た問題は3問まで許可）に展開する。参照解は Python で一括実行して期待値を自動生成
// するので、validate は定義上必ず通る。
//
// 1タスク = 1概念。ins(入力例群)を3つに分割して ①②③ の3問にする。
// 出力: src/data/generated.json （Problem[] 相当。generated.ts が読み込む）
// 使い方: node scripts/generate.mjs
import { execFileSync, spawnSync } from 'node:child_process'
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
import { CATALOG as C51 } from './catalog-tasks51.mjs'
import { CATALOG as C52 } from './catalog-tasks52.mjs'
import { CATALOG as C53 } from './catalog-tasks53.mjs'
import { CATALOG as C54 } from './catalog-tasks54.mjs'
import { CATALOG as C55 } from './catalog-tasks55.mjs'
import { CATALOG as C56 } from './catalog-tasks56.mjs'
import { CATALOG as C57 } from './catalog-tasks57.mjs'
import { CATALOG as C58 } from './catalog-tasks58.mjs'
import { CATALOG as C59 } from './catalog-tasks59.mjs'
import { CATALOG as C60 } from './catalog-tasks60.mjs'
import { CATALOG as C61 } from './catalog-tasks61.mjs'
import { CATALOG as C62 } from './catalog-tasks62.mjs'
import { CATALOG as C63 } from './catalog-tasks63.mjs'
import { CATALOG as C64 } from './catalog-tasks64.mjs'
import { CATALOG as C65 } from './catalog-tasks65.mjs'
import { CATALOG as C66 } from './catalog-tasks66.mjs'
import { CATALOG as C67 } from './catalog-tasks67.mjs'
import { CATALOG as C68 } from './catalog-tasks68.mjs'
import { CATALOG as C69 } from './catalog-tasks69.mjs'
import { CATALOG as C70 } from './catalog-tasks70.mjs'
import { CATALOG as C71 } from './catalog-tasks71.mjs'
import { CATALOG as C72 } from './catalog-tasks72.mjs'
import { CATALOG as C73 } from './catalog-tasks73.mjs'
import { CATALOG as C74 } from './catalog-tasks74.mjs'
import { CATALOG as C75 } from './catalog-tasks75.mjs'
import { CATALOG as C76 } from './catalog-tasks76.mjs'
import { CATALOG as C77 } from './catalog-tasks77.mjs'
import { CATALOG as C78 } from './catalog-tasks78.mjs'
import { CATALOG as C79 } from './catalog-tasks79.mjs'
import { CATALOG as C80 } from './catalog-tasks80.mjs'
import { CATALOG as C81 } from './catalog-tasks81.mjs'
import { CATALOG as C82 } from './catalog-tasks82.mjs'
import { CATALOG as C83 } from './catalog-tasks83.mjs'
import { CATALOG as C84 } from './catalog-tasks84.mjs'
import { CATALOG as C85 } from './catalog-tasks85.mjs'
import { CATALOG as C86 } from './catalog-tasks86.mjs'
import { CATALOG as C87 } from './catalog-tasks87.mjs'
import { CATALOG as C88 } from './catalog-tasks88.mjs'
import { CATALOG as C89 } from './catalog-tasks89.mjs'
import { CATALOG as C90 } from './catalog-tasks90.mjs'
import { CATALOG as C91 } from './catalog-tasks91.mjs'
import { CATALOG as C92 } from './catalog-tasks92.mjs'
import { CATALOG as C93 } from './catalog-tasks93.mjs'
import { CATALOG as C94 } from './catalog-tasks94.mjs'
import { CATALOG as C95 } from './catalog-tasks95.mjs'
import { CATALOG as C96 } from './catalog-tasks96.mjs'
import { CATALOG as C97 } from './catalog-tasks97.mjs'
import { CATALOG as C98 } from './catalog-tasks98.mjs'
import { CATALOG as C99 } from './catalog-tasks99.mjs'
import { CATALOG as C100 } from './catalog-tasks100.mjs'
import { CATALOG as C101 } from './catalog-tasks101.mjs'
import { CATALOG as C102 } from './catalog-tasks102.mjs'
import { CATALOG as C103 } from './catalog-tasks103.mjs'
import { CATALOG as C104 } from './catalog-tasks104.mjs'
import { CATALOG as C105 } from './catalog-tasks105.mjs'
import { CATALOG as C106 } from './catalog-tasks106.mjs'
import { CATALOG as C107 } from './catalog-tasks107.mjs'
import { CATALOG as C108 } from './catalog-tasks108.mjs'
import { CATALOG as C109 } from './catalog-tasks109.mjs'
import { CATALOG as C110 } from './catalog-tasks110.mjs'
import { CATALOG as C111 } from './catalog-tasks111.mjs'
import { CATALOG as C112 } from './catalog-tasks112.mjs'
import { CATALOG as C113 } from './catalog-tasks113.mjs'

const CATALOG = [...C1, ...C2, ...C3, ...C4, ...C5, ...C6, ...C7, ...C8, ...C9, ...C10, ...C11, ...C12, ...C13, ...C14, ...C15, ...C16, ...C17, ...C18, ...C19, ...C20, ...C21, ...C22, ...C23, ...C24, ...C25, ...C26, ...C27, ...C28, ...C29, ...C30, ...C31, ...C32, ...C33, ...C34, ...C35, ...C36, ...C37, ...C38, ...C39, ...C40, ...C41, ...C42, ...C43, ...C44, ...C45, ...C46, ...C47, ...C48, ...C49, ...C50, ...C51, ...C52, ...C53, ...C54, ...C55, ...C56, ...C57, ...C58, ...C59, ...C60, ...C61, ...C62, ...C63, ...C64, ...C65, ...C66, ...C67, ...C68, ...C69, ...C70, ...C71, ...C72, ...C73, ...C74, ...C75, ...C76, ...C77, ...C78, ...C79, ...C80, ...C81, ...C82, ...C83, ...C84, ...C85, ...C86, ...C87, ...C88, ...C89, ...C90, ...C91, ...C92, ...C93, ...C94, ...C95, ...C96, ...C97, ...C98, ...C99, ...C100, ...C101, ...C102, ...C103, ...C104, ...C105, ...C106, ...C107, ...C108, ...C109, ...C110, ...C111, ...C112, ...C113]

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
// Python コマンド解決: PYTHON 環境変数 > py ランチャー > python
const PY = process.env.PYTHON ?? (spawnSync('py', ['-V']).status === 0 ? 'py' : 'python')
const outJson = execFileSync(PY, [join(__dirname, 'eval_batch.py')], {
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
