// 梯子(ladder)埋め: lv001..lv999 のうち、他に問題が無い段に1問ずつ「力試し」問題を置く。
// 目的は「全段に最低1問」を保証すること(一旦のスキャフォールド)。
// 14種の基礎演算をレベルでローテーションし、入力もレベルで変える。期待値は Python 一括実行で確定。
// 出力: src/data/problems/ladder.ts （ladderProblems を書き出す）
import { execFileSync, spawnSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { ALL_PROBLEMS } from '../src/data/index.ts'
import { MAX_LEVEL } from '../src/data/levels.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))

function normalize(s: string): string {
  return s.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n').map((l) => l.replace(/[ \t]+$/, '')).join('\n').replace(/\n+$/, '')
}

interface Op { name: string; tag: string; ask: string; ref: string; h1: string; h2: string }
const OPS: Op[] = [
  { name: '各桁の和', tag: '整数', ask: '各桁の数字の和を出力してください。', ref: 'n=int(input())\nprint(sum(int(c) for c in str(n)))', h1: 'str(n) で桁に分解。', h2: '各桁を int にして合計。' },
  { name: '各桁の積', tag: '整数', ask: '各桁の数字の積を出力してください。', ref: 'n=int(input())\np=1\nfor c in str(n):\n    p*=int(c)\nprint(p)', h1: '各桁を掛ける。', h2: '初期値1。' },
  { name: '桁数', tag: '整数', ask: '桁数を出力してください。', ref: 'n=int(input())\nprint(len(str(n)))', h1: '文字列の長さ。', h2: 'len(str(n))。' },
  { name: '逆順の数', tag: '整数', ask: '桁を逆順に並べた数を出力してください。', ref: 'n=int(input())\nprint(int(str(n)[::-1]))', h1: 'スライス [::-1]。', h2: 'int に戻す。' },
  { name: '1からnの和', tag: '数列', ask: '1 から n までの整数の和を出力してください。', ref: 'n=int(input())\nprint(n*(n+1)//2)', h1: '公式 n(n+1)/2。', h2: 'ループでも可。' },
  { name: 'nの2乗', tag: '算術演算子', ask: 'n の2乗を出力してください。', ref: 'n=int(input())\nprint(n*n)', h1: 'n*n。', h2: 'べき乗 **2 でも。' },
  { name: 'popcount', tag: 'ビット演算', ask: 'n を2進数にしたときの1の個数を出力してください。', ref: "n=int(input())\nprint(bin(n).count('1'))", h1: 'bin(n)。', h2: "'1' を数える。" },
  { name: '2進の桁数', tag: 'ビット演算', ask: 'n を2進数で表すのに必要な桁数を出力してください。', ref: 'n=int(input())\nprint(n.bit_length())', h1: 'bit_length()。', h2: 'log2 の整数部+1。' },
  { name: '約数の個数', tag: '数論', ask: 'n の正の約数の個数を出力してください。', ref: 'n=int(input())\nprint(sum(1 for i in range(1,n+1) if n%i==0))', h1: '1..n で割り切れる数。', h2: '剰余0を数える。' },
  { name: '約数の和', tag: '数論', ask: 'n の正の約数の和を出力してください。', ref: 'n=int(input())\nprint(sum(i for i in range(1,n+1) if n%i==0))', h1: '約数を足す。', h2: '剰余0の i。' },
  { name: '素数判定', tag: '数論', ask: 'n が素数なら yes、そうでなければ no を出力してください。', ref: "n=int(input())\nprint('yes' if n>1 and all(n%i for i in range(2,int(n**0.5)+1)) else 'no')", h1: '√n まで試し割り。', h2: '割り切れなければ素数。' },
  { name: 'コラッツの手数', tag: '数列', ask: 'n が1になるまでのコラッツ操作の回数を出力してください。', ref: 'n=int(input())\nc=0\nwhile n!=1:\n    n=n//2 if n%2==0 else 3*n+1\n    c+=1\nprint(c)', h1: '偶数は半分・奇数は3倍+1。', h2: '回数を数える。' },
  { name: '最大の桁', tag: '整数', ask: 'n の各桁のうち最大のものを出力してください。', ref: 'n=int(input())\nprint(max(str(n)))', h1: '文字の大小=数字の大小。', h2: 'max(str(n))。' },
  { name: '数字根', tag: '整数', ask: 'n の数字根(各桁を1桁になるまで足し続けた値)を出力してください。', ref: 'n=int(input())\nprint((n-1)%9+1)', h1: '公式 (n-1)%9+1。', h2: '繰り返し桁和でも同じ。' },
]

// レベルから3つの入力(10..99)を作る。レベルごとに値が変わるようにする。
function nvals(L: number): string[] {
  const a = ((L * 7 + 11) % 90) + 10
  const b = ((L * 13 + 37) % 90) + 10
  const c = ((L * 5 + 3) % 90) + 10
  return [`${a}\n`, `${b}\n`, `${c}\n`]
}

// 既に問題がある段(ladder以外)を集める
const coreLevels = new Set<number>()
for (const p of ALL_PROBLEMS) if (!p.id.startsWith('ladder-')) coreLevels.add(p.level)

const emptyLevels: number[] = []
for (let L = 1; L <= MAX_LEVEL; L++) if (!coreLevels.has(L)) emptyLevels.push(L)

// 問題を組み立て
const specs = emptyLevels.map((L) => {
  const op = OPS[(L - 1) % OPS.length]
  const ins = nvals(L)
  return { L, op, ins }
})

// Python 一括実行で期待値
const pairs: { code: string; input: string }[] = []
for (const s of specs) for (const inp of s.ins) pairs.push({ code: s.op.ref, input: inp })
console.log(`filling ${emptyLevels.length} empty levels (of ${MAX_LEVEL}); evaluating ${pairs.length} cases...`)
const outputs: string[] = JSON.parse(
  execFileSync(process.env.PYTHON ?? (spawnSync('py', ['-V']).status === 0 ? 'py' : 'python'), [join(__dirname, 'eval_batch.py')], { input: JSON.stringify(pairs), encoding: 'utf8', maxBuffer: 1 << 30 }),
)

const problems: any[] = []
let k = 0
for (const s of specs) {
  const pad = String(s.L).padStart(3, '0')
  const cases = s.ins.map((inp, i) => {
    const got = outputs[k++]
    return { input: inp, expected: normalize(got), sample: i === 0 }
  })
  problems.push({
    id: `ladder-${pad}`,
    level: s.L,
    index: 1,
    title: `${s.op.name}（lv${pad} 力試し）`,
    statement: `1つの整数 n が与えられます。\n\n${s.op.ask}\n\n入力例:\n${s.ins[0].replace(/\n$/, '')}`,
    tags: ['練習', s.op.tag],
    concept: `力試し: ${s.op.name}`,
    starterCode: 'n = int(input())\n',
    hints: [s.op.h1, s.op.h2, '答え:\n' + s.op.ref],
    explanation: '模範解答:\n' + s.op.ref,
    testCases: cases,
    reference: s.op.ref,
    tip: '💡 全レベル網羅のための基礎力試し（順次オリジナル問題へ差し替え予定）。',
  })
}

const json = JSON.stringify(problems)
const ts =
  `import type { Problem } from '../../types'\n\n` +
  `/**\n * 梯子埋め用の自動生成問題（\`node scripts/ladder.ts\` が再生成。手で編集しない）。\n` +
  ` * lv001..lv999 のうち他に問題が無い段に1問ずつ「力試し」を置き、全段に最低1問を保証する。\n` +
  ` * 一旦のスキャフォールド。順次オリジナル良問へ差し替え予定。期待値は Python 実行で確定済み。\n */\n` +
  `export const ladderProblems: Problem[] = JSON.parse(\n  ${JSON.stringify(json)},\n) as Problem[]\n`
writeFileSync(join(__dirname, '..', 'src', 'data', 'problems', 'ladder.ts'), ts)
console.log(`wrote ${problems.length} ladder problems -> src/data/problems/ladder.ts`)
