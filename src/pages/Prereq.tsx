import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FEATURES, LANGUAGE_CATEGORIES, firstIntroducers, findPrereqGaps } from '../data/features'
import { levelLabel } from '../data/levels'

/**
 * 前提知識チェック。
 * 「難しい問題が、より前で教わっていない土台機能を初めて使っていないか」を可視化。
 * = 『そんなコード知らない！』をゼロにするための保証。
 */
export default function Prereq() {
  const intro = useMemo(() => firstIntroducers(), [])
  const gaps = useMemo(() => findPrereqGaps(50), [])

  // 言語の土台機能を初出レベル順に
  const rows = FEATURES.filter((f) => LANGUAGE_CATEGORIES.includes(f.category))
    .map((f) => ({ feature: f, p: intro.get(f.key) }))
    .filter((r) => r.p)
    .sort((a, b) => a.p!.level - b.p!.level || a.feature.key.localeCompare(b.feature.key))

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-1">前提チェック</h1>
      <p className="text-slate-400 mb-4">
        理念：<b>「そんなコード知らない！」をゼロにする</b>。難しい問題に進む前に、その解答に必要な
        テクニックは<b>すべてより前のレベルで学んでいる</b>状態を保証します。
      </p>

      {/* 穴の有無 */}
      {gaps.length === 0 ? (
        <div className="rounded-lg border border-green-800/60 bg-green-950/20 p-4 mb-6">
          <p className="text-green-400 font-semibold">
            ✓ 前提の穴は 0 件。応用問題が使う言語機能は、すべてより前のレベルで導入済みです。
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-red-800/60 bg-red-950/20 p-4 mb-6">
          <p className="text-red-400 font-semibold mb-2">⚠ 前提の穴 {gaps.length} 件（応用問題が土台機能を初出させている）:</p>
          <ul className="space-y-1 text-sm">
            {gaps.map((g) => (
              <li key={g.problem.id} className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-slate-500">{levelLabel(g.problem.level)}</span>
                <Link to={`/problem/${g.problem.id}`} className="hover:text-white">
                  {g.problem.title}
                </Link>
                <span className="text-red-400 text-xs">→ {g.untaught.map((f) => f.key).join(', ')}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 土台機能の初出レベル一覧 */}
      <h2 className="text-sm font-semibold text-slate-300 mb-2">言語の土台機能 — どのレベルで初めて学ぶか</h2>
      <div className="grid sm:grid-cols-2 gap-1.5">
        {rows.map((r) => (
          <div
            key={r.feature.key}
            className="flex items-center gap-2 rounded border border-slate-800 bg-slate-900/40 px-3 py-2 text-sm"
          >
            <Link
              to={`/problem/${r.p!.id}`}
              className="font-mono text-[11px] text-cyan-400 hover:text-cyan-300 w-12"
            >
              {levelLabel(r.p!.level)}
            </Link>
            <span className="flex-1">{r.feature.key}</span>
            <span className="text-[11px] text-slate-500">{r.feature.category}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
