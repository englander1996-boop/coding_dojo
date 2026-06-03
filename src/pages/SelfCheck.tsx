import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ALL_PROBLEMS } from '../data'
import { levelLabel } from '../data/levels'
import { judge } from '../lib/grader'
import type { Verdict } from '../lib/grader'

interface Row {
  id: string
  title: string
  level: number
  verdict: Verdict
  passed: number
  total: number
}

/**
 * 出題側の検証ツール。各問題の reference(参照解) を全テストケースに通し、
 * AC にならない問題＝正解データが壊れている問題 を洗い出す。
 * 大量に問題を増やしても「全部正しく動くか」をここで保証できる。
 */
export default function SelfCheck() {
  const [rows, setRows] = useState<Row[]>([])
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(0)

  const run = async () => {
    setRunning(true)
    setRows([])
    setDone(0)
    const out: Row[] = []
    // serverOnly(optuna等)はブラウザのPyodideでは動かないので除外（npm run validate で検証する）
    for (const p of ALL_PROBLEMS) {
      if (p.serverOnly) continue
      const r = await judge(p.reference, p.testCases)
      out.push({ id: p.id, title: p.title, level: p.level, verdict: r.verdict, passed: r.passed, total: r.total })
      setDone((d) => d + 1)
      // show failures incrementally so problems surface as soon as found
      if (r.verdict !== 'AC') setRows((prev) => [...prev, out[out.length - 1]])
    }
    setRows(out)
    setRunning(false)
  }

  const broken = rows.filter((r) => r.verdict !== 'AC')
  const total = ALL_PROBLEMS.filter((p) => !p.serverOnly).length

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-1">問題セルフチェック</h1>
      <p className="text-slate-400 mb-4">
        各問題の参照解（模範解答）を全テストケースに通し、<b>正解データそのものが正しいか</b>を検証します。
        AC にならない問題は出題側のバグです。
      </p>

      <button
        onClick={run}
        disabled={running}
        className="rounded bg-green-600 hover:bg-green-500 disabled:opacity-50 px-4 py-2 text-sm font-semibold mb-4"
      >
        {running ? `検証中… ${done} / ${total}` : `全 ${total} 問を検証する`}
      </button>

      {(running || rows.length > 0) && (
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
          {!running && broken.length === 0 && (
            <p className="text-green-400 font-semibold">
              ✓ 全 {total} 問が参照解で AC。正解データに問題は見つかりませんでした。
            </p>
          )}
          {broken.length > 0 && (
            <>
              <p className="text-red-400 font-semibold mb-3">⚠ {broken.length} 問で参照解が AC になりません：</p>
              <ul className="space-y-1 text-sm">
                {broken.map((r) => (
                  <li key={r.id} className="flex items-center gap-3">
                    <span className="font-mono text-xs text-slate-500">
                      {levelLabel(r.level)}-{r.id.split('-')[1]}
                    </span>
                    <Link to={`/problem/${r.id}`} className="flex-1 hover:text-white">
                      {r.title}
                    </Link>
                    <span className="text-red-400 font-mono text-xs">
                      {r.verdict} ({r.passed}/{r.total})
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  )
}
