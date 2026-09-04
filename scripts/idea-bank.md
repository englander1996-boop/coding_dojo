# 問題アイデアバンク

出典: CSES Problem Set / CodeAbbey / Project Euler / Rosetta系 の探索(2026-09-03)。
**使い方**: バッチ設計時にここから拾い、必ず concepts/titles の同義語grepで最終確認してから採用する。採用したら行頭を `[済C##]` にする。ボツ(既出判明)は `[既出]` を付けて残す(再調査防止)。

## シミュレーション・ゲーム判定(最も手薄なドメイン)
- [済C102] ヒット&ブロー(Bulls and Cows)の判定: 正解と予想からヒット数とブロー数
- じゃんけん複数ラウンドの集計(グーチョキパー、あいこ処理)
- [済C107] ブラックジャックの手札点数(Aは1か11の有利な方、バーストは0扱い等)
- [済C103] サイコロ5個の役判定(ヤッツィー風: ファイブカード/フォー/フルハウス/ストレート等)
- [済C103] 2048の1行を左に寄せる(合体は1回まで)
- [済C103] マインスイーパの数字盤生成(地雷配置から各マスの数字)
- [済C105] ビンゴカードの当たり判定(マークされたマスでラインが揃うか)
- [済C102] SETカードゲームの3枚成立判定(各属性が全部同じか全部違う)
- [済C103] ハングマンの表示状態(当てた文字だけ見せて残りは_)
- [済C107] ラングトンのアリをkステップ
- [済C104] ハノイの手順の検証(合法手順か: 大きい円盤を小さい上に置かない)
- [済C107] 三目並べの合法局面判定(手数の整合・二重勝ちなし)
- [済C103] サッカーの勝ち点表(試合結果から勝ち点・得失点差で順位)
- [済C103] イロレーティングの更新(1試合後の両者のレート、K係数)
- [既出:ヒットとブロー] マスターマインドの応答生成
- [済C103] ビリヤードの反射(長方形台での軌跡・ポケット到達)
- [済C103] 跳ねるボールのステップ数(CSES Bouncing Ball)
- [済C104] チェス: ポーンの合法手判定 / キング+ルークで詰みか / e4形式の座標パース
- [既出系] すごろくシム(出目どおり・跳ね返り等が既出。新変形のみ可)
- [既出接近] 信号機の周期(「信号待ちの合計時間」あり。色の判定なら可)
- 秒針・分針が重なる時刻(時計の追いつき)
- [済C103] トランプの戦争(War)1回戦・山札の推移

## パース・テキスト処理
- [済C104] テキストの両端揃え(text justification: 幅wで語間スペース配分)
- [既出] URLクエリ文字列のパース
- [済C104] カラーコード #RRGGBB → 10進RGB
- [済C103] 分数電卓("1/2 + 1/3" → "5/6"、約分つき)
- [済C106] ローマ数字の足し算(変換は両方向既出、加算の合成は未出)
- [済C103] 7セグメント表示の解読(「棒の本数」は既出、解読は未出)
- [済C104] 時間表記のパース("1h30m" → 分)
- [済C104] 壊れたキーボードで打てる単語の数(使えるキー集合)
- [既出:折り返しの行数勘定] 単語の折り返し(貪欲word wrap)の行数 ※「余白最小DP」は既出
- [済C104] 英語の数の綴り字数(PE17 Number letter counts)
- 頭字語の展開/生成系 ※頭文字連結は既出
- [済C104] Brainfuck風ミニ言語の実行(+-><[]の簡易版)
- 電話番号・郵便番号の書式検査(正規表現の練習帯)

