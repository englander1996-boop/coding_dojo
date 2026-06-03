// ゲーム性のロジック(純粋関数)。進捗(解いた問題の集合)から
//   ・レベルのクリア/解放(ゲート)判定
//   ・XP とランク(称号)
//   ・連続記録(ストリーク)
//   ・実績(バッジ)
// を計算する。UI からはこれを呼ぶだけ。
//
// 解放ルール(ユーザー指定): 「下の(番号が小さい)レベルをすべてクリアしないと
// 上のレベルへ行けない」。クリア = そのレベルの全問を AC。

import { ALL_PROBLEMS, problemsInLevel, levelsWithContent } from '../data'
import { sizeStars } from './difficulty'
import type { Problem } from '../types'

// ---- レベルの問題ID(キャッシュ) --------------------------------------------
let _authored: number[] | null = null
/** 問題が1問以上ある(=出題済み)レベルの昇順リスト。 */
export function authoredLevels(): number[] {
  if (_authored === null) _authored = levelsWithContent().slice().sort((a, b) => a - b)
  return _authored
}

const _idsCache = new Map<number, string[]>()
function levelIds(level: number): string[] {
  let v = _idsCache.get(level)
  if (!v) {
    v = problemsInLevel(level).map((p) => p.id)
    _idsCache.set(level, v)
  }
  return v
}

// ---- クリア / 解放 ----------------------------------------------------------
/** そのレベルがクリア済みか(全問 AC、かつ1問以上ある)。 */
export function isLevelCleared(level: number, solved: Set<string>): boolean {
  const ids = levelIds(level)
  if (ids.length === 0) return false
  return ids.every((id) => solved.has(id))
}

/** そのレベルが解放されているか(より下の出題済みレベルがすべてクリア済み)。 */
export function isLevelUnlocked(level: number, solved: Set<string>): boolean {
  for (const L of authoredLevels()) {
    if (L >= level) break
    if (!isLevelCleared(L, solved)) return false
  }
  return true
}

/** レベル内で残っている(未AC)問題数。 */
export function remainingInLevel(level: number, solved: Set<string>): number {
  return levelIds(level).filter((id) => !solved.has(id)).length
}

/** いま挑むべきレベル(最も下の未クリア出題済みレベル)。全クリアなら null。 */
export function frontierLevel(solved: Set<string>): number | null {
  for (const L of authoredLevels()) {
    if (!isLevelCleared(L, solved)) return L
  }
  return null
}

/** クリア済みレベル数。 */
export function clearedLevelCount(solved: Set<string>): number {
  return authoredLevels().filter((L) => isLevelCleared(L, solved)).length
}

// ---- XP / ランク ------------------------------------------------------------
/** 1問あたりの XP(想定コード量の星 1〜5 に応じて 10〜50)。 */
export function xpOfProblem(p: Problem): number {
  return sizeStars(p) * 10
}

let _xpById: Map<string, number> | null = null
function xpMap(): Map<string, number> {
  if (!_xpById) {
    _xpById = new Map()
    for (const p of ALL_PROBLEMS) _xpById.set(p.id, xpOfProblem(p))
  }
  return _xpById
}

/** 解いた問題の合計 XP。 */
export function totalXp(solved: Set<string>): number {
  const m = xpMap()
  let xp = 0
  for (const id of solved) xp += m.get(id) ?? 10
  return xp
}

export type Rank = { name: string; color: string; minXp: number }
/** 称号(ランク)。XP のしきい値で昇格していく。 */
export const RANKS: Rank[] = [
  { name: '入門者', color: '#94a3b8', minXp: 0 },
  { name: '見習い', color: '#9ca3af', minXp: 150 },
  { name: '初段', color: '#34d399', minXp: 400 },
  { name: '弐段', color: '#2dd4bf', minXp: 900 },
  { name: '参段', color: '#38bdf8', minXp: 1800 },
  { name: '皆伝', color: '#818cf8', minXp: 3500 },
  { name: '師範代', color: '#a78bfa', minXp: 6500 },
  { name: '師範', color: '#c084fc', minXp: 11000 },
  { name: '達人', color: '#f59e0b', minXp: 18000 },
  { name: '仙人', color: '#fb7185', minXp: 30000 },
]

export function rankForXp(xp: number): { rank: Rank; next: Rank | null; toNext: number } {
  let idx = 0
  for (let i = 0; i < RANKS.length; i++) if (xp >= RANKS[i].minXp) idx = i
  const next = idx + 1 < RANKS.length ? RANKS[idx + 1] : null
  return { rank: RANKS[idx], next, toNext: next ? next.minXp - xp : 0 }
}

// ---- ストリーク(連続日数) ---------------------------------------------------
function dateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
/** 今日(または昨日)から遡って連続して解いた日数。 */
export function currentStreak(days: string[]): number {
  const set = new Set(days)
  if (set.size === 0) return 0
  const today = new Date()
  const t = dateStr(today)
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  // 起点: 今日解いていれば今日、まだなら昨日(継続中とみなす)
  let cursor = new Date(today)
  if (!set.has(t)) {
    if (set.has(dateStr(yesterday))) cursor = yesterday
    else return 0
  }
  let streak = 0
  while (set.has(dateStr(cursor))) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

// ---- 実績(バッジ) -----------------------------------------------------------
export type Stats = {
  solvedCount: number
  clearedCount: number
  maxClearedLevel: number
  streak: number
  totalXp: number
}

export function computeStats(solved: Set<string>, days: string[]): Stats {
  const cleared = authoredLevels().filter((L) => isLevelCleared(L, solved))
  return {
    solvedCount: solved.size,
    clearedCount: cleared.length,
    maxClearedLevel: cleared.length ? Math.max(...cleared) : 0,
    streak: currentStreak(days),
    totalXp: totalXp(solved),
  }
}

export type Achievement = { id: string; name: string; desc: string; icon: string; earned: (s: Stats) => boolean }
export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_ac', name: 'はじめの一歩', desc: '最初の1問を解く', icon: '🌱', earned: (s) => s.solvedCount >= 1 },
  { id: 'first_clear', name: '初クリア', desc: 'レベルを1つクリア', icon: '✅', earned: (s) => s.clearedCount >= 1 },
  { id: 'solve10', name: '常連', desc: '10問 AC', icon: '🔟', earned: (s) => s.solvedCount >= 10 },
  { id: 'solve50', name: '修行中', desc: '50問 AC', icon: '⚔️', earned: (s) => s.solvedCount >= 50 },
  { id: 'solve200', name: '達筆', desc: '200問 AC', icon: '🖋️', earned: (s) => s.solvedCount >= 200 },
  { id: 'clear10', name: '十段制覇', desc: '10レベルをクリア', icon: '🏅', earned: (s) => s.clearedCount >= 10 },
  { id: 'reach100', name: '応用の扉', desc: 'lv100 以上をクリア', icon: '🚪', earned: (s) => s.maxClearedLevel >= 100 },
  { id: 'reach500', name: '高みへ', desc: 'lv500 以上をクリア', icon: '⛰️', earned: (s) => s.maxClearedLevel >= 500 },
  { id: 'streak3', name: '三日坊主じゃない', desc: '3日連続で解く', icon: '🔥', earned: (s) => s.streak >= 3 },
  { id: 'streak7', name: '週皆勤', desc: '7日連続で解く', icon: '🔥🔥', earned: (s) => s.streak >= 7 },
  { id: 'xp1000', name: 'XP 1000', desc: '累計 XP 1000', icon: '💠', earned: (s) => s.totalXp >= 1000 },
]
