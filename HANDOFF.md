# 引き継ぎ書 — Coding Dojo

最終更新: 2026-06-03 / 場所: `Y:\coding_dojo`

このドキュメントだけで開発を引き継げるようにまとめてあります。詳細仕様は `README.md`、**問題を作るときのルールと拡張方針は `AUTHORING.md`** を参照。

---

## 0. 最優先タスク（各レベル2問以上）★進行中 ★ここから読む

**✅ 第1段階達成: 全999段に最低1問（空き段ゼロ）。**
**🔄 第2段階(進行中): 各レベルを2問以上にする。** 方針(ユーザー指示): **AtCoder/LeetCode/Kaggle の上位問題をオリジナル化 → 要素分解して低レベルに問題化**。出典はtipに明記しない(オリジナル問題として出す)。

### 2問化フェーズの進め方(第1段階と同じパイプライン)
1. `node scripts/check-thin.ts` で**2問未満のレベル**を列挙(check-levels の2問版)。
2. `scripts/catalog-tasks{N}.mjs`(次は **catalog-tasks48**)に、その薄いレベルの**2問目**を追記。各レベルの帯テーマに合う「上位問題の要素」を置く。**既存とかぶると `generate.mjs` が止まる**(低レベルの素朴な計算は大体かぶる→より具体的な別計算を選ぶ)。
3. `node scripts/generate.mjs` → 重複/参照解エラーを潰す → ゲート(validate/prereq/tsc/build/catalog)。
4. `node scripts/check-thin.ts` で残数を再確認。1バッチ約49レベル。

### 進捗
- **2問以上達成: 302 / 999 段**(残り **697 段**)。catalog-tasks46〜50 で lv14〜294 に2問目を追加済み。次は **catalog-tasks51** で lv295〜 を進める。
- 残りは lv295〜999 のほぼ全段(高レベルほど別アルゴリズムを要し、かぶり回避が難しい)。
- **コツ**: 素朴な基礎計算は既存とかぶる。各レベルの帯テーマ(下記§6)に合う「やや具体的な別計算」を選ぶとかぶりにくい。1バッチで数件は必ずかぶるので generate→差し替えを2〜3往復する前提で。図形数(三角数/四角数/五角数/四面体数…)は既出多数→中心つき多角数など捻る。

※ 第1段階(全段充足)の経緯・教訓は下記「現状」を参照。

