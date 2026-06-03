import { useState } from 'react'
import type { JudgeResult } from '../lib/grader'
import { verdictMeta } from '../lib/grader'

interface Props {
  result: JudgeResult
}

/** Shows the overall verdict and a per-case breakdown (AtCoder-style). */
export default function TestResults({ result }: Props) {
  const [open, setOpen] = useState<number | null>(null)
  const overall = verdictMeta(result.verdict)

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-bold text-lg" style={{ color: overall.color }}>
          {overall.label}
        </span>
        <span className="text-sm text-slate-400">
          {result.passed} / {result.total} ケース通過
        </span>
      </div>

      <div className="grid grid-cols-8 gap-1 mb-3">
        {result.cases.map((c) => {
          const m = verdictMeta(c.verdict)
          return (
            <button
              key={c.index}
              onClick={() => setOpen(open === c.index ? null : c.index)}
              title={`ケース${c.index + 1}: ${m.label}`}
              className="h-7 rounded text-[11px] font-mono font-bold"
              style={{ background: m.color + '22', color: m.color, border: `1px solid ${m.color}55` }}
            >
              {c.verdict}
            </button>
          )
        })}
      </div>

      {open !== null &&
        (() => {
          const c = result.cases[open]
          return (
            <div className="rounded bg-slate-950/60 p-3 text-sm space-y-2">
              <div className="text-slate-400">
                ケース {open + 1} {c.sample ? '(サンプル)' : '(隠しケース)'} — {verdictMeta(c.verdict).label}
              </div>
              {c.sample ? (
                <>
                  <Field label="入力" value={c.input || '(なし)'} />
                  <Field label="期待する出力" value={c.expected} />
                  <Field label="あなたの出力" value={c.got || '(なし)'} />
                </>
              ) : (
                <div className="text-slate-500 text-xs">隠しケースの入出力は表示されません。</div>
              )}
              {c.stderr && <Field label="エラー" value={c.stderr} error />}
            </div>
          )
        })()}
    </div>
  )
}

function Field({ label, value, error }: { label: string; value: string; error?: boolean }) {
  return (
    <div>
      <div className="text-xs text-slate-500 mb-0.5">{label}</div>
      <pre className={`prewrap text-xs rounded p-2 ${error ? 'bg-red-950/40 text-red-300' : 'bg-slate-900'}`}>
        {value}
      </pre>
    </div>
  )
}