## 符号化・暗号(教育的で手薄)
- [済C107復号・符号化は既出(ジグザグに書いて横に読む)] レールフェンス暗号(3段)の符号化/復号
- [既出:復号あり] ヴィジュネル暗号の符号化/復号
- [済C105] Soundexコード
- [済C103] ピッグラテン変換
- [済C102] Base32/Base64風エンコード(簡易表)
- [済C103] MIDI可変長整数の符号化/復号
- ハミング(7,4)符号の誤り検出訂正
- [済C106] パリティビットの付与と検査
- [済C102] Move-to-Front変換
- [済C102] Burrows-Wheeler変換(小さな文字列)
- [済C105] フィボナッチ符号(Zeckendorfベースの符号化)
- [済C102] 平方採中法(ノイマンの乱数)の列
- [済C104] [済C102] 線形合同法の列 / LFSR(シフトレジスタ)の列
- グリル暗号(回転グリルは重いので固定グリル)
- [済C107鍵表のみ・本体は未] プレイフェア暗号(表の構築込み、重め)

## 数論・数列(PE/OEIS発掘分)
- [済C103] 2つの3桁数の積で作る最大の回文(PE4)
- [済C102] 巡回素数(197→971→719が全部素数)(PE35)
- [済C102] 両側切り詰め素数(truncatable primes)(PE37)
- [済C107] n²+an+b が連続して素数になる長さ(PE27)
- [済C102] チャンパーノウン定数の第n桁(PE40)
- パンデジタル数の判定 / 1-9パンデジタルな積の関係(PE32)
- [済C104] 桁消し分数(49/98=4/8)の検出(PE33)
- [済C104] [済C102] 奇合成数 = 素数+2×平方数 で書けない最小(ゴールドバッハの別予想, PE46)
- [済C104] 連続する数で相異なる素因数がk個ずつ(PE47)
- [済C104] 素数の順列(4桁で等差の素数3つ組, PE49)
- [済C103] 1/dの循環節が最長になるd(argmax; 循環節長は既出)
- [済C103] 名前スコア(アルファベット価値×順位の総和, PE22)
- [済C102] ラッキーチケット(前半桁和=後半桁和の番号)
- [済C103] コラコスキ数列
- [済C103] RATS数列(Reverse Add Then Sort)
- [済C103] ウラムの螺旋: 番号→座標 / CSES Number Spiral の対角値
- [既出接近:中国剰余定理あり] ニコマコスの復元(3,5,7の余りから最小数; CRT具体化)
- [済C106] 順列の辞書順番号(順列→何番目か) / 番号→順列(レーマーコード) ※「次の順列」は既出
- [既出:XORの三角形] XORピラミッドの頂上(パスカル三角形のXOR版)
- [既出] 山を不等分割するGrundy's Game(「不等分割ゲーム」あり)
- [済C102] 2山を(1,2)ずつ減らして両方0にできるか(CSES Coin Piles)
- [済C102] 1..nの等和2分割の構成出力(CSES Two Sets)
- [済C102] 与えた数直線上の点で「時刻tでの最大ギャップ」動的(CSES Traffic Lights)
- [既出:何周すれば部分列として読めるか] 何周で数を昇順に拾い切るか(CSES Collecting Numbers)
- [済C102] 入れ子区間の判定/数え(CSES Nested Ranges)
- [既出] 長方形を正方形に切る最小カット数(CSES Rectangle Cutting DP)
- [済C102] 定員kのエレベーター最小往復(CSES Elevator Rides bitDP)
- [済C103] ±1差の隣接列の数え上げ(CSES Array Description)
- [済C102] 2台のプリンタで全ジョブ最短時間(答えで二分探索)
- k本切って等長最大(既出「等長ロープ」)の変形: 総本数最大化系
- 部分文字列の頻度分布(CSES Substring Distribution)
- [済C102] De Bruijn列の構成
- [済C102] 会議室の部屋番号割り当て出力(CSES Room Allocation)
- 給与クエリ/ホテルクエリ(CSES流の割当クエリ)

