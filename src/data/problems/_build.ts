import type { Problem } from '../../types'

/** 問題を簡潔に書くための共通ビルダー。id/index は自動採番。 */
export interface Spec {
  title: string
  concept: string
  tags: string[]
  statement: string
  starter?: string
  hints: [string, string, string]
  explanation: string
  reference: string
  cases: { input: string; expected: string; sample?: boolean }[]
  tip?: string
  serverOnly?: boolean
}

const DEFAULT_STARTER = '# ここにコードを書こう\n'

/** prefix 例 "lv009"、level 例 9 で Problem[] を生成。 */
export function build(level: number, prefix: string, specs: Spec[]): Problem[] {
  return specs.map((s, i) => ({
    id: `${prefix}-${String(i + 1).padStart(3, '0')}`,
    level,
    index: i + 1,
    title: s.title,
    statement: s.statement,
    tags: s.tags,
    concept: s.concept,
    starterCode: s.starter ?? DEFAULT_STARTER,
    hints: s.hints,
    explanation: s.explanation,
    testCases: s.cases,
    reference: s.reference,
    tip: s.tip,
    serverOnly: s.serverOnly,
  }))
}
