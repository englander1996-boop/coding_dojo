import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { computeCoverage } from '../data/features'
import { levelLabel } from '../data/levels'

export default function Coverage() {
  const statuses = useMemo(() => computeCoverage(), [])
  const covered = statuses.filter((s) => s.example).length
  const total = statuses.length
  const pct = Math.round((covered / total) * 100)

  // group by category, preserving order
  const categories: string[] = []
  for (const s of statuses) if (!categories.includes(s.feature.category)) categories.push(s.feature.category)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-1">機能網羅チェックリスト</h1>
      <p className="text-slate-400 mb-4">
        「Python のこの機能を扱う問題が1問でもあるか」を表示します。<b>問題数ではなくカバー率</b>で進捗を測るためのもの。
        ✗（未出題）が次に作るべき問題のヒントになります。
      </p>

      {/* 全体カバー率 */}
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">全体カバー率</span>
          <span className="font-mono text-lg">
            {covered} / {total}（{pct}%）
          </span>
        </div>
        <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
          <div className="h-full rounded-full bg-green-500" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="space-y-6">
        {categories.map((cat) => {
          const items = statuses.filter((s) => s.feature.category === cat)
          const c = items.filter((s) => s.example).length
          return (
            <div key={cat}>
              <h2 className="text-sm font-semibold text-slate-300 mb-2">
                {cat}{' '}
                <span className="text-xs text-slate-500 font-normal">
                  ({c}/{items.length})
                </span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-1.5">
                {items.map((s) => (
                  <div
                    key={s.feature.key}
                    className="flex items-center gap-2 rounded border border-slate-800 bg-slate-900/40 px-3 py-2 text-sm"
                  >
                    <span className={s.example ? 'text-green-400' : 'text-slate-600'}>
                      {s.example ? '✓' : '✗'}
                    </span>
                    <span className={s.example ? '' : 'text-slate-500'}>{s.feature.key}</span>
                    <span className="ml-auto">
                      {s.example ? (
                        <Link
                          to={`/problem/${s.example.id}`}
                          className="font-mono text-[11px] text-slate-400 hover:text-white"
                        >
                          {levelLabel(s.example.level)}-{s.example.id.split('-')[1]}
                        </Link>
                      ) : (
                        <span className="text-[11px] text-slate-600">未出題</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
