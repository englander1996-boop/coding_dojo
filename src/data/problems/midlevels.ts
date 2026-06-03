import type { Problem } from '../../types'
import { build } from './_build.ts'

/**
 * 中級帯。データ構造(リスト/辞書/集合/タプル)、enumerate/zip、関数、lambda/高階関数、
 * 内包表記、例外処理をカバー。機能網羅の穴を埋める。
 */

// ===== lv009 リストの基礎 =====
const lv009 = build(9, 'lv009', [
  {
    title: 'リストを作る',
    concept: 'リストの基礎',
    tags: ['リスト'],
    statement: '空白区切りの整数列が与えられます。リストにして、Python のリスト形式 [a, b, c] のまま出力してください。\n\n入力例:\n3 1 2\n\n出力例:\n[3, 1, 2]',
    starter: 'a = list(map(int, input().split()))\n',
    hints: ['list(map(int, input().split())) で整数リストになります。', 'リストはそのまま print すると [..] 形式で出ます。', '答え:\na = list(map(int, input().split()))\nprint(a)'],
    explanation: 'print(リスト) は [3, 1, 2] のように表示します。\n\n模範解答:\na = list(map(int, input().split()))\nprint(a)',
    reference: 'a = list(map(int, input().split()))\nprint(a)',
    cases: [
      { input: '3 1 2\n', expected: '[3, 1, 2]', sample: true },
      { input: '5\n', expected: '[5]' },
      { input: '1 2 3 4 5\n', expected: '[1, 2, 3, 4, 5]' },
    ],
    tip: '💡 要素を空白区切りで出したいときは " ".join(map(str, a)) を使う。',
  },
  {
    title: '要素の個数',
    concept: 'リストの基礎',
    tags: ['リスト', 'len'],
    statement: '空白区切りの単語が与えられます。単語の個数を出力してください。\n\n入力例:\napple banana cherry\n\n出力例:\n3',
    starter: 'a = input().split()\n',
    hints: ['split() で単語のリストになります。', 'len() で個数が分かります。', '答え:\nprint(len(input().split()))'],
    explanation: 'split() は空白で区切ったリストを返し、len で個数。\n\n模範解答:\nprint(len(input().split()))',
    reference: 'print(len(input().split()))',
    cases: [
      { input: 'apple banana cherry\n', expected: '3', sample: true },
      { input: 'x\n', expected: '1' },
      { input: 'a b c d e\n', expected: '5' },
    ],
  },
  {
    title: 'i番目の要素',
    concept: 'リストの基礎',
    tags: ['リスト', 'インデックス'],
    statement: '1行目に空白区切りの整数列、2行目に整数 i。リストの i 番目(0始まり)の要素を出力してください。\n\n入力例:\n10 20 30\n1\n\n出力例:\n20',
    starter: 'a = input().split()\ni = int(input())\n',
    hints: ['リストは a[i] で取り出せます。', 'i は0始まり。', '答え:\na = input().split()\ni = int(input())\nprint(a[i])'],
    explanation: 'インデックスは0始まり。\n\n模範解答:\na = input().split()\ni = int(input())\nprint(a[i])',
    reference: 'a = input().split()\ni = int(input())\nprint(a[i])',
    cases: [
      { input: '10 20 30\n1\n', expected: '20', sample: true },
      { input: '5 6 7 8\n0\n', expected: '5' },
      { input: '1 2 3\n2\n', expected: '3' },
    ],
  },
  {
    title: '末尾に追加 (append)',
    concept: 'リストの基礎',
    tags: ['リスト', 'append'],
    statement: '1行目に整数列、2行目に整数 x。リストの末尾に x を追加し、全体を空白区切りで出力してください。\n\n入力例:\n1 2 3\n4\n\n出力例:\n1 2 3 4',
    starter: 'a = list(map(int, input().split()))\nx = int(input())\n',
    hints: ['末尾追加は a.append(x)。', '出力は " ".join(map(str, a))。', '答え:\na.append(x)\nprint(" ".join(map(str, a)))'],
    explanation: 'append は末尾に1つ追加。\n\n模範解答:\na = list(map(int, input().split()))\nx = int(input())\na.append(x)\nprint(" ".join(map(str, a)))',
    reference: 'a = list(map(int, input().split()))\nx = int(input())\na.append(x)\nprint(" ".join(map(str, a)))',
    cases: [
      { input: '1 2 3\n4\n', expected: '1 2 3 4', sample: true },
      { input: '5\n6\n', expected: '5 6' },
    ],
    tip: '💡 a.append(x) は末尾追加、a.insert(i, x) は途中挿入、a.pop() は末尾を取り出し。',
  },
  {
    title: '含まれるか (in)',
    concept: 'リストの基礎',
    tags: ['リスト', 'in'],
    statement: '1行目に空白区切りの単語、2行目に単語 x。x がリストに含まれれば yes、なければ no を出力してください。\n\n入力例:\napple banana cherry\nbanana\n\n出力例:\nyes',
    starter: 'a = input().split()\nx = input()\n',
    hints: ['含まれるか調べるのは x in a。', 'print("yes" if x in a else "no")。', '答え:\na = input().split()\nx = input()\nprint("yes" if x in a else "no")'],
    explanation: 'in は要素の有無を True/False で返す。\n\n模範解答:\na = input().split()\nx = input()\nprint("yes" if x in a else "no")',
    reference: 'a = input().split()\nx = input()\nprint("yes" if x in a else "no")',
    cases: [
      { input: 'apple banana cherry\nbanana\n', expected: 'yes', sample: true },
      { input: 'a b c\nd\n', expected: 'no' },
      { input: 'x y\nx\n', expected: 'yes' },
    ],
    tip: '💡 in はリスト・文字列・辞書のキー・集合に使える。集合(set)なら判定が超高速。',
  },
])

