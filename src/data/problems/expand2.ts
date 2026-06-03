import type { Problem } from '../../types'
import { build } from './_build.ts'

/**
 * 拡張バッチ2：既存に無い古典アルゴリズムパターンを1問1パターンで追加。
 * 問題文・入出力形式・例の数値はすべて本アプリ用に書き下ろしたオリジナル
 * （特定プラットフォームの問題文やストーリーの転載はしていない）。
 * パターン名は features.ts にも登録し、coverage で「新しい学び」を追跡できるようにした。
 * lv50以上のため、言語の土台機能は使うだけ（初出させない）＝前提の穴を作らない。
 */

// ===== lv120 全探索・累積和：前計算の発展 =====
const lv120 = build(120, 'lv120y', [
  {
    title: '長方形領域の合計（2次元累積和）',
    concept: '2次元の前計算',
    tags: ['2次元累積和', '累積和', 'アルゴリズム'],
    statement:
      'H 行 W 列の数表があります。続いて Q 個の問い合わせ「r1 c1 r2 c2」が与えられ、左上 (r1,c1) から右下 (r2,c2) までの長方形に含まれる値の合計を答えます（行・列は1始まり、両端を含む）。各問い合わせの答えを1行ずつ出力してください。\n\n入力例:\n2 3\n1 2 3\n4 5 6\n3\n1 1 2 3\n1 1 1 2\n2 2 2 3\n\n出力例:\n21\n3\n11',
    starter: 'h, w = map(int, input().split())\ng = [list(map(int, input().split())) for _ in range(h)]\n',
    hints: [
      'S[i][j] = 「左上から (i,j) までの長方形の合計」を前計算しておくと、各問い合わせが定数時間に。',
      'S[i+1][j+1] = S[i][j+1] + S[i+1][j] - S[i][j] + g[i][j]（重なる部分を1回引く）。',
      '答え:\nh, w = map(int, input().split())\ng = [list(map(int, input().split())) for _ in range(h)]\nS = [[0] * (w + 1) for _ in range(h + 1)]\nfor i in range(h):\n    for j in range(w):\n        S[i + 1][j + 1] = S[i][j + 1] + S[i + 1][j] - S[i][j] + g[i][j]\nq = int(input())\nout = []\nfor _ in range(q):\n    r1, c1, r2, c2 = map(int, input().split())\n    out.append(str(S[r2][c2] - S[r1 - 1][c2] - S[r2][c1 - 1] + S[r1 - 1][c1 - 1]))\nprint("\\n".join(out))',
    ],
    explanation:
      '1次元累積和を縦横に広げたもの。包除原理で「下端まで − 上の余分 − 左の余分 + 二重に引いた角」を足し引きする。前計算 O(HW)・各クエリ O(1)。\n\n模範解答:\nh, w = map(int, input().split())\ng = [list(map(int, input().split())) for _ in range(h)]\nS = [[0] * (w + 1) for _ in range(h + 1)]\nfor i in range(h):\n    for j in range(w):\n        S[i + 1][j + 1] = S[i][j + 1] + S[i + 1][j] - S[i][j] + g[i][j]\nq = int(input())\nout = []\nfor _ in range(q):\n    r1, c1, r2, c2 = map(int, input().split())\n    out.append(str(S[r2][c2] - S[r1 - 1][c2] - S[r2][c1 - 1] + S[r1 - 1][c1 - 1]))\nprint("\\n".join(out))',
    reference:
      'h, w = map(int, input().split())\ng = [list(map(int, input().split())) for _ in range(h)]\nS = [[0] * (w + 1) for _ in range(h + 1)]\nfor i in range(h):\n    for j in range(w):\n        S[i + 1][j + 1] = S[i][j + 1] + S[i + 1][j] - S[i][j] + g[i][j]\nq = int(input())\nout = []\nfor _ in range(q):\n    r1, c1, r2, c2 = map(int, input().split())\n    out.append(str(S[r2][c2] - S[r1 - 1][c2] - S[r2][c1 - 1] + S[r1 - 1][c1 - 1]))\nprint("\\n".join(out))',
    cases: [
      { input: '2 3\n1 2 3\n4 5 6\n3\n1 1 2 3\n1 1 1 2\n2 2 2 3\n', expected: '21\n3\n11', sample: true },
      { input: '1 1\n7\n1\n1 1 1 1\n', expected: '7' },
      { input: '3 3\n1 1 1\n1 1 1\n1 1 1\n2\n1 1 3 3\n2 2 3 3\n', expected: '9\n4' },
    ],
    tip: '💡 2次元累積和は「画像の積分画像」と同じ発想。前計算しておけば矩形和が一瞬。',
  },
  {
    title: '同時に参加した最大人数（いもす法）',
    concept: '2次元の前計算',
    tags: ['いもす法', '累積和', 'アルゴリズム'],
    statement:
      '長さ T の時間軸（位置 0〜T-1）があります。M 人がそれぞれ区間 [l, r)（l 以上 r 未満）の間だけ参加します。どの時刻でも最大何人が同時に参加していたかを出力してください。\n\n入力例:\n5 3\n0 3\n1 4\n2 5\n\n出力例:\n3',
    starter: 't, m = map(int, input().split())\n',
    hints: [
      '区間ごとに毎回 +1 して回ると遅い。境界だけに印をつける「いもす法」を使う。',
      '区間 [l, r) は diff[l] += 1, diff[r] -= 1。最後に前から累積すると各時刻の人数になる。',
      '答え:\nt, m = map(int, input().split())\ndiff = [0] * (t + 1)\nfor _ in range(m):\n    l, r = map(int, input().split())\n    diff[l] += 1\n    diff[r] -= 1\ncur = 0\nbest = 0\nfor i in range(t):\n    cur += diff[i]\n    if cur > best:\n        best = cur\nprint(best)',
    ],
    explanation:
      'いもす法は「区間加算 → 最後にまとめて累積」で区間更新を O(1)/件にする手法。入口で +1、出口で −1 を置き、累積和で復元する。\n\n模範解答:\nt, m = map(int, input().split())\ndiff = [0] * (t + 1)\nfor _ in range(m):\n    l, r = map(int, input().split())\n    diff[l] += 1\n    diff[r] -= 1\ncur = 0\nbest = 0\nfor i in range(t):\n    cur += diff[i]\n    if cur > best:\n        best = cur\nprint(best)',
    reference:
      't, m = map(int, input().split())\ndiff = [0] * (t + 1)\nfor _ in range(m):\n    l, r = map(int, input().split())\n    diff[l] += 1\n    diff[r] -= 1\ncur = 0\nbest = 0\nfor i in range(t):\n    cur += diff[i]\n    if cur > best:\n        best = cur\nprint(best)',
    cases: [
      { input: '5 3\n0 3\n1 4\n2 5\n', expected: '3', sample: true },
      { input: '3 2\n0 1\n2 3\n', expected: '1' },
      { input: '10 1\n0 10\n', expected: '1' },
      { input: '4 3\n0 4\n0 4\n0 4\n', expected: '3' },
    ],
    tip: '💡 いもす法は「入口で+1・出口で-1して後で累積」。区間の重なり数えの定番。',
  },
])