### 現状
- **999 / 999 段が充足（全段完了！）**（`node scripts/check-levels.ts` で「空の段: なし」を確認できる）。
- 充足済み: 既存の手書き帯＋生成で **lv1〜999 の全段**に最低1問。
- **空き段ゼロ達成**。今後は「各レベルを厚くする(1レベル100問へ)」フェーズに移行（後述TODO）。
- 2026-06-03 セッションで lv180 + lv211〜450 の **241段（約240問）** を追加（catalog-tasks27〜34）。DP/グラフ/数論/文字列/幾何/データ構造/ゲーム理論の本物の別問題で、最上級ランク（セグ木・遅延伝播・最大流・最小費用流・SCC・2-SAT・LCA・行列累乗・Aho-Corasick・接尾辞配列・シュタイナー木・行列木定理…）へ至る「前提分解」の踏み段として配置。
- 2026-06-03 セッション続きで **lv451〜499（catalog-tasks35）** / **lv501〜549（catalog-tasks36）** / **lv551〜599（catalog-tasks37）** の計147段を追加。35はZ配列/Manacher/KMP/LCS系DP/数え上げ(分割数・カタラン・ベル・スターリング)/桁DP/ハミルトン路・閉路/SCC・関節点・橋・2部マッチング/木の直径・距離総和/XOR基底・GF(2)階数・行列式・彩色数/凸最大三角形・線分交差。36は二分探索(答えで二分)/分割統治(クイックセレクト・カラツバ・k列マージ)/単調スタック/バックトラック(Nクイーン・m彩色・k等分割・騎士周遊・単語分割)/再帰(4本塔ハノイ・アッカーマン・コラッツ・トリボナッチ)。37は貪欲(区間スケジューリング・会議室・締切ジョブ・ガソリン・矢・SPT完了時刻)/グラフ探索(BFS最短路・グリッド・0-1BFS・多始点・ダイクストラ・ミニマックス/最大ボトルネック・最短路DAG・経由点・最短路本数・トポロジカル・閉路検出)。38はMST(クラスカル・プリム・最大全域木・ボトルネック・座標MST)/木DP(最大独立集合・重み付き)/最短路応用(復元・本数・必須辺・最短路DAG・経由・多目的)/SCC縮約・木の中心/直径/幅。39はフロー(最大流Edmonds-Karp・辺素パス・二部マッチング)/ナップサック族(0-1・無制限・個数制限・双対・部分和可否/通り数)/古典DP(編集距離派生・LCS3列・回文分割/挿入・最大正方形/長方形・カエル跳びEDPC・House Robber・三角形・Kadane派生)/スライディングウィンドウ。**重要教訓**: フロー系の参照解は s==t で増加道長0になり無限ループ→`if s==t: print(0); sys.exit()` のガード必須。generate.mjs が固まったら scripts/probe*.mjs 方式(各refを個別タイムアウト実行)で犯人を特定できる。40は区間DP(風船割り・石併合・多角形分割min/max・棒切り)/株取引DP(k回・クールダウン・手数料)/ゲームDP(両端取り)/桁DP/グリッドDP(落下経路min/max・ダンジョン・最大長方形/正方形総数)/各種(復号数・部分列出現数・タイル張り・封筒入れ子・XOR部分集合・正しい括弧列)。41は累積和/いもす法/2次元累積和/しゃくとり(積<k・k種以下・重複なし最長・和ちょうどk)/ハッシュ集計(アナグラム・最頻・最長連続整数列・ペア和)/転倒数(マージ/BIT)/区間統合/単調デック・スタック(窓最大・株価スパン)/文字列(回文判定・最長共通接頭辞・展開長・単語逆順・繰り返し)。42はセグ木(一点更新×和/最大/最小/XOR/0の数)/遅延伝播(区間加算・代入×和/最小)/BIT(接頭和・区間加算・2本BIT・2次元・順序統計量kth)/Sparse Table(最大/GCD/AND/OR)/単調デック(窓min/max/極差)/単調スタック(部分配列のmin/max/range総和・次に小さい)/Union-Find応用(重み付き・余分辺・隣接行列)/オフライン(区間distinct・値の出現数・k番目)。43は高度数論(totient/トーシェント和/mobius/平方因子なし/素因数個数ω・Ω/floor和/約数和Σ⌊n/i⌋/CRT/拡張ユークリッド/逆元/カタラン・二項・撹乱・スターリング・分割・ベルのmod版/フィボ高速ダブリング/gcd和/互いに素ペア/メルテンス/区間篩/べき乗和Faulhaber/累乗塔)・畳み込み(多項式積/FWHT XOR・AND・OR)・行列累乗(線形漸化式・経路数)・文字列(Manacher計数/相異なる回文/Lyndon/Z和/接頭辞関数和/長さk部分文字列/Booth最小回転/ラン数)・グラフ(ハンガリアン法/最小費用流/DAG最小パス被覆/木パス最大辺)・木(距離k対)・CHT。44(lv901〜949)は高度な数え上げ/ゲーム理論(Wythoff・階段Nim・ミゼール・Grundy)/数論(ルジャンドル・位数・ヤコビ・カーマイケル・Kummer)/グラフ(オイラー閉路Hierholzer・非攻撃ビショップ)/区間DP/卵落とし/正規表現。45(lv900,950,951〜998)で**全999段完成**: Frobenius/各種数列(テトラ・ペル/companion・パドヴァン・ペラン)/凸包面積・凸判定・最大共線点/完全数・友愛・約数系/ファレイ/ピサノ周期/rencontres/ラー/カタラン三角形/推移閉包/ベルマンフォード/木同型(AHU)/プリューファー/括弧の挿入反転/snoob/円・直線・平面の領域数/原始根の個数 など。

