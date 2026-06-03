import type { TestCase } from '../types'
import { runner } from './runner'

export type Verdict = 'AC' | 'WA' | 'RE' | 'TLE'

export interface CaseResult {
  index: number
  verdict: Verdict
  input: string
  expected: string
  got: string
  stderr: string
  sample: boolean
}

export interface JudgeResult {
  /** Overall verdict: AC only if every case passed; otherwise the first failure. */
  verdict: Verdict
  passed: number
  total: number
  cases: CaseResult[]
}

/**
 * Normalize output the way competitive judges do: unify newlines, strip
 * trailing whitespace on each line, and ignore trailing blank lines.
 */
export function normalizeOutput(s: string): string {
  return s
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/, ''))
    .join('\n')
    .replace(/\n+$/, '')
}

const TIMEOUT_MS = 5000

/**
 * Judge a submission against ALL test cases (samples + hidden). Stops nothing —
 * every case is run so the user sees the full pass/fail picture, just like
 * AtCoder verifying that no input triggers an error.
 */
export async function judge(code: string, testCases: TestCase[]): Promise<JudgeResult> {
  const cases: CaseResult[] = []
  let overall: Verdict = 'AC'

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i]
    const res = await runner.run(code, tc.input, TIMEOUT_MS)

    let verdict: Verdict
    if (res.status === 'timeout') verdict = 'TLE'
    else if (res.status === 'error') verdict = 'RE'
    else verdict = normalizeOutput(res.stdout) === normalizeOutput(tc.expected) ? 'AC' : 'WA'

    cases.push({
      index: i,
      verdict,
      input: tc.input,
      expected: tc.expected,
      got: res.stdout,
      stderr: res.stderr,
      sample: !!tc.sample,
    })

    if (verdict !== 'AC' && overall === 'AC') overall = verdict
  }

  const passed = cases.filter((c) => c.verdict === 'AC').length
  return { verdict: passed === testCases.length ? 'AC' : overall, passed, total: testCases.length, cases }
}

/** Human-readable label + color for a verdict. */
export function verdictMeta(v: Verdict): { label: string; color: string } {
  switch (v) {
    case 'AC':
      return { label: 'AC (正解)', color: '#22c55e' }
    case 'WA':
      return { label: 'WA (不正解)', color: '#ef4444' }
    case 'RE':
      return { label: 'RE (実行時エラー)', color: '#f97316' }
    case 'TLE':
      return { label: 'TLE (時間切れ)', color: '#eab308' }
  }
}
