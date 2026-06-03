import type { Problem } from '../../types'
import { build } from './_build.ts'

/** pandas 応用（Kaggle 前処理: 結合 / 欠損 / one-hot / ビニング）。 */
const lv105 = build(105, 'lv105', [
  {
    title: 'テーブル結合 (merge)',
    concept: 'pandas応用',
    tags: ['pandas', '結合', 'データ分析'],
    statement:
      '2つの表を id で内部結合します。1行目に N、続く N 行に「id name」。次に M、続く M 行に「id score」。id で結合し、「name score」を id 昇順で各行に出力してください。\n\n入力例:\n2\n1 alice\n2 bob\n2\n1 90\n2 80\n\n出力例:\nalice 90\nbob 80',
    starter: 'import pandas as pd\nn = int(input())\nt1 = pd.DataFrame([input().split() for _ in range(n)], columns=["id", "name"])\n',
    hints: ['pd.merge(t1, t2, on="id") で共通キー結合(内部結合)。', 'sort_values("id") で並べ、iterrows で行ごとに出力。', '答え:\nmerged = pd.merge(t1, t2, on="id").sort_values("id")\nfor _, row in merged.iterrows():\n    print(row["name"], row["score"])'],
    explanation: 'merge は SQL の JOIN 相当。on= で結合キー、how= で内部/外部を選ぶ。データ分析で複数テーブルを統合する基本。\n\n模範解答:\nimport pandas as pd\nn = int(input())\nt1 = pd.DataFrame([input().split() for _ in range(n)], columns=["id", "name"])\nm = int(input())\nt2 = pd.DataFrame([input().split() for _ in range(m)], columns=["id", "score"])\nmerged = pd.merge(t1, t2, on="id").sort_values("id")\nfor _, row in merged.iterrows():\n    print(row["name"], row["score"])',
    reference: 'import pandas as pd\nn = int(input())\nt1 = pd.DataFrame([input().split() for _ in range(n)], columns=["id", "name"])\nm = int(input())\nt2 = pd.DataFrame([input().split() for _ in range(m)], columns=["id", "score"])\nmerged = pd.merge(t1, t2, on="id").sort_values("id")\nfor _, row in merged.iterrows():\n    print(row["name"], row["score"])',
    cases: [
      { input: '2\n1 alice\n2 bob\n2\n1 90\n2 80\n', expected: 'alice 90\nbob 80', sample: true },
      { input: '2\n1 a\n2 b\n1\n2 50\n', expected: 'b 50' },
    ],
    tip: '💡 how="left"/"outer" で結合方法を変えられる。複数キーは on=["a","b"]。',
  },
  {
    title: '欠損値を平均で埋める (fillna)',
    concept: 'pandas応用',
    tags: ['pandas', '欠損処理', 'データ分析'],
    statement:
      '空白区切りの値列が与えられます。"?" は欠損を表します。欠損を「欠損でない値の平均(小数第1位に丸め)」で埋め、全体を小数第1位まで空白区切りで出力してください。\n\n入力例:\n1 2 ? 4\n\n出力例:\n1.0 2.0 2.3 4.0',
    starter: 'import pandas as pd\nimport numpy as np\ntoks = input().split()\n',
    hints: ['"?" を np.nan に、それ以外を float にして Series を作る。', 's.fillna(s.mean()) で欠損を平均で埋める。', '答え:\nvals = [np.nan if t == "?" else float(t) for t in toks]\ns = pd.Series(vals).fillna(round(pd.Series(vals).mean(), 1))\nprint(" ".join(f"{v:.1f}" for v in s))'],
    explanation: '欠損値処理(fillna)は前処理の必須技。平均・中央値・0・前後の値などで埋める。\n\n模範解答:\nimport pandas as pd\nimport numpy as np\ntoks = input().split()\nvals = [np.nan if t == "?" else float(t) for t in toks]\ns = pd.Series(vals)\ns = s.fillna(round(s.mean(), 1))\nprint(" ".join(f"{v:.1f}" for v in s))',
    reference: 'import pandas as pd\nimport numpy as np\ntoks = input().split()\nvals = [np.nan if t == "?" else float(t) for t in toks]\ns = pd.Series(vals)\ns = s.fillna(round(s.mean(), 1))\nprint(" ".join(f"{v:.1f}" for v in s))',
    cases: [
      { input: '1 2 ? 4\n', expected: '1.0 2.0 2.3 4.0', sample: true },
      { input: '? 10\n', expected: '10.0 10.0' },
      { input: '5 5 5\n', expected: '5.0 5.0 5.0' },
    ],
    tip: '💡 中央値で埋めるなら s.median()、直前値なら s.ffill()。欠損の埋め方で精度が変わる。',
  },
  {
    title: 'one-hot エンコーディング (get_dummies)',
    concept: 'pandas応用',
    tags: ['pandas', 'one-hot', 'データ分析'],
    statement:
      '空白区切りのカテゴリ列が与えられます。pd.get_dummies で one-hot 化し、1行目に列名(カテゴリ昇順)を空白区切り、続けて各行の 0/1 を空白区切りで出力してください。\n\n入力例:\na b a\n\n出力例:\na b\n1 0\n0 1\n1 0',
    starter: 'import pandas as pd\ncats = input().split()\n',
    hints: ['pd.get_dummies(Series) で各カテゴリが列になる(値は0/1)。', '列名は自動でカテゴリ昇順。astype(int) で 0/1 に。', '答え:\nd = pd.get_dummies(pd.Series(cats)).astype(int)\nprint(" ".join(d.columns))\nfor _, row in d.iterrows():\n    print(" ".join(map(str, row)))'],
    explanation: 'one-hot エンコーディングは「カテゴリを数値特徴に変換」する定番。各カテゴリを 0/1 の列に展開する。\n\n模範解答:\nimport pandas as pd\ncats = input().split()\nd = pd.get_dummies(pd.Series(cats)).astype(int)\nprint(" ".join(d.columns))\nfor _, row in d.iterrows():\n    print(" ".join(map(str, row)))',
    reference: 'import pandas as pd\ncats = input().split()\nd = pd.get_dummies(pd.Series(cats)).astype(int)\nprint(" ".join(d.columns))\nfor _, row in d.iterrows():\n    print(" ".join(map(str, row)))',
    cases: [
      { input: 'a b a\n', expected: 'a b\n1 0\n0 1\n1 0', sample: true },
      { input: 'x\n', expected: 'x\n1' },
      { input: 'p q r\n', expected: 'p q r\n1 0 0\n0 1 0\n0 0 1' },
    ],
    tip: '💡 カテゴリ数が多いと列が爆発する。drop_first=True で1列減らす、頻度の低いものはまとめる等の工夫を。',
  },
  {
    title: '数値のビニング (cut)',
    concept: 'pandas応用',
    tags: ['pandas', 'ビニング', 'データ分析'],
    statement:
      '0〜100 の整数列が与えられます。pd.cut で low(0-33) / mid(34-66) / high(67-100) の3区間に分け、各区間の個数を「区間名:個数」で出力してください。\n\n入力例:\n10 50 90 30 70\n\n出力例:\nlow:2 mid:1 high:2',
    starter: 'import pandas as pd\na = list(map(int, input().split()))\n',
    hints: ['pd.cut(a, bins=[-1,33,66,100], labels=["low","mid","high"])。', 'value_counts().reindex(labels) で順序を固定。', '答え:\nc = pd.cut(a, bins=[-1, 33, 66, 100], labels=labels).value_counts().reindex(labels)\nprint(" ".join(f"{l}:{int(c[l])}" for l in labels))'],
    explanation: 'ビニング(cut)は連続値をカテゴリに区切る特徴量エンジニアリング。年齢→年代などに使う。\n\n模範解答:\nimport pandas as pd\na = list(map(int, input().split()))\nlabels = ["low", "mid", "high"]\nc = pd.cut(a, bins=[-1, 33, 66, 100], labels=labels).value_counts().reindex(labels)\nprint(" ".join(f"{l}:{int(c[l])}" for l in labels))',
    reference: 'import pandas as pd\na = list(map(int, input().split()))\nlabels = ["low", "mid", "high"]\nc = pd.cut(a, bins=[-1, 33, 66, 100], labels=labels).value_counts().reindex(labels)\nprint(" ".join(f"{l}:{int(c[l])}" for l in labels))',
    cases: [
      { input: '10 50 90 30 70\n', expected: 'low:2 mid:1 high:2', sample: true },
      { input: '0 100\n', expected: 'low:1 mid:0 high:1' },
      { input: '40 50 60\n', expected: 'low:0 mid:3 high:0' },
    ],
    tip: '💡 等幅で切るなら pd.cut、件数が均等になるよう切るなら pd.qcut(分位ビニング)。',
  },
])

export const kaggle2Problems: Problem[] = lv105
