# 🥋 Coding Dojo — lv001〜lv999 Python練習サービス

AtCoder（難易度別・丁寧な解説）／ LeetCode（トピック別・進捗管理）／ 初心者向けサービス（ブラウザ実行・段階ヒント）／ Kaggle（データ分析）の **いいとこ取り** をした、Python のコード練習問題集。

基本はブラウザだけで完結（静的サイトとして無料ホスティング可）。重いライブラリを使うときだけ、任意で **ローカル判定サーバー** を立てて実行できます。

---

## ✨ コンセプト

- **2軸構成** — **縦軸＝レベル（難易度 lv001〜999）× 横軸＝トラック（領域）**。基礎を幹に、Kaggle / LeetCode / AtCoder へ枝分かれするスキルツリー型。
- **目的＝Python のあらゆる機能を使えるようになる** — 各帯が機能を体系的にカバー。問題は「1問1学び」、ただし1概念につき2〜3問のクラスタ（反復）で定着。
- **『そんなコード知らない』をゼロに（前提知識の完全性）** — 難問の解答に必要なテクニックは、すべてより前のレベルで学んでいる状態を **機械チェックで保証**（前提の穴 0件）。
- **理論から学べる** — 各帯に「📖 理論セクション」を用意し、型やアルゴリズムの概念を理屈から解説。
- **💡 発見の喜び** — 各問に「こんな便利な機能/モジュールがあるのか！」という豆知識（`divmod` / `bisect` / `Counter` / f-string 書式 / スライス術 など）。
- **3段階ヒント** — いきなり答えを見せず、ヒント1 → 2 → 3 と段階的に開示。
- **2つの実行エンジン** — 既定は [Pyodide](https://pyodide.org/)（WebAssembly）でブラウザ完結。必要なら optuna 等のためにサーバー実行へ切替。

### トラックと開始レベル

| トラック | 開始 | 内容 |
|----|------|------|
| 🟢 **Python 基礎** | lv001〜 | 文法・データ構造・標準ライブラリ・CSの土台（前提なし） |
| 🔵 **Kaggle（データ分析）** | lv085〜 | numpy / 統計 / pandas / scikit-learn / optuna |
| 🟡 **LeetCode（面接）** | lv100〜 | 配列・Two Sum・二点ポインタ・窓・スタック・アナグラム |
| 🟠 **AtCoder（競プロ）** | lv120〜 | 全探索・累積和・数論・グラフ・DP・上級DS・最高峰（最難） |

---

## 🎮 機能

| 機能 | 説明 |
|------|------|
| **コードエディタ** | Monaco Editor（VS Code 同等。シンタックスハイライト付き） |
| **テスト実行** | 自分で入力を打ち込み、出力・エラーを目視確認（解答側の確認） |
| **提出（全ケース採点）** | サンプル＋隠しケースを **全部** 走らせて `AC` / `WA` / `RE` / `TLE` を判定（AtCoder方式） |
| **TLE（時間切れ）判定** | Pyodide を Web Worker で実行し、無限ループはワーカーを terminate して検出 |
| **実行エンジン切替** | 問題ページ右上で **ブラウザ実行 / サーバー実行** を切替 |
| **3段階ヒント / 解説 / 💡発見** | 段階開示・模範解答・便利機能の豆知識 |
| **学習マップ** | トラック×レベルの2軸ビュー（開始レベル・前提・進捗バー付き） |
| **問題セルフチェック** | 各問題の参照解を全ケースに通し、**正解データ自体が正しいか** を検証（出題側の検証） |
| **機能カバレッジ** | Python の機能/ライブラリを問題が網羅できているかを ✓/✗ で可視化（現在 100%） |
| **前提チェック** | 応用問題が「より前で教わっていない言語機能」を初出させていないか検査（現在 穴 0件） |
| **進捗の保存** | 解いた問題（AC）とコードの下書き・エンジン選択を localStorage に保存。ログイン不要 |

### 採点の仕組み（ジャッジ）

出力は競技プログラミングのジャッジと同じく正規化して比較します：

- 改行コードを統一（`\r\n` / `\r` → `\n`）
- 各行の末尾の空白・タブを無視 / 末尾の余分な空行を無視

判定の優先度: 全ケース通過なら **AC**、そうでなければ最初に失敗したケースの種別（**WA** / **RE** / **TLE**）。

---

## 🚀 セットアップ

必要環境: Node.js 18+（`npm run validate` / `coverage` / `prereq` は .ts を直接実行するため Node 22.18+ 推奨）。`validate` は実行に Python（`py` / `python`）が要り、データ分析系の検証には numpy / pandas / scikit-learn / optuna が必要。

```bash
npm install        # 依存をインストール
npm run dev        # 開発サーバー（http://localhost:5173/ など）
npm run build      # 本番ビルド → dist/
npm run preview    # 本番ビルドをローカルで確認
npm run validate   # 全問題の参照解をローカルの Python で検証
npm run coverage   # Python機能カバレッジを表示
npm run prereq     # 前提知識の穴チェック（『そんなコード知らない』をゼロに）
npm run server     # ローカル判定APIサーバー (http://127.0.0.1:8787)
```

### 実行エンジン（2モード）

問題ページ右上で切替できます。

- **ブラウザ実行（Pyodide）**: 既定。サーバー不要。`numpy` / `pandas` / `scikit-learn` は import から自動ロード（初回のみCDNからDL）。
- **サーバー実行（ローカル判定API）**: `npm run server` で起動。このPCの Python をサブプロセス実行するので、**optuna など重い/ブラウザに無いライブラリ**も動く。`serverOnly` の問題（optuna 等）はこちらが必要。
  - ⚠ 開発用。コードを無防備に実行するため `127.0.0.1` のみで待ち受け、**外部公開しないこと**。公開・複数ユーザーには Docker サンドボックス化が必要（C++/Java/PyTorch/botorch もそこで対応可能）。

> **Windows で `npm run validate` を使う場合**: 日本語出力を正しく比較するため UTF-8 を強制してください。
> ```powershell
> $env:PYTHONUTF8=1; npm run validate
> ```

---

## 📁 プロジェクト構成

```
src/
├─ main.tsx                  ルーティング（HashRouter）
├─ App.tsx                   レイアウト＋ヘッダー（各ツールへのナビ）
├─ types.ts                  Problem / TestCase / Level / Track 型
├─ data/
│  ├─ levels.ts              レベル/トラックのメタ情報・難易度カラー・前提マップ
│  ├─ index.ts               全問題の集約・検索ヘルパー
│  ├─ features.ts            機能カタログ＋カバレッジ／前提チェックのロジック
│  └─ problems/
│     ├─ _build.ts           問題ビルダー（id/index自動採番）
│     ├─ lv001.ts            超入門帯（出力・変数・型・文字列…）
│     ├─ others.ts           lv002〜008・050・100・999
│     ├─ midlevels.ts        データ構造・関数・内包表記・例外（lv009〜040）
│     ├─ liblevels.ts        collections / 標準ライブラリ（lv060・070）
│     ├─ gaps.ts             tuple/strip/re/datetime/heapq/with/yield/BFS 等
│     ├─ platforms.ts        便利構文・文字列・統計・全探索・数論・LeetCode頻出
│     ├─ datascience.ts      numpy（lv085）/ pandas（lv095）
│     ├─ ml.ts               scikit-learn 機械学習入門（lv110）
│     ├─ optuna.ts           optuna ハイパラ最適化（lv160・serverOnly）
│     ├─ advalgos.ts         貪欲/UnionFind/ダイクストラ/DP/Trie/セグ木（lv550〜800）
│     └─ lessons.ts          前提を先に教える補完レッスン（break/setdefault/inf/2次元）
├─ lib/
│  ├─ pyodide.worker.ts      Pyodide を動かす Web Worker（import から自動パッケージロード）
│  ├─ runner.ts              ワーカー制御（直列実行・タイムアウト）
│  ├─ grader.ts              全ケース採点・出力正規化・AC/WA/RE/TLE
│  ├─ difficulty.ts          参照解の行数から難易度の目安（帯の中の並び順）
│  ├─ serverRunner.ts        ローカル判定APIクライアント
│  └─ progress.ts            localStorage（解答済み・コード下書き）
├─ components/                CodeEditor / Hints / TestResults
└─ pages/
   ├─ Home.tsx               学習マップ（トラック×レベル）
   ├─ LevelPage.tsx          レベル内の問題（概念クラスタ・理論セクション）
   ├─ ProblemPage.tsx        問題を解く画面（実行エンジン切替・💡発見）
   ├─ SelfCheck.tsx          問題セルフチェック
   ├─ Coverage.tsx           機能カバレッジ
   └─ Prereq.tsx             前提チェック
server/
└─ judge.mjs                 ローカル判定APIサーバー（Node標準のみ・依存ゼロ）
scripts/
├─ validate.ts               全問題の参照解を実Pythonで検証
├─ coverage.ts               機能カバレッジを印字
└─ prereq.ts                 前提知識の穴を印字
```

---

## ➕ 問題を追加する

1. **レベルを追加** — `src/data/levels.ts` の `LEVELS` に追加（必要なら `TRACK_OF` でトラック割当、`theory` で理論）。
2. **問題を追加** — `src/data/problems/*.ts` に `Problem` を追加（多くは `_build.ts` の `build()` で簡潔に書ける）。主なフィールド:
   - 必須: `id` / `level` / `index` / `title` / `statement` / `tags` / `concept`（クラスタ名）/ `starterCode` / `hints`（3つ推奨）/ `explanation` / `testCases`（`sample:true` を最低1つ）/ `reference`（**参照解＝既知の正解コード**）
   - 任意: `tip`（💡発見）/ `serverOnly`（optuna 等サーバー実行が要る問題）
3. **検証** — 追加後に必ず:
   ```bash
   npm run validate   # 参照解が全ケース AC か（出題データの正しさ）
   npm run coverage   # 新機能がカバレッジに反映されたか
   npm run prereq     # 前提の穴を増やしていないか（応用問題が未習機能を初出させていないか）
   ```

> `reference` で「正解データの正しさ」を、`prereq` で「学習順序の正しさ」を機械的に保証できます。

---

## 🌐 デプロイ

フロントは完全な静的サイト。`npm run build` の `dist/` をそのまま配信できます。

- **Vercel / Netlify / Cloudflare Pages** — ビルド `npm run build`、出力 `dist`
- **GitHub Pages** — `dist/` を公開。ルーティングは HashRouter（`#/...`）なのでサーバー設定不要

Pyodide 本体・numpy/pandas/sklearn は実行時に jsDelivr CDN から読み込み（初回のみ）。
サーバー実行（optuna 等）は静的ホスティングでは使えません（ローカルの `npm run server`、または別途バックエンドが必要）。

---

## 🛠 技術スタック

- **React 18 + Vite 5 + TypeScript** / **Tailwind CSS**
- **Monaco Editor** — コードエディタ
- **Pyodide**（WebAssembly）— ブラウザ内 Python 実行。Web Worker で TLE 対応、import からパッケージ自動ロード
- **React Router**（HashRouter）
- **Node（標準モジュールのみ）** — ローカル判定APIサーバー（依存ゼロ）
- 検証/採点で使う Python: numpy / pandas / scikit-learn / optuna

---

## 📌 現状とこれから

### 規模（全て検証済み）
- **176問 / 486テストケース** — 全て実Pythonで AC（numpy/pandas/sklearn/optuna 含む）
- 機能カバレッジ **100%（132/132）** — print から DP・グラフ・機械学習・ハイパラ最適化まで
- 前提の穴 **0件** — どの問題も必要知識を先に学べる学習順序を保証

### 収録レベル（抜粋）
- 基礎: lv001 超入門 / 002-008 / 009-013 データ構造 / 011 タプル / 015 enumerate・zip / 020-021 関数・lambda / 025 便利構文 / 030 内包表記 / 040 例外 / 045 文字列メソッド / 050 ループ応用 / 060 collections / 070-080 標準ライブラリ / 100 配列 / 200 クラス / 210 ジェネレータ・with / 500 再帰・二分探索
- Kaggle: lv085 numpy / 090 統計 / 095 pandas / 105 pandas応用 / 110 scikit-learn / 160 optuna（サーバー実行）
- LeetCode: lv100 配列 / 150 頻出パターン / 170 頻出パターン2
- AtCoder: lv120 全探索・累積和 / 130 数論 / 550 貪欲・バックトラッキング / 600 グラフ探索 / 650 グラフ応用 / 700 DP / 750 DP応用 / 800 高度なデータ構造 / 850 競プロ上級2 / 999 最高峰

### これから
- 各レベルを100問までクラスタ追加（カバレッジ100%・前提0件を維持しつつ反復を厚く）
- Docker サンドボックスのサーバー実行（C++ / Java / PyTorch / botorch 解禁）
- PyTorch 入門トラック（torch 導入後）
