// 生成タスク 第12波：データ分析(統計)。純Python+固定小数なので採点が一意・決定的。
const TASKS = []
const t = (obj) => TASKS.push(obj)

const STAT = ['2 4 4 4 5 5 7 9\n', '1 2 3 4 5\n', '10 10 10\n', '1 5\n', '3 1 4 1 5\n', '100 200 300\n']
t({ lv: 90, concept: '統計: 母分散', title: '母分散', tags: ['データ分析', '統計'], io: '整数のデータ列が1行で与えられます。', ask: '母分散 (平均からの偏差の2乗の平均) を小数4桁で出力してください。', h1: '平均を出す。', h2: 'Σ(x−mean)²/n。', ref: 'a=list(map(int,input().split()))\nm=sum(a)/len(a)\nprint(f"{sum((x-m)**2 for x in a)/len(a):.4f}")', ins: STAT })
t({ lv: 90, concept: '統計: 標準偏差', title: '母標準偏差', tags: ['データ分析', '統計'], io: '整数のデータ列が1行で与えられます。', ask: '母標準偏差を小数4桁で出力してください。', h1: '分散の平方根。', h2: 'sqrt(variance)。', ref: 'import math\na=list(map(int,input().split()))\nm=sum(a)/len(a)\nprint(f"{math.sqrt(sum((x-m)**2 for x in a)/len(a)):.4f}")', ins: STAT })
t({ lv: 90, concept: '統計: 偏差平方和', title: '偏差平方和', tags: ['データ分析', '統計'], io: '整数のデータ列が1行で与えられます。', ask: '各値の「平均との差の2乗」の総和を小数4桁で出力してください。', h1: '平均との差を2乗。', h2: '合計する。', ref: 'a=list(map(int,input().split()))\nm=sum(a)/len(a)\nprint(f"{sum((x-m)**2 for x in a):.4f}")', ins: STAT })
t({ lv: 90, concept: '統計: 平均(小数2桁)', title: '平均値', tags: ['データ分析', '統計'], io: '整数のデータ列が1行で与えられます。', ask: '平均値を小数2桁で出力してください。', h1: '合計÷個数。', h2: 'f"{...:.2f}"。', ref: 'a=list(map(int,input().split()))\nprint(f"{sum(a)/len(a):.2f}")', ins: STAT })
t({ lv: 90, concept: '統計: 中央値', title: '中央値', tags: ['データ分析', '統計', 'ソート'], io: '整数のデータ列が1行で与えられます。', ask: '中央値を小数1桁で出力してください (偶数個なら中央2つの平均)。', h1: 'ソートして真ん中。', h2: '偶数個は平均。', ref: 'a=sorted(map(int,input().split()))\nn=len(a)\nm=a[n//2] if n%2 else (a[n//2-1]+a[n//2])/2\nprint(f"{m:.1f}")', ins: STAT })
const CORR = ['1 2 3\n2 4 6\n', '1 2 3\n3 2 1\n', '1 2 3 4\n1 3 2 5\n', '10 20 30\n5 9 15\n', '1 2\n2 1\n', '2 4 6 8\n1 2 3 4\n']
t({ lv: 90, concept: '統計: 共分散', title: '共分散', tags: ['データ分析', '統計'], io: '2つの同じ長さのデータ列が各行で与えられます。', ask: '母共分散を小数4桁で出力してください。', h1: '各列の平均を出す。', h2: 'Σ(xᵢ−x̄)(yᵢ−ȳ)/n。', ref: 'a=list(map(int,input().split()))\nb=list(map(int,input().split()))\nn=len(a)\nma=sum(a)/n\nmb=sum(b)/n\nprint(f"{sum((a[i]-ma)*(b[i]-mb) for i in range(n))/n:.4f}")', ins: CORR })
t({ lv: 90, concept: '統計: 相関係数', title: 'ピアソンの相関係数', tags: ['データ分析', '統計'], io: '2つの同じ長さのデータ列が各行で与えられます (各列は定数でない)。', ask: 'ピアソンの相関係数を小数4桁で出力してください。', h1: '共分散÷(各標準偏差の積)。', h2: 'cov/√(va·vb)。', ref: 'import math\na=list(map(int,input().split()))\nb=list(map(int,input().split()))\nn=len(a)\nma=sum(a)/n\nmb=sum(b)/n\ncov=sum((a[i]-ma)*(b[i]-mb) for i in range(n))\nva=sum((x-ma)**2 for x in a)\nvb=sum((x-mb)**2 for x in b)\nprint(f"{cov/math.sqrt(va*vb):.4f}")', ins: CORR, tip: '💡 相関係数は -1〜1。1に近いほど正の直線関係。' })
const WAVG = ['1 2 3\n1 1 1\n', '10 20\n1 3\n', '5 5 5\n2 3 5\n', '1 2 3 4\n4 3 2 1\n', '100 0\n1 1\n', '3 6 9\n1 2 3\n']
t({ lv: 90, concept: '統計: 加重平均', title: '加重平均', tags: ['データ分析', '統計'], io: '1行目に値の列、2行目に対応する重みの列が与えられます。', ask: '加重平均 (Σ値×重み / Σ重み) を小数4桁で出力してください。', h1: '値×重みの和。', h2: '重みの和で割る。', ref: 'v=list(map(int,input().split()))\nw=list(map(int,input().split()))\nprint(f"{sum(x*y for x,y in zip(v,w))/sum(w):.4f}")', ins: WAVG })

export const CATALOG = TASKS
