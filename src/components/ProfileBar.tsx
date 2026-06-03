import { useState, type ReactNode } from 'react'
import {
  activeProfile,
  listProfiles,
  switchProfile,
  createProfile,
  renameProfile,
  deleteProfile,
  exportProfile,
  importProfile,
  solvedIds,
  solvedDays,
  useProgressVersion,
} from '../lib/progress'
import { computeStats, rankForXp } from '../lib/gameplay'

export default function ProfileBar() {
  useProgressVersion() // 進捗/プロフィール変更で再描画
  const [open, setOpen] = useState(false)

  const prof = activeProfile()
  const stats = computeStats(solvedIds(), solvedDays())
  const { rank, next, toNext } = rankForXp(stats.totalXp)
  const span = next ? next.minXp - rank.minXp : 1
  const pct = next ? Math.min(100, Math.round(((stats.totalXp - rank.minXp) / span) * 100)) : 100

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-2.5 py-1.5 hover:border-slate-500"
        title="プロフィールとランク"
      >
        <span
          className="font-mono text-xs font-bold px-1.5 py-0.5 rounded"
          style={{ color: rank.color, border: `1px solid ${rank.color}66` }}
        >
          {rank.name}
        </span>
        <span className="text-sm max-w-[7rem] truncate">{prof.name}</span>
        {stats.streak > 0 && <span className="text-xs text-orange-400">🔥{stats.streak}</span>}
        <span className="text-slate-500 text-xs">▾</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 z-30 rounded-xl border border-slate-700 bg-slate-900 shadow-xl p-3 text-sm">
            {/* ランク・XP */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold" style={{ color: rank.color }}>
                  {rank.name}
                </span>
                <span className="text-xs text-slate-400">{stats.totalXp} XP</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: rank.color }} />
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {next ? `次の称号「${next.name}」まで あと ${toNext} XP` : '最高位に到達！'}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center my-3">
              <Stat label="クリア" value={`${stats.clearedCount}`} />
              <Stat label="AC問題" value={`${stats.solvedCount}`} />
              <Stat label="連続" value={`${stats.streak}日`} />
            </div>

            {/* プロフィール切替 */}
            <div className="border-t border-slate-800 pt-2">
              <div className="text-[11px] text-slate-500 mb-1">プロフィール</div>
              <div className="space-y-1 max-h-40 overflow-auto">
                {listProfiles().map((p) => (
                  <div key={p.id} className="flex items-center gap-2">
                    <button
                      onClick={() => switchProfile(p.id)}
                      className={`flex-1 text-left px-2 py-1 rounded ${
                        p.id === prof.id ? 'bg-slate-800 text-green-400' : 'hover:bg-slate-800'
                      }`}
                    >
                      {p.id === prof.id ? '● ' : '○ '}
                      {p.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 操作 */}
            <div className="border-t border-slate-800 pt-2 mt-2 flex flex-wrap gap-2 text-xs">
              <Act onClick={() => { const n = prompt('新しいプロフィール名'); if (n) createProfile(n) }}>＋ 追加</Act>
              <Act onClick={() => { const n = prompt('名前を変更', prof.name); if (n) renameProfile(prof.id, n) }}>名前変更</Act>
              <Act onClick={() => { const j = exportProfile(prof.id); prompt('この文字列をコピーして保存(別端末でインポート可)', j) }}>書出し</Act>
              <Act onClick={() => { const j = prompt('エクスポートした文字列を貼り付け'); if (j) importProfile(j) }}>取込み</Act>
              {listProfiles().length > 1 && (
                <Act
                  danger
                  onClick={() => { if (confirm(`「${prof.name}」を削除しますか？(進捗も消えます)`)) deleteProfile(prof.id) }}
                >
                  削除
                </Act>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-800/60 py-1.5">
      <div className="font-bold">{value}</div>
      <div className="text-[10px] text-slate-500">{label}</div>
    </div>
  )
}

function Act({ children, onClick, danger }: { children: ReactNode; onClick: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 rounded border ${
        danger ? 'border-rose-800 text-rose-400 hover:bg-rose-950/40' : 'border-slate-700 text-slate-300 hover:bg-slate-800'
      }`}
    >
      {children}
    </button>
  )
}
