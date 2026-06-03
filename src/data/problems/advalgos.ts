import type { Problem } from '../../types'
import { build } from './_build.ts'

/**
 * 上級アルゴリズム帯（AtCoder トラックの上位）。
 * 貪欲・バックトラッキング・Union-Find・ダイクストラ・トポロジカルソート・
 * ナップサックDP・編集距離・Trie・セグメント木。
 */

// ===== lv550 探索と貪欲 =====
const lv550 = build(550, 'lv550', [
  {
    title: '区間スケジューリング（貪欲法）',
    concept: '貪欲・バックトラッキング',
    tags: ['貪欲', 'アルゴリズム'],
    statement: '1行目に区間数 N、続く N 行に「開始 終了」。重ならないように選べる区間の最大数を出力してください。\n\n入力例:\n3\n1 3\n2 5\n4 6\n\n出力例:\n2',
    starter: 'n = int(input())\niv = [tuple(map(int, input().split())) for _ in range(n)]\n',
    hints: ['「終了時刻が早い順」に貪欲に選ぶのが最適。', '終了でソートし、前に選んだ終了以上の開始なら選ぶ。', '答え:\niv.sort(key=lambda x: x[1])\nlast = -10**18\nfor s, e in iv:\n    if s >= last:\n        cnt += 1\n        last = e'],
    explanation: '貪欲法は「その場の最善」を選び続ける。区間スケジューリングは終了が早い順が最適と証明できる。\n\n模範解答:\nn = int(input())\niv = [tuple(map(int, input().split())) for _ in range(n)]\niv.sort(key=lambda x: x[1])\ncnt = 0\nlast = -10**18\nfor s, e in iv:\n    if s >= last:\n        cnt += 1\n        last = e\nprint(cnt)',
    reference: 'n = int(input())\niv = [tuple(map(int, input().split())) for _ in range(n)]\niv.sort(key=lambda x: x[1])\ncnt = 0\nlast = -10**18\nfor s, e in iv:\n    if s >= last:\n        cnt += 1\n        last = e\nprint(cnt)',
    cases: [
      { input: '3\n1 3\n2 5\n4 6\n', expected: '2', sample: true },
      { input: '1\n0 1\n', expected: '1' },
      { input: '3\n1 2\n2 3\n3 4\n', expected: '3' },
    ],
    tip: '💡 貪欲は「正しい順序で選べば最適」になる問題で強い。なぜ最適かを示せるかが鍵。',
  },
  {
    title: 'N-Queens（バックトラッキング）',
    concept: '貪欲・バックトラッキング',
    tags: ['バックトラッキング', 'アルゴリズム'],
    statement: 'N×N の盤に、互いに攻撃し合わないように N 個のクイーンを置く配置が何通りあるか出力してください（1 ≤ N ≤ 8）。\n\n入力例:\n4\n\n出力例:\n2',
    starter: 'n = int(input())\ncols = set()\ndiag1 = set()\ndiag2 = set()\n',
    hints: ['1行に1個置く。列・斜め2方向が衝突しなければ進む。', 'ダメなら戻る(バックトラック)。各行の配置数を return で合算。', '答え:\ndef solve(r):\n    if r == n: return 1\n    total = 0\n    for c in range(n):\n        if c in cols or (r-c) in diag1 or (r+c) in diag2: continue\n        ...置く...\n        total += solve(r+1)\n        ...戻す...\n    return total'],
    explanation: 'バックトラッキングは「進めるだけ進み、行き詰まったら戻る」全探索。置いた印を消して戻すのが要点。配置数は再帰の戻り値を足し合わせる。\n\n模範解答:\nn = int(input())\ncols = set()\ndiag1 = set()\ndiag2 = set()\ndef solve(r):\n    if r == n:\n        return 1\n    total = 0\n    for c in range(n):\n        if c in cols or (r - c) in diag1 or (r + c) in diag2:\n            continue\n        cols.add(c)\n        diag1.add(r - c)\n        diag2.add(r + c)\n        total += solve(r + 1)\n        cols.discard(c)\n        diag1.discard(r - c)\n        diag2.discard(r + c)\n    return total\nprint(solve(0))',
    reference: 'n = int(input())\ncols = set()\ndiag1 = set()\ndiag2 = set()\ndef solve(r):\n    if r == n:\n        return 1\n    total = 0\n    for c in range(n):\n        if c in cols or (r - c) in diag1 or (r + c) in diag2:\n            continue\n        cols.add(c)\n        diag1.add(r - c)\n        diag2.add(r + c)\n        total += solve(r + 1)\n        cols.discard(c)\n        diag1.discard(r - c)\n        diag2.discard(r + c)\n    return total\nprint(solve(0))',
    cases: [
      { input: '4\n', expected: '2', sample: true },
      { input: '1\n', expected: '1' },
      { input: '8\n', expected: '92' },
    ],
    tip: '💡 バックトラッキングは「選ぶ→進む→戻す」の型。数独・順列・組合せ生成にも同じ骨格。',
  },
])

