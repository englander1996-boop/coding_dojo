import type { Problem } from '../../types'
import { build } from './_build.ts'

/**
 * データサイエンス帯（Kaggle系の主軸）。numpy / pandas を実際に使う。
 * 実行はブラウザの Pyodide が import から自動でパッケージを読み込む。
 * 出力はバージョン差で揺れないよう、スカラーや明示フォーマット・tolist で固定する。
 */

// ===== lv085 numpy 基礎 =====
const lv085 = build(85, 'lv085', [
  {
    title: '合計と平均 (numpy)',
    concept: 'numpy',
    tags: ['numpy', 'データ分析'],
    statement: '整数列を numpy 配列にして、合計と平均(小数2桁)を空白区切りで出力してください。\n\n入力例:\n1 2 3 4\n\n出力例:\n10 2.50',
    starter: 'import numpy as np\na = np.array(list(map(int, input().split())))\n',
    hints: ['np.array(リスト) で配列にする。', 'a.sum() と a.mean()。', '答え:\nprint(int(a.sum()), f"{a.mean():.2f}")'],
    explanation: 'numpy 配列は .sum() や .mean() で集計が一発。\n\n模範解答:\nimport numpy as np\na = np.array(list(map(int, input().split())))\nprint(int(a.sum()), f"{a.mean():.2f}")',
    reference: 'import numpy as np\na = np.array(list(map(int, input().split())))\nprint(int(a.sum()), f"{a.mean():.2f}")',
    cases: [
      { input: '1 2 3 4\n', expected: '10 2.50', sample: true },
      { input: '5\n', expected: '5 5.00' },
      { input: '2 4 6\n', expected: '12 4.00' },
    ],
    tip: '💡 numpy はデータ分析の土台。.sum/.mean/.std/.max/.min が高速に効く。データ分析の必須ツール。',
  },
  {
    title: '要素ごとの和（ベクトル演算）',
    concept: 'numpy',
    tags: ['numpy', 'データ分析'],
    statement: '2行に同じ長さの整数列。numpy で要素ごとの和を空白区切りで出力してください。\n\n入力例:\n1 2 3\n4 5 6\n\n出力例:\n5 7 9',
    starter: 'import numpy as np\na = np.array(list(map(int, input().split())))\nb = np.array(list(map(int, input().split())))\n',
    hints: ['numpy 配列は a + b で要素ごとに足せる(ループ不要)。', '.tolist() で普通のリストに戻して join。', '答え:\nprint(" ".join(map(str, (a + b).tolist())))'],
    explanation: '配列同士の演算は要素ごとに一括で行われる(ベクトル化)。\n\n模範解答:\nimport numpy as np\na = np.array(list(map(int, input().split())))\nb = np.array(list(map(int, input().split())))\nprint(" ".join(map(str, (a + b).tolist())))',
    reference: 'import numpy as np\na = np.array(list(map(int, input().split())))\nb = np.array(list(map(int, input().split())))\nprint(" ".join(map(str, (a + b).tolist())))',
    cases: [
      { input: '1 2 3\n4 5 6\n', expected: '5 7 9', sample: true },
      { input: '10\n20\n', expected: '30' },
      { input: '0 0\n1 -1\n', expected: '1 -1' },
    ],
    tip: '💡 ベクトル化は Python ループより圧倒的に速い。a * 2、a ** 2、np.sqrt(a) なども一括。',
  },
  {
    title: '内積 (dot)',
    concept: 'numpy',
    tags: ['numpy', 'データ分析'],
    statement: '2行に同じ長さの整数列。その内積を出力してください。\n\n入力例:\n1 2 3\n4 5 6\n\n出力例:\n32',
    starter: 'import numpy as np\na = np.array(list(map(int, input().split())))\nb = np.array(list(map(int, input().split())))\n',
    hints: ['内積は a @ b（または np.dot(a, b)）。', '各要素の積の和。', '答え:\nprint(int(a @ b))'],
    explanation: '@ は内積/行列積の演算子。1+2+3 と 4+5+6 なら 1*4+2*5+3*6=32。\n\n模範解答:\nimport numpy as np\na = np.array(list(map(int, input().split())))\nb = np.array(list(map(int, input().split())))\nprint(int(a @ b))',
    reference: 'import numpy as np\na = np.array(list(map(int, input().split())))\nb = np.array(list(map(int, input().split())))\nprint(int(a @ b))',
    cases: [
      { input: '1 2 3\n4 5 6\n', expected: '32', sample: true },
      { input: '2\n3\n', expected: '6' },
      { input: '1 0 1\n5 9 5\n', expected: '10' },
    ],
    tip: '💡 @ は行列積にも使える。機械学習の重みとの掛け算はほぼこれ。',
  },
  {
    title: '条件を満たす個数（ブールマスク）',
    concept: 'numpy',
    tags: ['numpy', 'データ分析'],
    statement: '1行目に整数列、2行目に閾値 k。k より大きい要素の個数を出力してください。\n\n入力例:\n1 5 2 8 3\n3\n\n出力例:\n2',
    starter: 'import numpy as np\na = np.array(list(map(int, input().split())))\nk = int(input())\n',
    hints: ['a > k はブール配列(True/False)になる。', 'True は1なので .sum() で個数。', '答え:\nprint(int((a > k).sum()))'],
    explanation: 'ブールマスク a > k で条件配列を作り、.sum() で True の数=該当件数。a[a > k] で値も取れる。\n\n模範解答:\nimport numpy as np\na = np.array(list(map(int, input().split())))\nk = int(input())\nprint(int((a > k).sum()))',
    reference: 'import numpy as np\na = np.array(list(map(int, input().split())))\nk = int(input())\nprint(int((a > k).sum()))',
    cases: [
      { input: '1 5 2 8 3\n3\n', expected: '2', sample: true },
      { input: '1 2 3\n0\n', expected: '3' },
      { input: '1 2 3\n9\n', expected: '0' },
    ],
    tip: '💡 ブールマスクは pandas でも同じ。df[df["age"] > 20] のような絞り込みの基礎。',
  },
  {
    title: '最大値の位置 (argmax)',
    concept: 'numpy',
    tags: ['numpy', 'データ分析'],
    statement: '整数列の中で最大値がある位置(0始まり、最初のもの)を出力してください。\n\n入力例:\n3 1 4 1 5\n\n出力例:\n4',
    starter: 'import numpy as np\na = np.array(list(map(int, input().split())))\n',
    hints: ['a.argmax() が最大値の位置。', 'a.max() は値、a.argmax() は位置。', '答え:\nprint(int(a.argmax()))'],
    explanation: 'argmax/argmin は最大/最小の位置を返す。\n\n模範解答:\nimport numpy as np\na = np.array(list(map(int, input().split())))\nprint(int(a.argmax()))',
    reference: 'import numpy as np\na = np.array(list(map(int, input().split())))\nprint(int(a.argmax()))',
    cases: [
      { input: '3 1 4 1 5\n', expected: '4', sample: true },
      { input: '10 2 3\n', expected: '0' },
      { input: '1 9 9\n', expected: '1' },
    ],
    tip: '💡 分類モデルの予測で「一番確率が高いクラス」を選ぶのが argmax。ML で超頻出。',
  },
])

