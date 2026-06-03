import type { Problem } from '../../types'

/**
 * 手書きの問題（各レベル数問ずつ）。「1レベル=100問」を埋めていく土台。
 * 序盤(lv002〜)は1レベル1概念で連続的に成長できるよう並べてある。
 * すべて 3段階ヒント と reference(参照解) を持つ。
 */

export const otherProblems: Problem[] = [
  // ===== lv002: 変数と代入 =====
  {
    id: 'lv002-001',
    level: 2,
    index: 1,
    title: 'あいさつを変数に',
    statement:
      '変数 name に文字列 "Python" を代入し、"Hello, Python" と出力してください。\n（入力はありません）\n\n出力例:\nHello, Python',
    tags: ['変数', '文字列'],
    concept: '変数と代入',
    starterCode: 'name = "Python"\n# name を使って出力しよう\n',
    hints: [
      '変数は name = "Python" のように = で代入します。',
      '文字列はそのまま print に書けます。"Hello, " と name をつなぐには + を使います。',
      '答え:\nname = "Python"\nprint("Hello, " + name)',
    ],
    explanation: '+ で文字列同士を連結できます。\n\n模範解答:\nname = "Python"\nprint("Hello, " + name)',
    testCases: [{ input: '', expected: 'Hello, Python', sample: true }],
    reference: 'name = "Python"\nprint("Hello, " + name)',
  },
  {
    id: 'lv002-002',
    level: 2,
    index: 2,
    title: '入れ替え',
    statement:
      '変数 a に 1、b に 2 を代入したあと、2つの値を入れ替えて「a の値」「b の値」を各行に出力してください。\n\n出力例:\n2\n1',
    tags: ['変数'],
    concept: '変数と代入',
    starterCode: 'a = 1\nb = 2\n# a と b を入れ替えよう\n',
    hints: [
      'Python では a, b = b, a で同時に入れ替えできます。',
      '入れ替えたあと print(a) と print(b) を順に呼びます。',
      '答え:\na, b = 1, 2\na, b = b, a\nprint(a)\nprint(b)',
    ],
    explanation:
      'Python のタプル代入 a, b = b, a で一時変数なしに入れ替えできます。\n\n模範解答:\na, b = 1, 2\na, b = b, a\nprint(a)\nprint(b)',
    testCases: [{ input: '', expected: '2\n1', sample: true }],
    reference: 'a, b = 1, 2\na, b = b, a\nprint(a)\nprint(b)',
  },

  // ===== lv003: 入力と四則演算 =====
  {
    id: 'lv003-001',
    level: 3,
    index: 1,
    title: '2数の和',
    statement:
      '2つの整数 a, b が1行に空白区切りで与えられます。a + b を出力してください。\n\n入力例:\n3 5\n\n出力例:\n8',
    tags: ['入力', '四則演算'],
    concept: '入力と四則演算',
    starterCode: 'a, b = map(int, input().split())\n',
    hints: [
      'input() で1行を読み、split() で空白ごとに分けられます。',
      'map(int, ...) で文字列を整数に変換できます。',
      '答え:\na, b = map(int, input().split())\nprint(a + b)',
    ],
    explanation:
      'input().split() は文字列のリストを返すので map(int, ...) で整数化します。\n\n模範解答:\na, b = map(int, input().split())\nprint(a + b)',
    testCases: [
      { input: '3 5\n', expected: '8', sample: true },
      { input: '10 20\n', expected: '30' },
      { input: '-4 4\n', expected: '0' },
      { input: '1000000 2000000\n', expected: '3000000' },
    ],
    reference: 'a, b = map(int, input().split())\nprint(a + b)',
  },
  {
    id: 'lv003-002',
    level: 3,
    index: 2,
    title: '割り算の商と余り',
    statement:
      '2つの整数 a, b が空白区切りで与えられます。a を b で割った「商」と「余り」を空白区切りで出力してください。\n\n入力例:\n17 5\n\n出力例:\n3 2',
    tags: ['四則演算', '剰余'],
    concept: '入力と四則演算',
    starterCode: 'a, b = map(int, input().split())\n',
    hints: [
      '整数の割り算（商）は // 、余りは % です。',
      'print では値をカンマで区切ると空白区切りで出力されます。',
      '答え:\na, b = map(int, input().split())\nprint(a // b, a % b)',
    ],
    explanation:
      '// は切り捨て除算、% は剰余。print(x, y) は "x y" と空白区切りで出します。\n\n模範解答:\na, b = map(int, input().split())\nprint(a // b, a % b)',
    testCases: [
      { input: '17 5\n', expected: '3 2', sample: true },
      { input: '10 2\n', expected: '5 0' },
      { input: '7 3\n', expected: '2 1' },
    ],
    reference: 'a, b = map(int, input().split())\nprint(a // b, a % b)',
  },

  // ===== lv004: 文字列の操作 =====
  {
    id: 'lv004-001',
    level: 4,
    index: 1,
    title: '繰り返し文字列',
    statement:
      '文字列 s と整数 n が2行で与えられます。s を n 回くり返した文字列を出力してください。\n\n入力例:\nab\n3\n\n出力例:\nababab',
    tags: ['文字列'],
    concept: '文字列の操作',
    starterCode: 's = input()\nn = int(input())\n',
    hints: [
      '文字列は * で繰り返せます。例: "ab" * 3',
      's * n を print します。',
      '答え:\ns = input()\nn = int(input())\nprint(s * n)',
    ],
    explanation: '文字列 * 整数 でその回数だけ繰り返します。\n\n模範解答:\ns = input()\nn = int(input())\nprint(s * n)',
    testCases: [
      { input: 'ab\n3\n', expected: 'ababab', sample: true },
      { input: 'x\n5\n', expected: 'xxxxx' },
      { input: 'Hi\n1\n', expected: 'Hi' },
    ],
    reference: 's = input()\nn = int(input())\nprint(s * n)',
  },
  {
    id: 'lv004-002',
    level: 4,
    index: 2,
    title: '文字数を数える',
    statement:
      '1行の文字列 s が与えられます。その文字数を出力してください。\n\n入力例:\nhello\n\n出力例:\n5',
    tags: ['文字列'],
    concept: '文字列の操作',
    starterCode: 's = input()\n',
    hints: [
      '文字列の長さは len() で求まります。',
      'len(s) を print します。',
      '答え:\ns = input()\nprint(len(s))',
    ],
    explanation: 'len() は文字列やリストの要素数を返します。\n\n模範解答:\ns = input()\nprint(len(s))',
    testCases: [
      { input: 'hello\n', expected: '5', sample: true },
      { input: 'a\n', expected: '1' },
      { input: 'code dojo\n', expected: '9' },
    ],
    reference: 's = input()\nprint(len(s))',
  },

  // ===== lv005: if 条件分岐 =====
  {
    id: 'lv005-001',
    level: 5,
    index: 1,
    title: '偶数か奇数か',
    statement:
      '整数 n が与えられます。偶数なら "even"、奇数なら "odd" を出力してください。\n\n入力例:\n4\n\n出力例:\neven',
    tags: ['条件分岐', '剰余'],
    concept: '条件分岐',
    starterCode: 'n = int(input())\n',
    hints: [
      '偶数は2で割った余りが0。余りは % で求まります。',
      'if n % 2 == 0: の形で分岐します。',
      '答え:\nn = int(input())\nprint("even" if n % 2 == 0 else "odd")',
    ],
    explanation: '三項演算子 A if 条件 else B で1行に書けます。\n\n模範解答:\nn = int(input())\nprint("even" if n % 2 == 0 else "odd")',
    testCases: [
      { input: '4\n', expected: 'even', sample: true },
      { input: '7\n', expected: 'odd' },
      { input: '0\n', expected: 'even' },
      { input: '-3\n', expected: 'odd' },
    ],
    reference: 'n = int(input())\nprint("even" if n % 2 == 0 else "odd")',
  },
  {
    id: 'lv005-002',
    level: 5,
    index: 2,
    title: '符号',
    statement:
      '整数 n が与えられます。正なら "positive"、0なら "zero"、負なら "negative" を出力してください。\n\n入力例:\n-5\n\n出力例:\nnegative',
    tags: ['条件分岐'],
    concept: '条件分岐',
    starterCode: 'n = int(input())\n',
    hints: [
      'if / elif / else の3分岐を使います。',
      'n > 0 / n == 0 / それ以外 で分けます。',
      '答え:\nif n > 0: print("positive")\nelif n == 0: print("zero")\nelse: print("negative")',
    ],
    explanation:
      'if → elif → else の順で3つに分岐します。\n\n模範解答:\nn = int(input())\nif n > 0:\n    print("positive")\nelif n == 0:\n    print("zero")\nelse:\n    print("negative")',
    testCases: [
      { input: '-5\n', expected: 'negative', sample: true },
      { input: '0\n', expected: 'zero' },
      { input: '42\n', expected: 'positive' },
    ],
    reference:
      'n = int(input())\nif n > 0:\n    print("positive")\nelif n == 0:\n    print("zero")\nelse:\n    print("negative")',
  },

  // ===== lv006: 比較と論理演算 =====
  {
    id: 'lv006-001',
    level: 6,
    index: 1,
    title: '範囲内か判定',
    statement:
      '整数 n が与えられます。n が 1 以上 100 以下なら "yes"、そうでなければ "no" を出力してください。\n\n入力例:\n50\n\n出力例:\nyes',
    tags: ['論理演算', '比較'],
    concept: '論理演算',
    starterCode: 'n = int(input())\n',
    hints: [
      'Python は 1 <= n <= 100 と連続比較が書けます。',
      'and を使って n >= 1 and n <= 100 でも同じです。',
      '答え:\nn = int(input())\nprint("yes" if 1 <= n <= 100 else "no")',
    ],
    explanation: 'Python では a <= x <= b の連鎖比較が使えます。\n\n模範解答:\nn = int(input())\nprint("yes" if 1 <= n <= 100 else "no")',
    testCases: [
      { input: '50\n', expected: 'yes', sample: true },
      { input: '1\n', expected: 'yes' },
      { input: '100\n', expected: 'yes' },
      { input: '0\n', expected: 'no' },
      { input: '101\n', expected: 'no' },
    ],
    reference: 'n = int(input())\nprint("yes" if 1 <= n <= 100 else "no")',
  },

  // ===== lv007: for ループ =====
  {
    id: 'lv007-001',
    level: 7,
    index: 1,
    title: '1からNまで出力',
    statement:
      '整数 N が与えられます。1 から N までを各行に出力してください。\n\n入力例:\n3\n\n出力例:\n1\n2\n3',
    tags: ['ループ'],
    concept: 'for ループ',
    starterCode: 'n = int(input())\n',
    hints: [
      'for i in range(1, n+1): で 1〜N を回せます。',
      'ループの中で print(i) します。',
      '答え:\nfor i in range(1, n + 1):\n    print(i)',
    ],
    explanation: 'range(1, n+1) は 1 から n までを生成します。\n\n模範解答:\nn = int(input())\nfor i in range(1, n + 1):\n    print(i)',
    testCases: [
      { input: '3\n', expected: '1\n2\n3', sample: true },
      { input: '1\n', expected: '1' },
      { input: '5\n', expected: '1\n2\n3\n4\n5' },
    ],
    reference: 'n = int(input())\nfor i in range(1, n + 1):\n    print(i)',
  },
  {
    id: 'lv007-002',
    level: 7,
    index: 2,
    title: '1からNまでの合計',
    statement:
      '整数 N が与えられます。1 から N までの合計を出力してください。\n\n入力例:\n5\n\n出力例:\n15',
    tags: ['ループ', '集計'],
    concept: 'for ループ',
    starterCode: 'n = int(input())\n',
    hints: [
      '合計用の変数を0で初期化し、ループ内で足していきます。',
      'sum(range(1, n+1)) でも一発です。',
      '答え:\nn = int(input())\nprint(sum(range(1, n + 1)))',
    ],
    explanation: 'sum(range(1, n+1)) で合計が得られます。\n\n模範解答:\nn = int(input())\nprint(sum(range(1, n + 1)))',
    testCases: [
      { input: '5\n', expected: '15', sample: true },
      { input: '1\n', expected: '1' },
      { input: '100\n', expected: '5050' },
    ],
    reference: 'n = int(input())\nprint(sum(range(1, n + 1)))',
    tip: '💡 sum() はリストや range の合計を一発で出す。実は等差数列の和 n*(n+1)//2 なら計算量 O(1) で求まる。',
  },

  // ===== lv008: while ループ =====
  {
    id: 'lv008-001',
    level: 8,
    index: 1,
    title: '桁数を数える',
    statement:
      '正の整数 n が与えられます。while を使って n の桁数を出力してください。\n\n入力例:\n12345\n\n出力例:\n5',
    tags: ['ループ', 'while'],
    concept: 'while ループ',
    starterCode: 'n = int(input())\n',
    hints: [
      '10 で割り続けて0になるまでの回数が桁数です。',
      'count を0から始め、while n > 0: の中で n //= 10 と count += 1。',
      '答え:\ncount = 0\nwhile n > 0:\n    n //= 10\n    count += 1\nprint(count)',
    ],
    explanation:
      'n を10で割り続け、0になるまでの回数を数えます。\n\n模範解答:\nn = int(input())\ncount = 0\nwhile n > 0:\n    n //= 10\n    count += 1\nprint(count)',
    testCases: [
      { input: '12345\n', expected: '5', sample: true },
      { input: '7\n', expected: '1' },
      { input: '1000\n', expected: '4' },
    ],
    reference: 'n = int(input())\ncount = 0\nwhile n > 0:\n    n //= 10\n    count += 1\nprint(count)',
  },

  // ===== lv050: ループ応用・集計 =====
  {
    id: 'lv050-001',
    level: 50,
    index: 1,
    title: 'FizzBuzz',
    statement:
      '整数 N が与えられます。1〜N を各行に出力しますが、3の倍数は "Fizz"、5の倍数は "Buzz"、両方なら "FizzBuzz" にしてください。\n\n入力例:\n5\n\n出力例:\n1\n2\nFizz\n4\nBuzz',
    tags: ['ループ', '条件分岐'],
    concept: 'ループ応用',
    starterCode: 'n = int(input())\nfor i in range(1, n + 1):\n    # ここを埋めよう\n    pass\n',
    hints: [
      '15の倍数（3と5の両方）を最初に判定するのがコツです。',
      'i % 15 → FizzBuzz、次に %3、次に %5、どれでもなければ i。',
      '答え:\nif i % 15 == 0: print("FizzBuzz")\nelif i % 3 == 0: print("Fizz")\nelif i % 5 == 0: print("Buzz")\nelse: print(i)',
    ],
    explanation:
      '判定順が重要。先に15の倍数を処理しないと3や5に先に引っかかります。\n\n模範解答:\nn = int(input())\nfor i in range(1, n + 1):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)',
    testCases: [
      { input: '5\n', expected: '1\n2\nFizz\n4\nBuzz', sample: true },
      { input: '15\n', expected: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz' },
    ],
    reference:
      'n = int(input())\nfor i in range(1, n + 1):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)',
  },

  // ===== lv100: 配列・ソート・探索 =====
  {
    id: 'lv100-001',
    level: 100,
    index: 1,
    title: '昇順ソート',
    statement:
      '1行目に個数 N、2行目に N 個の整数が空白区切りで与えられます。小さい順に並べ、空白区切りで1行に出力してください。\n\n入力例:\n5\n3 1 4 1 5\n\n出力例:\n1 1 3 4 5',
    tags: ['配列', 'ソート'],
    concept: '配列・ソート',
    starterCode: 'n = int(input())\na = list(map(int, input().split()))\n',
    hints: [
      'リストは sorted() で並べ替えられます。',
      "出力は ' '.join(...) で空白区切りに。要素は文字列にする必要があります。",
      "答え:\nprint(' '.join(map(str, sorted(a))))",
    ],
    explanation:
      "sorted で昇順、map(str, ...) で文字列化、' '.join で連結します。\n\n模範解答:\nn = int(input())\na = list(map(int, input().split()))\nprint(' '.join(map(str, sorted(a))))",
    testCases: [
      { input: '5\n3 1 4 1 5\n', expected: '1 1 3 4 5', sample: true },
      { input: '3\n100 -5 0\n', expected: '-5 0 100' },
      { input: '1\n42\n', expected: '42' },
    ],
    reference: "n = int(input())\na = list(map(int, input().split()))\nprint(' '.join(map(str, sorted(a))))",
    tip: '💡 sorted(a, reverse=True) で降順、sorted(a, key=...) で好きな基準に。collections.Counter なら出現回数も一瞬。',
  },

  // ===== lv999: 最高峰 =====
  {
    id: 'lv999-001',
    level: 999,
    index: 1,
    title: '最長増加部分列 (LIS)',
    statement:
      '1行目に N、2行目に N 個の整数列。狭義単調増加する部分列の最長の長さを出力してください。\n\n入力例:\n6\n5 1 3 2 4 6\n\n出力例:\n4',
    tags: ['dp', '二分探索', '上級'],
    concept: '動的計画法',
    starterCode: 'import bisect\nn = int(input())\na = list(map(int, input().split()))\n',
    hints: [
      'O(N^2) DP でも解けますが、N が大きいと O(N log N) が必要です。',
      'tails[i] = 長さ i+1 の増加列の末尾の最小値、を bisect_left で更新します。',
      '答え:\ntails = []\nfor x in a:\n    i = bisect.bisect_left(tails, x)\n    if i == len(tails): tails.append(x)\n    else: tails[i] = x\nprint(len(tails))',
    ],
    explanation:
      'tails を保ち、各要素を bisect_left の位置に置換（末尾なら追加）。最終長が LIS。計算量 O(N log N)。\n\n模範解答:\nimport bisect\nn = int(input())\na = list(map(int, input().split()))\ntails = []\nfor x in a:\n    i = bisect.bisect_left(tails, x)\n    if i == len(tails):\n        tails.append(x)\n    else:\n        tails[i] = x\nprint(len(tails))',
    testCases: [
      { input: '6\n5 1 3 2 4 6\n', expected: '4', sample: true },
      { input: '5\n1 2 3 4 5\n', expected: '5' },
      { input: '5\n5 4 3 2 1\n', expected: '1' },
      { input: '1\n7\n', expected: '1' },
    ],
    reference:
      'import bisect\nn = int(input())\na = list(map(int, input().split()))\ntails = []\nfor x in a:\n    i = bisect.bisect_left(tails, x)\n    if i == len(tails):\n        tails.append(x)\n    else:\n        tails[i] = x\nprint(len(tails))',
    tip: '💡 標準ライブラリ bisect は「ソート済み配列への二分探索」を提供。bisect_left/insort で挿入位置も O(log N) で分かる。',
  },
]