// ===== lv130 数論：組合せ mod =====
const lv130 = build(130, 'lv130y', [
  {
    title: '二項係数 nCr を素数で割った余り',
    concept: '組合せとモジュラ逆元',
    tags: ['二項係数mod', '数論', 'アルゴリズム'],
    statement:
      '整数 n, r が空白区切りで与えられます。組合せの数 nCr を 1000000007 で割った余りを出力してください（r が 0 未満または n より大きいときは 0）。\n\n入力例:\n5 2\n\n出力例:\n10',
    starter: 'MOD = 10**9 + 7\nn, r = map(int, input().split())\n',
    hints: [
      'nCr = n! / (r! (n-r)!)。mod の世界では割り算の代わりに「逆元」を掛ける。',
      '素数 p での逆元はフェルマーの小定理より a^(p-2) mod p。pow(a, p-2, p) で求まる。',
      '答え:\nMOD = 10**9 + 7\nn, r = map(int, input().split())\nif r < 0 or r > n:\n    print(0)\nelse:\n    fact = [1] * (n + 1)\n    for i in range(1, n + 1):\n        fact[i] = fact[i - 1] * i % MOD\n    ans = fact[n] * pow(fact[r], MOD - 2, MOD) % MOD * pow(fact[n - r], MOD - 2, MOD) % MOD\n    print(ans)',
    ],
    explanation:
      'mod 上では「割る」は「逆元を掛ける」。素数 p に対し a の逆元は a^(p-2)（フェルマーの小定理）で、pow の3引数版が繰り返し二乗法で高速計算する。\n\n模範解答:\nMOD = 10**9 + 7\nn, r = map(int, input().split())\nif r < 0 or r > n:\n    print(0)\nelse:\n    fact = [1] * (n + 1)\n    for i in range(1, n + 1):\n        fact[i] = fact[i - 1] * i % MOD\n    ans = fact[n] * pow(fact[r], MOD - 2, MOD) % MOD * pow(fact[n - r], MOD - 2, MOD) % MOD\n    print(ans)',
    reference:
      'MOD = 10**9 + 7\nn, r = map(int, input().split())\nif r < 0 or r > n:\n    print(0)\nelse:\n    fact = [1] * (n + 1)\n    for i in range(1, n + 1):\n        fact[i] = fact[i - 1] * i % MOD\n    ans = fact[n] * pow(fact[r], MOD - 2, MOD) % MOD * pow(fact[n - r], MOD - 2, MOD) % MOD\n    print(ans)',
    cases: [
      { input: '5 2\n', expected: '10', sample: true },
      { input: '6 3\n', expected: '20' },
      { input: '10 5\n', expected: '252' },
      { input: '4 4\n', expected: '1' },
      { input: '3 5\n', expected: '0' },
    ],
    tip: '💡 「mod での割り算」は逆元の掛け算。素数 mod なら pow(a, MOD-2, MOD) が逆元。',
  },
])