// ===== lv010 リスト集計 =====
const lv010 = build(10, 'lv010', [
  {
    title: '合計',
    concept: 'リスト集計',
    tags: ['リスト', '集計'],
    statement: '空白区切りの整数列の合計を出力してください。\n\n入力例:\n1 2 3 4\n\n出力例:\n10',
    hints: ['sum() は合計を返します。', 'sum(map(int, input().split()))。', '答え:\nprint(sum(map(int, input().split())))'],
    explanation: 'sum はイテラブルの合計。\n\n模範解答:\nprint(sum(map(int, input().split())))',
    reference: 'print(sum(map(int, input().split())))',
    cases: [
      { input: '1 2 3 4\n', expected: '10', sample: true },
      { input: '5\n', expected: '5' },
      { input: '-1 1\n', expected: '0' },
    ],
  },
  {
    title: '最大と最小',
    concept: 'リスト集計',
    tags: ['リスト'],
    statement: '整数列の最大値と最小値を空白区切りで出力してください。\n\n入力例:\n3 1 4 1 5\n\n出力例:\n5 1',
    starter: 'a = list(map(int, input().split()))\n',
    hints: ['max(a), min(a)。', 'リストをそのまま渡せる。', '答え:\nprint(max(a), min(a))'],
    explanation: 'max/min はリストを受け取れる。\n\n模範解答:\na = list(map(int, input().split()))\nprint(max(a), min(a))',
    reference: 'a = list(map(int, input().split()))\nprint(max(a), min(a))',
    cases: [
      { input: '3 1 4 1 5\n', expected: '5 1', sample: true },
      { input: '7\n', expected: '7 7' },
      { input: '-3 -1 -2\n', expected: '-1 -3' },
    ],
  },
  {
    title: '逆順に並べる',
    concept: 'リスト集計',
    tags: ['リスト', 'スライス'],
    statement: '空白区切りの単語列を逆順にして空白区切りで出力してください。\n\n入力例:\na b c\n\n出力例:\nc b a',
    hints: ['a[::-1] で逆順のリストになります。', '" ".join(...) でつなぐ。', '答え:\nprint(" ".join(input().split()[::-1]))'],
    explanation: 'スライス [::-1] で逆順。\n\n模範解答:\nprint(" ".join(input().split()[::-1]))',
    reference: 'print(" ".join(input().split()[::-1]))',
    cases: [
      { input: 'a b c\n', expected: 'c b a', sample: true },
      { input: '1 2 3 4\n', expected: '4 3 2 1' },
    ],
    tip: '💡 [::-1] は逆順、a.reverse() はその場反転、reversed(a) はイテレータを返す。',
  },
  {
    title: '2番目に大きい値',
    concept: 'リスト集計',
    tags: ['リスト', 'ソート'],
    statement: '整数列で2番目に大きい値を出力してください（同じ値が複数あっても、並べた上で後ろから2番目）。\n\n入力例:\n3 1 4 1 5\n\n出力例:\n4',
    hints: ['sorted で昇順に並べる。', '後ろから2番目は a[-2]。', '答え:\na = sorted(map(int, input().split()))\nprint(a[-2])'],
    explanation: 'sorted で昇順、a[-2] が後ろから2番目。\n\n模範解答:\na = sorted(map(int, input().split()))\nprint(a[-2])',
    reference: 'a = sorted(map(int, input().split()))\nprint(a[-2])',
    cases: [
      { input: '3 1 4 1 5\n', expected: '4', sample: true },
      { input: '10 20\n', expected: '10' },
      { input: '5 5 5\n', expected: '5' },
    ],
  },
  {
    title: '平均（小数2桁）',
    concept: 'リスト集計',
    tags: ['リスト', 'f-string'],
    statement: '整数列の平均を小数第2位まで出力してください。\n\n入力例:\n1 2 3 4\n\n出力例:\n2.50',
    starter: 'a = list(map(int, input().split()))\n',
    hints: ['平均 = 合計 / 個数。', '小数2桁固定は f"{x:.2f}"。', '答え:\nprint(f"{sum(a) / len(a):.2f}")'],
    explanation: 'f"{x:.2f}" は小数2桁で固定表示(末尾の0も残る)。\n\n模範解答:\na = list(map(int, input().split()))\nprint(f"{sum(a) / len(a):.2f}")',
    reference: 'a = list(map(int, input().split()))\nprint(f"{sum(a) / len(a):.2f}")',
    cases: [
      { input: '1 2 3 4\n', expected: '2.50', sample: true },
      { input: '10\n', expected: '10.00' },
      { input: '2 4\n', expected: '3.00' },
    ],
    tip: '💡 f"{x:.2f}" は末尾の0も残す。round() は末尾0が消えることがある。',
  },
])

