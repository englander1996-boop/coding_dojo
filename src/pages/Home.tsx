import { Link } from 'react-router-dom'
import { TRACKS, PROBLEMS_PER_LEVEL, levelsInTrack, levelLabel, tierForLevel } from '../data/levels'
import { problemsInLevel } from '../data'
import { solvedIds, solvedDays, useProgressVersion } from '../lib/progress'
import {
  isLevelUnlocked,
  isLevelCleared,
  remainingInLevel,
  frontierLevel,
  computeStats,
  rankForXp,
} from '../lib/gameplay'

export default function Home() {
  useProgressVersion()
  const solved = solvedIds()
  const stats = computeStats(solved, solvedDays())
  const { rank } = rankForXp(stats.totalXp)
  const frontier = frontierLevel(solved)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-1">学習マップ</h1>
      <p className="text-slate-400 mb-4">
        <b>縦軸 = レベル（難易度）</b> × <b>横軸 = トラック（領域）</b>。
        下のレベルを<b>全問クリア</b>すると、上のレベルが<b>解放</b>されます。
      </p>

      {/* 次に挑むレベルのバナー */}
      <div className="rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-900/40 p-4 mb-8 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-sm font-bold px-2 py-1 rounded"
            style={{ color: rank.color, border: `1px solid ${rank.color}66` }}
          >
            {rank.name}
          </span>
          <div>
            <div className="text-xs text-slate-500">次に挑むレベル</div>
            <div className="font-bold">
              {frontier ? `${levelLabel(frontier)}（残り ${remainingInLevel(frontier, solved)} 問でクリア）` : '全レベル制覇！🎉'}
            </div>
          </div>
        </div>
        {frontier && (
          <Link
            to={`/level/${frontier}`}
            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-semibold"
          >
            続きから挑戦 →
          </Link>
        )}
      </div>

      <div className="space-y-10">
        {TRACKS.map((track) => {
          const levels = levelsInTrack(track.id)
          if (levels.length === 0) return null
          return (
            <section key={track.id}>
              <div className="mb-3 border-b border-slate-800 pb-2">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="h-3 w-3 rounded-full" style={{ background: track.color }} />
                  <h2 className="text-lg font-bold">{track.title}</h2>
                  <span
                    className="font-mono text-xs px-2 py-0.5 rounded"
                    style={{ color: track.color, border: `1px solid ${track.color}55` }}
                  >
                    {levelLabel(track.startLevel)}〜スタート
                  </span>
                  <span className="text-sm text-slate-400">{track.description}</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">前提: {track.prereq}</div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {levels.map((lv) => {
                  const probs = problemsInLevel(lv.level)
                  const ids = probs.map((p) => p.id)
                  const solvedCount = ids.filter((id) => solved.has(id)).length
                  const tier = tierForLevel(lv.level)
                  const authored = probs.length
                  const pct = authored ? Math.round((solvedCount / authored) * 100) : 0
                  const unlocked = isLevelUnlocked(lv.level, solved)
                  const cleared = isLevelCleared(lv.level, solved)

                  const inner = (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="font-mono font-bold text-sm px-2 py-0.5 rounded"
                          style={{ color: tier.color, border: `1px solid ${tier.color}55` }}
                        >
                          {levelLabel(lv.level)}
                        </span>
                        <span className="text-xs text-slate-400">
                          {cleared ? '✅ クリア' : !unlocked ? '🔒 ロック' : `${solvedCount} / ${authored || PROBLEMS_PER_LEVEL} 問`}
                        </span>
                      </div>
                      <div className="font-semibold">{lv.title}</div>
                      <div className="text-sm text-slate-400 mb-3">{lv.description}</div>
                      {unlocked ? (
                        <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: tier.color }} />
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-500">下のレベルを全問クリアすると解放</div>
                      )}
                    </>
                  )

                  if (!unlocked) {
                    return (
                      <div
                        key={lv.level}
                        className="block rounded-xl border border-slate-800/70 bg-slate-900/30 p-4 opacity-55 cursor-not-allowed select-none"
                        title="ロック中: 下のレベルを全問クリアで解放されます"
                      >
                        {inner}
                      </div>
                    )
                  }
                  return (
                    <Link
                      key={lv.level}
                      to={`/level/${lv.level}`}
                      className={`block rounded-xl border p-4 transition-colors ${
                        cleared
                          ? 'border-green-800/60 bg-green-950/15 hover:border-green-600'
                          : 'border-slate-800 bg-slate-900/50 hover:border-slate-600'
                      }`}
                    >
                      {inner}
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