// ===== lv550 探索：二分探索の応用（lv500で二分探索の自作を学んだ後）=====
const lv550 = build(550, 'lv550y', [
  {
    title: '積荷を分ける（答えで二分探索）',
    concept: '答えを二分探索する',
    tags: ['答えで二分探索', '二分探索', 'アルゴリズム'],
    statement:
      '荷物が N 個、重さが順番に並んでいます。これを順番を保ったまま連続するグループに分け、ちょうど K 台のトラックに積みます（各トラックは連続する荷物をまとめて運ぶ）。トラック1台あたりの積載量の最大値を、できるだけ小さくしたときの値を出力してください。\n\n入力例:\n5 2\n1 2 3 4 5\n\n出力例:\n9',
    starter: 'n, k = map(int, input().split())\nw = list(map(int, input().split()))\n',
    hints: [
      '「最大積載を x 以下にして K 台に収まるか？」は貪欲に詰めれば判定できる。',
      'x を大きくするほど収まりやすい（単調）。なので答えそのものを二分探索できる。',
      '答え:\nn, k = map(int, input().split())\nw = list(map(int, input().split()))\n\ndef ok(cap):\n    trucks = 1\n    cur = 0\n    for x in w:\n        if x > cap:\n            return False\n        if cur + x <= cap:\n            cur += x\n        else:\n            trucks += 1\n            cur = x\n    return trucks <= k\n\nlo, hi = max(w), sum(w)\nwhile lo < hi:\n    mid = (lo + hi) // 2\n    if ok(mid):\n        hi = mid\n    else:\n        lo = mid + 1\nprint(lo)',
    ],
    explanation:
      '答えに単調性（ある値で可能なら、それより大きい値でも可能）があるとき、答え自体を二分探索できる。判定 ok(x) を作り、True になる最小の x を探す。\n\n模範解答:\nn, k = map(int, input().split())\nw = list(map(int, input().split()))\n\ndef ok(cap):\n    trucks = 1\n    cur = 0\n    for x in w:\n        if x > cap:\n            return False\n        if cur + x <= cap:\n            cur += x\n        else:\n            trucks += 1\n            cur = x\n    return trucks <= k\n\nlo, hi = max(w), sum(w)\nwhile lo < hi:\n    mid = (lo + hi) // 2\n    if ok(mid):\n        hi = mid\n    else:\n        lo = mid + 1\nprint(lo)',
    reference:
      'n, k = map(int, input().split())\nw = list(map(int, input().split()))\n\ndef ok(cap):\n    trucks = 1\n    cur = 0\n    for x in w:\n        if x > cap:\n            return False\n        if cur + x <= cap:\n            cur += x\n        else:\n            trucks += 1\n            cur = x\n    return trucks <= k\n\nlo, hi = max(w), sum(w)\nwhile lo < hi:\n    mid = (lo + hi) // 2\n    if ok(mid):\n        hi = mid\n    else:\n        lo = mid + 1\nprint(lo)',
    cases: [
      { input: '5 2\n1 2 3 4 5\n', expected: '9', sample: true },
      { input: '3 3\n1 2 3\n', expected: '3' },
      { input: '4 1\n1 2 3 4\n', expected: '10' },
      { input: '6 3\n7 2 5 10 8 1\n', expected: '14' },
    ],
    tip: '💡 「最大を最小化／最小を最大化」と来たら、答えそのものを二分探索できないか疑う。',
  },
])

