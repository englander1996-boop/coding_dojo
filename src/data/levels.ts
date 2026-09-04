import type { Level } from '../types'

/** How many problems each level is expected to hold. */
export const PROBLEMS_PER_LEVEL = 100

/** The highest level on the ladder. */
export const MAX_LEVEL = 999

/**
 * The curriculum. The ladder runs lv001..lv999; the early rungs are kept
 * CONSECUTIVE and finely stepped so a beginner grows one small concept at a
 * time. Milestone levels (50/100/999) show where the ladder is heading.
 * Add a rung here when you start authoring its 100 problems.
 */
export const LEVELS: Level[] = [
  {
    level: 1,
    title: '超入門帯',
    description: '出力・変数・型・入力・基本演算・文字列の基礎を、1問ごとに違う機能で',
    theory: `【この帯で学ぶ理論：値・型・変数】

■ プログラムは「値」を扱う
Python が扱うデータはすべて「値(value)」で、値には必ず「型(type)」があります。型は「その値が何で、何ができるか」を決めるラベルです。

■ 基本の4つの型
  ・int   整数            例: 0, 42, -7
  ・float 小数(浮動小数点) 例: 3.14, 2.0
  ・str   文字列          例: "hello", 'A'
  ・bool  真偽値          例: True, False

同じ「3」でも、int の 3 と str の "3" は別物です。3 + 4 は 7 ですが、"3" + "4" は "34"（連結）になります。型が違えば演算の意味が変わる——これが型を意識する第一歩です。

■ 変数は「値につけた名札」
  x = 100
は「100 という値に x という名札をつける」操作です。以後 x と書けば 100 を指します。値を計算して名札を付け替えることもできます。

■ 型変換
input() で読んだ値は必ず str です。計算したいときは int("3") や float("3.14") で数値に変換します。逆に数値を文字列とつなぐときは str(42) で文字列にします。

■ 式と評価
3 + 4 のような「式(expression)」は計算されて1つの値になります。比較 3 > 2 は bool 値 True に評価されます。プログラムは「式を評価し、値を作り、変数に束ねる」の繰り返しです。

この帯では、これらの型と基本演算を1つずつ手を動かして確かめます。`,
  },
  { level: 2, title: '変数と代入', description: '値に名前をつけて使い回す' },
  { level: 3, title: '入力と四則演算', description: 'input で受け取り計算して出力する' },
  { level: 4, title: '文字列の操作', description: '連結・繰り返し・長さ・一部取り出し' },
  { level: 5, title: 'if 条件分岐', description: 'if / else で場合分けする' },
  { level: 6, title: '比較と論理演算', description: 'and / or / not と複数条件' },
  { level: 7, title: 'for ループ', description: 'range で決まった回数くり返す' },
  { level: 8, title: 'while ループ', description: '条件が成り立つ間くり返す' },
  { level: 9, title: 'リストの基礎', description: '作成・要素・追加・所属判定' },
  { level: 10, title: 'リスト集計', description: '合計・最大最小・逆順・平均' },
  { level: 11, title: 'タプルとアンパック', description: 'divmod・(a, b)・first, *rest' },
  { level: 12, title: '辞書 dict', description: 'キーと値の対応表・get・items' },
  { level: 13, title: '集合 set', description: '重複除去・積/和集合・高速判定' },
  { level: 15, title: 'enumerate と zip', description: '番号付き・複数列の同時ループ' },
  { level: 20, title: '関数 def', description: '定義・引数・デフォルト引数・*args' },
  { level: 21, title: 'lambda と高階関数', description: 'key=・lambda・filter' },
  { level: 25, title: '便利な構文', description: 'any/all・条件式・walrus・ビット演算' },
  { level: 30, title: '内包表記', description: 'リスト/辞書/ジェネレータ内包表記' },
  { level: 40, title: '例外処理', description: 'try / except でエラーを捌く' },
  { level: 45, title: '文字列メソッド応用', description: 'count・startswith・zfill・format・find' },
  // --- milestones (連続帯の続きは継続作成。到達点を示す里程標) ---
  { level: 50, title: 'ループ応用・集計', description: '二重ループ・累積・FizzBuzz' },
  {
    level: 85,
    title: 'numpy 入門',
    description: '配列・ベクトル演算・内積・argmax（データ分析の主軸）',
    theory: `【この帯で学ぶ理論：numpy と数値計算】

■ numpy 配列(ndarray)
Python のリストと違い、同じ型の数値をぎっしり並べた配列。巨大データでも高速。np.array(リスト) で作る。

■ ベクトル化
a + b、a * 2、np.sqrt(a) のように、配列全体へ一括で演算が走る(要素ごと)。Python の for ループより桁違いに速い。これが numpy の核心。

■ ブロードキャストとマスク
形の違う配列同士も自動で揃えて計算(ブロードキャスト)。a > k は True/False の配列(ブールマスク)になり、a[a > k] で抽出、(a > k).sum() で件数。

■ 集計と位置
.sum()/.mean()/.std()/.max() で集計、.argmax()/.argmin() で最大最小の位置。機械学習で「予測確率が最大のクラス」を選ぶのが argmax。

numpy は数値計算とデータ分析の土台。pandas も内部は numpy です。`,
  },
  {
    level: 95,
    title: 'pandas 入門',
    description: 'Series/DataFrame・groupby・value_counts・sort_values（データ分析の主軸）',
    theory: `【この帯で学ぶ理論：pandas と表形式データ】

データ分析の作業の大半は pandas での「表データ操作」です。

■ Series と DataFrame
  ・Series: ラベル付きの1次元データ(1つの列)。
  ・DataFrame: 行と列からなる表(Excel のシートのイメージ)。

■ 絞り込み(ブール索引)
df[df["age"] >= 20] のように、条件 True の行だけ取り出す。複数条件は df[(A) & (B)]、各条件は括弧で囲む。

■ 集約 groupby
df.groupby("key")["val"].sum() で「キーごとの集計」。SQL の GROUP BY 相当。mean/count/max など何でも集約できる。

■ 並べ替え・頻度
sort_values("col") で列ソート、value_counts() でカテゴリの出現頻度、describe() で要約統計量。

「読み込む → 絞る → 集計する → 並べる」が pandas 分析の基本の流れです。`,
  },
  {
    level: 90,
    title: 'データ分析の基礎(statistics)',
    description: '平均・中央値・最頻値・標準偏差・正規化',
    theory: `【この帯で学ぶ理論：記述統計とデータの前処理】

データ分析の第一歩は、データの分布を数値で掴むこと。

■ 代表値
  ・平均(mean): 合計 ÷ 個数。外れ値に弱い。
  ・中央値(median): 並べた真ん中。外れ値に強い。
  ・最頻値(mode): 最も多い値。カテゴリデータで有用。

■ ばらつき
  ・分散(variance)/標準偏差(stdev): 平均からどれだけ散らばっているか。標準偏差は分散の平方根で、元データと同じ単位。

■ 前処理（スケーリング）
特徴量の大きさを揃えると機械学習がうまく動く。
  ・Min-Max正規化: (x - min) / (max - min) で 0〜1 に。
  ・標準化: (x - 平均) / 標準偏差 で 平均0・分散1 に。

ここでは標準ライブラリ statistics で実装します。実務の大規模データでは numpy / pandas が定番です(本アプリでは今後対応予定)。`,
  },
  {
    level: 60,
    title: 'collections',
    description: 'Counter / defaultdict / deque',
    theory: `【この帯で学ぶ理論：標準ライブラリ collections】

Python の標準ライブラリには「よくある処理を一発で書ける」便利な道具が揃っています。collections はその代表格。

■ Counter — 数える
要素の出現回数を数える辞書の特化版。Counter(リスト) で {要素: 回数} ができ、.most_common(k) で多い順 k 件が取れる。自分で count[x] = count.get(x,0)+1 と書く必要が消える。

■ defaultdict — 欠損キーに既定値
defaultdict(list) は未登録キーへのアクセス時に自動で空リストを作る。グループ分けで「キーが無ければ初期化」の if が不要になる。defaultdict(int) ならカウントに便利。

■ deque — 両端キュー
先頭・末尾どちらの追加/削除も O(1)。リストの先頭挿入 insert(0, x) は O(N) で遅いので、先頭を頻繁にいじるなら deque。BFS のキューの定番。

「車輪の再発明」をやめ、標準ライブラリに乗るのが Pythonらしさです。`,
  },
  { level: 70, title: '便利な標準ライブラリ', description: 'math / itertools / functools / bisect' },
  { level: 80, title: 'もっと標準ライブラリ', description: 're（正規表現）/ datetime / heapq' },
  { level: 105, title: 'pandas 応用', description: 'merge・fillna・one-hot・ビニング（前処理）' },
  {
    level: 110,
    title: '機械学習入門 (scikit-learn)',
    description: '評価指標・標準化・線形回帰・KNN分類',
    theory: `【この帯で学ぶ理論：機械学習の基本フロー】

scikit-learn は Python の機械学習の定番ライブラリ。多くのモデルが同じ作法で使える。

■ fit と predict
  model.fit(X, y)  … 学習データ X(特徴量) と y(正解) からパターンを学ぶ
  model.predict(X) … 新しいデータに対して予測する
この「fit → predict」がすべての土台。

■ 前処理
特徴量のスケールを揃える StandardScaler(標準化) などで精度が安定する。学習データで fit し、テストデータは同じ変換を transform する。

■ 評価指標
  分類: accuracy(正解率) / precision / recall / F1
  回帰: MSE / RMSE / R²
予測がどれだけ良いかを数値化する。

■ 代表的なモデル
線形回帰(直線当てはめ)、k近傍法(近いデータの多数決)、決定木、ランダムフォレストなど。

※ さらに上の最適化(optuna)や PyTorch 系(botorch)は、計算が重く・確率的なため本アプリ(ブラウザ実行)では扱いません。サーバー実行を足せば対応できる将来課題です。`,
  },
  {
    level: 160,
    title: 'ハイパーパラメータ最適化 (グリッドサーチ)',
    description: '候補の総当たりで目的関数を最小化/最大化',
    theory: `【この帯で学ぶ理論：ハイパーパラメータ最適化】

機械学習モデルには「学習率・木の深さ・正則化の強さ」など、人が決める設定(ハイパーパラメータ)がある。これを自動で良い値に探すのが最適化。

■ グリッドサーチ(総当たり)
  1. 目的関数 f(パラメータ) を決める(小さいほど良い、など)。
  2. 各パラメータの候補値リストを用意する。
  3. 全組合せを試して最良(argmin / argmax)を記録する。
  4. 同点の扱い(最小の候補を採る等)を決めておくと結果が一意になる。

■ その先(発展)
  ・ランダムサーチ: 候補が多いとき一様サンプリングで近似する。
  ・ベイズ最適化(optuna 等): 過去の試行から有望な領域を賢く選ぶ。確率的なので再現には seed が要る。
※ optuna や botorch は計算が重くブラウザ(Pyodide)では動かないため、サーバー実行を整備したら導入する将来課題。`,
  },
  {
    level: 115,
    title: '数値計算',
    description: '二分法・ニュートン法・数値積分・微分方程式(オイラー法/RK4)',
    theory: `【この帯で学ぶ理論：数値計算（数値解析）】

解析的に解けない問題を、計算機で「近似的に・反復で」解くのが数値計算。

■ 方程式の数値解（根を求める）
  ・二分法: 符号が変わる区間を半分ずつ詰める。確実だが遅い。
  ・ニュートン法: 接線で次の近似点へ。速いが初期値に注意。√a は x←(x+a/x)/2 の反復で求まる。

■ 数値積分（面積を近似）
  ・台形則: 区間を細かく分け、各区間を台形で近似して足す。
  ・シンプソン則: 放物線で近似。台形則より高精度（区間数は偶数）。

■ 数値微分
  中心差分 (f(x+h)-f(x-h))/(2h) で導関数を近似する。

■ 微分方程式の数値解法
  y' = f(x, y) を初期値から少しずつ進める。
  ・オイラー法: y ← y + h·f。最も素朴。
  ・ルンゲ＝クッタ法(RK4): 4つの傾きの加重平均で進める。高精度の定番。

刻み幅 h を小さくすると精度は上がるが計算量は増える——この「精度と計算量のトレードオフ」が数値計算の核心です。`,
  },
  {
    level: 116,
    title: '線形代数',
    description: '内積・ノルム・行列積・行列式・連立一次方程式',
    theory: `【この帯で学ぶ理論：線形代数の計算】

ベクトルと行列の演算は、データ分析・グラフィックス・物理・機械学習の共通言語。

■ ベクトル
  ・内積 a·b = Σ aᵢbᵢ（スカラー）。直交なら0。
  ・ノルム |a| = √(Σ aᵢ²)（長さ）。
  ・外積（3次元）は両者に垂直なベクトル。

■ 行列
  ・積: (AB)ᵢⱼ = Σ Aᵢₖ Bₖⱼ。順序が重要(AB≠BA)。
  ・行列式: 2×2 は ad−bc、3×3 はサラスの公式。0なら逆行列が存在しない。
  ・トレース: 対角成分の和。

■ 連立一次方程式
  2元 ax+by=e, cx+dy=f はクラメルの公式 x=(ed−bf)/(ad−bc) で解ける。
  一般には掃き出し法(ガウス消去)で解く。

行列の累乗は、フィボナッチの高速計算や状態遷移の繰り返しにも使えます。`,
  },
  {
    level: 117,
    title: '計算量（ランダウ記号）',
    description: '操作回数を数えて O(n)/O(n²)/O(2ⁿ)/O(n!) の差を体感する',
    theory: `【この帯で学ぶ理論：計算量とランダウ記号 O(·)】

アルゴリズムの速さは「実行時間」でなく「入力 n が増えたとき操作回数がどう増えるか」で測る。これを表すのがランダウ記号 O(·)。

■ よく出る増え方（遅い順に速い→遅い）
  O(1) 定数 ＜ O(log n) ＜ O(n) ＜ O(n log n) ＜ O(n²) ＜ O(2ⁿ) ＜ O(n!)

■ 体感するための数え方
  ・線形探索: 最悪 n 回 → O(n)
  ・二分探索: 最悪 ⌊log₂n⌋+1 回 → O(log n)
  ・二重ループ: n² 回 → O(n²)、三重ループ: n³ → O(n³)
  ・全部分集合: 2ⁿ 通り、全順列: n! 通り → 指数・階乗は爆発的

■ なぜ大事か
  n=10⁶ のとき O(n)=10⁶ は一瞬だが、O(n²)=10¹² は現実的でない。O(2ⁿ) は n=60 で宇宙の年齢を超える。だから「全探索で間に合うか、工夫が要るか」を見積もるのに O(·) が要る。

この帯では実際に操作回数を計算して、増え方の違いを数値で実感します。`,
  },
  { level: 100, title: '配列・ソート・探索', description: 'リスト整列と探索の基本' },
  {
    level: 120,
    title: '全探索・累積和',
    description: '全部試す・前計算で区間を高速化',
    theory: `【この帯で学ぶ理論：全探索と前計算】

■ 全探索（brute force）
「ありうる候補を全部試す」最も確実な方法。まず全探索で正解を出せることが大事。2重ループで全ペア、bit全探索で全部分集合(2^N通り)など。計算量が大きいので、解けたら高速化を考える。

■ bit全探索
N個の要素それぞれ「選ぶ/選ばない」を2進数 mask で表す。range(1 << N) で全パターン、mask >> i & 1 で i番目を採用するか判定。N ≤ 20 程度まで。

■ 累積和（prefix sum）
pre[i] = 先頭から i 個の和、を前計算しておくと、区間 [L, R] の和が pre[R+1] - pre[L] で O(1)。区間和クエリが多いときの定番。2次元やimos法へ発展。

「まず全探索 → 必要なら前計算やデータ構造で高速化」が競技プログラミングの王道です。`,
  },
  {
    level: 130,
    title: '数論',
    description: '素数・篩・GCD/LCM・modpow',
    theory: `【この帯で学ぶ理論：整数と数論】

■ 約数と素数
n の約数は √n まで調べれば十分(約数はペアで現れるため)。素数判定は 2〜√n で割り切れないこと。多数の数を判定するならエラトステネスの篩 O(N log log N)。

■ GCD / LCM
最大公約数 gcd と最小公倍数 lcm。lcm(a,b) = a*b // gcd(a,b)。math.gcd / math.lcm が使える。

■ モジュラ演算
大きな数は「ある数 M で割った余り」で扱う。競プロでは答えを 10^9+7 で割る問題が頻出。pow(a, b, M) は a^b を M で割った余りを繰り返し二乗法で高速計算する必須テク。

整数の性質を使うと、巨大な数でも効率よく扱えます。`,
  },
  {
    level: 150,
    title: '頻出パターン',
    description: 'Two Sum・二点ポインタ・窓・スタック',
    theory: `【この帯で学ぶ理論：定番アルゴリズムパターン】

コーディング面接対策で繰り返し登場する「型」を押さえると、多くの問題が解ける。

■ ハッシュ表引き（Two Sum）
辞書/集合で「探したい相手」を O(1) 検索。全探索 O(N²) を O(N) に落とす。

■ 二点ポインタ
ソート済み配列の両端から内側へ寄せる。ペアの和・回文判定などで O(N)。

■ スライディングウィンドウ（しゃくとり法）
連続区間を窓として、ずらすたびに差分だけ更新。区間の和や条件を O(N) で。

■ スタック
「最後に入れたものを最初に出す」。括弧整合・逆ポーランド記法・単調スタックなど。

パターンを「道具箱」として持つと、初見の問題でも当てはめて考えられます。`,
  },
  {
    level: 170,
    title: '頻出パターン2',
    description: 'Fast&Slow循環検出・区間マージ・単調スタック',
  },
  {
    level: 200,
    title: 'クラスとOOP',
    description: 'class / __init__ / 継承 / ダンダー',
    theory: `【この帯で学ぶ理論：オブジェクト指向(OOP)】

■ クラスとインスタンス
クラスは「データ＋振る舞い」をまとめた設計図。そこから作る実体をインスタンスと呼ぶ。Person を設計図に、taro = Person("Taro", 20) が実体。

■ __init__ と self
__init__ はインスタンス生成時に自動で呼ばれる初期化メソッド。self は「そのインスタンス自身」を指し、self.name = name で属性(そのオブジェクトが持つデータ)を設定する。メソッドは必ず第1引数に self を取る。

■ 継承
class Dog(Animal): と書くと Animal の機能を引き継ぎ、必要なメソッドだけ上書き(オーバーライド)できる。共通処理は親に、違いだけ子に。super() で親の処理を呼べる。

■ ダンダーメソッド（特殊メソッド）
__str__, __eq__, __len__, __add__ のような二重アンダースコアのメソッドを定義すると、print(obj) や obj1 == obj2、len(obj)、obj1 + obj2 といった組み込みの動作を自分のクラスにも持たせられる。

OOP は「状態と振る舞いをまとめて、現実の概念をコードで表す」考え方です。`,
  },
  {
    level: 210,
    title: 'ジェネレータと with',
    description: 'yield で値を作る・with で後始末',
    theory: `【この帯で学ぶ理論：遅延評価とコンテキスト管理】

■ ジェネレータ (yield)
return の代わりに yield を使う関数は「ジェネレータ」になる。呼ぶたびに値を1つずつ生み出し、必要になるまで計算しない(遅延評価)。全要素をメモリに置かないので、巨大な列や無限列も扱える。range も実はこの仲間。

■ with 文（コンテキストマネージャ）
with ... as 変数: のブロックは、抜けるときに自動で後始末(close など)をしてくれる。ファイルなら閉じ忘れがなくなる:
  with open("data.txt") as f:
      data = f.read()
ファイル・ロック・DB接続など「使ったら必ず片付けたい資源」に使う。

どちらも「必要なときに・きちんと」を支える Python の洗練された仕組みです。`,
  },
  {
    level: 500,
    title: '再帰・二分探索',
    description: '自分を呼ぶ関数・対数時間の探索',
    theory: `【この帯で学ぶ理論：再帰と分割統治】

■ 再帰
「自分自身を呼び出す関数」。必ず (1)基底ケース＝止まる条件 と (2)再帰ケース＝より小さな問題への呼び出し を持つ。階乗 fact(n)=n*fact(n-1)、基底は fact(1)=1。基底が無いと無限再帰(RecursionError)。

■ メモ化
素朴な再帰は同じ計算を何度もやり指数時間になることがある(フィボナッチ)。一度計算した結果を覚えておく「メモ化」で多項式時間に。@lru_cache を付けるだけで自動メモ化できる。

■ 二分探索
ソート済みデータを毎回半分に絞り込む探索。N 個でも約 log2(N) 回で見つかる(100万個でも約20回)。範囲 [lo, hi] を mid で分け、大小比較で片側を捨てる。標準の bisect モジュールでも使える。

「大きな問題を小さな同じ形の問題に分けて解く」分割統治の考え方が土台です。`,
  },
  {
    level: 700,
    title: '動的計画法 (DP)',
    description: '小さな答えを貯めて大問題を解く',
    theory: `【この帯で学ぶ理論：動的計画法(DP)】

■ DPとは
「小さい部分問題の答えを表(配列)に貯め、それを使って大きい問題を解く」手法。同じ部分問題を二度計算しないので速い。

■ 2つの要素
  1. 状態: dp[i] が「何を表すか」をはっきり決める。例: dp[i] = i 段目までの上り方の数。
  2. 遷移(漸化式): dp[i] を、より小さい dp から求める式。例: dp[i] = dp[i-1] + dp[i-2]。

■ 進め方
基底(dp[0] など)を決め、小さい方から順に表を埋めていく。最後に欲しい dp[n] を答える。

■ よくある型
ナップサック、最長増加部分列、最大連続部分和(Kadane)、経路数え上げ… いずれも「状態」と「遷移」を見抜くのが核心。

DP は競技プログラミング最大の山場。状態と遷移を言葉にできれば半分解けています。`,
  },
  { level: 550, title: '探索と貪欲', description: '貪欲法・バックトラッキング' },
  {
    level: 650,
    title: 'グラフ応用',
    description: 'Union-Find・ダイクストラ・トポロジカルソート',
  },
  { level: 750, title: 'DP応用', description: '0/1ナップサック・編集距離' },
  { level: 800, title: '高度なデータ構造', description: 'Trie・セグメント木' },
  { level: 850, title: '競プロ上級2', description: '転倒数(BIT)・最小全域木・bit DP' },
  {
    level: 600,
    title: 'グラフ探索',
    description: 'BFS / DFS で繋がりをたどる',
    theory: `【この帯で学ぶ理論：グラフと探索】

■ グラフ
「頂点(ノード)」と、それを結ぶ「辺(エッジ)」の集まり。道路網・友人関係・依存関係など「繋がり」は全部グラフで表せる。隣接リスト g[v] = [v に繋がる頂点たち] で持つのが基本。

■ BFS（幅優先探索）
出発点に近い頂点から順に、波が広がるように探索。キュー(deque)と訪問済みフラグで実装。辺の重みが等しいときの最短経路や、連結成分の判定に使う。

■ DFS（深さ優先探索）
行けるところまで深く進み、行き止まりで戻る。再帰かスタックで実装。経路全列挙・閉路検出・トポロジカルソートなどに向く。

■ 訪問済み管理
同じ頂点を二度処理しないよう visited を必ず持つ。これが無いと無限ループになる。

グラフ探索は応用範囲が非常に広く、ダイクストラ法など重み付き最短路へ発展します。`,
  },
  { level: 999, title: '最高峰', description: '各サービスの頂点レベル。アルゴリズムの総合力' },
]

