import type { Problem } from '../types'

/**
 * 2軸の難易度モデルのうち「帯の中の順序」を担う部分。
 * 参照解(reference)の行数・文字数から、客観的な「想定コード量」を計算する。
 *
 * 注意: 長さ ≠ 難易度（短くても難しい問題はある）。これはあくまで
 * 「同じ帯の中で並べる順序」と「だいたいの目安」のための指標で、帯そのものは
 * 前提知識/概念(concept) で決める。
 */

/** 参照解の実質行数（空行を除く）。 */
export function refLines(reference: string): number {
  return reference.split('\n').filter((l) => l.trim() !== '').length
}

/** 参照解の非空白文字数。 */
export function refChars(reference: string): number {
  return reference.replace(/\s/g, '').length
}

/** 並び順に使うスコア。行数を主、文字数を従にする。 */
export function difficultyScore(p: Problem): number {
  return refLines(p.reference) * 1000 + refChars(p.reference)
}

/** 「📏 想定◯行」バッジ用ラベル。 */
export function sizeBadge(p: Problem): string {
  return `${refLines(p.reference)}行`
}

/** ざっくりした星表示（1〜5）。グローバルな目安。 */
export function sizeStars(p: Problem): number {
  const lines = refLines(p.reference)
  if (lines <= 1) return 1
  if (lines <= 3) return 2
  if (lines <= 6) return 3
  if (lines <= 12) return 4
  return 5
}