// ===== lv600 グラフ探索：彩色 =====
const lv600 = build(600, 'lv600y', [
  {
    title: '2チームに分けられるか（二部グラフ判定）',
    concept: 'グラフの2彩色',
    tags: ['二部グラフ', 'グラフ', 'アルゴリズム'],
    statement:
      'N 人と、M 組の「仲が悪いペア」が与えられます。仲が悪い2人は必ず別チームになるように、全員を2チームに分けられるなら yes、どうやっても無理なら no を出力してください。\n\n入力例:\n4 4\n1 2\n2 3\n3 4\n4 1\n\n出力例:\nyes',
    starter: 'from collections import deque\nn, m = map(int, input().split())\n',
    hints: [
      'グラフを2色で塗り、隣り合う頂点が必ず違う色になればよい（二部グラフ判定）。',
      'BFS で訪問しながら、隣を逆の色で塗る。すでに同じ色で塗られていたら矛盾＝no。',
      '答え:\nfrom collections import deque\nn, m = map(int, input().split())\ng = [[] for _ in range(n)]\nfor _ in range(m):\n    a, b = map(int, input().split())\n    g[a - 1].append(b - 1)\n    g[b - 1].append(a - 1)\ncolor = [-1] * n\nok = True\nfor s in range(n):\n    if color[s] != -1:\n        continue\n    color[s] = 0\n    dq = deque([s])\n    while dq:\n        v = dq.popleft()\n        for u in g[v]:\n            if color[u] == -1:\n                color[u] = color[v] ^ 1\n                dq.append(u)\n            elif color[u] == color[v]:\n                ok = False\nprint("yes" if ok else "no")',
    ],
    explanation:
      '「2グループに矛盾なく分けられる」＝二部グラフ。BFS/DFS で交互に塗り分け、隣が同色になったら不可能。連結でないので全頂点を始点候補に回す。\n\n模範解答:\nfrom collections import deque\nn, m = map(int, input().split())\ng = [[] for _ in range(n)]\nfor _ in range(m):\n    a, b = map(int, input().split())\n    g[a - 1].append(b - 1)\n    g[b - 1].append(a - 1)\ncolor = [-1] * n\nok = True\nfor s in range(n):\n    if color[s] != -1:\n        continue\n    color[s] = 0\n    dq = deque([s])\n    while dq:\n        v = dq.popleft()\n        for u in g[v]:\n            if color[u] == -1:\n                color[u] = color[v] ^ 1\n                dq.append(u)\n            elif color[u] == color[v]:\n                ok = False\nprint("yes" if ok else "no")',
    reference:
      'from collections import deque\nn, m = map(int, input().split())\ng = [[] for _ in range(n)]\nfor _ in range(m):\n    a, b = map(int, input().split())\n    g[a - 1].append(b - 1)\n    g[b - 1].append(a - 1)\ncolor = [-1] * n\nok = True\nfor s in range(n):\n    if color[s] != -1:\n        continue\n    color[s] = 0\n    dq = deque([s])\n    while dq:\n        v = dq.popleft()\n        for u in g[v]:\n            if color[u] == -1:\n                color[u] = color[v] ^ 1\n                dq.append(u)\n            elif color[u] == color[v]:\n                ok = False\nprint("yes" if ok else "no")',
    cases: [
      { input: '4 4\n1 2\n2 3\n3 4\n4 1\n', expected: 'yes', sample: true },
      { input: '3 3\n1 2\n2 3\n1 3\n', expected: 'no' },
      { input: '2 1\n1 2\n', expected: 'yes' },
      { input: '5 0\n', expected: 'yes' },
    ],
    tip: '💡 偶数長サイクルだけなら二部グラフ。奇数長サイクルが1つでもあると分けられない。',
  },
])

