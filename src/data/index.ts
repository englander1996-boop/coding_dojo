import type { Problem } from '../types'
import { lv001Problems } from './problems/lv001.ts'
import { otherProblems } from './problems/others.ts'
import { midProblems } from './problems/midlevels.ts'
import { libProblems } from './problems/liblevels.ts'
import { advProblems } from './problems/advlevels.ts'
import { gapProblems } from './problems/gaps.ts'
import { platformProblems } from './problems/platforms.ts'
import { dataScienceProblems } from './problems/datascience.ts'
import { advAlgoProblems } from './problems/advalgos.ts'
import { lessonProblems } from './problems/lessons.ts'
import { mlProblems } from './problems/ml.ts'
import { optunaProblems } from './problems/optuna.ts'
import { leetcode2Problems } from './problems/leetcode2.ts'
import { atcoder2Problems } from './problems/atcoder2.ts'
import { kaggle2Problems } from './problems/kaggle2.ts'
import { expand1Problems } from './problems/expand1.ts'
import { expand2Problems } from './problems/expand2.ts'
import { generatedProblems } from './problems/generated.ts'
import { ladderProblems } from './problems/ladder.ts'

/** All problems across all levels. */
export const ALL_PROBLEMS: Problem[] = [
  ...lv001Problems,
  ...otherProblems,
  ...midProblems,
  ...libProblems,
  ...advProblems,
  ...gapProblems,
  ...platformProblems,
  ...dataScienceProblems,
  ...advAlgoProblems,
  ...lessonProblems,
  ...mlProblems,
  ...optunaProblems,
  ...leetcode2Problems,
  ...atcoder2Problems,
  ...kaggle2Problems,
  ...expand1Problems,
  ...expand2Problems,
  ...generatedProblems,
  ...ladderProblems,
]

/** Map id -> problem for O(1) lookup. */
const byId = new Map(ALL_PROBLEMS.map((p) => [p.id, p]))

export function getProblem(id: string): Problem | undefined {
  return byId.get(id)
}

/** All problems in a level, sorted by their index. */
export function problemsInLevel(level: number): Problem[] {
  return ALL_PROBLEMS.filter((p) => p.level === level).sort((a, b) => a.index - b.index)
}

/** Levels that currently have at least one authored problem. */
export function levelsWithContent(): number[] {
  return [...new Set(ALL_PROBLEMS.map((p) => p.level))].sort((a, b) => a - b)
}

/** Distinct tags across all problems, sorted. */
export function allTags(): string[] {
  return [...new Set(ALL_PROBLEMS.flatMap((p) => p.tags))].sort()
}
