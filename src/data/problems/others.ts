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
    title: '変数の値を更新する',
    statement:
      '変数 x に 10 を代入します。そのあと x に「x + 5」を代入し直して x を出力し、さらに x に「x * 2」を代入し直して x を出力してください。\n（入力はありません）\n\n出力例:\n15\n30',
    tags: ['変数', '再代入'],
    concept: '変数と代入',
    starterCode: 'x = 10\n# x を更新しながら2回出力しよう\n',
    hints: [
      'x = x + 5 は「今の x に 5 を足した値を、あらためて x に入れる」という意味です。',
      '更新するたびに print(x) を呼びます。',
      '答え:\nx = 10\nx = x + 5\nprint(x)\nx = x * 2\nprint(x)',
    ],
    explanation:
      '代入は「右の値を左の名前に入れる」操作なので、x = x + 5 のように今の値をもとに同じ変数を書き換えられる。変数は一度決めたら終わりではなく、何度でも更新できる。\n\n模範解答:\nx = 10\nx = x + 5\nprint(x)\nx = x * 2\nprint(x)',
    testCases: [{ input: '', expected: '15\n30', sample: true }],
    reference: 'x = 10\nx = x + 5\nprint(x)\nx = x * 2\nprint(x)',
    tip: '💡 途中に print を挟むと、変数が今どんな値かを確認できる。動きが分からないときの基本の調べ方。',
  },

  // ===== lv003: 入力と四則演算 =====
  {
    id: 'lv003-001',
    level: 3,
    index: 1,
    title: '2行で受け取った整数のかけ算',
    statement:
      '整数 a と b が、1行に1つずつ2行で与えられます。a × b を出力してください。\n\n入力例:\n6\n7\n\n出力例:\n42',
    tags: ['入力', '四則演算', '型変換'],
    concept: '入力と四則演算',
    starterCode: 'a = int(input())\nb = int(input())\n',
    hints: [
      '1行に1つずつ入っているので、input() を2回呼ぶと a と b を順に受け取れます。',
      'input() の結果は文字列なので、int() で整数に直してから掛けます。',
      '答え:\na = int(input())\nb = int(input())\nprint(a * b)',
    ],
    explanation:
      '1行に2つ並んでいれば split() で分けるが、行が分かれているときは input() を行の数だけ呼ぶ。入力の形に合わせて読み方を選ぶのが第一歩。\n\n模範解答:\na = int(input())\nb = int(input())\nprint(a * b)',
    testCases: [
      { input: '6\n7\n', expected: '42', sample: true },
      { input: '12\n0\n', expected: '0' },
      { input: '-3\n5\n', expected: '-15' },
      { input: '100000\n100000\n', expected: '10000000000' },
    ],
    reference: 'a = int(input())\nb = int(input())\nprint(a * b)',
    tip: '💡 Python の整数は桁あふれしない。100000 × 100000 のような大きな積もそのまま正しく計算できる。',
  },
  {
    id: 'lv003-002',
    level: 3,
    index: 2,
    title: '数として足すか、文字としてつなぐか',
    statement:
      '2つの整数が1行に空白区切りで与えられます。1行目に「数として足した値」、2行目に「文字としてそのままつないだ値」を出力してください。\n\n入力例:\n12 5\n\n出力例:\n17\n125',
    tags: ['入力', '型変換', '文字列'],
    concept: '入力と四則演算',
    starterCode: 'a, b = input().split()\n',
    hints: [
      'input().split() で取り出した2つは、どちらも文字列のままです。',
      '文字列どうしの + は「つなぐ」操作。足し算にしたいときは int() で数に直します。',
      '答え:\na, b = input().split()\nprint(int(a) + int(b))\nprint(a + b)',
    ],
    explanation:
      '同じ + でも、数どうしなら足し算、文字列どうしならつなぐ操作になる。入力は必ず文字列で届くので、計算する前に int() を通す必要がある。\n\n模範解答:\na, b = input().split()\nprint(int(a) + int(b))\nprint(a + b)',
    testCases: [
      { input: '12 5\n', expected: '17\n125', sample: true },
      { input: '3 4\n', expected: '7\n34' },
      { input: '100 200\n', expected: '300\n100200' },
      { input: '0 7\n', expected: '7\n07' },
    ],
    reference: 'a, b = input().split()\nprint(int(a) + int(b))\nprint(a + b)',
  },

  // ===== lv004: 文字列の操作 =====
  {
    id: 'lv004-001',
    level: 4,
    index: 1,
    title: 'l番目からr番目までを切り出す',
    statement:
      '1行目に文字列 s、2行目に整数 l と r が空白区切りで与えられます。s の左から l 番目の文字から r 番目の文字までを取り出して出力してください。先頭の文字を1番目と数えます。\n\n入力例:\nprogramming\n4 7\n\n出力例:\ngram',
    tags: ['文字列', 'スライス'],
    concept: '文字列の操作',
    starterCode: 's = input()\nl, r = map(int, input().split())\n',
    hints: [
      's[a:b] で添字 a から b の1つ手前までを切り出せます（スライス）。',
      '添字は0始まりなので l 番目は s[l - 1]。r 番目まで含めたいので、終わりは r のままでよいです。',
      '答え:\ns = input()\nl, r = map(int, input().split())\nprint(s[l - 1:r])',
    ],
    explanation:
      'スライス s[a:b] は「a 以上 b 未満」の添字を取り出す。始まりは 1 ずらして l - 1、終わりは r 番目を含めたいので「r 未満」つまり r と書けばちょうど合う。\n\n模範解答:\ns = input()\nl, r = map(int, input().split())\nprint(s[l - 1:r])',
    testCases: [
      { input: 'programming\n4 7\n', expected: 'gram', sample: true },
      { input: 'hello\n1 5\n', expected: 'hello' },
      { input: 'python\n3 3\n', expected: 't' },
      { input: 'abcdef\n2 4\n', expected: 'bcd' },
    ],
    reference: 's = input()\nl, r = map(int, input().split())\nprint(s[l - 1:r])',
    tip: '💡 スライスの「終わりは含まない」ルールのおかげで、s[a:b] の長さがそのまま b - a になる。区間の長さを暗算しやすい設計。',
  },
  {
    id: 'lv004-002',
    level: 4,
    index: 2,
    title: 'k番目の文字',
    statement:
      '1行目に文字列 s、2行目に整数 k が与えられます。s の左から k 番目の文字を出力してください。先頭の文字を1番目と数えます。\n\n入力例:\nhello\n2\n\n出力例:\ne',
    tags: ['文字列', 'インデックス'],
    concept: '文字列の操作',
    starterCode: 's = input()\nk = int(input())\n',
    hints: [
      'Python の添字は0から始まります。先頭の文字は s[0] です。',
      '1番目の文字が s[0] なので、k 番目は s[k - 1] になります。',
      '答え:\ns = input()\nk = int(input())\nprint(s[k - 1])',
    ],
    explanation:
      '人が数える「k 番目」は1から、Python の添字は0から始まる。この1つのズレを引き算で吸収するのが s[k - 1] という書き方。\n\n模範解答:\ns = input()\nk = int(input())\nprint(s[k - 1])',
    testCases: [
      { input: 'hello\n2\n', expected: 'e', sample: true },
      { input: 'python\n1\n', expected: 'p' },
      { input: 'abcdef\n6\n', expected: 'f' },
      { input: 'dojo\n3\n', expected: 'j' },
    ],
    reference: 's = input()\nk = int(input())\nprint(s[k - 1])',
    tip: '💡 添字が0始まりなのは、末尾から数える s[-1] と組み合わせるためでもある。1始まりの入力は必ず -1 して受ける癖をつけよう。',
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