// ===== lv650 グラフ応用：最短路の発展 =====
const lv650 = build(650, 'lv650y', [
  {
    title: '全地点間の最短距離の合計（ワーシャルフロイド）',
    concept: '全点対最短路',
    tags: ['ワーシャルフロイド', 'グラフ', 'アルゴリズム'],
    statement:
      'N 地点と、それらを結ぶ M 本の双方向の道（長さつき）が与えられます。すべての2地点の組（順序は区別しない）について最短距離を求め、その総和を出力してください。すべての地点は互いに行き来できるものとします。\n\n入力例:\n3 3\n1 2 1\n2 3 2\n1 3 5\n\n出力例:\n6',
    starter: 'INF = float("inf")\nn, m = map(int, input().split())\n',
    hints: [
      '全2地点間の最短路は、経由点 k を1つずつ増やしながら更新するワーシャルフロイドが簡単。',
      'd[i][j] = min(d[i][j], d[i][k] + d[k][j]) を k, i, j の三重ループで回す（k が一番外側）。',
      '答え:\nINF = float("inf")\nn, m = map(int, input().split())\nd = [[INF] * n for _ in range(n)]\nfor i in range(n):\n    d[i][i] = 0\nfor _ in range(m):\n    a, b, c = map(int, input().split())\n    a -= 1\n    b -= 1\n    if c < d[a][b]:\n        d[a][b] = c\n        d[b][a] = c\nfor k in range(n):\n    for i in range(n):\n        for j in range(n):\n            if d[i][k] + d[k][j] < d[i][j]:\n                d[i][j] = d[i][k] + d[k][j]\ntotal = 0\nfor i in range(n):\n    for j in range(i + 1, n):\n        total += d[i][j]\nprint(total)',
    ],
    explanation:
      'ワーシャルフロイドは「経由してよい頂点」を 0,1,2,… と増やしながら全ペアを更新する DP。k を最外ループにするのが鉄則で O(N^3)。\n\n模範解答:\nINF = float("inf")\nn, m = map(int, input().split())\nd = [[INF] * n for _ in range(n)]\nfor i in range(n):\n    d[i][i] = 0\nfor _ in range(m):\n    a, b, c = map(int, input().split())\n    a -= 1\n    b -= 1\n    if c < d[a][b]:\n        d[a][b] = c\n        d[b][a] = c\nfor k in range(n):\n    for i in range(n):\n        for j in range(n):\n            if d[i][k] + d[k][j] < d[i][j]:\n                d[i][j] = d[i][k] + d[k][j]\ntotal = 0\nfor i in range(n):\n    for j in range(i + 1, n):\n        total += d[i][j]\nprint(total)',
    reference:
      'INF = float("inf")\nn, m = map(int, input().split())\nd = [[INF] * n for _ in range(n)]\nfor i in range(n):\n    d[i][i] = 0\nfor _ in range(m):\n    a, b, c = map(int, input().split())\n    a -= 1\n    b -= 1\n    if c < d[a][b]:\n        d[a][b] = c\n        d[b][a] = c\nfor k in range(n):\n    for i in range(n):\n        for j in range(n):\n            if d[i][k] + d[k][j] < d[i][j]:\n                d[i][j] = d[i][k] + d[k][j]\ntotal = 0\nfor i in range(n):\n    for j in range(i + 1, n):\n        total += d[i][j]\nprint(total)',
    cases: [
      { input: '3 3\n1 2 1\n2 3 2\n1 3 5\n', expected: '6', sample: true },
      { input: '2 1\n1 2 4\n', expected: '4' },
      { input: '4 4\n1 2 1\n2 3 1\n3 4 1\n4 1 1\n', expected: '8' },
    ],
    tip: '💡 ワーシャルフロイドは3重ループの順番が命。経由点 k を一番外側に置く。',
  },
  {
    title: '負の道がある最短距離（ベルマンフォード）',
    concept: '負辺と負閉路',
    tags: ['ベルマンフォード', 'グラフ', 'アルゴリズム'],
    statement:
      'N 個の地点と M 本の一方通行の道（長さは負もありうる）が与えられます。地点1から到達できる範囲に「回るほど長さが減り続ける閉路」があれば NEGATIVE を、なければ地点1から地点 N への最短距離を出力してください。\n\n入力例:\n3 3\n1 2 2\n2 3 3\n1 3 10\n\n出力例:\n5',
    starter: 'n, m = map(int, input().split())\nedges = []\n',
    hints: [
      '辺全体を N 回なめて距離を更新する。N-1 回で最短は確定するはず。',
      'N 回目にもまだ更新が起きるなら、負閉路がある証拠。',
      '答え:\nn, m = map(int, input().split())\nedges = []\nfor _ in range(m):\n    a, b, c = map(int, input().split())\n    edges.append((a - 1, b - 1, c))\nINF = float("inf")\ndist = [INF] * n\ndist[0] = 0\nneg = False\nfor i in range(n):\n    for a, b, c in edges:\n        if dist[a] != INF and dist[a] + c < dist[b]:\n            dist[b] = dist[a] + c\n            if i == n - 1:\n                neg = True\nprint("NEGATIVE" if neg else dist[n - 1])',
    ],
    explanation:
      'ベルマンフォードは負の辺も扱える単一始点最短路。辺の緩和を N-1 回繰り返せば確定し、N 回目に更新が残れば負閉路と判定できる。\n\n模範解答:\nn, m = map(int, input().split())\nedges = []\nfor _ in range(m):\n    a, b, c = map(int, input().split())\n    edges.append((a - 1, b - 1, c))\nINF = float("inf")\ndist = [INF] * n\ndist[0] = 0\nneg = False\nfor i in range(n):\n    for a, b, c in edges:\n        if dist[a] != INF and dist[a] + c < dist[b]:\n            dist[b] = dist[a] + c\n            if i == n - 1:\n                neg = True\nprint("NEGATIVE" if neg else dist[n - 1])',
    reference:
      'n, m = map(int, input().split())\nedges = []\nfor _ in range(m):\n    a, b, c = map(int, input().split())\n    edges.append((a - 1, b - 1, c))\nINF = float("inf")\ndist = [INF] * n\ndist[0] = 0\nneg = False\nfor i in range(n):\n    for a, b, c in edges:\n        if dist[a] != INF and dist[a] + c < dist[b]:\n            dist[b] = dist[a] + c\n            if i == n - 1:\n                neg = True\nprint("NEGATIVE" if neg else dist[n - 1])',
    cases: [
      { input: '3 3\n1 2 2\n2 3 3\n1 3 10\n', expected: '5', sample: true },
      { input: '3 3\n1 2 1\n2 3 -2\n3 2 -2\n', expected: 'NEGATIVE' },
      { input: '2 1\n1 2 7\n', expected: '7' },
      { input: '4 4\n1 2 5\n2 3 -3\n3 4 -3\n1 4 1\n', expected: '-1' },
    ],
    tip: '💡 ダイクストラは負辺NG。負の辺があるならベルマンフォード（負閉路も検出できる）。',
  },
])

