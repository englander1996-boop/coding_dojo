import type { Problem } from '../../types'
import { build } from './_build.ts'

/** AtCoder 競プロ上級2（転倒数/BIT・最小全域木・bitDP）。 */
const lv850 = build(850, 'lv850', [
  {
    title: '転倒数（BIT / Fenwick木）',
    concept: '競プロ上級2',
    tags: ['転倒数', 'BIT', 'アルゴリズム'],
    statement:
      '整数列が与えられます。転倒数（i < j かつ a[i] > a[j] となるペアの数）を出力してください。\n\n入力例:\n3 1 2\n\n出力例:\n2',
    starter: 'a = list(map(int, input().split()))\n',
    hints: [
      '右から見て「すでに見た（右側の）自分より小さい値の個数」を足す。',
      'その個数集計を BIT(Fenwick木) で O(log N) に。値は座標圧縮。',
      '答え:\nfor x in a[::-1]:\n    inv += sm(rank[x] - 1)\n    add(rank[x])',
    ],
    explanation: '転倒数は「バブルソートの交換回数」。BIT で右側の小さい要素数を数えると O(N log N)。\n\n模範解答:\na = list(map(int, input().split()))\nsrt = sorted(set(a))\nrank = {v: i + 1 for i, v in enumerate(srt)}\nm = len(srt)\nbit = [0] * (m + 1)\ndef add(i):\n    while i <= m:\n        bit[i] += 1\n        i += i & -i\ndef sm(i):\n    s = 0\n    while i > 0:\n        s += bit[i]\n        i -= i & -i\n    return s\ninv = 0\nfor x in a[::-1]:\n    inv += sm(rank[x] - 1)\n    add(rank[x])\nprint(inv)',
    reference: 'a = list(map(int, input().split()))\nsrt = sorted(set(a))\nrank = {v: i + 1 for i, v in enumerate(srt)}\nm = len(srt)\nbit = [0] * (m + 1)\ndef add(i):\n    while i <= m:\n        bit[i] += 1\n        i += i & -i\ndef sm(i):\n    s = 0\n    while i > 0:\n        s += bit[i]\n        i -= i & -i\n    return s\ninv = 0\nfor x in a[::-1]:\n    inv += sm(rank[x] - 1)\n    add(rank[x])\nprint(inv)',
    cases: [
      { input: '3 1 2\n', expected: '2', sample: true },
      { input: '1 2 3\n', expected: '0' },
      { input: '3 2 1\n', expected: '3' },
      { input: '2 2 2\n', expected: '0' },
    ],
    tip: '💡 BIT(Fenwick木)は「点更新・区間和」を O(log N) で。転倒数・座標圧縮と相性抜群。',
  },
  {
    title: '最小全域木（クラスカル法）',
    concept: '競プロ上級2',
    tags: ['最小全域木', 'クラスカル', 'unionfind', 'アルゴリズム'],
    statement:
      '1行目に N M、続く M 行に重み付き無向辺「a b w」(0始まり)。全頂点をつなぐ最小コスト（最小全域木の総重み）を出力してください。連結前提。\n\n入力例:\n4 5\n0 1 1\n1 2 2\n2 3 3\n0 3 4\n0 2 5\n\n出力例:\n6',
    starter: 'n, m = map(int, input().split())\nedges = []\n',
    hints: ['辺を重み昇順に見て、閉路を作らないものだけ採用(貪欲)。', '閉路判定は Union-Find。', '答え:\nedges.sort()  # (w, a, b)\nfor w, a, b in edges:\n    if find(a) != find(b):\n        par[find(a)] = find(b)\n        total += w'],
    explanation: 'クラスカル法は「軽い辺から、つながっていない2点を結ぶ」貪欲。連結判定に Union-Find を使う。\n\n模範解答:\nn, m = map(int, input().split())\nedges = []\nfor _ in range(m):\n    a, b, w = map(int, input().split())\n    edges.append((w, a, b))\nedges.sort()\npar = list(range(n))\ndef find(x):\n    while par[x] != x:\n        par[x] = par[par[x]]\n        x = par[x]\n    return x\ntotal = 0\nfor w, a, b in edges:\n    ra, rb = find(a), find(b)\n    if ra != rb:\n        par[ra] = rb\n        total += w\nprint(total)',
    reference: 'n, m = map(int, input().split())\nedges = []\nfor _ in range(m):\n    a, b, w = map(int, input().split())\n    edges.append((w, a, b))\nedges.sort()\npar = list(range(n))\ndef find(x):\n    while par[x] != x:\n        par[x] = par[par[x]]\n        x = par[x]\n    return x\ntotal = 0\nfor w, a, b in edges:\n    ra, rb = find(a), find(b)\n    if ra != rb:\n        par[ra] = rb\n        total += w\nprint(total)',
    cases: [
      { input: '4 5\n0 1 1\n1 2 2\n2 3 3\n0 3 4\n0 2 5\n', expected: '6', sample: true },
      { input: '2 1\n0 1 10\n', expected: '10' },
      { input: '3 3\n0 1 1\n1 2 1\n0 2 5\n', expected: '2' },
    ],
    tip: '💡 もう一つの代表は「プリム法」(ダイクストラ風)。MSTはネットワーク設計・クラスタリングに応用。',
  },
  {
    title: '巡回セールスマン（bit DP）',
    concept: '競プロ上級2',
    tags: ['bitDP', 'dp', 'アルゴリズム'],
    statement:
      '1行目に都市数 N(≤12)、続く N 行に距離行列。都市0を出発し全都市をちょうど1回ずつ訪れて0に戻る最短距離を出力してください。\n\n入力例:\n3\n0 1 1\n1 0 1\n1 1 0\n\n出力例:\n3',
    starter: 'n = int(input())\nd = [list(map(int, input().split())) for _ in range(n)]\n',
    hints: ['dp[訪問済み集合][今いる都市] = 最短距離。集合はビットで表す。', 'dp[1<<0][0]=0 から、未訪問の都市 v へ遷移。', '答え:\nfor mask in range(1 << n):\n    for u in range(n):\n        ...未訪問 v に dp[mask|1<<v][v] を更新...'],
    explanation: 'bitDP は「訪問済み集合」をビットマスクで持つDP。TSP は dp[mask][u] で O(2^N · N^2)。\n\n模範解答:\nn = int(input())\nd = [list(map(int, input().split())) for _ in range(n)]\nINF = float("inf")\ndp = [[INF] * n for _ in range(1 << n)]\ndp[1][0] = 0\nfor mask in range(1 << n):\n    for u in range(n):\n        if dp[mask][u] == INF:\n            continue\n        for v in range(n):\n            if mask >> v & 1:\n                continue\n            nm = mask | 1 << v\n            if dp[mask][u] + d[u][v] < dp[nm][v]:\n                dp[nm][v] = dp[mask][u] + d[u][v]\nfull = (1 << n) - 1\nprint(min(dp[full][u] + d[u][0] for u in range(n)))',
    reference: 'n = int(input())\nd = [list(map(int, input().split())) for _ in range(n)]\nINF = float("inf")\ndp = [[INF] * n for _ in range(1 << n)]\ndp[1][0] = 0\nfor mask in range(1 << n):\n    for u in range(n):\n        if dp[mask][u] == INF:\n            continue\n        for v in range(n):\n            if mask >> v & 1:\n                continue\n            nm = mask | 1 << v\n            if dp[mask][u] + d[u][v] < dp[nm][v]:\n                dp[nm][v] = dp[mask][u] + d[u][v]\nfull = (1 << n) - 1\nprint(min(dp[full][u] + d[u][0] for u in range(n)))',
    cases: [
      { input: '3\n0 1 1\n1 0 1\n1 1 0\n', expected: '3', sample: true },
      { input: '2\n0 5\n5 0\n', expected: '10' },
      { input: '4\n0 1 2 3\n1 0 1 2\n2 1 0 1\n3 2 1 0\n', expected: '6' },
    ],
    tip: '💡 bitDP は「集合を状態に持つDP」。TSP・集合被覆・部分集合の和分割などに。N≤20程度まで。',
  },
])

export const atcoder2Problems: Problem[] = lv850