// ===== lv650 グラフ応用 =====
const lv650 = build(650, 'lv650', [
  {
    title: '連結成分の数（Union-Find）',
    concept: 'グラフ応用',
    tags: ['unionfind', 'アルゴリズム'],
    statement: '1行目に N M、続く M 行に無向辺「a b」(0始まり)。連結成分(つながりのかたまり)の個数を出力してください。\n\n入力例:\n5 2\n0 1\n2 3\n\n出力例:\n3',
    starter: 'n, m = map(int, input().split())\npar = list(range(n))\n',
    hints: ['par[x] = x の親。根が同じなら同じグループ。', 'find で根をたどり(経路圧縮)、辺ごとに union する。', '答え:\ndef find(x):\n    while par[x] != x:\n        par[x] = par[par[x]]\n        x = par[x]\n    return x'],
    explanation: 'Union-Find(素集合データ構造)は「合併」と「同じ集合か」をほぼ定数時間で。最後に異なる根の数=成分数。\n\n模範解答:\nn, m = map(int, input().split())\npar = list(range(n))\ndef find(x):\n    while par[x] != x:\n        par[x] = par[par[x]]\n        x = par[x]\n    return x\nfor _ in range(m):\n    a, b = map(int, input().split())\n    par[find(a)] = find(b)\nprint(len(set(find(i) for i in range(n))))',
    reference: 'n, m = map(int, input().split())\npar = list(range(n))\ndef find(x):\n    while par[x] != x:\n        par[x] = par[par[x]]\n        x = par[x]\n    return x\nfor _ in range(m):\n    a, b = map(int, input().split())\n    par[find(a)] = find(b)\nprint(len(set(find(i) for i in range(n))))',
    cases: [
      { input: '5 2\n0 1\n2 3\n', expected: '3', sample: true },
      { input: '3 3\n0 1\n1 2\n0 2\n', expected: '1' },
      { input: '4 0\n', expected: '4' },
    ],
    tip: '💡 Union-Find は「グループ分け」「最小全域木(クラスカル法)」で必須。経路圧縮で爆速。',
  },
  {
    title: '最短経路（ダイクストラ）',
    concept: 'グラフ応用',
    tags: ['ダイクストラ', 'アルゴリズム'],
    statement: '1行目に N M、続く M 行に重み付き無向辺「a b w」(0始まり)。頂点0から N-1 への最短距離を出力。到達不能なら -1。\n\n入力例:\n4 4\n0 1 1\n1 3 1\n0 2 5\n2 3 1\n\n出力例:\n2',
    starter: 'import heapq\nn, m = map(int, input().split())\ng = [[] for _ in range(n)]\n',
    hints: ['「未確定で最短の頂点」を優先度付きキュー(heapq)で取り出す。', 'dist[u] を更新できたら (新距離, u) を push。', '答え:\nwhile pq:\n    d, v = heapq.heappop(pq)\n    if d > dist[v]: continue\n    for u, w in g[v]:\n        if d + w < dist[u]: ...'],
    explanation: 'ダイクストラ法は非負重みの最短経路を O((N+M)logN) で。heapq で「今いちばん近い頂点」を選ぶのが核心。\n\n模範解答:\nimport heapq\nn, m = map(int, input().split())\ng = [[] for _ in range(n)]\nfor _ in range(m):\n    a, b, w = map(int, input().split())\n    g[a].append((b, w))\n    g[b].append((a, w))\nINF = float("inf")\ndist = [INF] * n\ndist[0] = 0\npq = [(0, 0)]\nwhile pq:\n    d, v = heapq.heappop(pq)\n    if d > dist[v]:\n        continue\n    for u, w in g[v]:\n        if d + w < dist[u]:\n            dist[u] = d + w\n            heapq.heappush(pq, (dist[u], u))\nprint(dist[n - 1] if dist[n - 1] < INF else -1)',
    reference: 'import heapq\nn, m = map(int, input().split())\ng = [[] for _ in range(n)]\nfor _ in range(m):\n    a, b, w = map(int, input().split())\n    g[a].append((b, w))\n    g[b].append((a, w))\nINF = float("inf")\ndist = [INF] * n\ndist[0] = 0\npq = [(0, 0)]\nwhile pq:\n    d, v = heapq.heappop(pq)\n    if d > dist[v]:\n        continue\n    for u, w in g[v]:\n        if d + w < dist[u]:\n            dist[u] = d + w\n            heapq.heappush(pq, (dist[u], u))\nprint(dist[n - 1] if dist[n - 1] < INF else -1)',
    cases: [
      { input: '4 4\n0 1 1\n1 3 1\n0 2 5\n2 3 1\n', expected: '2', sample: true },
      { input: '2 0\n', expected: '-1' },
      { input: '3 2\n0 1 4\n1 2 6\n', expected: '10' },
    ],
    tip: '💡 重みが全て等しいなら BFS で十分。負の重みがあるとダイクストラは使えない(ベルマンフォード)。',
  },
  {
    title: 'トポロジカルソート',
    concept: 'グラフ応用',
    tags: ['トポロジカル', 'アルゴリズム'],
    statement: '1行目に N M、続く M 行に有向辺「a→b」。依存を満たす順序(トポロジカル順)を1つ、辞書順最小で空白区切りで出力してください（DAG前提）。\n\n入力例:\n3\n2\n0 1\n0 2\n\n出力例:\n0 1 2',
    starter: 'import heapq\nn = int(input())\nm = int(input())\ng = [[] for _ in range(n)]\nindeg = [0] * n\n',
    hints: ['入次数0の頂点から順に確定していく(Kahn法)。', '辞書順最小にするため heapq で小さい番号を先に。', '答え:\npq = [i for i in range(n) if indeg[i] == 0]\nheapq.heapify(pq)\nwhile pq:\n    v = heapq.heappop(pq); order.append(v)\n    for u in g[v]:\n        indeg[u] -= 1\n        if indeg[u] == 0: heapq.heappush(pq, u)'],
    explanation: 'トポロジカルソートは「依存関係を満たす並び」。入次数0を取り出し、その先の入次数を減らす。\n\n模範解答:\nimport heapq\nn = int(input())\nm = int(input())\ng = [[] for _ in range(n)]\nindeg = [0] * n\nfor _ in range(m):\n    a, b = map(int, input().split())\n    g[a].append(b)\n    indeg[b] += 1\npq = [i for i in range(n) if indeg[i] == 0]\nheapq.heapify(pq)\norder = []\nwhile pq:\n    v = heapq.heappop(pq)\n    order.append(v)\n    for u in g[v]:\n        indeg[u] -= 1\n        if indeg[u] == 0:\n            heapq.heappush(pq, u)\nprint(" ".join(map(str, order)))',
    reference: 'import heapq\nn = int(input())\nm = int(input())\ng = [[] for _ in range(n)]\nindeg = [0] * n\nfor _ in range(m):\n    a, b = map(int, input().split())\n    g[a].append(b)\n    indeg[b] += 1\npq = [i for i in range(n) if indeg[i] == 0]\nheapq.heapify(pq)\norder = []\nwhile pq:\n    v = heapq.heappop(pq)\n    order.append(v)\n    for u in g[v]:\n        indeg[u] -= 1\n        if indeg[u] == 0:\n            heapq.heappush(pq, u)\nprint(" ".join(map(str, order)))',
    cases: [
      { input: '3\n2\n0 1\n0 2\n', expected: '0 1 2', sample: true },
      { input: '2\n1\n1 0\n', expected: '1 0' },
      { input: '4\n3\n0 1\n1 2\n2 3\n', expected: '0 1 2 3' },
    ],
    tip: '💡 トポロジカルソートはビルド順・科目の履修順・タスク依存解決など「順番決め」に使う。閉路があると不可能。',
  },
])

