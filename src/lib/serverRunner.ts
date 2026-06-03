import type { RunResult } from './runner'
import type { JudgeResult } from './grader'
import type { TestCase } from '../types'

// ローカル判定APIサーバー（npm run server）への薄いクライアント。
// 重いライブラリ(optuna 等)や将来の他言語をサーバー側で実行するための入口。

const BASE = import.meta.env.VITE_JUDGE_URL || 'http://127.0.0.1:8787'

export async function serverHealth(): Promise<boolean> {
  try {
    const r = await fetch(`${BASE}/health`, { signal: AbortSignal.timeout(1500) })
    return r.ok
  } catch {
    return false
  }
}

export async function serverRun(code: string, input: string): Promise<RunResult> {
  const r = await fetch(`${BASE}/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, input }),
  })
  if (!r.ok) throw new Error(`server ${r.status}`)
  return (await r.json()) as RunResult
}

export async function serverJudge(code: string, cases: TestCase[]): Promise<JudgeResult> {
  const r = await fetch(`${BASE}/judge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, cases }),
  })
  if (!r.ok) throw new Error(`server ${r.status}`)
  return (await r.json()) as JudgeResult
}
