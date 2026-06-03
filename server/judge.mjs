// ローカル実行の判定APIサーバー（依存なし・Node標準のみ）。
//
// ⚠ セキュリティ: これは「自分のPCで使う」開発用サーバーです。受け取ったコードを
//   サブプロセスで“そのまま”実行します（サンドボックス無し）。127.0.0.1 のみで待ち受け、
//   外部公開しないでください。公開や複数ユーザー運用には Docker サンドボックス化が必須。
//
// 起動: npm run server  （または node server/judge.mjs）
// 言語: 現状 Python（環境変数 DOJO_PYTHON で実行コマンド変更、既定 "py"）。

import { createServer } from 'node:http'
import { spawn } from 'node:child_process'
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const PORT = Number(process.env.DOJO_PORT || 8787)
const HOST = '127.0.0.1'
const PYTHON = process.env.DOJO_PYTHON || 'py'
const DEFAULT_TIMEOUT = 10000
const MAX_TIMEOUT = 30000

/** 競技ジャッジ流の出力正規化（改行統一・行末空白除去・末尾空行除去）。 */
function normalize(s) {
  return s
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .map((l) => l.replace(/[ \t]+$/, ''))
    .join('\n')
    .replace(/\n+$/, '')
}

/** Python を1回実行する。{status, stdout, stderr} を返す。 */
function runPython(code, input, timeoutMs) {
  return new Promise((resolve) => {
    const dir = mkdtempSync(join(tmpdir(), 'dojo-srv-'))
    const file = join(dir, 'sol.py')
    writeFileSync(file, code)
    const child = spawn(PYTHON, [file], {
      env: { ...process.env, PYTHONUTF8: '1', PYTHONIOENCODING: 'utf-8' },
      windowsHide: true,
    })
    let stdout = ''
    let stderr = ''
    let done = false
    const finish = (status) => {
      if (done) return
      done = true
      clearTimeout(timer)
      try {
        rmSync(dir, { recursive: true, force: true })
      } catch {}
      resolve({ status, stdout, stderr })
    }
    const timer = setTimeout(() => {
      child.kill('SIGKILL')
      finish('timeout')
    }, Math.min(timeoutMs, MAX_TIMEOUT))

    child.stdout.on('data', (d) => (stdout += d.toString()))
    child.stderr.on('data', (d) => (stderr += d.toString()))
    child.on('error', (e) => {
      stderr += String(e)
      finish('error')
    })
    child.on('close', (codeNum) => finish(codeNum === 0 ? 'ok' : 'error'))
    if (input) child.stdin.write(input)
    child.stdin.end()
  })
}

/** 全テストケースを判定（AtCoder方式）。 */
async function judge(code, cases, timeoutMs) {
  const results = []
  let overall = 'AC'
  for (let i = 0; i < cases.length; i++) {
    const tc = cases[i]
    const r = await runPython(code, tc.input ?? '', timeoutMs)
    let verdict
    if (r.status === 'timeout') verdict = 'TLE'
    else if (r.status === 'error') verdict = 'RE'
    else verdict = normalize(r.stdout) === normalize(tc.expected) ? 'AC' : 'WA'
    results.push({
      index: i,
      verdict,
      input: tc.input ?? '',
      expected: tc.expected,
      got: r.stdout,
      stderr: r.stderr,
      sample: !!tc.sample,
    })
    if (verdict !== 'AC' && overall === 'AC') overall = verdict
  }
  const passed = results.filter((c) => c.verdict === 'AC').length
  return { verdict: passed === cases.length ? 'AC' : overall, passed, total: cases.length, cases: results }
}

function send(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  })
  res.end(JSON.stringify(body))
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (c) => {
      data += c
      if (data.length > 5_000_000) reject(new Error('payload too large'))
    })
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {})
      } catch (e) {
        reject(e)
      }
    })
  })
}

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, {})
  if (req.method === 'GET' && req.url === '/health') return send(res, 200, { ok: true, python: PYTHON })

  try {
    if (req.method === 'POST' && req.url === '/run') {
      const { code, input, timeoutMs } = await readBody(req)
      const r = await runPython(String(code ?? ''), String(input ?? ''), timeoutMs || DEFAULT_TIMEOUT)
      return send(res, 200, r)
    }
    if (req.method === 'POST' && req.url === '/judge') {
      const { code, cases, timeoutMs } = await readBody(req)
      if (!Array.isArray(cases)) return send(res, 400, { error: 'cases[] required' })
      const result = await judge(String(code ?? ''), cases, timeoutMs || DEFAULT_TIMEOUT)
      return send(res, 200, result)
    }
    send(res, 404, { error: 'not found' })
  } catch (e) {
    send(res, 500, { error: String(e) })
  }
})

server.listen(PORT, HOST, () => {
  console.log(`[code-dojo] judge server: http://${HOST}:${PORT}  (python: ${PYTHON})`)
  console.log('  ⚠ ローカル開発用。コードを無防備に実行します。外部公開しないこと。')
})
