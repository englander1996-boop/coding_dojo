import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProblem, problemsInLevel } from '../data'
import { levelLabel } from '../data/levels'
import CodeEditor from '../components/CodeEditor'
import Hints from '../components/Hints'
import TestResults from '../components/TestResults'
import { runner } from '../lib/runner'
import type { EngineStatus, RunResult } from '../lib/runner'
import { judge } from '../lib/grader'
import type { JudgeResult } from '../lib/grader'
import { serverHealth, serverJudge, serverRun } from '../lib/serverRunner'
import { isSolved, loadCode, markSolved, saveCode, solvedIds } from '../lib/progress'
import { isLevelUnlocked, frontierLevel, authoredLevels } from '../lib/gameplay'

type EngineMode = 'browser' | 'server'
const ENGINE_KEY = 'code-dojo:engine'

export default function ProblemPage() {
  const { id } = useParams()
  const problem = id ? getProblem(id) : undefined

  const [code, setCode] = useState('')
  const [engine, setEngine] = useState<EngineStatus>(runner.status)
  const [customInput, setCustomInput] = useState('')
  const [runOutput, setRunOutput] = useState<RunResult | null>(null)
  const [running, setRunning] = useState(false)
  const [judging, setJudging] = useState(false)
  const [judgeResult, setJudgeResult] = useState<JudgeResult | null>(null)
  const [solved, setSolved] = useState(false)
  const [justCleared, setJustCleared] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [engineMode, setEngineMode] = useState<EngineMode>(
    () => (localStorage.getItem(ENGINE_KEY) as EngineMode) || 'browser',
  )
  const [serverUp, setServerUp] = useState<boolean | null>(null)

  // initialize editor + engine status when the problem changes
  useEffect(() => {
    if (!problem) return
    setCode(loadCode(problem.id) ?? problem.starterCode)
    setCustomInput(problem.testCases.find((t) => t.sample)?.input ?? '')
    setRunOutput(null)
    setJudgeResult(null)
    setShowAnswer(false)
    setSolved(isSolved(problem.id))
    setJustCleared(false)
  }, [problem])

  useEffect(() => runner.onStatus(setEngine), [])

  // サーバー実行モードのときはローカル判定サーバーの生存確認
  useEffect(() => {
    if (engineMode === 'server') serverHealth().then(setServerUp)
  }, [engineMode])

  const chooseEngine = (m: EngineMode) => {
    setEngineMode(m)
    localStorage.setItem(ENGINE_KEY, m)
    if (m === 'server') serverHealth().then(setServerUp)
  }

  const next = useMemo(() => {
    if (!problem) return undefined
    const siblings = problemsInLevel(problem.level)
    const i = siblings.findIndex((p) => p.id === problem.id)
    return i >= 0 && i + 1 < siblings.length ? siblings[i + 1] : undefined
  }, [problem])

  if (!problem) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p>問題が見つかりません。</p>
        <Link to="/" className="text-green-400">
          ← レベル一覧へ
        </Link>
      </div>
    )
  }

  // ロックガード: このレベルがまだ解放されていなければ問題を開けない
  if (!isLevelUnlocked(problem.level, solvedIds())) {
    const frontier = frontierLevel(solvedIds())
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold mb-2">この問題はまだロック中</h1>
        <p className="text-slate-400 mb-6">
          {levelLabel(problem.level)} は、下のレベルを全問クリアすると解放されます。
        </p>
        {frontier && (
          <Link to={`/level/${frontier}`} className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold">
            {levelLabel(frontier)} に挑戦 →
          </Link>
        )}
      </div>
    )
  }

  const nextLevel = authoredLevels().find((L) => L > problem.level)

  const onCodeChange = (v: string) => {
    setCode(v)
    saveCode(problem.id, v)
  }

  const useServer = engineMode === 'server'

  const runCustom = async () => {
    setRunning(true)
    setRunOutput(null)
    try {
      const res = useServer ? await serverRun(code, customInput) : await runner.run(code, customInput)
      setRunOutput(res)
    } catch {
      setRunOutput({ status: 'error', stdout: '', stderr: 'サーバーに接続できません。`npm run server` で起動してください。' })
      setServerUp(false)
    }
    setRunning(false)
  }

  const submit = async () => {
    setJudging(true)
    setJudgeResult(null)
    try {
      const result = useServer ? await serverJudge(code, problem.testCases) : await judge(code, problem.testCases)
      setJudgeResult(result)
      if (result.verdict === 'AC') {
        markSolved(problem.id)
        setSolved(true)
        // このACでレベルが全問クリアになったか
        const ids = problemsInLevel(problem.level).map((p) => p.id)
        const now = solvedIds()
        if (ids.length > 0 && ids.every((x) => now.has(x))) setJustCleared(true)
      }
    } catch {
      setServerUp(false)
      setRunOutput({ status: 'error', stdout: '', stderr: 'サーバーに接続できません。`npm run server` で起動してください。' })
    }
    setJudging(false)
  }

  const busy = running || judging
  const engineLabel: Record<EngineStatus, string> = {
    idle: 'Python: 待機',
    loading: 'Python 起動中… (初回は数秒)',
    ready: 'Python: 準備OK',
    failed: 'Python の読み込みに失敗',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-2 gap-6">
      {/* 左: 問題文・ヒント・解説 */}
      <div className="space-y-4">
        <div>
          <Link to={`/level/${problem.level}`} className="text-sm text-slate-400 hover:text-white">
            ← {levelLabel(problem.level)} の一覧
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-mono text-xs text-slate-500">
              {levelLabel(problem.level)}-{String(problem.index).padStart(3, '0')}
            </span>
            {solved && <span className="text-green-400 text-sm">✓ AC済み</span>}
          </div>
          <h1 className="text-xl font-bold">{problem.title}</h1>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 prewrap text-sm leading-relaxed">
          {problem.statement}
        </div>

        <Hints hints={problem.hints} />

        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
          <button onClick={() => setShowAnswer((s) => !s)} className="text-sm text-slate-300 hover:text-white">
            {showAnswer ? '▼ 解説を隠す' : '▶ 解説・模範解答を見る'}
          </button>
          {showAnswer && <div className="mt-3 prewrap text-sm leading-relaxed text-slate-300">{problem.explanation}</div>}
        </div>
      </div>

      {/* 右: エディタ・実行・提出・結果 */}
      <div className="space-y-4">
        {/* 実行エンジン切替: ブラウザ(Pyodide) / サーバー(ローカル判定API) */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-md border border-slate-700 overflow-hidden text-xs">
              <button
                onClick={() => chooseEngine('browser')}
                className={`px-2.5 py-1 ${engineMode === 'browser' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                ブラウザ実行
              </button>
              <button
                onClick={() => chooseEngine('server')}
                className={`px-2.5 py-1 ${engineMode === 'server' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                サーバー実行
              </button>
            </div>
            {engineMode === 'browser' ? (
              <span
                className={`text-xs ${engine === 'ready' ? 'text-green-400' : engine === 'failed' ? 'text-red-400' : 'text-slate-400'}`}
              >
                ● {engineLabel[engine]}
              </span>
            ) : (
              <span
                className={`text-xs ${serverUp === true ? 'text-green-400' : serverUp === false ? 'text-red-400' : 'text-slate-400'}`}
              >
                ● {serverUp === true ? 'サーバー: 接続OK' : serverUp === false ? 'サーバー未起動 (npm run server)' : 'サーバー確認中…'}
              </span>
            )}
          </div>
          <button
            onClick={() => onCodeChange(problem.starterCode)}
            className="text-xs text-slate-400 hover:text-white"
          >
            コードをリセット
          </button>
        </div>
        {engineMode === 'server' && (
          <p className="text-[11px] text-slate-500 -mt-2">
            サーバー実行は重いライブラリ(optuna 等)も可。ローカル開発用で無防備に実行するため外部公開しないこと。
          </p>
        )}

        {/* この問題はサーバー実行が必要(optuna等) */}
        {problem.serverOnly && engineMode === 'browser' && (
          <div className="rounded-lg border border-yellow-700/50 bg-yellow-950/20 p-3 text-sm flex items-center justify-between gap-2 flex-wrap">
            <span className="text-yellow-300">
              ⚠ この問題は <b>サーバー実行</b> が必要です（optuna はブラウザでは動きません）。
            </span>
            <button
              onClick={() => chooseEngine('server')}
              className="rounded bg-yellow-600 hover:bg-yellow-500 text-slate-900 font-semibold px-3 py-1 text-xs"
            >
              サーバー実行に切替
            </button>
          </div>
        )}

        <CodeEditor value={code} onChange={onCodeChange} />

        {/* カスタム入力で実行（挙動の確認） */}
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 space-y-2">
          <div className="text-sm font-semibold">テスト実行（自分の入力で挙動を確認）</div>
          <textarea
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            rows={3}
            placeholder="標準入力に渡す内容"
            className="w-full rounded bg-slate-950 border border-slate-800 p-2 text-sm font-mono"
          />
          <div className="flex gap-2">
            <button
              onClick={runCustom}
              disabled={busy}
              className="rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-50 px-4 py-2 text-sm font-semibold"
            >
              {running ? '実行中…' : '実行'}
            </button>
            <button
              onClick={submit}
              disabled={busy}
              className="rounded bg-green-600 hover:bg-green-500 disabled:opacity-50 px-4 py-2 text-sm font-semibold"
            >
              {judging ? '採点中…' : '提出（全ケース採点）'}
            </button>
          </div>

          {runOutput && (
            <div className="text-sm space-y-2 pt-2">
              <div className="text-xs text-slate-500">
                出力{runOutput.status === 'timeout' ? '（時間切れ）' : runOutput.status === 'error' ? '（エラーあり）' : ''}
              </div>
              <pre className="prewrap text-xs bg-slate-950 rounded p-2">{runOutput.stdout || '(出力なし)'}</pre>
              {runOutput.stderr && (
                <pre className="prewrap text-xs bg-red-950/40 text-red-300 rounded p-2">{runOutput.stderr}</pre>
              )}
            </div>
          )}
        </div>

        {judgeResult && <TestResults result={judgeResult} />}

        {/* 💡 発見：解けたら表示。Pythonの便利機能を1つ知れる */}
        {solved && problem.tip && (
          <div className="rounded-lg border border-yellow-700/50 bg-yellow-950/20 p-4">
            <div className="text-sm font-semibold text-yellow-300 mb-1">発見！</div>
            <div className="prewrap text-sm text-slate-200">{problem.tip}</div>
          </div>
        )}

        {/* レベル全問クリアの演出 */}
        {justCleared && (
          <div className="rounded-lg border border-green-600/60 bg-green-950/30 p-4 text-center">
            <div className="text-3xl mb-1">🎉</div>
            <div className="font-bold text-green-300">{levelLabel(problem.level)} クリア！全問 AC 達成</div>
            {nextLevel ? (
              <Link
                to={`/level/${nextLevel}`}
                className="inline-block mt-3 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-semibold"
              >
                {levelLabel(nextLevel)} が解放！次へ進む →
              </Link>
            ) : (
              <div className="mt-2 text-sm text-slate-300">これが最後のレベル。全制覇おめでとう！</div>
            )}
          </div>
        )}

        {solved && next && (
          <Link
            to={`/problem/${next.id}`}
            className="block text-center rounded bg-slate-800 hover:bg-slate-700 px-4 py-2 text-sm"
          >
            次の問題へ → {next.title}
          </Link>
        )}
      </div>
    </div>
  )
}