### ⭐ 全999段達成（2026-06-03）
**lv001〜999 すべてに最低1問。空き段ゼロ。** 出典は明記せず実在の定番(AtCoder/LeetCode/CSES/古典)をオリジナル化。検証はすべて緑(validate 0 failures / prereq 穴0 / coverage 100% / tsc / build / catalog)。
**重要教訓(再掲)**: フロー等の参照解は s==t やn=1で増加道長0/空入力になり無限ループ・例外を起こしやすい→ガード必須。generate.mjs が固まったら一時的に `scripts/probe{N}.mjs`(各refを個別タイムアウト実行する診断スクリプト)を書いて犯人を特定し、終わったら消す。入力例(ins)の行数は参照解の input() 回数と必ず一致させる(辺数m・頂点数nと実際の行数の不一致がEOFエラーの典型)。

### 続け方（このパイプラインに乗せるだけ）
1. `node scripts/check-levels.ts` で**空き段リスト**を取得。
2. その段の難易度に合う**別計算の問題**を `scripts/catalog-tasks{N}.mjs` に追記（既存の catalog-tasks20〜45 が手本。全段充足後は既存レベルにクラスタを足す(catalog-tasks46〜)。各タスク `{lv, concept, title, tags, io, ask, h1, h2, ref, ins}`）。難しい段ほど難しいアルゴリズムを。
   - **再帰OK**: `再帰` は features.ts で「高度な機能」カテゴリ＝prereq の土台カテゴリ外。よって再帰を使っても prereq の穴にはならない（LCA・SCC・関節点・木DP などは再帰で素直に書いてよい）。深い再帰は `sys.setrecursionlimit` を付ける。
   - **重複の実例**: ①参照解(ref)が既存と完全一致 ②concept 名が完全一致、のどちらかで `generate.mjs` が停止する。「同じ計算量を別アルゴリズムで」（例: 最大流をEdmonds-KarpとDinicの2問）は ref は違っても**答えの量が同じ＝水増し**なので避ける。
   - **重複厳禁**: 参照解(ref)・概念名(concept)が既存とかぶらないこと。`generate.mjs` が自動検出して停止する。
   - **前提を下に**: その問題が使う道具(例: ダイクストラ←heapq, BFS)が、より低い段で既に学べることを意識（言語機能は `npm run prereq` が機械保証）。
3. 新ファイルを `scripts/generate.mjs` の import 一覧に追加（`C{N}` を足して `CATALOG` に展開）。
4. `node scripts/generate.mjs`（参照解をPython一括実行＝期待値自動確定＋重複検出）。
5. ゲート: `node scripts/validate.ts`（0 failures）/ `npm run prereq`（穴0件）/ `tsc -b`＆`npm run build` / `npm run catalog`。
6. `node scripts/check-levels.ts` で充足を再確認。1ターン20〜30段ペースが目安。

### 採点が一意になる問題だけにする（重要）
答えが手法・刻みで変わる問題（微分方程式の解を当てる等）は避けるか、「手法・ステップ数・丸め桁を固定して実装を当てる」形に限定。整数の答え／固定小数／指定アルゴリズムの実装＝採点が一意なものを選ぶ。

---

## 1. これは何か

AtCoder / LeetCode / Kaggle / 初心者向けサービスの「いいとこ取り」をした **Python コード練習サービス**。
ブラウザ（Pyodide）で完結し、必要時のみローカル判定サーバーで重いライブラリも実行できる。

### 現状サマリ（全て検証済み・緑）
- **1486問 / 8265テストケース** — ほぼ全て実Pythonで AC（手書き212 ＋ 生成1274、すべて別計算）
- **lv001〜lv999 の全999段に問題あり（空き段ゼロ達成）**（水増し梯子は撤去。本物の別問題で各段を埋め中。`node scripts/check-levels.ts` で確認）
- `npm run validate` は直近セッションで **0 failures**（optuna も import 可能になっていた）。環境差で optuna が無い場合は lv160（serverOnly）の 9 件が `ModuleNotFoundError: optuna` で落ちるが追加分とは無関係。検証したいなら `py -m pip install optuna`。
- **重複ゲート**: `generate.mjs` が参照解・概念名の重複を検出して停止（問題かぶり厳禁）
- **機能カバレッジ 100%（144/144）**
- **前提の穴 0件**（後述の学習順序保証）
- 型チェック / 本番ビルド OK
- **問題一覧は `PROBLEMS.md`**（`npm run catalog` で自動生成。トラック→レベル→クラスタ→問題で俯瞰できる）