// ===== lv750 DP応用：もっと DP =====
const lv750 = build(750, 'lv750y', [
  {
    title: '最長共通部分列（LCS）',
    concept: '2次元DP',
    tags: ['最長共通部分列', 'dp', 'アルゴリズム'],
    statement:
      '2つの文字列が各行で与えられます。両方に同じ順序で現れる文字を拾ってできる、最も長い列（連続していなくてよい）の長さを出力してください。\n\n入力例:\nabcde\nace\n\n出力例:\n3',
    starter: 's = input()\nt = input()\n',
    hints: [
      'dp[i][j] = 「s の先頭 i 文字」と「t の先頭 j 文字」の最長共通部分列の長さ、と決める。',
      '末尾が一致したら dp[i-1][j-1]+1、違えば max(dp[i-1][j], dp[i][j-1])。',
      '答え:\ns = input()\nt = input()\nn, m = len(s), len(t)\ndp = [[0] * (m + 1) for _ in range(n + 1)]\nfor i in range(n):\n    for j in range(m):\n        if s[i] == t[j]:\n            dp[i + 1][j + 1] = dp[i][j] + 1\n        else:\n            dp[i + 1][j + 1] = max(dp[i][j + 1], dp[i + 1][j])\nprint(dp[n][m])',
    ],
    explanation:
      '2つの列の DP の典型。表 dp[i][j] を小さい方から埋め、末尾文字の一致・不一致で遷移する。編集距離と並ぶ二次元DPの基本形。\n\n模範解答:\ns = input()\nt = input()\nn, m = len(s), len(t)\ndp = [[0] * (m + 1) for _ in range(n + 1)]\nfor i in range(n):\n    for j in range(m):\n        if s[i] == t[j]:\n            dp[i + 1][j + 1] = dp[i][j] + 1\n        else:\n            dp[i + 1][j + 1] = max(dp[i][j + 1], dp[i + 1][j])\nprint(dp[n][m])',
    reference:
      's = input()\nt = input()\nn, m = len(s), len(t)\ndp = [[0] * (m + 1) for _ in range(n + 1)]\nfor i in range(n):\n    for j in range(m):\n        if s[i] == t[j]:\n            dp[i + 1][j + 1] = dp[i][j] + 1\n        else:\n            dp[i + 1][j + 1] = max(dp[i][j + 1], dp[i + 1][j])\nprint(dp[n][m])',
    cases: [
      { input: 'abcde\nace\n', expected: '3', sample: true },
      { input: 'abc\nabc\n', expected: '3' },
      { input: 'abc\ndef\n', expected: '0' },
      { input: 'aggtab\ngxtxayb\n', expected: '4' },
    ],
    tip: '💡 LCS は差分(diff)コマンドの心臓部。2列を突き合わせる2次元DPの代表。',
  },
  {
    title: '最小の硬貨枚数',
    concept: '配るDP・もらうDP',
    tags: ['コインDP', 'dp', 'アルゴリズム'],
    statement:
      '1行目に「硬貨の種類数 N と 目標金額 X」、2行目に N 種類の硬貨の金額が与えられます。各硬貨は何枚でも使えます。ちょうど X 円を作るのに必要な最小の硬貨枚数を出力してください。作れない場合は -1 を出力します。\n\n入力例:\n3 11\n1 2 5\n\n出力例:\n3',
    starter: 'n, x = map(int, input().split())\ncoins = list(map(int, input().split()))\n',
    hints: [
      'dp[v] = 「ちょうど v 円を作る最小枚数」とし、INF で初期化、dp[0]=0。',
      '各硬貨 c について、v を小さい方から見て dp[v] = min(dp[v], dp[v-c]+1)。',
      '答え:\nn, x = map(int, input().split())\ncoins = list(map(int, input().split()))\nINF = float("inf")\ndp = [INF] * (x + 1)\ndp[0] = 0\nfor c in coins:\n    for v in range(c, x + 1):\n        if dp[v - c] + 1 < dp[v]:\n            dp[v] = dp[v - c] + 1\nprint(dp[x] if dp[x] != INF else -1)',
    ],
    explanation:
      '同じ品を何度も使える「完全ナップサック」型。容量を小さい方から更新すると同じ硬貨の複数枚使用を許せる（0/1ナップサックとの違いがここ）。\n\n模範解答:\nn, x = map(int, input().split())\ncoins = list(map(int, input().split()))\nINF = float("inf")\ndp = [INF] * (x + 1)\ndp[0] = 0\nfor c in coins:\n    for v in range(c, x + 1):\n        if dp[v - c] + 1 < dp[v]:\n            dp[v] = dp[v - c] + 1\nprint(dp[x] if dp[x] != INF else -1)',
    reference:
      'n, x = map(int, input().split())\ncoins = list(map(int, input().split()))\nINF = float("inf")\ndp = [INF] * (x + 1)\ndp[0] = 0\nfor c in coins:\n    for v in range(c, x + 1):\n        if dp[v - c] + 1 < dp[v]:\n            dp[v] = dp[v - c] + 1\nprint(dp[x] if dp[x] != INF else -1)',
    cases: [
      { input: '3 11\n1 2 5\n', expected: '3', sample: true },
      { input: '1 3\n2\n', expected: '-1' },
      { input: '3 6\n1 3 4\n', expected: '2' },
      { input: '2 0\n3 7\n', expected: '0' },
    ],
    tip: '💡 「何枚でも使える」は容量を昇順、0/1（1個まで）は降順で回す。向きが境目。',
  },
  {
    title: '石をまとめる最小コスト（区間DP）',
    concept: '区間で考えるDP',
    tags: ['区間DP', 'dp', 'アルゴリズム'],
    statement:
      '一列に N 個の石が並び、各石に重さがあります。隣り合う2つの山を選んで1つにまとめる操作を繰り返し、全部を1つの山にします。1回の操作のコストは「まとめてできた山の重さ」です。全体の合計コストを最小にしたときの値を出力してください。\n\n入力例:\n3\n1 2 3\n\n出力例:\n9',
    starter: 'n = int(input())\na = list(map(int, input().split()))\n',
    hints: [
      'まず区間和を累積和で前計算する（どこをまとめても合計重さがすぐ出る）。',
      'dp[l][r] = 区間 [l,r] を1つにまとめる最小コスト。分け目 m を全部試す。',
      '答え:\nn = int(input())\na = list(map(int, input().split()))\npre = [0] * (n + 1)\nfor i in range(n):\n    pre[i + 1] = pre[i] + a[i]\nINF = float("inf")\ndp = [[0] * n for _ in range(n)]\nfor length in range(2, n + 1):\n    for l in range(n - length + 1):\n        r = l + length - 1\n        s = pre[r + 1] - pre[l]\n        best = INF\n        for m in range(l, r):\n            cost = dp[l][m] + dp[m + 1][r] + s\n            if cost < best:\n                best = cost\n        dp[l][r] = best\nprint(dp[0][n - 1])',
    ],
    explanation:
      '区間DPは「短い区間から先に解き、長い区間を分け目で2つに割って合成する」DP。合成コストにその区間の重さが必ず乗るのがポイント。\n\n模範解答:\nn = int(input())\na = list(map(int, input().split()))\npre = [0] * (n + 1)\nfor i in range(n):\n    pre[i + 1] = pre[i] + a[i]\nINF = float("inf")\ndp = [[0] * n for _ in range(n)]\nfor length in range(2, n + 1):\n    for l in range(n - length + 1):\n        r = l + length - 1\n        s = pre[r + 1] - pre[l]\n        best = INF\n        for m in range(l, r):\n            cost = dp[l][m] + dp[m + 1][r] + s\n            if cost < best:\n                best = cost\n        dp[l][r] = best\nprint(dp[0][n - 1])',
    reference:
      'n = int(input())\na = list(map(int, input().split()))\npre = [0] * (n + 1)\nfor i in range(n):\n    pre[i + 1] = pre[i] + a[i]\nINF = float("inf")\ndp = [[0] * n for _ in range(n)]\nfor length in range(2, n + 1):\n    for l in range(n - length + 1):\n        r = l + length - 1\n        s = pre[r + 1] - pre[l]\n        best = INF\n        for m in range(l, r):\n            cost = dp[l][m] + dp[m + 1][r] + s\n            if cost < best:\n                best = cost\n        dp[l][r] = best\nprint(dp[0][n - 1])',
    cases: [
      { input: '3\n1 2 3\n', expected: '9', sample: true },
      { input: '1\n5\n', expected: '0' },
      { input: '4\n1 1 1 1\n', expected: '8' },
      { input: '2\n10 20\n', expected: '30' },
    ],
    tip: '💡 区間DPは「長さの短い区間から埋める」。分け目を全部試すのが基本形。',
  },
])

