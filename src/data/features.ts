import type { Problem } from '../types'
import { ALL_PROBLEMS } from './index.ts'

/**
 * 機能網羅チェックリスト。
 * 「Python のこの機能/モジュールを扱う問題が1問でもあるか」を測るための一覧。
 * 問題数ではなく "カバー率" で進捗を見るのが狙い。
 *
 * 検出は参照解(reference)のコードに対する正規表現、または tag/concept の一致で行う。
 */

export interface Feature {
  /** 表示名 */
  key: string
  /** カテゴリ（章立て） */
  category: string
  /** 参照解コードに対するパターン（あれば優先） */
  pattern?: RegExp
  /** tags / concept に含まれていれば一致とみなすキーワード */
  tag?: string
}

export const FEATURES: Feature[] = [
  // --- 基礎構文 ---
  { key: 'print（出力）', category: '基礎構文', pattern: /\bprint\(/ },
  { key: 'f-string', category: '基礎構文', pattern: /f["']/ },
  { key: 'print の sep=', category: '基礎構文', pattern: /sep=/ },
  { key: 'print の end=', category: '基礎構文', pattern: /end=/ },
  { key: '変数代入 =', category: '基礎構文', pattern: /^\s*\w+\s*=\s*[^=]/m },
  { key: '多重代入 a, b = ...', category: '基礎構文', tag: '多重代入' },
  { key: 'エスケープ \\n', category: '基礎構文', pattern: /\\n/ },
  { key: 'コメント #', category: '基礎構文', pattern: /#/ },

  // --- 演算 ---
  { key: '算術 + - *', category: '演算', tag: '算術演算子' },
  { key: '整数除算 //', category: '演算', pattern: /\/\// },
  { key: '剰余 %', category: '演算', pattern: /%/ },
  { key: 'べき乗 **', category: '演算', pattern: /\*\*/ },
  { key: 'divmod', category: '演算', pattern: /divmod\(/ },
  { key: '比較演算子', category: '演算', tag: '比較' },
  { key: '論理 and / or / not', category: '演算', pattern: /\b(and|or|not)\b/ },

  // --- 型と変換 ---
  { key: 'int()', category: '型と変換', pattern: /\bint\(/ },
  { key: 'float()', category: '型と変換', pattern: /\bfloat\(/ },
  { key: 'str()', category: '型と変換', pattern: /\bstr\(/ },
  { key: 'bool / True・False', category: '型と変換', pattern: /\b(True|False)\b/, tag: 'bool' },
  { key: 'round()', category: '型と変換', pattern: /round\(/ },
  { key: 'abs()', category: '型と変換', pattern: /abs\(/ },

  // --- 文字列 ---
  { key: 'len()', category: '文字列', pattern: /len\(/ },
  { key: '.upper() / .lower()', category: '文字列', pattern: /\.(upper|lower)\(/ },
  { key: '.replace()', category: '文字列', pattern: /\.replace\(/ },
  { key: '.split()', category: '文字列', pattern: /\.split\(/ },
  { key: '.join()', category: '文字列', pattern: /\.join\(/ },
  { key: 'インデックス s[i]', category: '文字列', pattern: /\[-?\d+\]/ },
  { key: 'スライス s[a:b]', category: '文字列', pattern: /\[[^\]]*:[^\]]*\]/ },
  { key: '.strip()', category: '文字列', pattern: /\.strip\(/ },

  // --- データ構造 ---
  { key: 'リスト list', category: 'データ構造', pattern: /\blist\(|\[\]/ },
  { key: 'タプル tuple', category: 'データ構造', tag: 'タプル' },
  { key: '辞書 dict', category: 'データ構造', pattern: /\bdict\(|\{[^{}]*:[^{}]*\}/ },
  { key: '集合 set', category: 'データ構造', pattern: /\bset\(/ },
  { key: 'リスト内包表記', category: 'データ構造', pattern: /\[[^\]]*\bfor\b[^\]]*\]/ },
  { key: '辞書/集合内包表記', category: 'データ構造', pattern: /\{[^}]*\bfor\b[^}]*\}/ },

  // --- 制御構文 ---
  { key: 'if / elif / else', category: '制御構文', pattern: /\bif\b/ },
  { key: 'for ループ', category: '制御構文', pattern: /\bfor\b/ },
  { key: 'while ループ', category: '制御構文', pattern: /\bwhile\b/ },
  { key: 'range()', category: '制御構文', pattern: /range\(/ },
  { key: 'break / continue', category: '制御構文', pattern: /\b(break|continue)\b/ },
  { key: 'enumerate()', category: '制御構文', pattern: /enumerate\(/ },
  { key: 'zip()', category: '制御構文', pattern: /\bzip\(/ },

  // --- 関数 ---
  { key: '組み込み max/min/sum', category: '関数', pattern: /\b(max|min|sum)\(/ },
  { key: 'sorted()', category: '関数', pattern: /sorted\(/ },
  { key: 'map()', category: '関数', pattern: /\bmap\(/ },
  { key: 'filter()', category: '関数', pattern: /filter\(/ },
  { key: 'def（関数定義）', category: '関数', pattern: /\bdef\b/ },
  { key: 'lambda', category: '関数', pattern: /\blambda\b/ },
  { key: '*args / **kwargs', category: '関数', pattern: /\*\*?\w+/ },

  // --- 標準ライブラリ ---
  { key: 'import', category: '標準ライブラリ', pattern: /\bimport\b/ },
  { key: 'math', category: '標準ライブラリ', pattern: /\bmath\b/ },
  { key: 'collections.Counter', category: '標準ライブラリ', pattern: /Counter/ },
  { key: 'collections.deque', category: '標準ライブラリ', pattern: /deque/ },
  { key: 'collections.defaultdict', category: '標準ライブラリ', pattern: /defaultdict/ },
  { key: 'itertools', category: '標準ライブラリ', pattern: /itertools/ },
  { key: 'functools', category: '標準ライブラリ', pattern: /functools/ },
  { key: 'bisect（二分探索）', category: '標準ライブラリ', pattern: /bisect/ },
  { key: 'heapq（ヒープ）', category: '標準ライブラリ', pattern: /heapq/ },
  { key: 're（正規表現）', category: '標準ライブラリ', pattern: /\bre\.|import re\b/ },
  { key: 'datetime', category: '標準ライブラリ', pattern: /datetime/ },

  // --- 高度な機能 ---
  { key: 'class（クラス）', category: '高度な機能', pattern: /\bclass\b/ },
  { key: '例外処理 try/except', category: '高度な機能', pattern: /\btry\b/ },
  { key: 'with 文', category: '高度な機能', pattern: /\bwith\b/ },
  { key: 'ジェネレータ yield', category: '高度な機能', pattern: /\byield\b/ },
  { key: 'デコレータ @', category: '高度な機能', pattern: /^\s*@\w+/m },
  { key: '再帰', category: '高度な機能', tag: '再帰' },

  // --- アルゴリズム ---
  { key: '動的計画法 (DP)', category: 'アルゴリズム', tag: 'dp' },
  { key: '二分探索', category: 'アルゴリズム', tag: '二分探索' },
  { key: 'ソート', category: 'アルゴリズム', tag: 'ソート' },
  { key: 'グラフ探索 BFS/DFS', category: 'アルゴリズム', tag: 'グラフ' },

  // --- 便利な構文（追加） ---
  { key: 'any() / all()', category: '便利な構文', pattern: /\b(any|all)\(/ },
  { key: '条件式（三項演算子）', category: '便利な構文', tag: '条件式' },
  { key: '代入式 := (walrus)', category: '便利な構文', pattern: /:=/ },
  { key: 'ビット演算 & | ^', category: '便利な構文', tag: 'ビット演算' },
  { key: 'ビットシフト << >>', category: '便利な構文', pattern: /<<|>>/ },
  { key: '複合キーソート', category: '便利な構文', tag: '複合キー' },

  // --- 文字列メソッド（追加） ---
  { key: '.count()', category: '文字列', pattern: /\.count\(/ },
  { key: '.startswith() / .endswith()', category: '文字列', pattern: /\.startswith\(|\.endswith\(/ },
  { key: '.zfill()', category: '文字列', pattern: /\.zfill\(/ },
  { key: 'str.format()', category: '文字列', pattern: /\.format\(/ },
  { key: '.find()', category: '文字列', pattern: /\.find\(/ },

  // --- 標準ライブラリ（追加） ---
  { key: 'statistics', category: '標準ライブラリ', pattern: /statistics/ },
  { key: 'math.lcm', category: '標準ライブラリ', pattern: /lcm/ },
  { key: 'pow(3引数) モジュラ', category: '標準ライブラリ', tag: 'モジュラ' },

  // --- データ分析（新カテゴリ） ---
  { key: '平均・中央値・最頻値', category: 'データ分析', tag: 'データ分析' },
  { key: '標準偏差・分散', category: 'データ分析', pattern: /pstdev|stdev|variance/ },
  { key: '正規化（min-max）', category: 'データ分析', tag: '正規化' },
  { key: 'numpy 配列・集計', category: 'データ分析', pattern: /numpy|\bnp\./ },
  { key: 'numpy ベクトル演算・内積', category: 'データ分析', pattern: /\.argmax|@ b|np\.dot/ },
  { key: 'pandas Series/DataFrame', category: 'データ分析', pattern: /pandas|\bpd\./ },
  { key: 'pandas groupby', category: 'データ分析', pattern: /groupby/ },
  { key: 'pandas value_counts', category: 'データ分析', pattern: /value_counts/ },
  { key: 'pandas sort_values', category: 'データ分析', pattern: /sort_values/ },
  { key: 'scikit-learn (fit/predict)', category: 'データ分析', pattern: /sklearn/ },
  { key: 'ML 評価指標 (accuracy/MSE)', category: 'データ分析', pattern: /accuracy_score|mean_squared_error/ },
  { key: 'StandardScaler / 前処理', category: 'データ分析', pattern: /StandardScaler|preprocessing/ },
  { key: '線形回帰 / KNN', category: 'データ分析', pattern: /LinearRegression|KNeighbors/ },
  { key: 'pandas merge（結合）', category: 'データ分析', pattern: /merge\(/ },
  { key: 'fillna（欠損処理）', category: 'データ分析', pattern: /fillna/ },
  { key: 'one-hot (get_dummies)', category: 'データ分析', pattern: /get_dummies/ },
  { key: 'ビニング (cut)', category: 'データ分析', pattern: /\.cut\(|pd\.cut/ },

  // --- アルゴリズムパターン（新カテゴリ） ---
  { key: '全探索（brute force）', category: 'アルゴリズムパターン', tag: '全探索' },
  { key: '累積和（prefix sum）', category: 'アルゴリズムパターン', tag: '累積和' },
  { key: 'bit全探索', category: 'アルゴリズムパターン', tag: 'bit全探索' },
  { key: '素数判定', category: 'アルゴリズムパターン', tag: '素数' },
  { key: 'エラトステネスの篩', category: 'アルゴリズムパターン', tag: '篩' },
  { key: 'Two Sum（ハッシュ）', category: 'アルゴリズムパターン', tag: 'ハッシュ' },
  { key: '二点ポインタ', category: 'アルゴリズムパターン', tag: '二点ポインタ' },
  { key: 'スライディングウィンドウ', category: 'アルゴリズムパターン', tag: 'スライディングウィンドウ' },
  { key: 'スタック（括弧整合）', category: 'アルゴリズムパターン', tag: 'スタック' },
  { key: 'アナグラム判定', category: 'アルゴリズムパターン', tag: 'アナグラム' },
  { key: '貪欲法', category: 'アルゴリズムパターン', tag: '貪欲' },
  { key: 'バックトラッキング', category: 'アルゴリズムパターン', tag: 'バックトラッキング' },
  { key: 'Union-Find', category: 'アルゴリズムパターン', tag: 'unionfind' },
  { key: 'ダイクストラ', category: 'アルゴリズムパターン', tag: 'ダイクストラ' },
  { key: 'トポロジカルソート', category: 'アルゴリズムパターン', tag: 'トポロジカル' },
  { key: 'ナップサックDP', category: 'アルゴリズムパターン', tag: 'ナップサック' },
  { key: '編集距離DP', category: 'アルゴリズムパターン', tag: '編集距離' },
  { key: 'Trie', category: 'アルゴリズムパターン', tag: 'trie' },
  { key: 'セグメント木', category: 'アルゴリズムパターン', tag: 'セグメント木' },
  { key: 'Fast&Slow / 循環検出', category: 'アルゴリズムパターン', tag: '循環検出' },
  { key: '区間マージ', category: 'アルゴリズムパターン', tag: '区間' },
  { key: '単調スタック', category: 'アルゴリズムパターン', tag: '単調スタック' },
  { key: '転倒数', category: 'アルゴリズムパターン', tag: '転倒数' },
  { key: 'BIT / Fenwick木', category: 'アルゴリズムパターン', tag: 'BIT' },
  { key: '最小全域木 (クラスカル)', category: 'アルゴリズムパターン', tag: '最小全域木' },
  { key: 'bit DP', category: 'アルゴリズムパターン', tag: 'bitDP' },
  { key: '2次元累積和', category: 'アルゴリズムパターン', tag: '2次元累積和' },
  { key: 'いもす法', category: 'アルゴリズムパターン', tag: 'いもす法' },
  { key: '二項係数 nCr mod', category: 'アルゴリズムパターン', tag: '二項係数mod' },
  { key: '答えで二分探索', category: 'アルゴリズムパターン', tag: '答えで二分探索' },
  { key: '二部グラフ判定', category: 'アルゴリズムパターン', tag: '二部グラフ' },
  { key: 'ワーシャルフロイド (全点対最短路)', category: 'アルゴリズムパターン', tag: 'ワーシャルフロイド' },
  { key: 'ベルマンフォード (負辺)', category: 'アルゴリズムパターン', tag: 'ベルマンフォード' },
  { key: '最長共通部分列 (LCS)', category: 'アルゴリズムパターン', tag: '最長共通部分列' },
  { key: 'コインDP (完全ナップサック)', category: 'アルゴリズムパターン', tag: 'コインDP' },
  { key: '区間DP', category: 'アルゴリズムパターン', tag: '区間DP' },
  { key: 'KMP (文字列照合)', category: 'アルゴリズムパターン', tag: 'KMP' },
  { key: 'ローリングハッシュ', category: 'アルゴリズムパターン', tag: 'ローリングハッシュ' },

  // --- 構文イディオム（前提チェック用の細かい道具） ---
  { key: '2次元リスト', category: 'データ構造', pattern: /\[\[/ },
  { key: 'dict.setdefault', category: 'データ構造', pattern: /\.setdefault\(/ },
  { key: 'list.pop（スタック）', category: 'データ構造', pattern: /\.pop\(/ },
  { key: "float('inf')", category: '便利な構文', pattern: /float\(["']inf/ },
]

/** カテゴリの中で「言語の土台(building block)」とみなすもの。 */
export const FOUNDATIONAL_CATEGORIES = ['基礎構文', '便利な構文', '文字列', 'データ構造', '制御構文', '関数', '標準ライブラリ']

/**
 * 前提チェックの対象カテゴリ＝「言語そのものの道具」。
 * 標準ライブラリ/データ分析/アルゴリズムは各専用レベルが教える場なので、
 * そこで初出するのは正常（穴ではない）。よってこの厳しめチェックからは除く。
 */
export const LANGUAGE_CATEGORIES = ['基礎構文', '便利な構文', '文字列', 'データ構造', '制御構文', '関数']

export interface FeatureStatus {
  feature: Feature
  /** カバーしている最初の問題（なければ undefined） */
  example?: Problem
}

function matches(f: Feature, p: Problem): boolean {
  if (f.pattern && f.pattern.test(p.reference)) return true
  if (f.tag) {
    const hay = [...p.tags, p.concept]
    if (hay.some((t) => t.toLowerCase().includes(f.tag!.toLowerCase()))) return true
  }
  return false
}

/** 各機能について、最初にカバーしている問題を探す。 */
export function computeCoverage(problems: Problem[] = ALL_PROBLEMS): FeatureStatus[] {
  return FEATURES.map((feature) => ({
    feature,
    example: problems.find((p) => matches(feature, p)),
  }))
}

/** ある問題が使っている機能の一覧。 */
export function featuresUsedBy(p: Problem): Feature[] {
  return FEATURES.filter((f) => matches(f, p))
}

/**
 * 各機能を「最初に登場させる(教える)問題」を返す。
 * レベル昇順 → 同レベルは index 昇順で最も早いものを採用。
 */
export function firstIntroducers(problems: Problem[] = ALL_PROBLEMS): Map<string, Problem> {
  const sorted = [...problems].sort((a, b) => a.level - b.level || a.index - b.index)
  const intro = new Map<string, Problem>()
  for (const f of FEATURES) {
    const first = sorted.find((p) => matches(f, p))
    if (first) intro.set(f.key, first)
  }
  return intro
}

export interface PrereqGap {
  problem: Problem
  /** この問題が初めて登場させてしまう「土台機能」（=より前で教わっていない） */
  untaught: Feature[]
}

/**
 * 前提知識チェック。
 * 「土台カテゴリの機能を、その問題が世界で初めて使っている」かつ
 * その問題が応用レベル(level >= minLevel)の場合、前提が先に教えられていない=穴。
 */
export function findPrereqGaps(minLevel = 50, problems: Problem[] = ALL_PROBLEMS): PrereqGap[] {
  const intro = firstIntroducers(problems)
  const gaps: PrereqGap[] = []
  for (const p of problems) {
    if (p.level < minLevel) continue
    const untaught = featuresUsedBy(p).filter(
      (f) =>
        LANGUAGE_CATEGORIES.includes(f.category) &&
        intro.get(f.key)?.id === p.id &&
        // この問題自身の「お題」になっている機能(headline)は、ここが教える場なのでOK
        !(f.tag && p.tags.includes(f.tag)),
    )
    if (untaught.length) gaps.push({ problem: p, untaught: untaught })
  }
  return gaps
}