---

## 2. 設計の核（ここが一番大事）

ユーザーと固めた設計原則。**変更時はこれらを壊さないこと。**

1. **2軸構成** — 縦軸＝レベル(難易度 lv001〜999) × 横軸＝トラック(領域)。
   - トラックは開始レベルが違う（基礎を幹に枝分かれ）: 基礎 lv001〜 / Kaggle lv085〜 / LeetCode lv100〜 / AtCoder lv120〜。
2. **1問1学び＋クラスタ** — 各問は新しい機能か新しい組合せを含む。同概念は2〜3問のクラスタで反復。水増し（同じ問題の言い換え）は禁止。
3. **目的＝Pythonのあらゆる機能を使えるように** — 数(99,900)はノルマでなく足場。進捗は **カバー率** で測る。
4. **『そんなコード知らない』をゼロに（前提知識の完全性）** — 難問の解答に要るテクニックは、すべてより前のレベルで学んでいる状態を機械保証（`npm run prereq` が穴0件）。
5. **理論セクション** — 帯ごとに型/アルゴリズムの概念を理屈から（`Level.theory`）。
6. **💡発見** — 各問に便利機能の豆知識（`Problem.tip`）。解いたら表示。
7. **3段階ヒント** — 答えを一気に見せない。
8. **2実行エンジン** — 既定はブラウザ(Pyodide)。`serverOnly` 問題(optuna等)はローカル判定サーバー。

---

## 3. 起動・検証コマンド

```bash
npm install
npm run dev        # フロント開発サーバー
npm run build      # 本番ビルド(dist/)  ※必ず通すこと
npm run server     # ローカル判定APIサーバー(127.0.0.1:8787) optuna等のサーバー実行用

# ---- 3つの検証ゲート（問題を足したら必ず全部緑にする）----
npm run validate   # 全参照解を実Pythonで採点（出題データの正しさ）
npm run coverage   # Python機能カバレッジ（網羅の進捗）
npm run prereq     # 前提知識の穴（学習順序の正しさ）

npm run catalog    # PROBLEMS.md（問題一覧）を再生成。問題を足したら流す

# ---- 問題ジェネレータ（大量の「別計算」問題を量産する仕組み）----
node scripts/generate.mjs   # scripts/catalog-tasks*.mjs のタスクから src/data/problems/generated.ts を生成
                            # 参照解を Python 一括実行(eval_batch.py)して期待値を自動で埋める＝validateは定義上通る
node scripts/ladder.ts      # lv001..999 の空段に「力試し」問題を1問ずつ自動配置 -> src/data/problems/ladder.ts
node scripts/check-levels.ts # 全999段に問題があるか検査
```

> **梯子(ladder)について**: `ladder.ts` は全段カバー保証のためのスキャフォールド(id が `ladder-`)。
> 中身は基礎演算の入力違いで水増し気味。各段に本物のオリジナル問題を足したら、その段の `ladder-` 問題は
> 不要になる（`getLevel` は未定義レベルもティア名で見出しを自動生成するので、LEVELS未登録の段でも表示される）。

> **生成の鉄則（水増し防止）**: 1タスク=1問。同じ計算の数値違いを①②③で量産しない。
> 複数の入力例は「その1問の隠しテストケース」にする。タスクは必ず別の計算(オリジナル)にする。
> `validate.ts` は全参照解を1プロセスで一括実行する方式（数万問でもスケール）。

> **Windows 注意**: `validate` は日本語出力比較のため UTF-8 を強制。
> `$env:PYTHONUTF8=1; npm run validate`
> Node は .ts 直接実行のため 22.18+ 推奨。`py`(Python) に numpy/pandas/scikit-learn/optuna が必要（このPCには導入済み）。

