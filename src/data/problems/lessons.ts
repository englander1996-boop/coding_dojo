import type { Problem } from '../../types'

/**
 * 前提知識を埋めるための「先に教える」レッスン群。
 * 上級問題が使う土台テクニック（break/float('inf')/setdefault/2次元リスト）を、
 * それらが初めて必要になるより前のレベルで導入する。＝『そんなコード知らない』をゼロに。
 */

export const lessonProblems: Problem[] = [
  // lv009 (リストの基礎) に スタック(append/pop) を導入
  {
    id: 'lv009-006',
    level: 9,
    index: 6,
    title: 'スタック（append / pop）',
    concept: 'リストの基礎',
    tags: ['リスト', 'スタック', 'pop'],
    statement:
      '空白区切りの整数列が与えられます。リストをスタックとして使い、末尾から取り出して逆順に空白区切りで出力してください（pop を使う）。\n\n入力例:\n1 2 3\n\n出力例:\n3 2 1',
    starterCode: 'a = list(map(int, input().split()))\nstack = []\n',
    hints: [
      'append で末尾に積む、pop() で末尾を取り出す（後入れ先出し=LIFO）。',
      '全部積んでから、空になるまで pop して並べる。',
      '答え:\nout = []\nwhile a:\n    out.append(str(a.pop()))\nprint(" ".join(out))',
    ],
    explanation:
      'リストの .append()/.pop() で「スタック(LIFO)」になる。pop() は末尾要素を取り出して返す。\n\n模範解答:\na = list(map(int, input().split()))\nout = []\nwhile a:\n    out.append(str(a.pop()))\nprint(" ".join(out))',
    reference: 'a = list(map(int, input().split()))\nout = []\nwhile a:\n    out.append(str(a.pop()))\nprint(" ".join(out))',
    testCases: [
      { input: '1 2 3\n', expected: '3 2 1', sample: true },
      { input: '5\n', expected: '5' },
      { input: '1 2 3 4 5\n', expected: '5 4 3 2 1' },
    ],
    tip: '💡 a.pop() は末尾、a.pop(0) は先頭(遅い)。スタックは括弧整合・単調スタック・DFS の土台。',
  },

  // lv007 (for ループ) に break を導入
  {
    id: 'lv007-003',
    level: 7,
    index: 3,
    title: '線形探索（break）',
    concept: 'for ループ',
    tags: ['ループ', 'break'],
    statement: '1行目に空白区切りの整数列、2行目に整数 x。x が最初に現れる位置(0始まり)を出力してください。無ければ -1。\n\n入力例:\n10 20 30\n20\n\n出力例:\n1',
    starterCode: 'a = input().split()\nx = input()\n',
    hints: ['見つけたら break でループを止める(残りは見なくてよい)。', 'for i in range(len(a)): で順に調べる。', '答え:\nans = -1\nfor i in range(len(a)):\n    if a[i] == x:\n        ans = i\n        break\nprint(ans)'],
    explanation: 'break はループを途中で抜ける命令。見つけ次第やめれば無駄がない。continue は「その回だけ飛ばす」。\n\n模範解答:\na = input().split()\nx = input()\nans = -1\nfor i in range(len(a)):\n    if a[i] == x:\n        ans = i\n        break\nprint(ans)',
    reference: 'a = input().split()\nx = input()\nans = -1\nfor i in range(len(a)):\n    if a[i] == x:\n        ans = i\n        break\nprint(ans)',
    testCases: [
      { input: '10 20 30\n20\n', expected: '1', sample: true },
      { input: '1 2 3\n9\n', expected: '-1' },
      { input: '5\n5\n', expected: '0' },
    ],
    tip: '💡 break で即終了、continue でその回だけスキップ。ループの流れを細かく制御できる。',
  },

  // lv012 (辞書) に setdefault を導入
  {
    id: 'lv012-005',
    level: 12,
    index: 5,
    title: 'setdefault でグループ化',
    concept: '辞書',
    tags: ['辞書', 'setdefault'],
    statement: '1行目に行数 N、続く N 行に「グループ 名前」。各グループの名前を、グループ初出順・名前は与えられた順で「グループ:名前1,名前2」を各行に出力してください（setdefault を使う）。\n\n入力例:\n3\nA taro\nB jiro\nA hanako\n\n出力例:\nA:taro,hanako\nB:jiro',
    starterCode: 'n = int(input())\nd = {}\n',
    hints: ['d.setdefault(k, []) は「無ければ空リストを作って返す」。', 'd.setdefault(g, []).append(name) で追加できる。', '答え:\nfor _ in range(n):\n    g, name = input().split()\n    d.setdefault(g, []).append(name)'],
    explanation: 'setdefault はキーが無ければ既定値で作ってから返す。if での初期化が要らない。\n\n模範解答:\nn = int(input())\nd = {}\nfor _ in range(n):\n    g, name = input().split()\n    d.setdefault(g, []).append(name)\nprint("\\n".join(f"{k}:{\',\'.join(v)}" for k, v in d.items()))',
    reference: 'n = int(input())\nd = {}\nfor _ in range(n):\n    g, name = input().split()\n    d.setdefault(g, []).append(name)\nprint("\\n".join(f"{k}:{\',\'.join(v)}" for k, v in d.items()))',
    testCases: [
      { input: '3\nA taro\nB jiro\nA hanako\n', expected: 'A:taro,hanako\nB:jiro', sample: true },
      { input: '1\nX a\n', expected: 'X:a' },
      { input: '2\nA x\nA y\n', expected: 'A:x,y' },
    ],
    tip: '💡 setdefault は defaultdict(list) と同じことを素の辞書でやる方法。後で collections も学ぶ。',
  },

  // lv025 (便利な構文) に float('inf') を導入
  {
    id: 'lv025-007',
    level: 25,
    index: 7,
    title: "番兵 float('inf')",
    concept: '便利な構文',
    tags: ['float', '番兵'],
    statement: "整数列の最小値を、初期値 float('inf') を使ったループで求めて出力してください（min は使わない）。\n\n入力例:\n3 1 4 1 5\n\n出力例:\n1",
    starterCode: 'a = list(map(int, input().split()))\n',
    hints: ["float('inf') は「どんな数より大きい」無限大。最小値探索の初期値に最適。", 'best を inf から始め、より小さい値で更新。', "答え:\nbest = float('inf')\nfor x in a:\n    if x < best:\n        best = x\nprint(best)"],
    explanation: "float('inf') は正の無限大、float('-inf') は負の無限大。最小値を探すなら inf から始めれば、最初の要素で必ず更新される。\n\n模範解答:\na = list(map(int, input().split()))\nbest = float('inf')\nfor x in a:\n    if x < best:\n        best = x\nprint(best)",
    reference: "a = list(map(int, input().split()))\nbest = float('inf')\nfor x in a:\n    if x < best:\n        best = x\nprint(best)",
    testCases: [
      { input: '3 1 4 1 5\n', expected: '1', sample: true },
      { input: '5\n', expected: '5' },
      { input: '-2 -9 0\n', expected: '-9' },
    ],
    tip: "💡 float('inf') は「まだ何も無い」初期値の定番。ダイクストラの初期距離やDPの初期化で多用する。",
  },

  // lv030 (内包表記) に 2次元リスト を導入
  {
    id: 'lv030-006',
    level: 30,
    index: 6,
    title: '2次元リスト（グリッド）',
    concept: '内包表記',
    tags: ['2次元リスト', '内包表記'],
    statement: '整数 R C が空白区切りで与えられます。R 行 C 列で、対角(行番号==列番号)が1・他が0のグリッドを作り、各行を空白区切りで出力してください。\n\n入力例:\n3 3\n\n出力例:\n1 0 0\n0 1 0\n0 0 1',
    starterCode: 'r, c = map(int, input().split())\n',
    hints: ['2次元リストは [[0] * C for _ in range(R)] で作る。', '二重ループで grid[i][j] を設定。', '答え:\ngrid = [[0] * c for _ in range(r)]\nfor i in range(r):\n    for j in range(c):\n        if i == j:\n            grid[i][j] = 1'],
    explanation: '2次元リストは「リストのリスト」。必ず [[0]*C for _ in range(R)] で作る([[0]*C]*R は全行が同じ参照になる罠)。\n\n模範解答:\nr, c = map(int, input().split())\ngrid = [[0] * c for _ in range(r)]\nfor i in range(r):\n    for j in range(c):\n        if i == j:\n            grid[i][j] = 1\nfor row in grid:\n    print(" ".join(map(str, row)))',
    reference: 'r, c = map(int, input().split())\ngrid = [[0] * c for _ in range(r)]\nfor i in range(r):\n    for j in range(c):\n        if i == j:\n            grid[i][j] = 1\nfor row in grid:\n    print(" ".join(map(str, row)))',
    testCases: [
      { input: '3 3\n', expected: '1 0 0\n0 1 0\n0 0 1', sample: true },
      { input: '2 2\n', expected: '1 0\n0 1' },
      { input: '1 3\n', expected: '1 0 0' },
    ],
    tip: '💡 グリッド・DPテーブル・盤面はすべて2次元リスト。[[0]*c]*r は罠なので内包表記で作る。',
  },
]