const EXPLICIT_LEVELS = new Map(LEVELS.map((l) => [l.level, l]))

/**
 * レベルのメタ情報を返す。明示定義(LEVELS)が最優先。
 * 未定義でも 1..MAX_LEVEL ならティア名から見出しを自動生成して返す
 * （lv001..lv999 の全段を画面に出すため）。
 */
export function getLevel(level: number): Level | undefined {
  const e = EXPLICIT_LEVELS.get(level)
  if (e) return e
  if (Number.isInteger(level) && level >= 1 && level <= MAX_LEVEL) {
    const tier = tierForLevel(level)
    return {
      level,
      title: `${levelLabel(level)} 練習帯`,
      description: `難易度ティア: ${tier.name}。この段の力試し問題。`,
    }
  }
  return undefined
}

// ===== 横軸: トラック（領域） =====
// 縦軸=レベル(難易度) × 横軸=トラック(領域) の2軸構成。
// 序盤の「基礎」が共通の幹で、そこから各プラットフォーム系に枝分かれする。

export interface Track {
  /**
   * 内部キー。問題の「出自(由来プラットフォーム)」を記録するためのもので、画面には出さない。
   * 表示には label / title を使う。例: 'AtCoder' という出自を、特徴名 label 'アルゴリズム' で見せる。
   */
  id: string
  /** 画面に出す「特徴名」（短いバッジ用）。プラットフォーム名は使わず、領域の特徴で表す。 */
  label: string
  title: string
  description: string
  color: string
  /** このトラックの縦軸(レベル)が始まる位置。基礎を終えてから枝が始まる想定。 */
  startLevel: number
  /** 受講の前提・目安。 */
  prereq: string
}

