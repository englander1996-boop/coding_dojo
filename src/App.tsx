import { Link, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { runner } from './lib/runner'
import ProfileBar from './components/ProfileBar'

export default function App() {
  const loc = useLocation()

  // Start downloading Pyodide as soon as the app opens so the first run is fast.
  useEffect(() => {
    runner.warmup()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-green-400 font-mono">&gt;_</span>
            <span>Coding Dojo</span>
            <span className="text-xs text-slate-400 font-normal">lv001〜lv999 Python</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/" className={loc.pathname === '/' ? 'text-green-400' : 'text-slate-300 hover:text-white'}>
              学習マップ
            </Link>
            <Link
              to="/achievements"
              className={loc.pathname === '/achievements' ? 'text-green-400' : 'text-slate-300 hover:text-white'}
            >
              実績
            </Link>
            <Link
              to="/coverage"
              className={loc.pathname === '/coverage' ? 'text-green-400' : 'text-slate-300 hover:text-white hidden sm:inline'}
            >
              機能カバレッジ
            </Link>
            <Link
              to="/self-check"
              className={loc.pathname === '/self-check' ? 'text-green-400' : 'text-slate-300 hover:text-white hidden sm:inline'}
            >
              セルフチェック
            </Link>
            <ProfileBar />
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  )
}