## データ・統計・実務風
- [済C103] 移動平均とゴールデンクロス(交差回数は既出→交差時点の列挙)
- [済C103] 情報エントロピーの計算(頻度→H、小数2桁)
- [済C103] 度数分布表の出力(ビンごとの*棒グラフ)
- [済C103] チェックサム(モジュラ重みつき: ISBN-10/13は最優先)
- Luhn [済C101]
- [済C103] 在庫の入出庫ログから最終在庫と欠品検出
- 家計簿: カテゴリ別集計と最大支出月
- [済C103] ログのセッション化(タイムアウトで区切る)
- ランレングスのヒストグラム

## 幾何(残り物)
- 点と直線の距離の2乗×分母(有理化して整数で)
- [済C103] 三角形の外心・内心が格子点か
- [済C102] 長方形の集合のスカイライン輪郭(高さ列)
- 最近点対の分割統治(素朴版は既出)
- [済C102] 角度ソート(偏角順に点を並べる、整数外積比較)
- 多角形の三角形分割の扇形の面積列

## 状態探索(BFS/ゲーム木)
- [済C104] 騎士と障害物の最短(既出)の変形: 変則駒(ラクダ(1,3)跳び等)
- [済C104] 3つの容器の水分け(2つは既出)
- [済C104] 川渡りパズル(既出)の変形: 宣教師と人食い
- 8クイーンの解の1つを辞書順最小で(Nクイーン数は既出)
- [済C107] 15パズルの1手で解けるか(可解判定・最小手数は既出)
- [済C103] ライツアウト2次元(1次元は既出)の可解性 ※要注意
- 迷路の壁すり抜けk回(1回は既出)

## クラス・オブジェクト/その他(karan/Projects他)
- [済C103] 複素数の四則演算(a+bi形式のパースと計算)
- [済C103] 転置インデックス(単語→出現する行番号の一覧)
- [済C105] タートルグラフィックス(前進/回転の命令列→最終座標・軌跡の長さ)
- 温度・単位の換算(華氏⇔摂氏は既出、マイル/ノット等)


## 二分木(ほぼ空白ドメイン! 99 Prolog Problems由来)
表現は「配列の添字(1始まり、子は2i/2i+1)」か「'値 左 右'の行リスト」で統一すると出題しやすい。
- [済C102] 行きがけ+通りがけの列から木を復元(preorder+inorder reconstruction)
- [済C106] 通りがけ順(inorder)の出力 ※行きがけ・帰りがけは既出
- [済C103] BSTへ順に挿入した結果の通りがけ順/木の高さ
- [済C102] 高さ平衡(AVL条件)の判定
- 葉の値の一覧 / 深さkのノードの値の列
- [済C103] 二分木の括弧つき文字列表現との相互変換 a(b,c(d,))
- [既出] 完全二分木か・パーフェクトか・ヒープ条件・鏡映対称
- 2つの木が同型か(構造のみ/値つき) ※一般木の同型は既出、二分木の順序つきは別物

## AoC定番メカニクス(パース+シミュレーション)
- 括弧のフロア移動: (で+1 )で-1、最終階と初めて地下に入る位置
- [済C103] 座席ID: FBLR文字列を2進で読んで番号化(空間二分)
- [済C103] パスワードポリシー検査: 「1-3 a: abcde」形式の一括検査(回数版と位置版)
- グループ質問票: 誰かがYes(和集合)/全員Yes(積集合)のサイズ合計
- [済C103] トボガン滑走: 横に周期的に繰り返すグリッドで、傾き(r,d)で降りたときの木の数
- [済C103] 電源アダプタ: ソートして差1と差3の個数の積
- [既出] 燃料の再帰計算 / 命令ループ検出(1命令書き換え)
- [済C102] 手荷物規則: 「AはBを2個含む」規則の推移的な合計個数(重みつきDAGのDP)

## AOJ CGL系幾何(未収録)
- 点の直線への射影(有理数→2倍座標などで整数化)
- 点の直線に関する反射(鏡映点; 整数で出せる)
- 線分と線分の距離の2乗(交差すれば0)
- [済C103] [既出接近] 2つの円: 共有点の個数は既出→「共通接線の本数(4/3/2/1/0)」なら内包と分離を区別できて別問題 ※要検討
- 円と直線の共有点の個数(距離2乗 vs 半径2乗)
- [済C107] 凸多角形を直線でカットした左側の頂点数

