import type { Problem } from '../../types'
import { build } from './_build.ts'

/**
 * 標準ライブラリ帯。collections(Counter/defaultdict/deque)、
 * math / itertools / functools / bisect など「こんな便利なものがあるのか！」系。
 */

// ===== lv060 collections =====
const lv060 = build(60, 'lv060', [
  {
    title: 'Counter で数える',
    concept: 'collections',
    tags: ['collections', 'Counter', '集計'],
    statement: '空白区切りの単語列。各単語の出現回数を Counter で求め、「単語:回数」を多い順（同数は初出順）に空白区切りで出力してください。\n\n入力例:\na b a c a b a\n\n出力例:\na:4 b:2 c:1',
    hints: ['from collections import Counter', 'Counter(リスト) が出現回数。.most_common() で多い順。', '答え:\nfrom collections import Counter\nc = Counter(input().split())\nprint(" ".join(f"{k}:{v}" for k, v in c.most_common()))'],
    explanation: 'Counter は要素を数える辞書の特化版。\n\n模範解答:\nfrom collections import Counter\nc = Counter(input().split())\nprint(" ".join(f"{k}:{v}" for k, v in c.most_common()))',
    reference: 'from collections import Counter\nc = Counter(input().split())\nprint(" ".join(f"{k}:{v}" for k, v in c.most_common()))',
    cases: [
      { input: 'a b a c a b a\n', expected: 'a:4 b:2 c:1', sample: true },
      { input: 'x\n', expected: 'x:1' },
      { input: 'p q p q\n', expected: 'p:2 q:2' },
    ],
    tip: '💡 Counter は数えの決定版。c.most_common(3) で上位3件、c1 + c2 のような加算もできる。',
  },
  {
    title: 'defaultdict でグループ分け',
    concept: 'collections',
    tags: ['collections', 'defaultdict'],
    statement: '1行目に組数 N、続く N 行に「グループ 名前」。各グループに属する名前を、グループ初出順・名前は与えられた順で「グループ:名前1,名前2」の形式で各行に出力してください。\n\n入力例:\n3\nA taro\nB jiro\nA hanako\n\n出力例:\nA:taro,hanako\nB:jiro',
    starter: 'from collections import defaultdict\nn = int(input())\ng = defaultdict(list)\n',
    hints: ['defaultdict(list) は未登録キーに自動で空リストを用意。', 'g[grp].append(name) で追加。', '答え:\nfor k, v in g.items():\n    print(f"{k}:{\',\'.join(v)}")'],
    explanation: 'defaultdict は欠損キーに既定値を自動生成する辞書。if で初期化する手間が消える。\n\n模範解答:\nfrom collections import defaultdict\nn = int(input())\ng = defaultdict(list)\nfor _ in range(n):\n    grp, name = input().split()\n    g[grp].append(name)\nfor k, v in g.items():\n    print(f"{k}:{\',\'.join(v)}")',
    reference: 'from collections import defaultdict\nn = int(input())\ng = defaultdict(list)\nfor _ in range(n):\n    grp, name = input().split()\n    g[grp].append(name)\nfor k, v in g.items():\n    print(f"{k}:{\',\'.join(v)}")',
    cases: [
      { input: '3\nA taro\nB jiro\nA hanako\n', expected: 'A:taro,hanako\nB:jiro', sample: true },
      { input: '1\nX a\n', expected: 'X:a' },
      { input: '2\nA x\nA y\n', expected: 'A:x,y' },
    ],
    tip: '💡 defaultdict(int) ならカウント、defaultdict(list) ならグループ分けが if 無しで書ける。',
  },
  {
    title: 'deque（両端キュー）',
    concept: 'collections',
    tags: ['collections', 'deque'],
    statement: '1行目に操作数 N、続く N 行は "L x"（先頭に x を追加）か "R x"（末尾に x を追加）。最後に全体を空白区切りで出力してください。\n\n入力例:\n3\nR 1\nL 2\nR 3\n\n出力例:\n2 1 3',
    starter: 'from collections import deque\nn = int(input())\nq = deque()\n',
    hints: ['deque は両端の追加/削除が高速。', 'appendleft で先頭、append で末尾。', '答え:\nif cmd == "L":\n    q.appendleft(x)\nelse:\n    q.append(x)'],
    explanation: 'deque(両端キュー)は先頭操作が O(1)。リストの先頭挿入 O(N) より速い。\n\n模範解答:\nfrom collections import deque\nn = int(input())\nq = deque()\nfor _ in range(n):\n    cmd, x = input().split()\n    if cmd == "L":\n        q.appendleft(x)\n    else:\n        q.append(x)\nprint(" ".join(q))',
    reference: 'from collections import deque\nn = int(input())\nq = deque()\nfor _ in range(n):\n    cmd, x = input().split()\n    if cmd == "L":\n        q.appendleft(x)\n    else:\n        q.append(x)\nprint(" ".join(q))',
    cases: [
      { input: '3\nR 1\nL 2\nR 3\n', expected: '2 1 3', sample: true },
      { input: '2\nL a\nL b\n', expected: 'b a' },
      { input: '1\nR x\n', expected: 'x' },
    ],
    tip: '💡 deque は popleft()/appendleft() が速い。幅優先探索(BFS)のキューに最適。',
  },
  {
    title: 'Counter の引き算で買い足す分を出す',
    concept: 'collections',
    tags: ['collections', 'Counter', '多重集合'],
    statement: '1行目に必要な材料、2行目に手元にある材料が、それぞれ空白区切りで並びます（同じ名前が何度も出てくることがあります）。買い足す必要がある材料を「名前:個数」の形で、必要な材料の初出順に空白区切りで出力してください。全部足りていれば "none" と出力してください。\n\n入力例:\negg egg milk flour egg\negg milk milk\n\n出力例:\negg:2 flour:1',
    hints: ['Counter 同士は - で引き算できる。', 'need - have は個数が正のものだけ残る（0 以下になった要素は消える）。', '答え:\nfrom collections import Counter\nneed = Counter(input().split())\nhave = Counter(input().split())\nlack = need - have\nprint(" ".join(f"{k}:{v}" for k, v in lack.items()) if lack else "none")'],
    explanation: 'Counter は多重集合として足し算・引き算ができる。引き算では 0 以下になった要素が自動的に落ちるので、「足りない分」だけが need 側の順序のまま残る。\n\n模範解答:\nfrom collections import Counter\nneed = Counter(input().split())\nhave = Counter(input().split())\nlack = need - have\nprint(" ".join(f"{k}:{v}" for k, v in lack.items()) if lack else "none")',
    reference: 'from collections import Counter\nneed = Counter(input().split())\nhave = Counter(input().split())\nlack = need - have\nprint(" ".join(f"{k}:{v}" for k, v in lack.items()) if lack else "none")',
    cases: [
      { input: 'egg egg milk flour egg\negg milk milk\n', expected: 'egg:2 flour:1', sample: true },
      { input: 'a b c\na b c\n', expected: 'none' },
      { input: 'x x y\nz\n', expected: 'x:2 y:1' },
      { input: 'sugar salt sugar\nsugar sugar sugar\n', expected: 'salt:1' },
    ],
    tip: '💡 need & have は「両方にある分」、need | have は「多い方の個数」。集合演算がそのまま多重集合で使えるのが Counter の強み。',
  },
])

