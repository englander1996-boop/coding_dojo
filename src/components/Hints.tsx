import { useState } from 'react'

interface Props {
  hints: string[]
}

/**
 * 3段階ヒント。最初は全部隠れていて、ボタンを押すごとに1段ずつ開く。
 * 「いきなり答えを見せない」ための段階的開示。
 */
export default function Hints({ hints }: Props) {
  const [revealed, setRevealed] = useState(0)

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">ヒント</h3>
        <span className="text-xs text-slate-500">
          {revealed} / {hints.length} 表示中
        </span>
      </div>

      <div className="space-y-2">
        {hints.slice(0, revealed).map((h, i) => (
          <div key={i} className="rounded bg-slate-800/60 p-3 text-sm prewrap">
            <span className="text-green-400 font-semibold mr-1">ヒント{i + 1}:</span>
            {h}
          </div>
        ))}
      </div>

      {revealed < hints.length ? (
        <button
          onClick={() => setRevealed((r) => r + 1)}
          className="mt-3 text-sm rounded bg-slate-800 hover:bg-slate-700 px-3 py-1.5"
        >
          {revealed === 0 ? 'ヒントを見る' : `次のヒント (${revealed + 1}段目) を見る`}
        </button>
      ) : (
        <p className="mt-3 text-xs text-slate-500">すべてのヒントを表示しました。</p>
      )}
    </div>
  )
}