// ===== lv012 辞書 dict =====
const lv012 = build(12, 'lv012', [
  {
    title: '辞書で値を引く',
    concept: '辞書',
    tags: ['辞書', 'dict'],
    statement: '1行目に組数 N。続く N 行に「名前 値段」。最後の行に商品名が1つ与えられます。その値段を出力してください。\n\n入力例:\n2\napple 100\nbanana 80\napple\n\n出力例:\n100',
    starter: 'n = int(input())\nprice = {}\n',
    hints: ['空の辞書は price = {}。', 'price[name] = 値 で登録、price[q] で取り出す。', '答え:\nprice[name] = int(p)\n...\nprint(price[q])'],
    explanation: '辞書はキーと値の対応表。price[キー] で値を取り出す。\n\n模範解答:\nn = int(input())\nprice = {}\nfor _ in range(n):\n    name, p = input().split()\n    price[name] = int(p)\nq = input()\nprint(price[q])',
    reference: 'n = int(input())\nprice = {}\nfor _ in range(n):\n    name, p = input().split()\n    price[name] = int(p)\nq = input()\nprint(price[q])',
    cases: [
      { input: '2\napple 100\nbanana 80\napple\n', expected: '100', sample: true },
      { input: '1\nx 5\nx\n', expected: '5' },
      { input: '3\na 1\nb 2\nc 3\nb\n', expected: '2' },
    ],
    tip: '💡 辞書は「名前→値」の超高速な対応表。in でキーの有無、.get(k, 既定値) で安全に取得できる。',
  },
  {
    title: 'get で既定値',
    concept: '辞書',
    tags: ['辞書', 'dict'],
    statement: '1行目に組数 N、続く N 行に「単語 個数」、最後に問い合わせる単語。登録が無ければ 0 を出力してください。\n\n入力例:\n2\napple 3\nbanana 5\ncherry\n\n出力例:\n0',
    starter: 'n = int(input())\nd = {}\n',
    hints: ['.get(キー, 既定値) は無いとき既定値を返します。', 'd.get(q, 0)。', '答え:\nprint(d.get(q, 0))'],
    explanation: 'd[k] は無いキーでエラー、d.get(k, 0) は無ければ 0。\n\n模範解答:\nn = int(input())\nd = {}\nfor _ in range(n):\n    k, v = input().split()\n    d[k] = int(v)\nq = input()\nprint(d.get(q, 0))',
    reference: 'n = int(input())\nd = {}\nfor _ in range(n):\n    k, v = input().split()\n    d[k] = int(v)\nq = input()\nprint(d.get(q, 0))',
    cases: [
      { input: '2\napple 3\nbanana 5\ncherry\n', expected: '0', sample: true },
      { input: '1\nx 9\nx\n', expected: '9' },
      { input: '2\na 1\nb 2\nb\n', expected: '2' },
    ],
  },
  {
    title: 'キー一覧',
    concept: '辞書',
    tags: ['辞書', 'dict'],
    statement: '1行目に組数 N、続く N 行に「キー 値」。すべてのキーを登録順に空白区切りで出力してください。\n\n入力例:\n3\na 1\nb 2\nc 3\n\n出力例:\na b c',
    starter: 'n = int(input())\nd = {}\n',
    hints: ['d.keys() でキー一覧。', '" ".join(d.keys())。', '答え:\nprint(" ".join(d.keys()))'],
    explanation: 'Python3.7+ では辞書は挿入順を保ちます。.keys()/.values()/.items()。\n\n模範解答:\nn = int(input())\nd = {}\nfor _ in range(n):\n    k, v = input().split()\n    d[k] = v\nprint(" ".join(d.keys()))',
    reference: 'n = int(input())\nd = {}\nfor _ in range(n):\n    k, v = input().split()\n    d[k] = v\nprint(" ".join(d.keys()))',
    cases: [
      { input: '3\na 1\nb 2\nc 3\n', expected: 'a b c', sample: true },
      { input: '1\nx 0\n', expected: 'x' },
    ],
    tip: '💡 .items() でキーと値を同時に for で回せる: for k, v in d.items():',
  },
  {
    title: '出現回数を数える',
    concept: '辞書',
    tags: ['辞書', '集計'],
    statement: '空白区切りの単語列。各単語の出現回数を「単語:回数」の形式で、初めて出た順に空白区切りで出力してください。\n\n入力例:\na b a c a\n\n出力例:\na:3 b:1 c:1',
    starter: 'words = input().split()\ncount = {}\n',
    hints: ['count.get(w, 0) + 1 で数えます。', 'f"{k}:{v}" を join する。', '答え:\nfor w in words:\n    count[w] = count.get(w, 0) + 1'],
    explanation: '辞書で数えるのは定番パターン。\n\n模範解答:\nwords = input().split()\ncount = {}\nfor w in words:\n    count[w] = count.get(w, 0) + 1\nprint(" ".join(f"{k}:{v}" for k, v in count.items()))',
    reference: 'words = input().split()\ncount = {}\nfor w in words:\n    count[w] = count.get(w, 0) + 1\nprint(" ".join(f"{k}:{v}" for k, v in count.items()))',
    cases: [
      { input: 'a b a c a\n', expected: 'a:3 b:1 c:1', sample: true },
      { input: 'x\n', expected: 'x:1' },
      { input: 'p p p\n', expected: 'p:3' },
    ],
    tip: '💡 この「数える」は collections.Counter(words) で1行になる！（lv060 で学ぶ）',
  },
])