// ===== lv095 pandas 基礎 =====
const lv095 = build(95, 'lv095', [
  {
    title: 'Series の集計',
    concept: 'pandas',
    tags: ['pandas', 'データ分析'],
    statement: '整数列を pandas の Series にして、合計と平均(小数2桁)を空白区切りで出力してください。\n\n入力例:\n1 2 3 4\n\n出力例:\n10 2.50',
    starter: 'import pandas as pd\ns = pd.Series(list(map(int, input().split())))\n',
    hints: ['pd.Series(リスト) で1次元データ。', 's.sum() / s.mean()。', '答え:\nprint(int(s.sum()), f"{s.mean():.2f}")'],
    explanation: 'Series は「ラベル付き1次元配列」。.sum()/.mean()/.describe() などで集計できる。\n\n模範解答:\nimport pandas as pd\ns = pd.Series(list(map(int, input().split())))\nprint(int(s.sum()), f"{s.mean():.2f}")',
    reference: 'import pandas as pd\ns = pd.Series(list(map(int, input().split())))\nprint(int(s.sum()), f"{s.mean():.2f}")',
    cases: [
      { input: '1 2 3 4\n', expected: '10 2.50', sample: true },
      { input: '5\n', expected: '5 5.00' },
      { input: '2 4 6\n', expected: '12 4.00' },
    ],
    tip: '💡 pandas は表形式データの王様。Series が列、DataFrame が表。データ分析の中心ツール。',
  },
  {
    title: '最頻ラベル (value_counts)',
    concept: 'pandas',
    tags: ['pandas', 'データ分析'],
    statement: '空白区切りの単語列。最も多く出る単語を出力してください（最頻が1つに定まる入力のみ）。\n\n入力例:\na b a c a\n\n出力例:\na',
    starter: 'import pandas as pd\ns = pd.Series(input().split())\n',
    hints: ['s.value_counts() で頻度集計。', '.idxmax() で最大件数のラベル。', '答え:\nprint(s.value_counts().idxmax())'],
    explanation: 'value_counts は出現頻度を多い順に集計。idxmax で最頻ラベルを取る。\n\n模範解答:\nimport pandas as pd\ns = pd.Series(input().split())\nprint(s.value_counts().idxmax())',
    reference: 'import pandas as pd\ns = pd.Series(input().split())\nprint(s.value_counts().idxmax())',
    cases: [
      { input: 'a b a c a\n', expected: 'a', sample: true },
      { input: 'x\n', expected: 'x' },
      { input: 'p q p\n', expected: 'p' },
    ],
    tip: '💡 value_counts() はカテゴリ列の分布把握の定番。normalize=True で割合も出せる。',
  },
  {
    title: '条件で絞って件数',
    concept: 'pandas',
    tags: ['pandas', 'データ分析'],
    statement: '1行目に整数列、2行目に閾値 k。k 以上の要素の個数を出力してください。\n\n入力例:\n1 5 2 8\n5\n\n出力例:\n2',
    starter: 'import pandas as pd\ns = pd.Series(list(map(int, input().split())))\nk = int(input())\n',
    hints: ['s >= k はブールの Series。', '.sum() で True の数。', '答え:\nprint(int((s >= k).sum()))'],
    explanation: 'ブール条件で絞り込むのは pandas の基本。df[df["col"] >= k] の形が頻出。\n\n模範解答:\nimport pandas as pd\ns = pd.Series(list(map(int, input().split())))\nk = int(input())\nprint(int((s >= k).sum()))',
    reference: 'import pandas as pd\ns = pd.Series(list(map(int, input().split())))\nk = int(input())\nprint(int((s >= k).sum()))',
    cases: [
      { input: '1 5 2 8\n5\n', expected: '2', sample: true },
      { input: '1 2 3\n2\n', expected: '2' },
      { input: '1 1 1\n5\n', expected: '0' },
    ],
    tip: '💡 複数条件は df[(df.a > 1) & (df.b < 5)]。& | を使い、各条件は括弧で囲む。',
  },
  {
    title: 'グループごとの合計 (groupby)',
    concept: 'pandas',
    tags: ['pandas', 'データ分析', 'groupby'],
    statement: '1行目に行数 N、続く N 行に「カテゴリ 値」。カテゴリごとの合計を、カテゴリ名の辞書順で「カテゴリ:合計」を空白区切りで出力してください。\n\n入力例:\n3\nA 10\nB 20\nA 5\n\n出力例:\nA:15 B:20',
    starter: 'import pandas as pd\nn = int(input())\nrows = [input().split() for _ in range(n)]\n',
    hints: ['DataFrame を作り、値の列を int に変換。', 'df.groupby("cat")["val"].sum() で集約。', '答え:\ng = df.groupby("cat")["val"].sum().sort_index()'],
    explanation: 'groupby は SQL の GROUP BY 相当。キーごとに集約する。\n\n模範解答:\nimport pandas as pd\nn = int(input())\nrows = [input().split() for _ in range(n)]\ndf = pd.DataFrame(rows, columns=["cat", "val"])\ndf["val"] = df["val"].astype(int)\ng = df.groupby("cat")["val"].sum().sort_index()\nprint(" ".join(f"{k}:{v}" for k, v in g.items()))',
    reference: 'import pandas as pd\nn = int(input())\nrows = [input().split() for _ in range(n)]\ndf = pd.DataFrame(rows, columns=["cat", "val"])\ndf["val"] = df["val"].astype(int)\ng = df.groupby("cat")["val"].sum().sort_index()\nprint(" ".join(f"{k}:{v}" for k, v in g.items()))',
    cases: [
      { input: '3\nA 10\nB 20\nA 5\n', expected: 'A:15 B:20', sample: true },
      { input: '1\nX 7\n', expected: 'X:7' },
      { input: '4\nb 1\na 2\nb 3\na 4\n', expected: 'a:6 b:4' },
    ],
    tip: '💡 groupby("col").agg({...}) で複数集約も。pandas の分析力の中核。',
  },
  {
    title: '列でソートして上位 (sort_values)',
    concept: 'pandas',
    tags: ['pandas', 'データ分析'],
    statement: '1行目に行数 N、続く N 行に「名前 点数」。点数の高い順に名前を空白区切りで出力してください（同点は入力順を保つ）。\n\n入力例:\n3\nalice 90\nbob 70\ncarol 90\n\n出力例:\nalice carol bob',
    starter: 'import pandas as pd\nn = int(input())\nrows = [input().split() for _ in range(n)]\n',
    hints: ['DataFrame を作り score を int に。', 'df.sort_values("score", ascending=False, kind="stable")。', '答え:\ndf = df.sort_values("score", ascending=False, kind="stable")\nprint(" ".join(df["name"]))'],
    explanation: 'sort_values で列を基準に並べ替え。kind="stable" で同値の順序を保つ。\n\n模範解答:\nimport pandas as pd\nn = int(input())\nrows = [input().split() for _ in range(n)]\ndf = pd.DataFrame(rows, columns=["name", "score"])\ndf["score"] = df["score"].astype(int)\ndf = df.sort_values("score", ascending=False, kind="stable")\nprint(" ".join(df["name"]))',
    reference: 'import pandas as pd\nn = int(input())\nrows = [input().split() for _ in range(n)]\ndf = pd.DataFrame(rows, columns=["name", "score"])\ndf["score"] = df["score"].astype(int)\ndf = df.sort_values("score", ascending=False, kind="stable")\nprint(" ".join(df["name"]))',
    cases: [
      { input: '3\nalice 90\nbob 70\ncarol 90\n', expected: 'alice carol bob', sample: true },
      { input: '2\nx 1\ny 2\n', expected: 'y x' },
    ],
    tip: '💡 df.sort_values(["a", "b"]) で複数列、df.head(k) で上位 k 件。ランキング作成の定番。',
  },
])

export const dataScienceProblems: Problem[] = [...lv085, ...lv095]
