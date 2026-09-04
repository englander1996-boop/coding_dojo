// Validates every problem's reference solution against all its test cases using
// the real `py` interpreter. To scale to tens of thousands of problems, all
// (reference, input) pairs are run in ONE Python process (scripts/eval_batch.py)
// instead of spawning `py` per case.
import { execFileSync, spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { ALL_PROBLEMS } from '../src/data/index.ts'
// (ladder problems are included via ALL_PROBLEMS)

const __dirname = dirname(fileURLToPath(import.meta.url))

function normalize(s: string): string {
  return s
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .map((l) => l.replace(/[ \t]+$/, ''))
    .join('\n')
    .replace(/\n+$/, '')
}

// Build all (code, input) pairs, remembering which problem/case they belong to.
const pairs: { code: string; input: string }[] = []
const owner: { p: (typeof ALL_PROBLEMS)[number]; expected: string }[] = []
for (const p of ALL_PROBLEMS) {
  for (const tc of p.testCases) {
    pairs.push({ code: p.reference, input: tc.input })
    owner.push({ p, expected: tc.expected })
  }
}

// Python コマンド解決: PYTHON 環境変数 > py ランチャー > python
const PY = process.env.PYTHON ?? (spawnSync('py', ['-V']).status === 0 ? 'py' : 'python')
const outJson = execFileSync(PY, [join(__dirname, 'eval_batch.py')], {
  input: JSON.stringify(pairs),
  encoding: 'utf8',
  maxBuffer: 1 << 30,
})
const outputs: string[] = JSON.parse(outJson)

let failures = 0
for (let i = 0; i < owner.length; i++) {
  const { p, expected } = owner[i]
  const got = outputs[i]
  if (typeof got === 'string' && got.startsWith('__ERR__')) {
    console.log(`RE  ${p.id}  -> ${got.slice(7)}`)
    failures++
    continue
  }
  if (normalize(got) !== normalize(expected)) {
    failures++
    console.log(`WA  ${p.id}`)
    console.log(`    input=${JSON.stringify(pairs[i].input)}`)
    console.log(`    expected=${JSON.stringify(normalize(expected))}`)
    console.log(`    got     =${JSON.stringify(normalize(got))}`)
  }
}

console.log(`\n${ALL_PROBLEMS.length} problems, ${pairs.length} cases, ${failures} failures`)
process.exit(failures ? 1 : 0)
