import { Link } from 'react-router-dom'
import { solvedIds, solvedDays, activeProfile, useProgressVersion } from '../lib/progress'
import {
  computeStats,
  rankForXp,
  RANKS,
  ACHIEVEMENTS,
  frontierLevel,
  authoredLevels,
} from '../lib/gameplay'
import { levelLabel } from '../data/levels'

export default function Achievements() {
  useProgressVersion()
  const solved = solvedIds()
  const stats = computeStats(solved, solvedDays())
  const { rank, next, toNext } = rankForXp(stats.totalXp)
  const prof = activeProfile()
  const frontier = frontierLevel(solved)
  const totalLevels = authoredLevels().length

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-1">実績とランク</h1>
      <p className="text-slate-400 mb-6">
        プロフィール「<b>{prof.name}</b>」の歩み。問題を解くほど XP がたまり、称号が上がります。
      </p>

      {/* ランクカード */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold" style={{ color: rank.color }}>
            {rank.name}
          </span>
          <span className="text-slate-400">{stats.totalXp} XP</span>
        </div>
        <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: next ? `${Math.min(100, ((stats.totalXp - rank.minXp) / (next.minXp - rank.minXp)) * 100)}%` : '100%',
              background: rank.color,
            }}
          />
        </div>
        <div className="text-sm text-slate-500 mt-1">
          {next ? `次の称号「${next.name}」まで あと ${toNext} XP` : '最高位「仙人」に到達！'}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-center">
          <Box label="クリア済レベル" value={`${stats.clearedCount} / ${totalLevels}`} />
          <Box label="解いた問題" value={`${stats.solvedCount}`} />
          <Box label="連続記録" value={`${stats.streak} 日`} />
          <Box label="到達した最高レベル" value={stats.maxClearedLevel ? levelLabel(stats.maxClearedLevel) : '—'} />
        </div>
      </div>

      {/* 次に挑むレベル */}
      <div className="rounded-xl border border-green-900/50 bg-green-950/20 p-4 mb-6 flex items-center justify-between flex-wrap gap-2">
        <div>
          <div className="text-xs text-green-500 mb-0.5">いま挑むレベル</div>
          <div className="font-bold">
            {frontier ? `${levelLabel(frontier)} を全問クリアで次が解放` : '全レベル制覇！おめでとう 🎉'}
          </div>
        </div>
        {frontier && (
          <Link
            to={`/level/${frontier}`}
            className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-semibold"
          >
            挑戦する →
          </Link>
        )}
      </div>

      {/* 称号一覧 */}
      <h2 className="text-lg font-bold mb-2">称号</h2>
      <div className="flex flex-wrap gap-2 mb-8">
        {RANKS.map((r) => {
          const reached = stats.totalXp >= r.minXp
          return (
            <span
              key={r.name}
              className="px-2.5 py-1 rounded-full text-xs font-mono"
              style={{
                color: reached ? r.color : '#475569',
                border: `1px solid ${reached ? r.color + '66' : '#33415566'}`,
                opacity: reached ? 1 : 0.6,
              }}
            >
              {reached ? '★' : '☆'} {r.name} <span className="text-slate-500">{r.minXp}XP</span>
            </span>
          )
        })}
      </div>

      {/* バッジ */}
      <h2 className="text-lg font-bold mb-2">バッジ</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((a) => {
          const got = a.earned(stats)
          return (
            <div
              key={a.id}
              className={`rounded-xl border p-4 flex items-center gap-3 ${
                got ? 'border-amber-700/50 bg-amber-950/10' : 'border-slate-800 bg-slate-900/40 opacity-60'
              }`}
            >
              <div className="text-2xl" style={{ filter: got ? 'none' : 'grayscale(1)' }}>
                {a.icon}
              </div>
              <div>
                <div className="font-semibold">{a.name}</div>
                <div className="text-xs text-slate-400">{a.desc}</div>
              </div>
              {got && <span className="ml-auto text-amber-400 text-sm">獲得</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Box({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-800/50 py-2">
      <div className="font-bold">{value}</div>
      <div className="text-[11px] text-slate-500">{label}</div>
    </div>
  )
}