// startLevel の昇順に並べる（基礎 → データ分析 → コーディング面接 → アルゴリズム）。
// id は出自の記録（内部のみ）。label が学習者に見える特徴名。
export const TRACKS: Track[] = [
  {
    id: '基礎',
    label: '基礎',
    title: 'Python 基礎',
    description: '文法・データ構造・標準ライブラリ・CSの土台',
    color: '#22c55e',
    startLevel: 1,
    prereq: '前提なし。プログラミングが初めてでもここから。',
  },
  {
    id: 'Kaggle',
    label: 'データ分析',
    title: 'データ分析',
    description: 'numpy / pandas / 統計でデータを扱う',
    color: '#06b6d4',
    startLevel: 85,
    prereq: '基礎のリスト・辞書・ループ（〜lv50目安）を終えてから。',
  },
  {
    id: 'LeetCode',
    label: 'コーディング面接',
    title: 'コーディング面接',
    description: '配列・頻出アルゴリズムパターン',
    color: '#eab308',
    startLevel: 100,
    prereq: '基礎の配列操作・ハッシュ（辞書/集合）に慣れてから。',
  },
  {
    id: 'AtCoder',
    label: 'アルゴリズム',
    title: 'アルゴリズム（競技プログラミング）',
    description: '全探索・数論・グラフ・DP（最難）',
    color: '#f97316',
    startLevel: 120,
    prereq: 'アルゴリズムの素地が必要。最後に挑む難関トラック。',
  },
]