// ===== lv013 集合 set =====
const lv013 = build(13, 'lv013', [
  {
    title: '種類の数（重複除去）',
    concept: '集合',
    tags: ['集合', 'set'],
    statement: '空白区切りの整数列。重複を除いた種類数を出力してください。\n\n入力例:\n1 2 2 3 3 3\n\n出力例:\n3',
    hints: ['set() は重複を除きます。', 'len(set(...))。', '答え:\nprint(len(set(input().split())))'],
    explanation: 'set は重複なしの集合。\n\n模範解答:\nprint(len(set(input().split())))',
    reference: 'print(len(set(input().split())))',
    cases: [
      { input: '1 2 2 3 3 3\n', expected: '3', sample: true },
      { input: '5 5 5\n', expected: '1' },
      { input: '1 2 3 4\n', expected: '4' },
    ],
    tip: '💡 set(リスト) で一発重複除去。ただし順序は保たれない点に注意。',
  },
  {
    title: '共通要素の数',
    concept: '集合',
    tags: ['集合', 'set'],
    statement: '2行に整数列が与えられます。両方に含まれる数の個数を出力してください。\n\n入力例:\n1 2 3 4\n3 4 5 6\n\n出力例:\n2',
    starter: 'a = set(input().split())\nb = set(input().split())\n',
    hints: ['積集合は a & b。', 'len で個数。', '答え:\nprint(len(a & b))'],
    explanation: '& 積集合、| 和集合、- 差集合。\n\n模範解答:\na = set(input().split())\nb = set(input().split())\nprint(len(a & b))',
    reference: 'a = set(input().split())\nb = set(input().split())\nprint(len(a & b))',
    cases: [
      { input: '1 2 3 4\n3 4 5 6\n', expected: '2', sample: true },
      { input: '1 2\n3 4\n', expected: '0' },
      { input: '1 2 3\n1 2 3\n', expected: '3' },
    ],
    tip: '💡 集合演算: a & b 共通, a | b 合併, a - b 差, a ^ b どちらか一方。',
  },
  {
    title: '含まれるか（高速判定）',
    concept: '集合',
    tags: ['集合', 'in'],
    statement: '1行目に整数列、2行目に問い合わせる整数。含まれれば yes、なければ no を出力してください。\n\n入力例:\n3 1 4 1 5\n4\n\n出力例:\nyes',
    starter: 's = set(input().split())\nq = input()\n',
    hints: ['set にして in で調べる。', 'q in s。', '答え:\nprint("yes" if q in s else "no")'],
    explanation: '集合の in は平均 O(1) でとても速い。\n\n模範解答:\ns = set(input().split())\nq = input()\nprint("yes" if q in s else "no")',
    reference: 's = set(input().split())\nq = input()\nprint("yes" if q in s else "no")',
    cases: [
      { input: '3 1 4 1 5\n4\n', expected: 'yes', sample: true },
      { input: '1 2 3\n9\n', expected: 'no' },
    ],
  },
])

