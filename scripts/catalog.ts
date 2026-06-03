// 問題カタログを自動生成して PROBLEMS.md に書き出す。
// 「今どんな問題があるか」をトラック→レベル→クラスタ→問題の順に一覧化する。
// 問題を追加したら `npm run catalog` を流せば常に最新の一覧になる。
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ALL_PROBLEMS } from '../src/data/index.ts'
import { LEVELS, TRACKS, getLevel, trackOfLevel, levelLabel } from '../src/data/levels.ts'
import type { Problem } from '../src/types.ts'

const byLevel = new Map<number, Problem[]>()
for (const p of ALL_PROBLEMS) {
  if (!byLevel.has(p.level)) byLevel.set(p.level, [])
  byLevel.get(p.level)!.push(p)
}
for (const arr of byLevel.values()) arr.sort((a, b) => a.index - b.index)

const levelsWithContent = [...byLevel.keys()].sort((a, b) => a - b)

const lines: string[] = []
lines.push('# 問題カタログ（自動生成）')
lines.push('')
lines.push('> このファイルは `npm run catalog` で `scripts/catalog.ts` が自動生成します。手で編集しないこと。')
lines.push('> 問題を追加したら再生成すれば最新の一覧になります。')
lines.push('')
lines.push(
  `**総計: ${ALL_PROBLEMS.length}問 / ${levelsWithContent.length}レベル（コンテンツ有） / ${TRACKS.length}トラック**`,
)
lines.push('')

// ---- トラック別サマリ表 ----
lines.push('## トラック別サマリ')
lines.push('')
lines.push('| トラック | レベル帯 | レベル数 | 問題数 |')
lines.push('| --- | --- | ---: | ---: |')
for (const t of TRACKS) {
  const lvs = levelsWithContent.filter((l) => trackOfLevel(l) === t.id)
  const count = lvs.reduce((s, l) => s + byLevel.get(l)!.length, 0)
  const range = lvs.length ? `lv${String(lvs[0]).padStart(3, '0')}〜lv${String(lvs[lvs.length - 1]).padStart(3, '0')}` : '—'
  lines.push(`| ${t.title} | ${range} | ${lvs.length} | ${count} |`)
}
lines.push('')

// ---- トラックごとの詳細 ----
for (const t of TRACKS) {
  const lvs = levelsWithContent.filter((l) => trackOfLevel(l) === t.id)
  if (!lvs.length) continue
  const trackCount = lvs.reduce((s, l) => s + byLevel.get(l)!.length, 0)
  lines.push(`## ${t.title}（${trackCount}問）`)
  lines.push('')
  lines.push(`${t.description}`)
  lines.push('')

  for (const lv of lvs) {
    const probs = byLevel.get(lv)!
    const meta = getLevel(lv)
    const title = meta?.title ?? '(レベル定義なし)'
    lines.push(`### ${levelLabel(lv)} ${title} — ${probs.length}問`)
    if (meta?.description) lines.push(`_${meta.description}_`)
    lines.push('')

    // concept ごとにまとめて（クラスタを可視化）
    const seen: string[] = []
    const byConcept = new Map<string, Problem[]>()
    for (const p of probs) {
      if (!byConcept.has(p.concept)) {
        byConcept.set(p.concept, [])
        seen.push(p.concept)
      }
      byConcept.get(p.concept)!.push(p)
    }
    for (const concept of seen) {
      const cl = byConcept.get(concept)!
      lines.push(`- **${concept}** (${cl.length})`)
      for (const p of cl) {
        const flags: string[] = []
        if (p.serverOnly) flags.push('🖥️server')
        if (p.tip) flags.push('💡')
        const suffix = flags.length ? ` _(${flags.join(' ')})_` : ''
        lines.push(`  - \`${p.id}\` ${p.title}${suffix}`)
      }
    }
    lines.push('')
  }
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = join(__dirname, '..', 'PROBLEMS.md')
writeFileSync(outPath, lines.join('\n'))
console.log(`PROBLEMS.md を生成しました: ${ALL_PROBLEMS.length}問 / ${levelsWithContent.length}レベル`)
