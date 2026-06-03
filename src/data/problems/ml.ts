import type { Problem } from '../../types'
import { build } from './_build.ts'

/**
 * 機械学習入門（Kaggle トラック / scikit-learn）。
 * Pyodide が scikit-learn を import から自動ロードする。
 * 採点の安定性のため、決定的な処理(指標・前処理・閉形式回帰・k=1 KNN)に絞り、
 * 出力は小数2桁などに固定する。
 */

const lv110 = build(110, 'lv110', [
  {
    title: '正解率 (accuracy_score)',
    concept: '機械学習入門',
    tags: ['sklearn', '評価指標', 'データ分析'],
    statement: '1行目に正解ラベル列、2行目に予測ラベル列(同じ長さ、0/1)。正解率を小数第2位まで出力してください。\n\n入力例:\n1 0 1 1\n1 0 0 1\n\n出力例:\n0.75',
    starter: 'from sklearn.metrics import accuracy_score\ny = list(map(int, input().split()))\np = list(map(int, input().split()))\n',
    hints: ['正解率 = 当たった数 / 全体。', 'sklearn.metrics.accuracy_score(y, p)。', '答え:\nprint(f"{accuracy_score(y, p):.2f}")'],
    explanation: '正解率(accuracy)は最も基本的な分類の評価指標。予測と正解が一致した割合。\n\n模範解答:\nfrom sklearn.metrics import accuracy_score\ny = list(map(int, input().split()))\np = list(map(int, input().split()))\nprint(f"{accuracy_score(y, p):.2f}")',
    reference: 'from sklearn.metrics import accuracy_score\ny = list(map(int, input().split()))\np = list(map(int, input().split()))\nprint(f"{accuracy_score(y, p):.2f}")',
    cases: [
      { input: '1 0 1 1\n1 0 0 1\n', expected: '0.75', sample: true },
      { input: '1 1 1\n1 1 1\n', expected: '1.00' },
      { input: '0 1\n1 0\n', expected: '0.00' },
    ],
    tip: '💡 accuracy だけでは不均衡データに弱い。precision/recall/F1・confusion_matrix も sklearn.metrics にある。',
  },
  {
    title: '平均二乗誤差 (MSE)',
    concept: '機械学習入門',
    tags: ['sklearn', '評価指標', 'データ分析'],
    statement: '1行目に実測値、2行目に予測値(同じ長さ)。平均二乗誤差(MSE)を小数第2位まで出力してください。\n\n入力例:\n1 2 3\n1 2 4\n\n出力例:\n0.33',
    starter: 'from sklearn.metrics import mean_squared_error\ny = list(map(float, input().split()))\np = list(map(float, input().split()))\n',
    hints: ['MSE = 各誤差の2乗の平均。', 'mean_squared_error(y, p)。', '答え:\nprint(f"{mean_squared_error(y, p):.2f}")'],
    explanation: 'MSE は回帰の代表的な評価指標。誤差を2乗して平均するので大きな外れを強く罰する。\n\n模範解答:\nfrom sklearn.metrics import mean_squared_error\ny = list(map(float, input().split()))\np = list(map(float, input().split()))\nprint(f"{mean_squared_error(y, p):.2f}")',
    reference: 'from sklearn.metrics import mean_squared_error\ny = list(map(float, input().split()))\np = list(map(float, input().split()))\nprint(f"{mean_squared_error(y, p):.2f}")',
    cases: [
      { input: '1 2 3\n1 2 4\n', expected: '0.33', sample: true },
      { input: '0 0\n0 0\n', expected: '0.00' },
      { input: '1 2\n3 4\n', expected: '4.00' },
    ],
    tip: '💡 RMSE は MSE の平方根で単位が元データと揃う。回帰コンペの定番指標。',
  },
  {
    title: '標準化 (StandardScaler)',
    concept: '機械学習入門',
    tags: ['sklearn', '正規化', 'データ分析'],
    statement: '整数列を標準化(平均0・分散1)し、各値を小数第2位まで空白区切りで出力してください。\n\n入力例:\n1 2 3 4 5\n\n出力例:\n-1.41 -0.71 0.00 0.71 1.41',
    starter: 'from sklearn.preprocessing import StandardScaler\nimport numpy as np\na = np.array(list(map(float, input().split()))).reshape(-1, 1)\n',
    hints: ['標準化は (x - 平均) / 標準偏差。', 'StandardScaler().fit_transform(2次元配列)。', '答え:\nz = StandardScaler().fit_transform(a).ravel()\nprint(" ".join(f"{v:.2f}" for v in z))'],
    explanation: '標準化は特徴量のスケールを揃える前処理。多くのモデルで精度が安定する。列ベクトル(reshape(-1,1))にして渡す。\n\n模範解答:\nfrom sklearn.preprocessing import StandardScaler\nimport numpy as np\na = np.array(list(map(float, input().split()))).reshape(-1, 1)\nz = StandardScaler().fit_transform(a).ravel()\nprint(" ".join(f"{v:.2f}" for v in z))',
    reference: 'from sklearn.preprocessing import StandardScaler\nimport numpy as np\na = np.array(list(map(float, input().split()))).reshape(-1, 1)\nz = StandardScaler().fit_transform(a).ravel()\nprint(" ".join(f"{v:.2f}" for v in z))',
    cases: [
      { input: '1 2 3 4 5\n', expected: '-1.41 -0.71 0.00 0.71 1.41', sample: true },
      { input: '10 20\n', expected: '-1.00 1.00' },
    ],
    tip: '💡 fit で平均/分散を学習、transform で変換。学習データで fit し、テストデータは同じscalerで transform するのが鉄則。',
  },
  {
    title: '線形回帰で予測 (LinearRegression)',
    concept: '機械学習入門',
    tags: ['sklearn', '線形回帰', 'データ分析'],
    statement: '1行目に点数 N、続く N 行に学習データ「x y」、最後の行に予測したい x。直線回帰して、その x に対する予測値を小数第2位まで出力してください。\n\n入力例:\n3\n1 2\n2 4\n3 6\n4\n\n出力例:\n8.00',
    starter: 'from sklearn.linear_model import LinearRegression\nimport numpy as np\nn = int(input())\n',
    hints: ['学習データ X は2次元、y は1次元。', 'LinearRegression().fit(X, y) のあと .predict([[x]])。', '答え:\nm = LinearRegression().fit(X, y)\nprint(f"{m.predict([[q]])[0]:.2f}")'],
    explanation: '線形回帰は y ≈ a*x + b の直線を最小二乗で当てはめる。fit で学習、predict で予測。\n\n模範解答:\nfrom sklearn.linear_model import LinearRegression\nimport numpy as np\nn = int(input())\npts = [tuple(map(float, input().split())) for _ in range(n)]\nX = np.array([[p[0]] for p in pts])\ny = np.array([p[1] for p in pts])\nq = float(input())\nm = LinearRegression().fit(X, y)\nprint(f"{m.predict([[q]])[0]:.2f}")',
    reference: 'from sklearn.linear_model import LinearRegression\nimport numpy as np\nn = int(input())\npts = [tuple(map(float, input().split())) for _ in range(n)]\nX = np.array([[p[0]] for p in pts])\ny = np.array([p[1] for p in pts])\nq = float(input())\nm = LinearRegression().fit(X, y)\nprint(f"{m.predict([[q]])[0]:.2f}")',
    cases: [
      { input: '3\n1 2\n2 4\n3 6\n4\n', expected: '8.00', sample: true },
      { input: '2\n0 0\n1 1\n5\n', expected: '5.00' },
      { input: '3\n0 1\n1 3\n2 5\n3\n', expected: '7.00' },
    ],
    tip: '💡 .coef_ で傾き、.intercept_ で切片が取れる。多変数なら X の列を増やすだけ(重回帰)。',
  },
  {
    title: '最近傍で分類 (KNN)',
    concept: '機械学習入門',
    tags: ['sklearn', '分類', 'データ分析'],
    statement: '1行目に学習データ数 N、続く N 行に「x y ラベル」、最後の行に分類したい点「qx qy」。最も近い1点(k=1)のラベルを出力してください。\n\n入力例:\n3\n0 0 A\n10 10 B\n0 1 A\n1 1\n\n出力例:\nA',
    starter: 'from sklearn.neighbors import KNeighborsClassifier\nn = int(input())\nX = []\ny = []\n',
    hints: ['学習: X=[[x,y],...], y=[ラベル,...]。', 'KNeighborsClassifier(n_neighbors=1).fit(X, y) → predict。', '答え:\nclf = KNeighborsClassifier(n_neighbors=1).fit(X, y)\nprint(clf.predict([[qx, qy]])[0])'],
    explanation: 'k近傍法は「一番近いk個の多数決」で分類する素朴で強力な手法。k=1 は最も近い1点のラベルをそのまま採用。\n\n模範解答:\nfrom sklearn.neighbors import KNeighborsClassifier\nn = int(input())\nX = []\ny = []\nfor _ in range(n):\n    a, b, c = input().split()\n    X.append([float(a), float(b)])\n    y.append(c)\nqx, qy = map(float, input().split())\nclf = KNeighborsClassifier(n_neighbors=1).fit(X, y)\nprint(clf.predict([[qx, qy]])[0])',
    reference: 'from sklearn.neighbors import KNeighborsClassifier\nn = int(input())\nX = []\ny = []\nfor _ in range(n):\n    a, b, c = input().split()\n    X.append([float(a), float(b)])\n    y.append(c)\nqx, qy = map(float, input().split())\nclf = KNeighborsClassifier(n_neighbors=1).fit(X, y)\nprint(clf.predict([[qx, qy]])[0])',
    cases: [
      { input: '3\n0 0 A\n10 10 B\n0 1 A\n1 1\n', expected: 'A', sample: true },
      { input: '2\n0 0 X\n5 5 Y\n4 4\n', expected: 'Y' },
      { input: '3\n1 1 P\n9 9 Q\n8 8 Q\n2 2\n', expected: 'P' },
    ],
    tip: '💡 k を増やすと多数決でノイズに強くなる。距離計算するので特徴量の標準化が効く(前のレベル参照)。',
  },
])

export const mlProblems: Problem[] = lv110