// ===== lv015 enumerate と zip =====
const lv015 = build(15, 'lv015', [
  {
    title: 'enumerate で番号付け',
    concept: 'enumerate と zip',
    tags: ['enumerate', 'ループ'],
    statement: '空白区切りの単語列。各単語に1始まりの番号を付けて「番号:単語」を各行に出力してください。\n\n入力例:\napple banana\n\n出力例:\n1:apple\n2:banana',
    hints: ['enumerate(リスト) は (番号, 要素) を返します。', '開始番号は enumerate(リスト, 1)。', '答え:\nfor i, w in enumerate(input().split(), 1):\n    print(f"{i}:{w}")'],
    explanation: 'enumerate でインデックスと要素を同時に取得。第2引数で開始番号。\n\n模範解答:\nfor i, w in enumerate(input().split(), 1):\n    print(f"{i}:{w}")',
    reference: 'for i, w in enumerate(input().split(), 1):\n    print(f"{i}:{w}")',
    cases: [
      { input: 'apple banana\n', expected: '1:apple\n2:banana', sample: true },
      { input: 'x\n', expected: '1:x' },
    ],
    tip: '💡 enumerate は「番号付きで回したい」ときの定番。range(len(a)) より読みやすい。',
  },
  {
    title: 'zip で2列を同時に',
    concept: 'enumerate と zip',
    tags: ['zip', 'ループ'],
    statement: '1行目に名前列、2行目に点数列（同数）。「名前:点数」を各行に出力してください。\n\n入力例:\nAlice Bob\n90 80\n\n出力例:\nAlice:90\nBob:80',
    starter: 'names = input().split()\nscores = input().split()\n',
    hints: ['zip は複数のリストを同時に回します。', 'for n, s in zip(names, scores)。', '答え:\nfor n, s in zip(names, scores):\n    print(f"{n}:{s}")'],
    explanation: 'zip は複数の列をまとめて1組ずつ取り出す。\n\n模範解答:\nnames = input().split()\nscores = input().split()\nfor n, s in zip(names, scores):\n    print(f"{n}:{s}")',
    reference: 'names = input().split()\nscores = input().split()\nfor n, s in zip(names, scores):\n    print(f"{n}:{s}")',
    cases: [
      { input: 'Alice Bob\n90 80\n', expected: 'Alice:90\nBob:80', sample: true },
      { input: 'X\n5\n', expected: 'X:5' },
    ],
    tip: '💡 zip は dict(zip(keys, values)) で辞書も作れる。zip(*行列) で転置もできる。',
  },
  {
    title: '位置ごとの和',
    concept: 'enumerate と zip',
    tags: ['zip', '内包表記'],
    statement: '2行に同数の整数列 a, b。各位置の和を空白区切りで出力してください。\n\n入力例:\n1 2 3\n4 5 6\n\n出力例:\n5 7 9',
    starter: 'a = list(map(int, input().split()))\nb = list(map(int, input().split()))\n',
    hints: ['zip(a, b) で対応する要素を取り出す。', '和を str にして join。', '答え:\nprint(" ".join(str(x + y) for x, y in zip(a, b)))'],
    explanation: 'zip で位置ごとの計算。\n\n模範解答:\na = list(map(int, input().split()))\nb = list(map(int, input().split()))\nprint(" ".join(str(x + y) for x, y in zip(a, b)))',
    reference: 'a = list(map(int, input().split()))\nb = list(map(int, input().split()))\nprint(" ".join(str(x + y) for x, y in zip(a, b)))',
    cases: [
      { input: '1 2 3\n4 5 6\n', expected: '5 7 9', sample: true },
      { input: '10\n20\n', expected: '30' },
    ],
  },
])

