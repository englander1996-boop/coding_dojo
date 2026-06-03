import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getLevel, levelLabel, tierForLevel, trackLabelOfLevel, PROBLEMS_PER_LEVEL } from '../data/levels'
import { problemsInLevel } from '../data'
import { isSolved, solvedIds, useProgressVersion } from '../lib/progress'
import { isLevelUnlocked, isLevelCleared, frontierLevel, authoredLevels } from '../lib/gameplay'
import { difficultyScore, sizeBadge } from '../lib/difficulty'
import type { Problem } from '../types'

export default function LevelPage() {
  useProgressVersion()
  const { level } = useParams()
  const lv = Number(level)
  const meta = getLevel(lv)
  const problems = problemsInLevel(lv)
  const tier = tierForLevel(lv)
  const [showTheory, setShowTheory] = useState(true)
  const solved = solvedIds()
  const unlocked = isLevelUnlocked(lv, solved)
  const cleared = isLevelCleared(lv, solved)
  const nextLevel = authoredLevels().find((L) => L > lv)

  if (!meta) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p>そのレベルはまだありません。</p>
        <Link to="/" className="text-green-400">
          ← レベル一覧へ
        </Link>
      </div>
    )
  }

  // ロックガード: 下のレベルが全クリアされるまで入れない
  if (!unlocked) {
    const frontier = frontierLevel(solved)
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold mb-2">{levelLabel(lv)} はまだロック中</h1>
        <p className="text-slate-400 mb-6">
          下のレベルをすべて<b>全問クリア</b>すると解放されます。
          {frontier && <> いまは <b>{levelLabel(frontier)}</b> に挑戦しましょう。</>}
        </p>
        <div className="flex items-center justify-center gap-3">
          {frontier && (
            <Link to={`/level/${frontier}`} className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold">
              {levelLabel(frontier)} へ →
            </Link>
          )}
          <Link to="/" className="px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800">
            学習マップへ
          </Link>
        </div>
      </div>
    )
  }

  // group problems into concept clusters; within a cluster, and across clusters,
  // order by difficulty (= reference solution length). 2軸モデルの「帯の中の順序」。
  const groups: { concept: string; items: Problem[] }[] = []
  for (const p of problems) {
    const g = groups.find((x) => x.concept === p.concept)
    if (g) g.items.push(p)
    else groups.push({ concept: p.concept, items: [p] })
  }
  for (const g of groups) g.items.sort((a, b) => difficultyScore(a) - difficultyScore(b))
  groups.sort((a, b) => difficultyScore(a.items[0]) - difficultyScore(b.items[0]))

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="text-sm text-slate-400 hover:text-white">
        ← レベル一覧
      </Link>
      <div className="flex items-center gap-3 mt-2 mb-1">
        <span
          className="font-mono font-bold px-2 py-0.5 rounded"
          style={{ color: tier.color, border: `1px solid ${tier.color}55` }}
        >
          {levelLabel(lv)}
        </span>
        <span className="text-xs text-slate-400 bg-slate-800 rounded px-2 py-0.5">{trackLabelOfLevel(lv)}</span>
        <h1 className="text-2xl font-bold">{meta.title}</h1>
      </div>
      <p className="text-slate-400 mb-4">{meta.description}</p>

      {/* クリア状況と次の解放 */}
      <div
        className={`rounded-lg border p-3 mb-6 text-sm flex items-center gap-2 flex-wrap ${
          cleared ? 'border-green-800/60 bg-green-950/20 text-green-300' : 'border-slate-800 bg-slate-900/40 text-slate-300'
        }`}
      >
        {cleared ? (
          <>
            <span>✅ このレベルはクリア済み！</span>
            {nextLevel && (
              <Link to={`/level/${nextLevel}`} className="underline hover:text-white">
                {levelLabel(nextLevel)} が解放されています →
              </Link>
            )}
          </>
        ) : (
          <span>
            🎯 全 {problems.length} 問を AC するとこのレベルはクリア
            {nextLevel ? <>、<b>{levelLabel(nextLevel)}</b> が解放されます。</> : '。'}
          </span>
        )}
      </div>

      {/* 理論セクション：解く前に概念を理屈から学べる */}
      {meta.theory && (
        <div className="rounded-lg border border-cyan-900/60 bg-cyan-950/20 p-4 mb-6">
          <button
            onClick={() => setShowTheory((s) => !s)}
            className="flex items-center gap-2 font-semibold text-cyan-300"
          >
            <span>{showTheory ? '▼' : '▶'}</span>
            📖 まず理論を学ぶ
          </button>
          {showTheory && <div className="mt-3 prewrap text-sm leading-relaxed text-slate-200">{meta.theory}</div>}
        </div>
      )}

      {/* 概念クラスタごとに問題を表示 */}
      <div className="space-y-6">
        {groups.map((g) => (
          <div key={g.concept}>
            <h2 className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: tier.color }} />
              {g.concept}
              <span className="text-xs text-slate-500 font-normal">({g.items.length}問)</span>
            </h2>
            <ol className="space-y-2">
              {g.items.map((p) => {
                const solved = isSolved(p.id)
                return (
                  <li key={p.id}>
                    <Link
                      to={`/problem/${p.id}`}
                      className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-3 hover:border-slate-600"
                    >
                      <span className="font-mono text-xs text-slate-500 w-12">
                        {String(p.index).padStart(3, '0')}
                      </span>
                      <span className="flex-1">{p.title}</span>
                      <span
                        className="text-[11px] text-slate-400 bg-slate-800 rounded px-1.5 py-0.5"
                        title="参照解のおおよその行数（帯の中の難易度の目安）"
                      >
                        📏 {sizeBadge(p)}
                      </span>
                      <span className={solved ? 'text-green-400' : 'text-slate-600'}>
                        {solved ? '✓ AC' : '○'}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </div>
        ))}
      </div>

      {problems.length < PROBLEMS_PER_LEVEL && (
        <p className="text-sm text-slate-500 mt-6">
          このレベルは現在 {problems.length} / {PROBLEMS_PER_LEVEL} 問を収録。1概念2〜3問のクラスタで順次追加していきます。
        </p>
      )}
    </div>
  )
}