## P99その他(リスト・論理)
- [済C104] 入れ子の括弧リストの平坦化("1 (2 (3 4)) 5"→数列)
- N個ごとに要素を落とす / 各要素をk回ずつ複製
- [済C102] k個選ぶ組合せの辞書順列挙(出力行数C(n,k))
- [済C102] 論理式の真理値表を丸ごと出力(変数2〜3個)
- [済C102] 偶数のゴールドバッハ分解(素数p≤qでp+q=n、pが最小のもの)
- [済C104] 識別子として合法か(先頭は英字/_、以降は英数字/_)


## 枯渇しない鉱脈: ライブラリ習熟トラック(ユーザー方針で再出題可)
既存方針「ライブラリ帯は既出の計算でもAPIの習得として再出題可」(numpyの合計と平均が前例)。
概念的な新規性が不要なので、以下の帯は実質無限に増やせる:
- re: findallで数値抽出と合計 / subで置換 / 電話番号・日付パターンの検査 / split / グループ取り出し
- itertools: combinations/permutations/product/groupby/accumulate/chain/pairwise/zip_longest の各1問
- collections: OrderedDict / ChainMap / namedtuple
- datetime: n日後の日付 / 2つの日付の営業日数 / ISO週番号
- math: comb/perm/prod/dist/hypot/atan2(整数化に注意)/tau
- functools: reduce / cmp_to_key / cache
- string: ascii_letters等の定数 / Template
- statistics: harmonic_mean / correlation / linear_regression (3.10+)
- numpy: 既存6問に加え argmin/cumsum/diff/unique/clip/tile/repeat/linspace/dot以外の行列演算/ブロードキャスト
- pandas: query / groupby.agg複数 / concat / sort_values複数キー / idxmax / rolling
- scipy: linalg.solve / optimize.minimize_scalar / stats.mode / integrate.trapezoid


## 第3次探索(Wikipedia List of algorithms + 日本語実務系)
- [済C103] ホーナー法による多項式の評価(係数列とxから値)
- [済C102] 銀行家のアルゴリズム(資源割当が安全状態か) ※「銀行家の丸め」とは別物
- [済C102] ディスクスケジューリングSCAN/FCFSのヘッド総移動距離
- [済C103] シェーカーソートのパス数 or ノームソートのステップ数(ソートシム枠は残り2つまで)
- [既出] 安定結婚(Gale-Shapley) / 段階料金 / ラウンドロビン完了順
- [済C104] 和暦⇔西暦の変換(令和/平成/昭和の境界処理)
- [済C104] 西暦→干支(十二支)
- [済C104] 駐車料金の切り上げ課金(最初の1時間X円+以降30分ごとY円)
- [済C103] 割り勘の端数を幹事が負担(1人あたりと幹事の支払い)
- [済C104] ポイントp%還元の実質価格 / 複数店舗の比較
- [済C104] 合成抵抗(直列は和、並列は分数で: 2本の並列を既約分数で)
- [済C104] てこの釣り合い(モーメントの計算、支点からの距離×重さ)
- [済C104] 雷までの距離(音速×秒数)、光と音の時間差

## メタ・注意
- 「判定→個数→列挙→構成」の階段は1概念1段まで。既に2段ある概念は避ける。
- 乱数・浮動小数の不安定な問題(モンテカルロ等)は自動採点に不向きなので採らない。
- 構成問題(答えが一意でない)は「辞書順最小」等で一意化できるもののみ。
- 出典メモ: CSES https://cses.fi/problemset/ , CodeAbbey https://www.codeabbey.com/index/task_list , PE https://projecteuler.net/archives

