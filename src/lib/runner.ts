import PyWorker from './pyodide.worker.ts?worker'

export type RunStatus = 'ok' | 'error' | 'timeout'

export interface RunResult {
  status: RunStatus
  stdout: string
  stderr: string
}

export type EngineStatus = 'idle' | 'loading' | 'ready' | 'failed'

/**
 * Drives the Pyodide worker. Runs are serialized (one at a time). A run that
 * exceeds its timeout terminates the worker — the next run spins up a fresh one
 * (and pays the Pyodide load cost again, which is rare).
 */
class PyRunner {
  private worker: Worker | null = null
  private counter = 0
  private queue: Promise<unknown> = Promise.resolve()
  private _status: EngineStatus = 'idle'
  private listeners = new Set<(s: EngineStatus) => void>()

  get status(): EngineStatus {
    return this._status
  }

  onStatus(cb: (s: EngineStatus) => void): () => void {
    this.listeners.add(cb)
    cb(this._status)
    return () => this.listeners.delete(cb)
  }

  private setStatus(s: EngineStatus) {
    this._status = s
    this.listeners.forEach((cb) => cb(s))
  }

  private ensureWorker(): Worker {
    if (!this.worker) {
      this.worker = new PyWorker()
    }
    return this.worker
  }

  private killWorker() {
    if (this.worker) {
      this.worker.terminate()
      this.worker = null
    }
    this.setStatus('idle')
  }

  /** Begin loading Pyodide in the background. Safe to call repeatedly. */
  warmup() {
    if (this._status === 'loading' || this._status === 'ready') return
    const worker = this.ensureWorker()
    this.setStatus('loading')
    const onMsg = (e: MessageEvent) => {
      if (e.data?.type === 'ready') {
        this.setStatus('ready')
        worker.removeEventListener('message', onMsg)
      } else if (e.data?.type === 'error') {
        this.setStatus('failed')
        worker.removeEventListener('message', onMsg)
      }
    }
    worker.addEventListener('message', onMsg)
    worker.postMessage({ type: 'warmup' })
  }

  /** Run user code once with the given stdin. */
  run(code: string, input: string, timeoutMs = 5000): Promise<RunResult> {
    const task = (): Promise<RunResult> =>
      new Promise<RunResult>((resolve) => {
        const worker = this.ensureWorker()
        if (this._status === 'idle') this.warmup()
        const id = ++this.counter
        let done = false
        const timer = setTimeout(() => {
          if (done) return
          done = true
          worker.removeEventListener('message', onMsg)
          this.killWorker() // frozen run — throw the worker away
          resolve({ status: 'timeout', stdout: '', stderr: '' })
        }, timeoutMs)
        const onMsg = (e: MessageEvent) => {
          const m = e.data
          if (m?.type !== 'result' || m.id !== id || done) return
          done = true
          clearTimeout(timer)
          worker.removeEventListener('message', onMsg)
          resolve({ status: m.status, stdout: m.stdout, stderr: m.stderr })
        }
        worker.addEventListener('message', onMsg)
        worker.postMessage({ type: 'run', id, code, input })
      })

    const result = this.queue.then(task, task)
    this.queue = result.catch(() => {})
    return result
  }
}

/** Shared singleton runner. */
export const runner = new PyRunner()