// ===== lv750 DP応用 =====
const lv750 = build(750, 'lv750', [
  {
    title: '0/1 ナップサック',
    concept: 'DP応用',
    tags: ['ナップサック', 'dp', 'アルゴリズム'],
    statement: '1行目に 品物数 N と容量 W、続く N 行に「重さ 価値」。容量 W を超えない範囲で価値の最大合計を出力してください。\n\n入力例:\n3 5\n2 3\n3 4\n4 5\n\n出力例:\n7',
    starter: 'n, W = map(int, input().split())\ndp = [0] * (W + 1)\n',
    hints: ['dp[c] = 容量 c で得られる最大価値。', '各品物について容量を大きい方から更新(1回だけ使う)。', '答え:\nfor _ in range(n):\n    w, v = map(int, input().split())\n    for c in range(W, w - 1, -1):\n        dp[c] = max(dp[c], dp[c - w] + v)'],
    explanation: '0/1ナップサックは各品物「入れる/入れない」のDP。容量を降順に回すと各品物を1回だけ使える。\n\n模範解答:\nn, W = map(int, input().split())\ndp = [0] * (W + 1)\nfor _ in range(n):\n    w, v = map(int, input().split())\n    for c in range(W, w - 1, -1):\n        dp[c] = max(dp[c], dp[c - w] + v)\nprint(dp[W])',
    reference: 'n, W = map(int, input().split())\ndp = [0] * (W + 1)\nfor _ in range(n):\n    w, v = map(int, input().split())\n    for c in range(W, w - 1, -1):\n        dp[c] = max(dp[c], dp[c - w] + v)\nprint(dp[W])',
    cases: [
      { input: '3 5\n2 3\n3 4\n4 5\n', expected: '7', sample: true },
      { input: '1 0\n5 10\n', expected: '0' },
      { input: '2 4\n1 1\n4 10\n', expected: '10' },
    ],
    tip: '💡 容量を昇順に回すと同じ品物を何個でも使える「個数無制限ナップサック」になる。回す向きが意味を持つ。',
  },
  {
    title: '編集距離（レーベンシュタイン）',
    concept: 'DP応用',
    tags: ['編集距離', 'dp', 'アルゴリズム'],
    statement: '2つの文字列が2行で与えられます。一方をもう一方に変えるのに必要な「1文字の挿入・削除・置換」の最小回数を出力してください。\n\n入力例:\nkitten\nsitting\n\n出力例:\n3',
    starter: 'a = input()\nb = input()\n',
    hints: ['dp[i][j] = a の先頭i文字を b の先頭j文字に変える最小手数。', '同じ文字なら斜め、違えば挿入/削除/置換の min + 1。', '答え:\nif a[i-1] == b[j-1]: dp[i][j] = dp[i-1][j-1]\nelse: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])'],
    explanation: '編集距離は2次元DP。境界(空文字との距離)を初期化し、文字一致なら据え置き、不一致なら3操作の最小+1。\n\n模範解答:\na = input()\nb = input()\nm, n = len(a), len(b)\ndp = [[0] * (n + 1) for _ in range(m + 1)]\nfor i in range(m + 1):\n    dp[i][0] = i\nfor j in range(n + 1):\n    dp[0][j] = j\nfor i in range(1, m + 1):\n    for j in range(1, n + 1):\n        if a[i - 1] == b[j - 1]:\n            dp[i][j] = dp[i - 1][j - 1]\n        else:\n            dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])\nprint(dp[m][n])',
    reference: 'a = input()\nb = input()\nm, n = len(a), len(b)\ndp = [[0] * (n + 1) for _ in range(m + 1)]\nfor i in range(m + 1):\n    dp[i][0] = i\nfor j in range(n + 1):\n    dp[0][j] = j\nfor i in range(1, m + 1):\n    for j in range(1, n + 1):\n        if a[i - 1] == b[j - 1]:\n            dp[i][j] = dp[i - 1][j - 1]\n        else:\n            dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])\nprint(dp[m][n])',
    cases: [
      { input: 'kitten\nsitting\n', expected: '3', sample: true },
      { input: 'abc\nabc\n', expected: '0' },
      { input: 'abc\nabd\n', expected: '1' },
    ],
    tip: '💡 編集距離はスペルチェッカやDNA比較に使う。2次元DPの典型で、表を埋める感覚が掴める好例。',
  },
])