検証は TypeScript の型チェックも忘れず: `node ./node_modules/typescript/bin/tsc -b`（`npx tsc` は別物を拾うので不可）。

---

## 4. アーキテクチャ / 主要ファイル

- フロント: React + Vite + TypeScript + Tailwind + Monaco。ルーティングは HashRouter。
- 実行: `src/lib/pyodide.worker.ts`（Web Worker で Pyodide、import からパッケージ自動ロード）。`runner.ts`(制御) → `grader.ts`(全ケース採点)。
- サーバー実行: `server/judge.mjs`（Node標準のみ・依存ゼロ。`/run` `/judge` `/health`）↔ `src/lib/serverRunner.ts`。
- データ: `src/types.ts`（Problem/Level/Track 型）, `src/data/levels.ts`（レベル/トラック/前提色/theory）, `src/data/index.ts`（全問題集約）, `src/data/features.ts`（機能カタログ＋カバレッジ/前提チェックのロジック）。
- 問題: `src/data/problems/*.ts`（`_build.ts` の `build(level, prefix, specs)` で簡潔に書く）。複数レベルにまたがる追加バッチは `expand1.ts` のように1ファイルにまとめ、build の prefix を `lv003x` 等にして既存 id と衝突させない（同一レベルに別ファイル由来の問題が来ても id がユニークなら可）。
- 検証スクリプト: `scripts/validate.ts`（全参照解を Python 一括実行で採点）/ `coverage.ts` / `prereq.ts` / `catalog.ts`（一覧生成）。
- 生成スクリプト: `scripts/generate.mjs`（タスク→問題）＋ `scripts/catalog-tasks*.mjs`（タスク定義）＋ `scripts/eval_batch.py`（参照解の一括実行器）。出力 `src/data/problems/generated.ts`。
- 画面: `pages/Home`(学習マップ) / `LevelPage` / `ProblemPage`(実行エンジン切替) / `Achievements`(実績・ランク) / `SelfCheck` / `Coverage` / `Prereq`。

### ゲーム性(2026-06-03 追加)
- **ローカルプロフィール**: バックエンド無し。`src/lib/progress.ts` がプロフィール(複数・切替・エクスポート/インポート)を localStorage に保持し、進捗(解いた問題ID)・コード下書き・解いた日付を**プロフィールごとに名前空間分離**(`cd:<id>:solved` 等)。旧 `code-dojo:solved` は初回に default プロフィールへ自動移行。`useProgressVersion()` で React に変更通知。
- **ゲート(解放条件)**: `src/lib/gameplay.ts` の純粋関数群。**クリア=そのレベルの全問AC**、**解放=より下の出題済みレベルが全てクリア**(`isLevelCleared`/`isLevelUnlocked`)。lv1 は常に解放。Home はロックレベルを淡色＋🔒で非リンク化、`LevelPage`/`ProblemPage` はロックガードで弾く。
- **やる気要素**: XP(問題の想定行数→星1〜5×10)とランク称号(`RANKS`)、連続記録ストリーク、バッジ実績(`ACHIEVEMENTS`)、Home/`Achievements` の「次に挑むレベル(frontier)」CTA、全問クリア時の祝福＋次レベル解放演出。ヘッダ右の `ProfileBar` が称号/XP/ストリーク/プロフィール切替を担う。
- 追加/変更ファイル: `src/lib/progress.ts`(刷新), `src/lib/gameplay.ts`(新規), `src/components/ProfileBar.tsx`(新規), `src/pages/Achievements.tsx`(新規), `Home.tsx`/`LevelPage.tsx`/`ProblemPage.tsx`/`App.tsx`/`main.tsx`(配線)。型チェック・本番ビルドとも緑。

**重要**: 問題ファイルを新規追加したら **3か所** に登録する:
1. `src/data/index.ts` の `ALL_PROBLEMS`
2. `scripts/validate.ts` の `ALL_PROBLEMS`
3. `src/data/levels.ts` の `LEVELS`（メタ）＋必要なら `TRACK_OF`（トラック割当）

---

## 5. 問題の追加手順

