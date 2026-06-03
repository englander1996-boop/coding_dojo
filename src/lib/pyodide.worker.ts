/// <reference lib="webworker" />
// Runs user Python via Pyodide inside a Web Worker so the main thread can
// terminate this worker if the code hangs (used to implement a TLE verdict).

const PYODIDE_VERSION = '0.26.2'
const INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`

let pyodidePromise: Promise<any> | null = null

async function getPyodide(): Promise<any> {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      const mod = await import(/* @vite-ignore */ `${INDEX_URL}pyodide.mjs`)
      return mod.loadPyodide({ indexURL: INDEX_URL })
    })()
  }
  return pyodidePromise
}

// Python harness: redirect stdin/stdout/stderr, exec the user code with a fresh
// global namespace, and stash the outcome in module globals we can read back.
const HARNESS = `
import sys, io, traceback
__rc_out = io.StringIO()
__rc_err = io.StringIO()
__rc_saved = (sys.stdin, sys.stdout, sys.stderr)
sys.stdin = io.StringIO(__stdin_data)
sys.stdout = __rc_out
sys.stderr = __rc_err
__rc_status = 'ok'
__rc_exc = ''
try:
    exec(compile(__user_code, '<solution>', 'exec'), {'__name__': '__main__'})
except SystemExit:
    pass
except BaseException:
    __rc_status = 'error'
    __rc_exc = traceback.format_exc()
finally:
    sys.stdin, sys.stdout, sys.stderr = __rc_saved
__rc_stdout = __rc_out.getvalue()
__rc_stderr = __rc_err.getvalue() + __rc_exc
`

self.onmessage = async (e: MessageEvent) => {
  const msg = e.data
  if (msg.type === 'warmup') {
    try {
      await getPyodide()
      self.postMessage({ type: 'ready' })
    } catch (err) {
      self.postMessage({ type: 'error', error: String(err) })
    }
    return
  }
  if (msg.type === 'run') {
    const { id, code, input } = msg
    try {
      const py = await getPyodide()
      // Auto-load any packages the code imports (numpy, pandas, ...) from the CDN.
      // First run that imports a heavy package pays a one-time download cost.
      try {
        await py.loadPackagesFromImports(code)
      } catch {
        // unknown/unavailable package — let the import raise inside the run
      }
      py.globals.set('__user_code', code)
      py.globals.set('__stdin_data', input ?? '')
      await py.runPythonAsync(HARNESS)
      const status = py.globals.get('__rc_status') as string
      const stdout = py.globals.get('__rc_stdout') as string
      const stderr = py.globals.get('__rc_stderr') as string
      self.postMessage({
        type: 'result',
        id,
        status: status === 'ok' ? 'ok' : 'error',
        stdout: String(stdout ?? ''),
        stderr: String(stderr ?? ''),
      })
    } catch (err) {
      self.postMessage({ type: 'result', id, status: 'error', stdout: '', stderr: String(err) })
    }
  }
}