// ===== lv800 高度なデータ構造 =====
const lv800 = build(800, 'lv800', [
  {
    title: 'Trie で接頭辞検索',
    concept: '高度なデータ構造',
    tags: ['trie', 'アルゴリズム'],
    statement: '1行目に単語数 N、続く N 行に単語、最後に接頭辞 P。登録単語のうち P で始まるものの個数を出力してください。\n\n入力例:\n3\napple\napp\nbanana\napp\n\n出力例:\n2',
    starter: 'n = int(input())\nwords = [input() for _ in range(n)]\ntrie = {}\n',
    hints: ['Trie は文字を木でたどる辞書。各ノードに「通過した単語数」を持たせる。', 'setdefault で子ノードを作りながらカウント。', '答え:\nfor w in words:\n    node = trie\n    for ch in w:\n        node = node.setdefault(ch, {})\n        node["#"] = node.get("#", 0) + 1'],
    explanation: 'Trie(トライ木)は接頭辞検索が速い木構造。各ノードに通過単語数を記録すれば、接頭辞をたどった先の値が答え。\n\n模範解答:\nn = int(input())\nwords = [input() for _ in range(n)]\ntrie = {}\nfor w in words:\n    node = trie\n    for ch in w:\n        node = node.setdefault(ch, {})\n        node["#"] = node.get("#", 0) + 1\np = input()\nnode = trie\nok = True\nfor ch in p:\n    if ch in node:\n        node = node[ch]\n    else:\n        ok = False\n        break\nprint(node["#"] if ok else 0)',
    reference: 'n = int(input())\nwords = [input() for _ in range(n)]\ntrie = {}\nfor w in words:\n    node = trie\n    for ch in w:\n        node = node.setdefault(ch, {})\n        node["#"] = node.get("#", 0) + 1\np = input()\nnode = trie\nok = True\nfor ch in p:\n    if ch in node:\n        node = node[ch]\n    else:\n        ok = False\n        break\nprint(node["#"] if ok else 0)',
    cases: [
      { input: '3\napple\napp\nbanana\napp\n', expected: '2', sample: true },
      { input: '2\ncat\ncar\nca\n', expected: '2' },
      { input: '1\nx\ny\n', expected: '0' },
    ],
    tip: '💡 Trie は辞書補完・接頭辞検索・最長共通接頭辞に強い。各文字で枝分かれする木をイメージ。',
  },
  {
    title: 'セグメント木（区間最小）',
    concept: '高度なデータ構造',
    tags: ['セグメント木', 'アルゴリズム'],
    statement: '1行目に N、2行目に N 個の整数、3行目に質問数 Q、続く Q 行に「L R」(0始まり, R を含む)。各質問について区間 [L,R] の最小値を1行ずつ出力してください。\n\n入力例:\n5\n3 1 4 1 5\n2\n0 2\n1 4\n\n出力例:\n1\n1',
    starter: 'n = int(input())\na = list(map(int, input().split()))\n',
    hints: ['完全二分木の葉に値を置き、親は子の min。', '区間クエリは l,r を上りながら境界の値を集める。', '答え:\ndef query(l, r):\n    l += size; r += size + 1; res = INF\n    while l < r:\n        if l & 1: res = min(res, seg[l]); l += 1\n        if r & 1: r -= 1; res = min(res, seg[r])\n        l >>= 1; r >>= 1\n    return res'],
    explanation: 'セグメント木は区間クエリ(最小/和など)と1点更新を O(logN) で行う木。葉に値、内部に集約値を持つ。\n\n模範解答:\nn = int(input())\na = list(map(int, input().split()))\nsize = 1\nwhile size < n:\n    size *= 2\nINF = float("inf")\nseg = [INF] * (2 * size)\nfor i in range(n):\n    seg[size + i] = a[i]\nfor i in range(size - 1, 0, -1):\n    seg[i] = min(seg[2 * i], seg[2 * i + 1])\ndef query(l, r):\n    l += size\n    r += size + 1\n    res = INF\n    while l < r:\n        if l & 1:\n            res = min(res, seg[l])\n            l += 1\n        if r & 1:\n            r -= 1\n            res = min(res, seg[r])\n        l >>= 1\n        r >>= 1\n    return res\nq = int(input())\nout = []\nfor _ in range(q):\n    l, r = map(int, input().split())\n    out.append(str(query(l, r)))\nprint("\\n".join(out))',
    reference: 'n = int(input())\na = list(map(int, input().split()))\nsize = 1\nwhile size < n:\n    size *= 2\nINF = float("inf")\nseg = [INF] * (2 * size)\nfor i in range(n):\n    seg[size + i] = a[i]\nfor i in range(size - 1, 0, -1):\n    seg[i] = min(seg[2 * i], seg[2 * i + 1])\ndef query(l, r):\n    l += size\n    r += size + 1\n    res = INF\n    while l < r:\n        if l & 1:\n            res = min(res, seg[l])\n            l += 1\n        if r & 1:\n            r -= 1\n            res = min(res, seg[r])\n        l >>= 1\n        r >>= 1\n    return res\nq = int(input())\nout = []\nfor _ in range(q):\n    l, r = map(int, input().split())\n    out.append(str(query(l, r)))\nprint("\\n".join(out))',
    cases: [
      { input: '5\n3 1 4 1 5\n2\n0 2\n1 4\n', expected: '1\n1', sample: true },
      { input: '3\n5 2 8\n1\n0 2\n', expected: '2' },
      { input: '4\n9 9 9 1\n2\n0 1\n0 3\n', expected: '9\n1' },
    ],
    tip: '💡 セグメント木は和・最小・最大・gcd など「結合的な演算」なら何でも載る。1点更新も O(logN)。',
  },
])

export const advAlgoProblems: Problem[] = [...lv550, ...lv650, ...lv750, ...lv800]