/** level → track の対応。未登録は「基礎」。 */
const TRACK_OF: Record<number, string> = {
  85: 'Kaggle',
  90: 'Kaggle',
  95: 'Kaggle',
  105: 'Kaggle',
  110: 'Kaggle',
  160: 'Kaggle',
  100: 'LeetCode',
  150: 'LeetCode',
  120: 'AtCoder',
  130: 'AtCoder',
  170: 'LeetCode',
  550: 'AtCoder',
  850: 'AtCoder',
  600: 'AtCoder',
  650: 'AtCoder',
  700: 'AtCoder',
  750: 'AtCoder',
  800: 'AtCoder',
  999: 'AtCoder',
}

export function trackOfLevel(level: number): string {
  return TRACK_OF[level] ?? '基礎'
}

/** あるレベルの「特徴名」（画面表示用）。出自(プラットフォーム)ではなく領域の特徴を返す。 */
export function trackLabelOfLevel(level: number): string {
  const id = trackOfLevel(level)
  return TRACKS.find((t) => t.id === id)?.label ?? id
}

/** あるトラックに属するレベルを難易度順で返す。 */
export function levelsInTrack(track: string): Level[] {
  return [...LEVELS].filter((l) => trackOfLevel(l.level) === track).sort((a, b) => a.level - b.level)
}

/** AtCoder-style color ramp. Maps a level (1-999) to a tier name + hex. */
export function tierForLevel(level: number): { name: string; color: string } {
  if (level < 5) return { name: 'gray', color: '#9ca3af' }
  if (level < 50) return { name: 'green', color: '#22c55e' }
  if (level < 150) return { name: 'cyan', color: '#06b6d4' }
  if (level < 350) return { name: 'blue', color: '#3b82f6' }
  if (level < 600) return { name: 'yellow', color: '#eab308' }
  if (level < 900) return { name: 'orange', color: '#f97316' }
  return { name: 'red', color: '#ef4444' }
}

/** Zero-padded level label, e.g. 7 -> "lv007". */
export function levelLabel(level: number): string {
  return 'lv' + String(level).padStart(3, '0')
}