// ===== lv070 便利な標準ライブラリ =====
const lv070 = build(70, 'lv070', [
  {
    title: '最大公約数 (math.gcd)',
    concept: 'math',
    tags: ['math', '標準ライブラリ'],
    statement: '2つの整数 a, b の最大公約数を出力してください。\n\n入力例:\n12 18\n\n出力例:\n6',
    hints: ['import math', 'math.gcd(a, b) で最大公約数。', '答え:\nimport math\na, b = map(int, input().split())\nprint(math.gcd(a, b))'],
    explanation: 'math には gcd, sqrt, factorial, pi など数学の道具が揃う。\n\n模範解答:\nimport math\na, b = map(int, input().split())\nprint(math.gcd(a, b))',
    reference: 'import math\na, b = map(int, input().split())\nprint(math.gcd(a, b))',
    cases: [
      { input: '12 18\n', expected: '6', sample: true },
      { input: '7 5\n', expected: '1' },
      { input: '100 80\n', expected: '20' },
    ],
    tip: '💡 math.gcd / math.isqrt(整数平方根) / math.comb(n,r)(組合せ) は競プロでも頻出。',
  },
  {
    title: '順列の総数 (itertools)',
    concept: 'itertools',
    tags: ['itertools', '標準ライブラリ'],
    statement: '整数 n。1〜n を並べる順列の総数（n!）を itertools.permutations で数えて出力してください。\n\n入力例:\n3\n\n出力例:\n6',
    hints: ['itertools.permutations(range(n)) で全順列。', 'list にして len。', '答え:\nimport itertools\nn = int(input())\nprint(len(list(itertools.permutations(range(n)))))'],
    explanation: 'itertools.permutations は全順列を生成する。\n\n模範解答:\nimport itertools\nn = int(input())\nprint(len(list(itertools.permutations(range(n)))))',
    reference: 'import itertools\nn = int(input())\nprint(len(list(itertools.permutations(range(n)))))',
    cases: [
      { input: '3\n', expected: '6', sample: true },
      { input: '1\n', expected: '1' },
      { input: '4\n', expected: '24' },
    ],
    tip: '💡 itertools には permutations/combinations/product/accumulate など「組合せ系」の道具が満載。',
  },
  {
    title: '累積和 (itertools.accumulate)',
    concept: 'itertools',
    tags: ['itertools', '標準ライブラリ'],
    statement: '整数列の累積和を空白区切りで出力してください。\n\n入力例:\n1 2 3 4\n\n出力例:\n1 3 6 10',
    hints: ['itertools.accumulate は累積和を返す。', 'map(str, ...) して join。', '答え:\nimport itertools\na = map(int, input().split())\nprint(" ".join(map(str, itertools.accumulate(a))))'],
    explanation: 'accumulate は累積（既定は和）を順に返す。\n\n模範解答:\nimport itertools\na = map(int, input().split())\nprint(" ".join(map(str, itertools.accumulate(a))))',
    reference: 'import itertools\na = map(int, input().split())\nprint(" ".join(map(str, itertools.accumulate(a))))',
    cases: [
      { input: '1 2 3 4\n', expected: '1 3 6 10', sample: true },
      { input: '5\n', expected: '5' },
      { input: '2 0 3\n', expected: '2 2 5' },
    ],
    tip: '💡 累積和は「区間の和を O(1) で求める」前処理に必須。accumulate(a, func) で累積積なども。',
  },
  {
    title: '総積 (functools.reduce)',
    concept: 'functools',
    tags: ['functools', '標準ライブラリ'],
    statement: '整数列の総積を functools.reduce で求めて出力してください。\n\n入力例:\n1 2 3 4\n\n出力例:\n24',
    hints: ['reduce(関数, 列) は左から畳み込む。', 'lambda x, y: x * y で積。', '答え:\nfrom functools import reduce\na = map(int, input().split())\nprint(reduce(lambda x, y: x * y, a))'],
    explanation: 'reduce は列を1つの値に畳み込む。\n\n模範解答:\nfrom functools import reduce\na = map(int, input().split())\nprint(reduce(lambda x, y: x * y, a))',
    reference: 'from functools import reduce\na = map(int, input().split())\nprint(reduce(lambda x, y: x * y, a))',
    cases: [
      { input: '1 2 3 4\n', expected: '24', sample: true },
      { input: '5\n', expected: '5' },
      { input: '2 3 0\n', expected: '0' },
    ],
    tip: '💡 functools には reduce, lru_cache(メモ化), partial など強力な道具がある。',
  },
  {
    title: '二分探索 (bisect)',
    concept: 'bisect',
    tags: ['bisect', '二分探索', '標準ライブラリ'],
    statement: '1行目に昇順の整数列、2行目に整数 x。x 未満の要素が何個あるか（x を入れられる左端位置）を出力してください。\n\n入力例:\n1 3 5 7\n5\n\n出力例:\n2',
    starter: 'import bisect\na = list(map(int, input().split()))\nx = int(input())\n',
    hints: ['bisect_left(a, x) は x を入れる左端位置 = x 未満の個数。', 'import bisect。', '答え:\nimport bisect\nprint(bisect.bisect_left(a, x))'],
    explanation: 'ソート済み配列への二分探索。O(log N) で位置が分かる。\n\n模範解答:\nimport bisect\na = list(map(int, input().split()))\nx = int(input())\nprint(bisect.bisect_left(a, x))',
    reference: 'import bisect\na = list(map(int, input().split()))\nx = int(input())\nprint(bisect.bisect_left(a, x))',
    cases: [
      { input: '1 3 5 7\n5\n', expected: '2', sample: true },
      { input: '1 2 3\n0\n', expected: '0' },
      { input: '1 2 3\n9\n', expected: '3' },
    ],
    tip: '💡 bisect_left/right で「以上/より大きい」の境界が一瞬で分かる。insort で挿入も。',
  },
])

export const libProblems: Problem[] = [...lv060, ...lv070]
