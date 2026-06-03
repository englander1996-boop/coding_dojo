// ---- Core domain types ----------------------------------------------------

/** A single graded test case. The user's program is run with `input` fed to
 *  stdin, and its stdout is compared against `expected`. */
export interface TestCase {
  /** stdin given to the program (may be empty). */
  input: string
  /** Expected stdout. Compared after trailing-whitespace normalization. */
  expected: string
  /** If true this case is shown to the user as an example; otherwise hidden. */
  sample?: boolean
}

/** One coding problem. Many of these belong to a single level. */
export interface Problem {
  /** Globally unique id, e.g. "lv001-007". */
  id: string
  /** Level this problem belongs to (1-999). */
  level: number
  /** Index within the level (1-100). */
  index: number
  /** Short title. */
  title: string
  /** Markdown-ish statement (plain text with newlines is fine). */
  statement: string
  /** Topic tags, LeetCode-style ("string", "loop", "dp", ...). */
  tags: string[]
  /**
   * Name of the sub-concept this problem drills (e.g. "算術演算子", "二分探索").
   * Problems sharing a concept form a small cluster (~2-3) of similar problems
   * for reinforcement, and are grouped together in the UI.
   */
  concept: string
  /** Code prefilled into the editor when the problem opens. */
  starterCode: string
  /** Progressive hints, revealed one at a time. */
  hints: string[]
  /** Full explanation / model answer, shown after solving (or on demand). */
  explanation: string
  /** Graded test cases. At least one should be `sample: true`. */
  testCases: TestCase[]
  /**
   * Reference solution (a known-correct program). Not shown to the user; used by
   * the self-check tool to verify that every test case's `expected` is actually
   * correct — i.e. that the problem's answer data isn't broken.
   */
  reference: string
  /**
   * 「💡 発見」豆知識。Python の便利なモジュールや書き方を1つ紹介し、
   * 「こんな機能あるのか！」という驚きと発見を与える。解答後に表示する。
   */
  tip?: string
  /**
   * サーバー実行(ローカル判定API)が必要な問題。ブラウザ(Pyodide)に無い重いライブラリ
   * (optuna 等)を使う。true のとき UI はサーバー実行への切替を促し、ブラウザ専用の
   * セルフチェックからは除外する。
   */
  serverOnly?: boolean
}

/** Metadata describing a level (a rung on the lv001..lv999 ladder). */
export interface Level {
  /** 1-999. */
  level: number
  /** Display title, e.g. "はじめての出力". */
  title: string
  /** One-line description of what this level trains. */
  description: string
  /**
   * 理論セクション。この帯で扱う「型」や「アルゴリズム」の概念を、問題を解く前に
   * 理屈から学べるよう説明する文章（プレーンテキスト、改行可）。
   */
  theory?: string
}