// ===== lv800 高度なデータ構造：文字列アルゴリズム =====
const lv800 = build(800, 'lv800y', [
  {
    title: 'パターンの出現回数（KMP法）',
    concept: '文字列照合',
    tags: ['KMP', '文字列検索', 'アルゴリズム'],
    statement:
      '1行目にテキスト S、2行目にパターン P が与えられます。S の中に P が現れる回数を出力してください（重なって現れる場合もすべて数えます）。\n\n入力例:\nababab\nab\n\n出力例:\n3',
    starter: 's = input()\np = input()\n',
    hints: [
      '愚直に全位置で照合すると遅い。パターン内の「ずれても再利用できる長さ」を前計算する（部分一致表）。',
      '不一致になったら表を使って戻り先を決め、テキストは1回ずつしか進めない＝O(N+M)。',
      '答え:\ns = input()\np = input()\nm = len(p)\nfail = [0] * m\nk = 0\nfor i in range(1, m):\n    while k > 0 and p[i] != p[k]:\n        k = fail[k - 1]\n    if p[i] == p[k]:\n        k += 1\n    fail[i] = k\ncnt = 0\nk = 0\nfor ch in s:\n    while k > 0 and ch != p[k]:\n        k = fail[k - 1]\n    if ch == p[k]:\n        k += 1\n    if k == m:\n        cnt += 1\n        k = fail[k - 1]\nprint(cnt)',
    ],
    explanation:
      'KMP法は「部分一致表(失敗関数)」を前計算して、不一致時にテキストを戻さずパターンだけずらす照合法。全体で O(テキスト長＋パターン長)。\n\n模範解答:\ns = input()\np = input()\nm = len(p)\nfail = [0] * m\nk = 0\nfor i in range(1, m):\n    while k > 0 and p[i] != p[k]:\n        k = fail[k - 1]\n    if p[i] == p[k]:\n        k += 1\n    fail[i] = k\ncnt = 0\nk = 0\nfor ch in s:\n    while k > 0 and ch != p[k]:\n        k = fail[k - 1]\n    if ch == p[k]:\n        k += 1\n    if k == m:\n        cnt += 1\n        k = fail[k - 1]\nprint(cnt)',
    reference:
      's = input()\np = input()\nm = len(p)\nfail = [0] * m\nk = 0\nfor i in range(1, m):\n    while k > 0 and p[i] != p[k]:\n        k = fail[k - 1]\n    if p[i] == p[k]:\n        k += 1\n    fail[i] = k\ncnt = 0\nk = 0\nfor ch in s:\n    while k > 0 and ch != p[k]:\n        k = fail[k - 1]\n    if ch == p[k]:\n        k += 1\n    if k == m:\n        cnt += 1\n        k = fail[k - 1]\nprint(cnt)',
    cases: [
      { input: 'ababab\nab\n', expected: '3', sample: true },
      { input: 'aaaa\naa\n', expected: '3' },
      { input: 'abcabc\nabc\n', expected: '2' },
      { input: 'abcdef\nxyz\n', expected: '0' },
    ],
    tip: '💡 KMP の心臓は「部分一致表」。一致が途中で崩れても先頭から比べ直さずに済む。',
  },
  {
    title: '部分文字列が等しいか（ローリングハッシュ）',
    concept: '文字列照合',
    tags: ['ローリングハッシュ', 'ハッシュ', 'アルゴリズム'],
    statement:
      '1行目に文字列 S。2行目に問い合わせ数 Q。続く Q 行に「a b len」が与えられ、S の位置 a から len 文字と、位置 b から len 文字（いずれも0始まり）が完全に一致するなら yes、違えば no を出力してください。\n\n入力例:\nabcabc\n3\n0 3 3\n0 1 2\n1 4 2\n\n出力例:\nyes\nno\nyes',
    starter: 's = input()\n',
    hints: [
      '文字列を「ある基数の多項式」とみなし、先頭からのハッシュを前計算しておく。',
      '区間 [l, r) のハッシュは h[r] - h[l] * base^(r-l) で取り出せる。一致比較がほぼ定数時間に。',
      '答え:\ns = input()\nn = len(s)\nMOD = (1 << 61) - 1\nBASE = 131\nh = [0] * (n + 1)\npw = [1] * (n + 1)\nfor i in range(n):\n    h[i + 1] = (h[i] * BASE + ord(s[i])) % MOD\n    pw[i + 1] = pw[i] * BASE % MOD\n\ndef get(l, length):\n    return (h[l + length] - h[l] * pw[length]) % MOD\n\nq = int(input())\nout = []\nfor _ in range(q):\n    a, b, ln = map(int, input().split())\n    out.append("yes" if get(a, ln) == get(b, ln) else "no")\nprint("\\n".join(out))',
    ],
    explanation:
      'ローリングハッシュは文字列を基数 BASE の多項式の値（mod 大きな素数）で表す。前計算しておけば任意区間のハッシュが O(1) で取れ、部分文字列の一致判定が高速になる。\n\n模範解答:\ns = input()\nn = len(s)\nMOD = (1 << 61) - 1\nBASE = 131\nh = [0] * (n + 1)\npw = [1] * (n + 1)\nfor i in range(n):\n    h[i + 1] = (h[i] * BASE + ord(s[i])) % MOD\n    pw[i + 1] = pw[i] * BASE % MOD\n\ndef get(l, length):\n    return (h[l + length] - h[l] * pw[length]) % MOD\n\nq = int(input())\nout = []\nfor _ in range(q):\n    a, b, ln = map(int, input().split())\n    out.append("yes" if get(a, ln) == get(b, ln) else "no")\nprint("\\n".join(out))',
    reference:
      's = input()\nn = len(s)\nMOD = (1 << 61) - 1\nBASE = 131\nh = [0] * (n + 1)\npw = [1] * (n + 1)\nfor i in range(n):\n    h[i + 1] = (h[i] * BASE + ord(s[i])) % MOD\n    pw[i + 1] = pw[i] * BASE % MOD\n\ndef get(l, length):\n    return (h[l + length] - h[l] * pw[length]) % MOD\n\nq = int(input())\nout = []\nfor _ in range(q):\n    a, b, ln = map(int, input().split())\n    out.append("yes" if get(a, ln) == get(b, ln) else "no")\nprint("\\n".join(out))',
    cases: [
      { input: 'abcabc\n3\n0 3 3\n0 1 2\n1 4 2\n', expected: 'yes\nno\nyes', sample: true },
      { input: 'aaaaa\n2\n0 1 3\n0 2 2\n', expected: 'yes\nyes' },
      { input: 'abcdef\n1\n0 3 3\n', expected: 'no' },
    ],
    tip: '💡 ローリングハッシュは区間の一致を O(1) で比較できる。複数箇所の比較が多いほど効く。',
  },
])

export const expand2Problems: Problem[] = [
  ...lv120,
  ...lv130,
  ...lv550,
  ...lv600,
  ...lv650,
  ...lv750,
  ...lv800,
]