// ===== lv020 関数 def =====
const lv020 = build(20, 'lv020', [
  {
    title: '関数を定義して呼ぶ',
    concept: '関数定義',
    tags: ['関数', 'def'],
    statement: '整数 n を受け取り2倍を返す関数 double を定義し、入力 n に対して double(n) を出力してください。\n\n入力例:\n5\n\n出力例:\n10',
    starter: 'def double(n):\n    # return を書こう\n    pass\n\nn = int(input())\n',
    hints: ['def 名前(引数): で関数を定義します。', 'return で値を返す。', '答え:\ndef double(n):\n    return n * 2\nprint(double(int(input())))'],
    explanation: '関数は def で定義し return で値を返す。\n\n模範解答:\ndef double(n):\n    return n * 2\n\nn = int(input())\nprint(double(n))',
    reference: 'def double(n):\n    return n * 2\n\nn = int(input())\nprint(double(n))',
    cases: [
      { input: '5\n', expected: '10', sample: true },
      { input: '0\n', expected: '0' },
      { input: '-3\n', expected: '-6' },
    ],
    tip: '💡 関数は「処理に名前を付けて再利用する」道具。同じコードを何度も書かずに済む。',
  },
  {
    title: '複数の引数',
    concept: '関数定義',
    tags: ['関数', 'def'],
    statement: '縦 h と横 w を受け取り面積を返す関数 area を定義し、結果を出力してください。\n\n入力例:\n3 4\n\n出力例:\n12',
    starter: 'def area(h, w):\n    pass\n\nh, w = map(int, input().split())\n',
    hints: ['引数を2つ書く: def area(h, w):', 'return h * w。', '答え:\ndef area(h, w):\n    return h * w\nprint(area(*map(int, input().split())))'],
    explanation: '引数は複数取れる。\n\n模範解答:\ndef area(h, w):\n    return h * w\n\nh, w = map(int, input().split())\nprint(area(h, w))',
    reference: 'def area(h, w):\n    return h * w\n\nh, w = map(int, input().split())\nprint(area(h, w))',
    cases: [
      { input: '3 4\n', expected: '12', sample: true },
      { input: '5 5\n', expected: '25' },
    ],
  },
  {
    title: 'デフォルト引数',
    concept: '関数定義',
    tags: ['関数', 'デフォルト引数'],
    statement: 'greet(name, greeting="Hello") を定義し、入力された名前に対して greeting を省略して呼び、「Hello, 名前!」を出力してください。\n\n入力例:\nTaro\n\n出力例:\nHello, Taro!',
    starter: 'def greet(name, greeting="Hello"):\n    pass\n',
    hints: ['引数に = で既定値を付ける: def greet(name, greeting="Hello"):', '省略して呼ぶと既定値が使われる。', '答え:\ndef greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\nprint(greet(input()))'],
    explanation: 'デフォルト引数は省略時に使われる。\n\n模範解答:\ndef greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet(input()))',
    reference: 'def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet(input()))',
    cases: [
      { input: 'Taro\n', expected: 'Hello, Taro!', sample: true },
      { input: 'Bob\n', expected: 'Hello, Bob!' },
    ],
    tip: '💡 デフォルト引数で「省略可能な引数」が作れる。ただし [] や {} を既定値にするのは有名な罠。',
  },
  {
    title: '可変長引数 *args',
    concept: '関数定義',
    tags: ['関数', '*args'],
    statement: '可変長引数 *nums を受け取り合計を返す関数 total を定義し、入力の整数列に対して呼び出して出力してください。\n\n入力例:\n1 2 3 4\n\n出力例:\n10',
    starter: 'def total(*nums):\n    pass\n',
    hints: ['*nums は複数の引数をタプルで受け取る。', '呼ぶ側は total(*リスト) で展開する。', '答え:\ndef total(*nums):\n    return sum(nums)\nprint(total(*map(int, input().split())))'],
    explanation: '*args は任意個の位置引数をタプルで受ける。呼び出し側の * は展開。\n\n模範解答:\ndef total(*nums):\n    return sum(nums)\n\nprint(total(*map(int, input().split())))',
    reference: 'def total(*nums):\n    return sum(nums)\n\nprint(total(*map(int, input().split())))',
    cases: [
      { input: '1 2 3 4\n', expected: '10', sample: true },
      { input: '5\n', expected: '5' },
    ],
    tip: '💡 def f(*args, **kwargs) で「何個でも・名前付きでも」受け取れる万能関数になる。',
  },
])

// ===== lv021 lambda と高階関数 =====
const lv021 = build(21, 'lv021', [
  {
    title: '長さ順に並べる (key)',
    concept: 'lambda と高階関数',
    tags: ['sorted', '高階関数'],
    statement: '空白区切りの単語列を、文字数が短い順に並べて空白区切りで出力してください（同じ長さは入力順のまま）。\n\n入力例:\nbanana fig apple\n\n出力例:\nfig apple banana',
    hints: ['sorted(words, key=len) で長さ順。', 'key には「並べる基準を返す関数」を渡す。', '答え:\nprint(" ".join(sorted(input().split(), key=len)))'],
    explanation: 'key= に基準を返す関数を渡す。len なら長さ順。\n\n模範解答:\nwords = input().split()\nprint(" ".join(sorted(words, key=len)))',
    reference: 'words = input().split()\nprint(" ".join(sorted(words, key=len)))',
    cases: [
      { input: 'banana fig apple\n', expected: 'fig apple banana', sample: true },
      { input: 'a bb ccc\n', expected: 'a bb ccc' },
    ],
    tip: '💡 key= は超便利。key=lambda x: -x で降順、key=lambda p: p[1] でタプルの2番目で並べ替え。',
  },
  {
    title: 'lambda で降順',
    concept: 'lambda と高階関数',
    tags: ['lambda', 'sorted'],
    statement: '整数列を大きい順に並べて空白区切りで出力してください（lambda を使ってみよう）。\n\n入力例:\n3 1 4 1 5\n\n出力例:\n5 4 3 1 1',
    hints: ['lambda x: -x で符号反転 → 大きい順。', 'sorted(a, key=lambda x: -x)。', '答え:\na = list(map(int, input().split()))\nprint(" ".join(map(str, sorted(a, key=lambda x: -x))))'],
    explanation: 'lambda は名前の無い小さな関数。\n\n模範解答:\na = list(map(int, input().split()))\nprint(" ".join(map(str, sorted(a, key=lambda x: -x))))',
    reference: 'a = list(map(int, input().split()))\nprint(" ".join(map(str, sorted(a, key=lambda x: -x))))',
    cases: [
      { input: '3 1 4 1 5\n', expected: '5 4 3 1 1', sample: true },
      { input: '1 2\n', expected: '2 1' },
    ],
    tip: '💡 sorted(a, reverse=True) でも降順にできる。lambda は「その場で関数を渡したい」ときに便利。',
  },
  {
    title: 'filter で抽出',
    concept: 'lambda と高階関数',
    tags: ['filter', 'lambda'],
    statement: '整数列から偶数だけを取り出し、空白区切りで出力してください（filter を使う）。偶数が無ければ空行を出力。\n\n入力例:\n1 2 3 4 5 6\n\n出力例:\n2 4 6',
    starter: 'a = list(map(int, input().split()))\n',
    hints: ['filter(条件関数, リスト) で条件を満たす要素だけ残す。', '条件は lambda x: x % 2 == 0。', '答え:\nevens = filter(lambda x: x % 2 == 0, a)\nprint(" ".join(map(str, evens)))'],
    explanation: 'filter は条件 True の要素だけ通す。\n\n模範解答:\na = list(map(int, input().split()))\nevens = filter(lambda x: x % 2 == 0, a)\nprint(" ".join(map(str, evens)))',
    reference: 'a = list(map(int, input().split()))\nevens = filter(lambda x: x % 2 == 0, a)\nprint(" ".join(map(str, evens)))',
    cases: [
      { input: '1 2 3 4 5 6\n', expected: '2 4 6', sample: true },
      { input: '1 3 5\n', expected: '' },
      { input: '2 4\n', expected: '2 4' },
    ],
    tip: '💡 同じことは内包表記 [x for x in a if x % 2 == 0] でも書ける（次のレベルで学ぶ）。',
  },
])