## 第4次探索(2026-09-04: 面接定番パターン集(Two Pointers/Binary Search/Hash/Stack/Deque/Heap/BFS/Trie)・PE51〜150・Rosetta系)
全4100問の concept/title 一覧(ドメイン別)を先に作ってから差分を取った。以下は未収録を確認済み(採用したら[済C##])。
### しゃくとり・窓・二点法
- [済C108] 和×長さがk未満の区間の数 / [済C108] 両端から取ってちょうどxにする最小回数(補集合で中央区間) / [済C108] 重複のない区間の最大和
- [済C108] 1を一箇所に固める最小交換数(任意交換) / [済C108] どの文字もk回以上の最長部分文字列(分割統治)
- 3文字a,b,cを全部含む部分文字列の数 / 最頻要素の頻度をk回の+1で最大化 / 長さkの相異なる要素の窓の最大和 / 店主が機嫌よくいられるX分で満足客最大
- 母音が偶数回の最長部分文字列(マスクの初出) / 2文字だけ違うペアの部分文字列数 / 半反復(隣接同一が1組まで)の最長部分文字列
- [済C109] 最短の削除で整列にする区間(前後の単調部分を二点法で) / 三角形になれる3本の数(二点法版)
### DP
- [済C108] 連続1なしのN以下の整数の個数(ビット桁DP) / [済C108] 増加経路の本数 / [済C108] 連続上限つきサイコロ列 / [済C108] 等差部分列(飛び飛び)の個数
- [済C108] 跳び幅[min,max]で0だけ踏む到達判定 / [済C108] 長さL,Mの2区間最大和 / [済C108] 分割して小さい方を得るゲーム / [済C108] 葉の値から作る木の最小コスト
- [済C108] 立入禁止つき最小コスト辞書順最小の踏み順
- k歩で境界外へ出る経路数(格子外へ落ちる数え上げ) / 同じ場所に留まる方法の数(左右移動k回で位置0) / 単調増加(0→1)にする最小反転数 / 最良観光ペア a[i]+a[j]+i−j
- 間隔k以下の部分列の最大和(単調デック) / 分割して平均の和を最大に(最大k分割) / 連続k回のk連結配列の最大部分和 / 1要素を2乗してよい最大部分和
- 部分配列の最大絶対和 / 横跳び最小回数(3レーン) / 1要素削除後の最長1区間 / 桁列をk以下の数に区切る方法の数 / 良い文字列の数(長さ範囲・2種の追加長)
- 3n枚のピザから隣接禁止でn枚(環状+個数) / 儲かる計画の数(2制約ナップサック数え上げ) / 音楽プレイリストの数
### ハッシュ・数え上げ
- [済C108] rev差が等しいペア / [済C108] a[i]−iで悪いペア / [済C108] 最頻値を同じ回数含む最短区間 / [済C108] ドメイン階層集計 / [済C108] 2列の区間和が等しい最長区間
- [済C108] XORが等しく分かれる(i,j,k) / [済C108] 全ペアXORの総和 / [済C108] LCM=kの区間数 / [済C108] 差の上限つき3つ組 / [済C108] 四隅が1の長方形 / [済C108] 3×3魔方陣の部分格子
- 同じ比の長方形ペア数 / 積が等しい4つ組(タプル) / [済C109]隣接差1の最長部分列(調和部分列 max−min=1) / レンガ壁の最少横断本数 / ブーメラン(等距離ペア)の数
- 直線に関して対称な点集合か / 最小面積の軸平行長方形 / 3つ組のANDが0の数 / 和が目標の部分行列の数 / 部分配列の中央値がkの数
- 奇数長部分配列の和の総和 / ちょうど1回だけ覆われた… / 部分配列の最大値がちょうどk回以上現れる数 / 最小=minK かつ 最大=maxK の区間数
### スタック・単調スタック
- [済C108] 最小値×区間和の最大 / [済C108] 括弧内を反転して括弧を消す
- [済C109:最大幅の坂/見える人数/両端最大区間] 好成績が多い最長区間(+1/−1で和>0の最長) / 最大幅の坂(i<jでa[i]≤a[j]のj−i最大) / 列で見える人数 / 部分配列の最小値の総和(既出)の変形: 各要素が最大となる区間数
- 基本計算機(+−と括弧) / 三項演算子の評価 / 化学式の原子数 / 波括弧展開 / 関数の排他実行時間ログ / ロボットの衝突 / 半減少部分配列の最長
### ヒープ・ソート
- [済C108] k番目の分数 / [済C108] 単一CPUの実行順 / [済C108] 順位票ソート / [済C108] ペアの小さい方の和最大 / [済C108] k枚連番の組分け / [済C108] 2個買うと1個無料
- [済C108] 半分消す最少種類 / [済C108] k個消して種類最小 / [済C108] 1つ挿入して統合 / [済C108] ケンドール距離
- 到達できる最も遠いビル(はしごとレンガ) / 最大の合格率改善(ヒープで増分) / チームの最大性能(効率×速度和) / 2都市への振り分け最小費用 / 身長と前にいる人数からの列復元
- 最大周長の三角形 / トラックの最大積載 / 空いている最小番号の椅子 / 会議室III(最も使われた部屋) / りんごを最大何個食べられるか(期限つき) / 順位追跡(k番目の高評価)
- k要素で最小の…(k人選ぶ最大スコア=最小×和) / 距離kで同じ文字を離す並べ替え / 最長の幸せな文字列(aaaなし) / 眠れる最大週数
### 二分探索
- [済C108] ソート済みで過半数判定 / [済C108] 開花クエリ(bisect)
- 最小の良い基数 / ヒーターの最小半径 / 平均最大の長さ≥kの区間(実数二分) / 最も近いk要素 / 3分割の方法数(和が非減少) / 包装の無駄最小 / 2次元のピーク
- 公平なペア(和が範囲内)の数 / 到着に間に合う最小速度 / 除去できる最大文字数(部分列を保つ) / 変換した和が目標に最も近い値 / 磁力の最大最小間隔(既出:最小距離の最大化) / 最大の甘さ(選ぶk個の最小差最大)
- 階乗の末尾0がkになるnの個数(前像の大きさ) / 醜数III(3種の倍数のn番目) / n台のコンピュータの最大稼働時間 / 素朴な…(kth欠けている正整数は既出)
### Trie・bit
- 接頭辞スコアの総和 / 単語の置換(最短の語根で) / 魔法の辞書(1文字違いで一致) / XORが範囲内のペア数(Trie) / 要素上限つき最大XOR
### BFS/グラフ
- ドミノ倒し(押す方向の伝播) / バス路線の最小乗り換え / 掃除ロボット / 迷路(壁まで滑る) / 相異なる島の形の数 / 島を分断する最小日数 / 水が上がる最短時刻(swim) / 最短経路上で危険を避ける最大安全度 / 障害物をk個壊せる最短路 / 全鍵回収(既出) / 授業の並列ラウンド(既出)
### 木(二分木ドメインの続き)
- 二分木の最大幅 / 完全二分木かの判定(完全性) / 木のジグザグ順(既出) / 部分木の分割で積最大 / 同じ深さで最後の頂点 / BSTの最頻値 / 最も近い葉 / 距離kの全頂点 / 木の直径(二分木版) / 一意な値のパス最長 / ラベル付き二分木のパス / 削除クエリ後の高さ
### 出典メモ
- 面接定番パターン集(カテゴリ別問題名リスト) / Project Euler 51〜150(Lychrel・Permuted Multiples・Cyclical Figurate・Digit Factorial Chains・Passcode Derivation・Cube Digit Pairs・Anagramic Squares・Bouncy Numbers・Counting Block Combinations・Primes with Runs・Repunit Divisibility・Reversible Numbers・Square Remainders 等が未収録候補)

## 第5次探索(2026-09-04: CSES全節リスト差分)
- [済C109] Hotel Queries / List Removals / Range Updates and Sums / Salary Queries / Apartments / Concert Tickets / Reading Books / Bit Inversions / Cut and Paste / Collecting Numbers / Distinct Colors / Distinct Values Sum / Shortest Subsequence / Sum of Four Values / Visible Buildings Queries / Maximum Subarray Sum II
- 未採用: Collecting Numbers II(スワップつき) / Towers(=最長非減少部分列と同計算・不可) / Nested Ranges Count(含む数の一覧) / Pizzeria Queries / Prefix Sum Queries(更新つき最大接頭辞) / Range Interval Queries / Increasing Array Queries / Polynomial Queries(既出) / Missing Coin Sum Queries / Subarray Sum Queries II / Pyramid Array / Stack Weights / Two Stacks Sorting / Sorting Methods(各ソートの手数) / Nearest Campsites / Bubble Sort Rounds / Grid Coloring / Mex Grid Construction / Coin Grid / Letter Pair Move Game / Swap Round Sorting / Binary Subsequences / Food Division / Programmers and Artists / Coin Arrangement / Stick Divisions / Stick Difference / Tree Distances I(既出:離心数) / Fixed-Length Paths(既出:距離k対) / Counting Paths(木パスの通過回数) / Company Queries II(LCA既出) / Path Queries II(パス最大 既出) / Substring Order / Palindrome Queries(更新つき回文判定) / Required Substring / String Transform(BWT逆変換!) / Lines and Queries / Line Segments Trace / Intersection Points / Robot Path / Corner Subgrid / Eulerian Subgraphs / Monster Game / Subarray Squares / Houses and Schools / Apples and Bananas / One Bit Positions / Signal Processing

## 第6次探索(2026-09-04: cp-algorithms記事索引・PE1〜50/151〜200)
- [済C110] Range Queries and Copies(素直な複製) / Garner / min-plus行列累乗 / Optimal schedule…(未) / 15パズル(既出) / Stern-Brocot(既出)
- 未採用候補: Strong Orientation(既出:一方通行化) / Finding Bridges Online / Tree painting / Kraut determinant / Half-plane intersection / Minkowski sum / Minimum Enclosing Circle / Delaunay / Vertical decomposition / Point location / Search for intersecting segments(sweep) / Randomized heap / Sqrt tree / Sqrt decomposition(既出:平方分割) / Treap(順序統計・区間反転) / Deleting from DS offline / Knuth optimization / Divide and Conquer DP / Broken profile DP(Parquet) / Largest zero submatrix(既出) / Suffix automaton(相異なる部分文字列 既出) / Aho-Corasick(既出) / Montgomery / Factoring exponentiation / Balanced ternary(既出) / Arbitrary precision(多倍長の筆算: 加算・乗算・除算) / Operations on polynomials(逆元・対数・指数 級数) / Discrete root(既出) / Primitive root(既出) / Factorial modulo p(大きなn!のpを除いた部分) / Number of paths of fixed length(既出) / Edge/Vertex connectivity / Kirchhoff(既出) / Prüfer(既出) / Assignment(既出ハンガリアン) / Stoer-Wagner最小カット / Push-relabel / Flows with demands / MPM
- PE候補: Lychrel判定(既出:逆順加算) / Permuted Multiples(2x..6xが同じ桁) / Cyclical Figurate / Passcode Derivation(トポロジカル) / Su Doku(既出) / Cube Digit Pairs / Anagramic Squares / Bouncy Numbers(既出:桁単調) / Counting Block Combinations / Primes with Runs / Repunit Divisibility(既出:1/nの周期) / Reversible Numbers / Square Remainders / Number Rotations / Step Numbers / Consecutive Positive Divisors / Prize Strings(既出:出席記録) / Semiprimes(既出) / Squarefree(既出) / Digit Power Sum / Ordered Radicals(rad順ソート) / Hexagonal Tile Differences