1. `src/data/problems/xxx.ts` に `build(level, 'lvNNN', [ ...specs ])` で問題を書く。
   - 各 spec 必須: `title` / `concept`(クラスタ名) / `tags` / `statement` / `hints`(3つ) / `explanation` / `reference`(参照解=既知の正解) / `cases`(`sample:true`を最低1つ)
   - 任意: `starter` / `tip`(💡) / `serverOnly`(optuna等)
2. 上記「3か所」に登録。
3. **3ゲートを緑に**: `npm run validate`（AC）→ `npm run coverage`（新機能が✓）→ `npm run prereq`（穴を増やしてない）。型チェック＆ビルドも。
4. 出力はバージョン差で揺れないように: スカラー / 小数は `f"{x:.2f}"` 等で固定 / numpy配列は `.tolist()` / pandas は sorted・round して出す。

### 前提の穴が出たら
`prereq` が「応用問題が土台機能を初出させている」と言ったら、その機能を **より前のレベルで先に教えるレッスン**を `src/data/problems/lessons.ts` に追加する（例: break→lv007, setdefault→lv012, float('inf')→lv025, 2次元リスト→lv030, list.pop→lv009）。または参照解を既習の書き方に置換（例: `reversed(a)`→`a[::-1]`）。

---

## 6. 収録トラック / レベル

- **基礎**: 001 超入門 / 002-008 / 009-013 データ構造 / 011 タプル / 015 enumerate・zip / 020-021 関数・lambda / 025 便利構文 / 030 内包表記 / 040 例外 / 045 文字列メソッド / 050 ループ応用 / 060 collections / 070-080 標準ライブラリ / 200 クラス / 210 ジェネレータ・with / 500 再帰・二分探索
- **Kaggle**: 085 numpy / 090 統計 / 095 pandas / 105 pandas応用(merge/fillna/onehot/cut) / 110 scikit-learn / 160 optuna(serverOnly)
- **LeetCode**: 100 配列 / 150 頻出パターン / 170 頻出パターン2(循環検出/区間マージ/単調スタック)
- **AtCoder**: 120 全探索・累積和 / 130 数論 / 550 貪欲・バックトラッキング / 600 グラフ探索 / 650 グラフ応用 / 700 DP / 750 DP応用 / 800 高度なデータ構造 / 850 競プロ上級2(転倒数BIT/MST/bitDP) / 999 最高峰

各レベルは現状1〜28問。最終目標は1レベル=100問（クラスタを足して厚くする）。

---

## 7. 環境メモ（このPC）

- ✅ あり: Node 24 / Python 3.14（numpy 2.4 / pandas 3.0 / scikit-learn 1.8 / optuna 4.8）
- ❌ なし: Docker / gcc・g++ / Java / PyTorch(torch)

サーバー実行 `server/judge.mjs` は **サンドボックス無し＝ローカル開発専用**。`127.0.0.1` のみ待受、**外部公開しないこと**。

---

## 8. 今後の TODO（優先度順の候補）

1. **各レベルを100問へ** — クラスタを足して反復を厚く。足すたびに3ゲートを緑に保つ。
2. **Docker サンドボックスのサーバー実行** — C++ / Java / PyTorch / botorch を解禁（要 Docker＋各イメージ）。`server/judge.mjs` の executor を言語別に差し替えられる設計で拡張する。
3. **PyTorch 入門トラック**（torch 導入後、サーバー実行前提）。
4. **新トラック候補** — SQL / 正規表現特化 / Web など。
5. **カバレッジ粒度UP** — イディオムをさらに細かく登録し「未習ゼロ」をより厳密に追う。

---

## 9. 既知の制約・注意

- ブラウザ実行とサーバー実行で Python/ライブラリのバージョンが違う。pandas/numpy/sklearn 問題は出力を丸める等で吸収しているが、新規追加時は両環境で揺れない出力にする。
- `serverOnly`(optuna) はブラウザのセルフチェック対象外（`npm run validate` のローカル py で検証）。
- `levels.ts` のブロック編集はヘッダ差し替えで `{` 重複を作りやすい。編集後 `grep "level: N"` で重複確認。
- Home/LevelPage は LEVELS を level 昇順ソートして表示（配列順は不問）。