// ===== lv030 内包表記 =====
const lv030 = build(30, 'lv030', [
  {
    title: '2乗のリスト',
    concept: '内包表記',
    tags: ['内包表記', 'ループ'],
    statement: '整数 N。1からNまでの各数の2乗を空白区切りで出力してください（リスト内包表記を使う）。\n\n入力例:\n5\n\n出力例:\n1 4 9 16 25',
    starter: 'n = int(input())\n',
    hints: ['[i*i for i in range(1, n+1)] で2乗のリスト。', '" ".join(...) で出力。', '答え:\nprint(" ".join(str(i * i) for i in range(1, n + 1)))'],
    explanation: '内包表記は「for とおまけの式」でリストを作る簡潔な書き方。\n\n模範解答:\nn = int(input())\nprint(" ".join(str(i * i) for i in range(1, n + 1)))',
    reference: 'n = int(input())\nprint(" ".join(str(i * i) for i in range(1, n + 1)))',
    cases: [
      { input: '5\n', expected: '1 4 9 16 25', sample: true },
      { input: '1\n', expected: '1' },
      { input: '3\n', expected: '1 4 9' },
    ],
    tip: '💡 内包表記 [式 for x in 列 if 条件] は Python の華。ループより速く読みやすい。',
  },
  {
    title: '条件で抽出',
    concept: '内包表記',
    tags: ['内包表記'],
    statement: '整数列から3の倍数だけ取り出して空白区切りで出力してください（内包表記の if を使う）。\n\n入力例:\n1 3 6 7 9\n\n出力例:\n3 6 9',
    hints: ['[x for x in a if x % 3 == 0] で条件付き抽出。', '" ".join。', '答え:\na = map(int, input().split())\nprint(" ".join(str(x) for x in a if x % 3 == 0))'],
    explanation: '内包表記に if を付けるとフィルタになる。\n\n模範解答:\na = map(int, input().split())\nprint(" ".join(str(x) for x in a if x % 3 == 0))',
    reference: 'a = map(int, input().split())\nprint(" ".join(str(x) for x in a if x % 3 == 0))',
    cases: [
      { input: '1 3 6 7 9\n', expected: '3 6 9', sample: true },
      { input: '2 4\n', expected: '' },
      { input: '3\n', expected: '3' },
    ],
  },
  {
    title: '辞書内包表記',
    concept: '内包表記',
    tags: ['内包表記', '辞書'],
    statement: '整数 N。1からNまでの「数 2乗」を各行に出力してください（辞書内包表記で作る）。\n\n入力例:\n3\n\n出力例:\n1 1\n2 4\n3 9',
    starter: 'n = int(input())\n',
    hints: ['{i: i*i for i in range(1, n+1)} で辞書を作る。', '.items() で回す。', '答え:\nsq = {i: i * i for i in range(1, n + 1)}\nfor k, v in sq.items():\n    print(k, v)'],
    explanation: '辞書内包表記でキー:値を一気に作れる。\n\n模範解答:\nn = int(input())\nsq = {i: i * i for i in range(1, n + 1)}\nfor k, v in sq.items():\n    print(k, v)',
    reference: 'n = int(input())\nsq = {i: i * i for i in range(1, n + 1)}\nfor k, v in sq.items():\n    print(k, v)',
    cases: [
      { input: '3\n', expected: '1 1\n2 4\n3 9', sample: true },
      { input: '1\n', expected: '1 1' },
    ],
    tip: '💡 集合内包表記 {x for x in 列} もある。() で書くとジェネレータ式になり省メモリ。',
  },
  {
    title: '正の数だけ合計',
    concept: '内包表記',
    tags: ['内包表記', '集計'],
    statement: '整数列のうち正の数だけの合計を出力してください。\n\n入力例:\n-2 3 -1 4\n\n出力例:\n7',
    hints: ['sum(x for x in a if x > 0) でフィルタ＋合計。', 'ジェネレータ式は () でOK。', '答え:\na = map(int, input().split())\nprint(sum(x for x in a if x > 0))'],
    explanation: 'sum に直接ジェネレータ式を渡せる(括弧不要)。\n\n模範解答:\na = map(int, input().split())\nprint(sum(x for x in a if x > 0))',
    reference: 'a = map(int, input().split())\nprint(sum(x for x in a if x > 0))',
    cases: [
      { input: '-2 3 -1 4\n', expected: '7', sample: true },
      { input: '-1 -2\n', expected: '0' },
      { input: '5\n', expected: '5' },
    ],
  },
])

// ===== lv040 例外処理 =====
const lv040 = build(40, 'lv040', [
  {
    title: 'ゼロ除算を防ぐ',
    concept: '例外処理',
    tags: ['例外処理', 'try'],
    statement: '2つの整数 a, b。a // b を出力してください。ただし b が 0 のときは "error" と出力してください（try/except を使う）。\n\n入力例:\n10 2\n\n出力例:\n5',
    starter: 'a, b = map(int, input().split())\n',
    hints: ['危険な処理を try: に、失敗時を except: に書く。', '0除算は ZeroDivisionError。', '答え:\ntry:\n    print(a // b)\nexcept ZeroDivisionError:\n    print("error")'],
    explanation: 'try で例外を捕まえ except で対処。\n\n模範解答:\na, b = map(int, input().split())\ntry:\n    print(a // b)\nexcept ZeroDivisionError:\n    print("error")',
    reference: 'a, b = map(int, input().split())\ntry:\n    print(a // b)\nexcept ZeroDivisionError:\n    print("error")',
    cases: [
      { input: '10 2\n', expected: '5', sample: true },
      { input: '7 0\n', expected: 'error' },
      { input: '9 3\n', expected: '3' },
    ],
    tip: '💡 except 種類: でエラー別に対処。except Exception as e: でメッセージも取れる。',
  },
  {
    title: '数値変換の失敗',
    concept: '例外処理',
    tags: ['例外処理', '型変換'],
    statement: '1行が与えられます。整数に変換できればその2倍を、できなければ "NaN" を出力してください。\n\n入力例:\n21\n\n出力例:\n42',
    starter: 's = input()\n',
    hints: ['int(s) は変換できないと ValueError。', 'try/except ValueError。', '答え:\ntry:\n    print(int(s) * 2)\nexcept ValueError:\n    print("NaN")'],
    explanation: '数値変換の失敗は ValueError。\n\n模範解答:\ns = input()\ntry:\n    print(int(s) * 2)\nexcept ValueError:\n    print("NaN")',
    reference: 's = input()\ntry:\n    print(int(s) * 2)\nexcept ValueError:\n    print("NaN")',
    cases: [
      { input: '21\n', expected: '42', sample: true },
      { input: 'hello\n', expected: 'NaN' },
      { input: '-5\n', expected: '-10' },
    ],
  },
  {
    title: '範囲外アクセス',
    concept: '例外処理',
    tags: ['例外処理'],
    statement: '1行目に整数列、2行目にインデックス i。a[i] を出力。範囲外なら "out" を出力してください。\n\n入力例:\n1 2 3\n5\n\n出力例:\nout',
    starter: 'a = input().split()\ni = int(input())\n',
    hints: ['範囲外アクセスは IndexError。', 'try/except IndexError。', '答え:\ntry:\n    print(a[i])\nexcept IndexError:\n    print("out")'],
    explanation: '存在しない添字は IndexError。\n\n模範解答:\na = input().split()\ni = int(input())\ntry:\n    print(a[i])\nexcept IndexError:\n    print("out")',
    reference: 'a = input().split()\ni = int(input())\ntry:\n    print(a[i])\nexcept IndexError:\n    print("out")',
    cases: [
      { input: '1 2 3\n5\n', expected: 'out', sample: true },
      { input: '1 2 3\n0\n', expected: '1' },
      { input: '9\n0\n', expected: '9' },
    ],
  },
])

export const midProblems: Problem[] = [
  ...lv009,
  ...lv010,
  ...lv012,
  ...lv013,
  ...lv015,
  ...lv020,
  ...lv021,
  ...lv030,
  ...lv040,
]
