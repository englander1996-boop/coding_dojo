import type { Problem } from '../../types'
import { build } from './_build.ts'

/**
 * 拡張バッチ1。各プラットフォームの定番だが既存に無い「新しい学び」をクラスタで追加。
 * - 基礎(lv003/005/006/007/008): paiza/AtCoder Beginners 級の入出力・条件分岐・ループの定番
 * - LeetCode(lv100/150): 配列の古典・頻出ウィンドウ/接頭辞和
 * - AtCoder(lv120/130): 多重全探索・約数/素因数分解
 * 水増し禁止のため、既存クラスタと重複しない概念のみ。lv50以上は既習機能だけで解く。
 */

// ===== lv003 入力と四則演算：複数の数を読む =====
const lv003 = build(3, 'lv003x', [
  {
    title: '3つの数の合計',
    concept: '空白区切りの入力',
    tags: ['input', '多重代入', 'map'],
    statement:
      '1行に空白区切りで3つの整数が与えられます。その合計を出力してください。\n\n入力例:\n3 5 7\n\n出力例:\n15',
    starter: 'a, b, c = map(int, input().split())\n',
    hints: [
      'input().split() は空白で区切った文字列のリストを返します。',
      'map(int, ...) で各要素を整数に変換し、a, b, c で同時に受け取れます。',
      '答え:\na, b, c = map(int, input().split())\nprint(a + b + c)',
    ],
    explanation:
      '1行に並んだ複数の値は input().split() で分割し、map(int, ...) でまとめて整数化するのが定石です。\n\n模範解答:\na, b, c = map(int, input().split())\nprint(a + b + c)',
    reference: 'a, b, c = map(int, input().split())\nprint(a + b + c)',
    cases: [
      { input: '3 5 7\n', expected: '15', sample: true },
      { input: '10 20 30\n', expected: '60' },
      { input: '-1 1 0\n', expected: '0' },
    ],
    tip: '💡 競技プログラミングの入力は map(int, input().split()) が9割。まず手に覚えさせよう。',
  },
  {
    title: 'N個の数の合計',
    concept: '空白区切りの入力',
    tags: ['input', 'list', 'sum'],
    statement:
      '1行目に個数 N、2行目に N 個の整数が空白区切りで与えられます。合計を出力してください。\n\n入力例:\n4\n1 2 3 4\n\n出力例:\n10',
    starter: 'n = int(input())\na = list(map(int, input().split()))\n',
    hints: [
      '個数 N は使わなくても sum で全部足せます（読み飛ばしてOK）。',
      'list(map(int, input().split())) で整数のリストにできます。',
      '答え:\nn = int(input())\na = list(map(int, input().split()))\nprint(sum(a))',
    ],
    explanation:
      '個数が先に来て次の行に数列が並ぶのは入力の超定番。リスト化して sum() で合計します。\n\n模範解答:\nn = int(input())\na = list(map(int, input().split()))\nprint(sum(a))',
    reference: 'n = int(input())\na = list(map(int, input().split()))\nprint(sum(a))',
    cases: [
      { input: '4\n1 2 3 4\n', expected: '10', sample: true },
      { input: '1\n42\n', expected: '42' },
      { input: '5\n10 10 10 10 10\n', expected: '50' },
    ],
    tip: '💡 sum(リスト) は合計の一発技。自分で for を回さなくてよい。',
  },
  {
    title: '長方形の面積と周の長さ',
    concept: '空白区切りの入力',
    tags: ['input', '算術演算子'],
    statement:
      '幅 W と高さ H が空白区切りで与えられます。面積と周の長さを、この順に空白区切りで出力してください。\n\n入力例:\n3 5\n\n出力例:\n15 16',
    starter: 'w, h = map(int, input().split())\n',
    hints: [
      '面積は W×H、周の長さは 2×(W+H) です。',
      'print(面積, 周) のようにカンマで並べると空白区切りで出力されます。',
      '答え:\nw, h = map(int, input().split())\nprint(w * h, 2 * (w + h))',
    ],
    explanation:
      '2つの値を1行に出すときは print(a, b) でOK（既定で空白区切り）。\n\n模範解答:\nw, h = map(int, input().split())\nprint(w * h, 2 * (w + h))',
    reference: 'w, h = map(int, input().split())\nprint(w * h, 2 * (w + h))',
    cases: [
      { input: '3 5\n', expected: '15 16', sample: true },
      { input: '1 1\n', expected: '1 4' },
      { input: '10 2\n', expected: '20 24' },
    ],
  },
])

// ===== lv005 if 条件分岐：場合分け(if/elif) =====
const lv005 = build(5, 'lv005x', [
  {
    title: 'うるう年判定',
    concept: '場合分け(if/elif)',
    tags: ['if', '条件分岐'],
    statement:
      '西暦の年 Y が与えられます。うるう年なら yes、そうでなければ no を出力してください。\nうるう年は「4で割り切れ、かつ100で割り切れない」または「400で割り切れる」年です。\n\n入力例:\n2000\n\n出力例:\nyes',
    starter: 'y = int(input())\n',
    hints: [
      '条件は (4の倍数 かつ 100の倍数でない) または (400の倍数)。',
      '割り切れるは % が 0 かどうかで判定します。',
      '答え:\ny = int(input())\nif (y % 4 == 0 and y % 100 != 0) or y % 400 == 0:\n    print("yes")\nelse:\n    print("no")',
    ],
    explanation:
      'うるう年規則は条件分岐の登竜門。and/or の優先順位（and が先）に注意。\n\n模範解答:\ny = int(input())\nif (y % 4 == 0 and y % 100 != 0) or y % 400 == 0:\n    print("yes")\nelse:\n    print("no")',
    reference:
      'y = int(input())\nif (y % 4 == 0 and y % 100 != 0) or y % 400 == 0:\n    print("yes")\nelse:\n    print("no")',
    cases: [
      { input: '2000\n', expected: 'yes', sample: true },
      { input: '1900\n', expected: 'no' },
      { input: '2024\n', expected: 'yes' },
      { input: '2023\n', expected: 'no' },
    ],
    tip: '💡 条件を括弧でまとめると and/or の読み間違いを防げる。',
  },
  {
    title: '成績判定',
    concept: '場合分け(if/elif)',
    tags: ['if', 'elif', '条件分岐'],
    statement:
      '点数 X (0〜100) が与えられます。80以上なら A、60以上なら B、40以上なら C、それ未満なら F を出力してください。\n\n入力例:\n85\n\n出力例:\nA',
    starter: 'x = int(input())\n',
    hints: [
      '上から順に if → elif → elif → else で判定します。',
      '「80以上」を先に見れば、elif の時点では80未満が確定しています。',
      '答え:\nx = int(input())\nif x >= 80:\n    print("A")\nelif x >= 60:\n    print("B")\nelif x >= 40:\n    print("C")\nelse:\n    print("F")',
    ],
    explanation:
      'elif は「上の条件が偽だったとき」に評価される。境界の大きい方から並べるのがコツ。\n\n模範解答:\nx = int(input())\nif x >= 80:\n    print("A")\nelif x >= 60:\n    print("B")\nelif x >= 40:\n    print("C")\nelse:\n    print("F")',
    reference:
      'x = int(input())\nif x >= 80:\n    print("A")\nelif x >= 60:\n    print("B")\nelif x >= 40:\n    print("C")\nelse:\n    print("F")',
    cases: [
      { input: '85\n', expected: 'A', sample: true },
      { input: '60\n', expected: 'B' },
      { input: '40\n', expected: 'C' },
      { input: '0\n', expected: 'F' },
      { input: '100\n', expected: 'A' },
    ],
  },
  {
    title: '三角形の種類',
    concept: '場合分け(if/elif)',
    tags: ['if', 'elif', '条件分岐'],
    statement:
      '三角形の3辺 a b c が空白区切りで与えられます。3辺すべて等しければ equilateral、2辺が等しければ isosceles、すべて異なれば scalene を出力してください。\n\n入力例:\n3 3 3\n\n出力例:\nequilateral',
    starter: 'a, b, c = map(int, input().split())\n',
    hints: [
      'まず「3つとも等しい」かを a == b == c で判定。',
      '次に「どれか2つが等しい」を or でつなぐ。',
      '答え:\na, b, c = map(int, input().split())\nif a == b == c:\n    print("equilateral")\nelif a == b or b == c or a == c:\n    print("isosceles")\nelse:\n    print("scalene")',
    ],
    explanation:
      'Python は a == b == c のように比較を連鎖できる。分類は「狭い条件から」並べる。\n\n模範解答:\na, b, c = map(int, input().split())\nif a == b == c:\n    print("equilateral")\nelif a == b or b == c or a == c:\n    print("isosceles")\nelse:\n    print("scalene")',
    reference:
      'a, b, c = map(int, input().split())\nif a == b == c:\n    print("equilateral")\nelif a == b or b == c or a == c:\n    print("isosceles")\nelse:\n    print("scalene")',
    cases: [
      { input: '3 3 3\n', expected: 'equilateral', sample: true },
      { input: '3 3 5\n', expected: 'isosceles' },
      { input: '3 4 5\n', expected: 'scalene' },
      { input: '5 3 5\n', expected: 'isosceles' },
    ],
    tip: '💡 a == b == c や 1 <= x <= 100 のような連鎖比較は Python ならでは。',
  },
])

// ===== lv006 比較と論理演算：複合条件(and/or) =====
const lv006 = build(6, 'lv006x', [
  {
    title: '直角三角形の判定',
    concept: '複合条件(and/or)',
    tags: ['比較', '論理', '条件分岐'],
    statement:
      '3辺 a b c が空白区切りで与えられます。どれか1辺の2乗が残り2辺の2乗の和に等しければ（直角三角形なら）yes、そうでなければ no を出力してください。\n\n入力例:\n3 4 5\n\n出力例:\nyes',
    starter: 'a, b, c = map(int, input().split())\n',
    hints: [
      'どの辺が斜辺か分からないので、3通りを or で並べます。',
      'a*a + b*b == c*c のような式を3つ作る。',
      '答え:\na, b, c = map(int, input().split())\nif a*a + b*b == c*c or b*b + c*c == a*a or a*a + c*c == b*b:\n    print("yes")\nelse:\n    print("no")',
    ],
    explanation:
      'ピタゴラスの定理。斜辺がどれか不明なので全パターンを or でつなぐ。\n\n模範解答:\na, b, c = map(int, input().split())\nif a*a + b*b == c*c or b*b + c*c == a*a or a*a + c*c == b*b:\n    print("yes")\nelse:\n    print("no")',
    reference:
      'a, b, c = map(int, input().split())\nif a*a + b*b == c*c or b*b + c*c == a*a or a*a + c*c == b*b:\n    print("yes")\nelse:\n    print("no")',
    cases: [
      { input: '3 4 5\n', expected: 'yes', sample: true },
      { input: '5 12 13\n', expected: 'yes' },
      { input: '1 2 3\n', expected: 'no' },
      { input: '6 8 10\n', expected: 'yes' },
    ],
  },
  {
    title: '全部が範囲内か',
    concept: '複合条件(and/or)',
    tags: ['比較', '論理', '条件分岐'],
    statement:
      '3つの整数 a b c が空白区切りで与えられます。3つすべてが 1 以上 100 以下なら yes、1つでも外れていれば no を出力してください。\n\n入力例:\n5 50 100\n\n出力例:\nyes',
    starter: 'a, b, c = map(int, input().split())\n',
    hints: [
      '「1以上100以下」は 1 <= x <= 100 と書けます。',
      '3つとも満たすので and でつなぎます。',
      '答え:\na, b, c = map(int, input().split())\nif 1 <= a <= 100 and 1 <= b <= 100 and 1 <= c <= 100:\n    print("yes")\nelse:\n    print("no")',
    ],
    explanation:
      '「すべて満たす」は and。範囲チェックは連鎖比較 1 <= x <= 100 が読みやすい。\n\n模範解答:\na, b, c = map(int, input().split())\nif 1 <= a <= 100 and 1 <= b <= 100 and 1 <= c <= 100:\n    print("yes")\nelse:\n    print("no")',
    reference:
      'a, b, c = map(int, input().split())\nif 1 <= a <= 100 and 1 <= b <= 100 and 1 <= c <= 100:\n    print("yes")\nelse:\n    print("no")',
    cases: [
      { input: '5 50 100\n', expected: 'yes', sample: true },
      { input: '5 200 1\n', expected: 'no' },
      { input: '1 1 1\n', expected: 'yes' },
      { input: '0 50 50\n', expected: 'no' },
    ],
  },
  {
    title: '入場できるか',
    concept: '複合条件(and/or)',
    tags: ['比較', '論理', '条件分岐'],
    statement:
      '年齢 age と同伴者の有無 comp（1=あり, 0=なし）が空白区切りで与えられます。18歳以上、または同伴者がいれば ok、どちらでもなければ no を出力してください。\n\n入力例:\n15 1\n\n出力例:\nok',
    starter: 'age, comp = map(int, input().split())\n',
    hints: [
      '「18歳以上 または 同伴者あり」を or でつなぎます。',
      '同伴者ありは comp == 1。',
      '答え:\nage, comp = map(int, input().split())\nprint("ok" if age >= 18 or comp == 1 else "no")',
    ],
    explanation:
      '「どちらか一方でも満たせばOK」は or。条件式（三項演算子）を使うと1行で書ける。\n\n模範解答:\nage, comp = map(int, input().split())\nprint("ok" if age >= 18 or comp == 1 else "no")',
    reference: 'age, comp = map(int, input().split())\nprint("ok" if age >= 18 or comp == 1 else "no")',
    cases: [
      { input: '15 1\n', expected: 'ok', sample: true },
      { input: '20 0\n', expected: 'ok' },
      { input: '15 0\n', expected: 'no' },
      { input: '18 0\n', expected: 'ok' },
    ],
    tip: '💡 値 if 条件 else 値 で、短い場合分けを1行に書ける（三項演算子）。',
  },
])

// ===== lv007 for ループ：二重ループと集計 =====
const lv007 = build(7, 'lv007x', [
  {
    title: '九九の表の合計',
    concept: '二重ループ',
    tags: ['for', 'range', 'ループ'],
    statement:
      '整数 N が与えられます。1〜N の全ての i, j について i×j を足し合わせた合計を出力してください。\n\n入力例:\n3\n\n出力例:\n36',
    starter: 'n = int(input())\n',
    hints: [
      'for を入れ子（二重ループ）にして i と j を回します。',
      'total に i*j を足し込んでいきます。',
      '答え:\nn = int(input())\ntotal = 0\nfor i in range(1, n + 1):\n    for j in range(1, n + 1):\n        total += i * j\nprint(total)',
    ],
    explanation:
      'for の中に for を書くと全組合せを走査できる（二重ループ）。\n\n模範解答:\nn = int(input())\ntotal = 0\nfor i in range(1, n + 1):\n    for j in range(1, n + 1):\n        total += i * j\nprint(total)',
    reference:
      'n = int(input())\ntotal = 0\nfor i in range(1, n + 1):\n    for j in range(1, n + 1):\n        total += i * j\nprint(total)',
    cases: [
      { input: '3\n', expected: '36', sample: true },
      { input: '1\n', expected: '1' },
      { input: '9\n', expected: '2025' },
    ],
    tip: '💡 二重ループの計算量は N×N。N が大きいと急に重くなることを意識しよう。',
  },
  {
    title: '約数の個数',
    concept: '二重ループ',
    tags: ['for', 'range', 'ループ'],
    statement:
      '整数 N が与えられます。N の正の約数の個数を出力してください。\n\n入力例:\n12\n\n出力例:\n6',
    starter: 'n = int(input())\n',
    hints: [
      '1 から N まで順に「N を割り切れるか」を調べます。',
      'n % i == 0 なら i は約数。',
      '答え:\nn = int(input())\ncount = 0\nfor i in range(1, n + 1):\n    if n % i == 0:\n        count += 1\nprint(count)',
    ],
    explanation:
      '約数判定は剰余 % が 0 か。12 の約数は 1,2,3,4,6,12 の6個。\n\n模範解答:\nn = int(input())\ncount = 0\nfor i in range(1, n + 1):\n    if n % i == 0:\n        count += 1\nprint(count)',
    reference:
      'n = int(input())\ncount = 0\nfor i in range(1, n + 1):\n    if n % i == 0:\n        count += 1\nprint(count)',
    cases: [
      { input: '12\n', expected: '6', sample: true },
      { input: '1\n', expected: '1' },
      { input: '7\n', expected: '2' },
      { input: '36\n', expected: '9' },
    ],
  },
  {
    title: '階乗（ループで）',
    concept: '二重ループ',
    tags: ['for', 'range', 'ループ'],
    statement:
      '整数 N が与えられます。N の階乗 N! = 1×2×…×N を出力してください（N=0 のときは 1）。\n\n入力例:\n5\n\n出力例:\n120',
    starter: 'n = int(input())\n',
    hints: [
      '答えの初期値を 1 にして、1〜N を順に掛けていきます。',
      'p *= i は p = p * i と同じ。',
      '答え:\nn = int(input())\np = 1\nfor i in range(1, n + 1):\n    p *= i\nprint(p)',
    ],
    explanation:
      '積を貯めるときは初期値1。range(1, n+1) は N=0 で空になり、答えは1のまま。\n\n模範解答:\nn = int(input())\np = 1\nfor i in range(1, n + 1):\n    p *= i\nprint(p)',
    reference: 'n = int(input())\np = 1\nfor i in range(1, n + 1):\n    p *= i\nprint(p)',
    cases: [
      { input: '5\n', expected: '120', sample: true },
      { input: '0\n', expected: '1' },
      { input: '1\n', expected: '1' },
      { input: '10\n', expected: '3628800' },
    ],
    tip: '💡 合計は初期値0で +=、総積は初期値1で *= が定石。',
  },
])

// ===== lv008 while ループ：whileの活用 =====
const lv008 = build(8, 'lv008x', [
  {
    title: '割り算だけで桁をばらす',
    concept: 'whileで桁を処理',
    tags: ['while', 'ループ'],
    statement:
      '非負整数 N が与えられます。N を文字列に変換せず、10で割った余りと商だけを使って各桁の数字を1つずつ取り出し、その合計を出力してください。\n\n入力例:\n1234\n\n出力例:\n10',
    starter: 'n = int(input())\n',
    hints: [
      'n % 10 で一の位が取れ、n // 10 でその一の位を落とせます。',
      '取り出しては削るを、n が 0 になるまで while で繰り返します。',
      '答え:\nn = int(input())\ns = 0\nwhile n > 0:\n    s += n % 10\n    n //= 10\nprint(s)',
    ],
    explanation:
      '「% 10 で末尾を取り出し // 10 で削る」は桁処理の基本パターン。str(n) に頼らず数のまま扱えるので、桁の並べ替えや基数の変換にもそのまま応用できる。\n\n模範解答:\nn = int(input())\ns = 0\nwhile n > 0:\n    s += n % 10\n    n //= 10\nprint(s)',
    reference: 'n = int(input())\ns = 0\nwhile n > 0:\n    s += n % 10\n    n //= 10\nprint(s)',
    cases: [
      { input: '1234\n', expected: '10', sample: true },
      { input: '0\n', expected: '0' },
      { input: '9\n', expected: '9' },
      { input: '99999\n', expected: '45' },
    ],
    tip: '💡 % 10 と // 10 のセットで、整数を1桁ずつ分解できる。',
  },
  {
    title: '0 が来たら終わり',
    concept: 'while: 終わりの合図で止める',
    tags: ['while', 'break', '入力'],
    statement:
      '整数が1行に1つずつ与えられます。0 が現れたらそこで読み込みをやめ、それまでに読んだ整数の合計を出力してください。0 自身は合計に含めません。\n\n入力例:\n3\n5\n0\n\n出力例:\n8',
    starter: 'total = 0\n',
    hints: [
      '何行来るか分からないので、回数を決めずに while True で回します。',
      '読んだ値が 0 だったら break でループを抜けます。',
      '答え:\ntotal = 0\nwhile True:\n    x = int(input())\n    if x == 0:\n        break\n    total += x\nprint(total)',
    ],
    explanation:
      '「終わりの合図の値が来るまで読み続ける」形。繰り返す回数が事前に決まらないループは while True で書き、抜ける条件が満たされた瞬間に break する。合図の値そのものは処理しないので、足す前に判定を置くのがポイント。\n\n模範解答:\ntotal = 0\nwhile True:\n    x = int(input())\n    if x == 0:\n        break\n    total += x\nprint(total)',
    reference:
      'total = 0\nwhile True:\n    x = int(input())\n    if x == 0:\n        break\n    total += x\nprint(total)',
    cases: [
      { input: '3\n5\n0\n', expected: '8', sample: true },
      { input: '0\n', expected: '0' },
      { input: '10\n-4\n7\n0\n', expected: '13' },
      { input: '1\n2\n3\n4\n0\n', expected: '10' },
    ],
    tip: '💡 終わりを知らせる特別な値で読み込みを止める書き方は、行数が事前に分からない入力の定番。',
  },
  {
    title: 'ユークリッドの互除法',
    concept: 'whileで桁を処理',
    tags: ['while', 'ループ', '多重代入'],
    statement:
      '2つの正の整数 a b が空白区切りで与えられます。最大公約数 (GCD) を、ユークリッドの互除法（余りで置き換える）で求めて出力してください。\n\n入力例:\n12 18\n\n出力例:\n6',
    starter: 'a, b = map(int, input().split())\n',
    hints: [
      '「a を b で割った余り」を新しい b にし、元の b を新しい a にします。',
      'b が 0 になったとき、a が GCD です。',
      '答え:\na, b = map(int, input().split())\nwhile b:\n    a, b = b, a % b\nprint(a)',
    ],
    explanation:
      'gcd(a,b)=gcd(b, a%b)。余りが0になるまで繰り返す。多重代入で1行更新できる。\n\n模範解答:\na, b = map(int, input().split())\nwhile b:\n    a, b = b, a % b\nprint(a)',
    reference: 'a, b = map(int, input().split())\nwhile b:\n    a, b = b, a % b\nprint(a)',
    cases: [
      { input: '12 18\n', expected: '6', sample: true },
      { input: '17 5\n', expected: '1' },
      { input: '100 100\n', expected: '100' },
      { input: '24 36\n', expected: '12' },
    ],
    tip: '💡 while b: は「b が 0 でない間」。0 は偽、非0は真と扱われる。',
  },
])

// ===== lv100 配列・ソート・探索：配列の古典(LeetCode) =====
const lv100 = build(100, 'lv100x', [
  {
    title: '多数決の要素（Boyer-Moore）',
    concept: '配列の古典',
    tags: ['配列', 'アルゴリズム'],
    statement:
      '1行目に個数 N、2行目に N 個の整数。過半数（N/2 より多く）出現する要素が必ず1つあります。その値を出力してください。\n\n入力例:\n7\n3 3 4 2 3 3 3\n\n出力例:\n3',
    starter: 'n = int(input())\na = list(map(int, input().split()))\n',
    hints: [
      '候補 cand とカウント cnt を持ち、cnt が 0 のとき候補を入れ替えます。',
      '同じ値なら +1、違えば -1。過半数の値は最後まで生き残ります。',
      '答え:\nn = int(input())\na = list(map(int, input().split()))\ncand = None\ncnt = 0\nfor x in a:\n    if cnt == 0:\n        cand = x\n    cnt += 1 if x == cand else -1\nprint(cand)',
    ],
    explanation:
      'Boyer-Moore 投票法。過半数要素は「相殺」しても必ず残るので O(N)・O(1)メモリで求まる。\n\n模範解答:\nn = int(input())\na = list(map(int, input().split()))\ncand = None\ncnt = 0\nfor x in a:\n    if cnt == 0:\n        cand = x\n    cnt += 1 if x == cand else -1\nprint(cand)',
    reference:
      'n = int(input())\na = list(map(int, input().split()))\ncand = None\ncnt = 0\nfor x in a:\n    if cnt == 0:\n        cand = x\n    cnt += 1 if x == cand else -1\nprint(cand)',
    cases: [
      { input: '7\n3 3 4 2 3 3 3\n', expected: '3', sample: true },
      { input: '1\n5\n', expected: '5' },
      { input: '5\n2 2 1 1 2\n', expected: '2' },
    ],
    tip: '💡 Boyer-Moore 投票法は「過半数要素」を定数メモリで見つける有名テク。',
  },
  {
    title: 'ただ1つの数（XOR）',
    concept: '配列の古典',
    tags: ['配列', 'ビット演算', 'アルゴリズム'],
    statement:
      '1行目に個数 N、2行目に N 個の整数。1つを除き、すべての値はちょうど2回ずつ現れます。1回だけ現れる値を出力してください。\n\n入力例:\n5\n4 1 2 1 2\n\n出力例:\n4',
    starter: 'n = int(input())\na = list(map(int, input().split()))\n',
    hints: [
      '同じ数を2回 XOR すると 0 に戻ります（x ^ x == 0）。',
      '全要素を XOR で畳み込むと、2回出る数は消えて1回の数だけ残ります。',
      '答え:\nn = int(input())\na = list(map(int, input().split()))\nx = 0\nfor v in a:\n    x ^= v\nprint(x)',
    ],
    explanation:
      'XOR の性質 x^x=0, x^0=x を使うと、追加メモリなしで「1回だけの数」が取れる。\n\n模範解答:\nn = int(input())\na = list(map(int, input().split()))\nx = 0\nfor v in a:\n    x ^= v\nprint(x)',
    reference: 'n = int(input())\na = list(map(int, input().split()))\nx = 0\nfor v in a:\n    x ^= v\nprint(x)',
    cases: [
      { input: '5\n4 1 2 1 2\n', expected: '4', sample: true },
      { input: '1\n7\n', expected: '7' },
      { input: '7\n1 1 2 2 3 3 9\n', expected: '9' },
    ],
    tip: '💡 XOR の「2回で打ち消す」性質は重複検出やペア消去で大活躍。',
  },
  {
    title: '自分以外の積',
    concept: '配列の古典',
    tags: ['配列', '累積和', 'アルゴリズム'],
    statement:
      '1行目に個数 N、2行目に N 個の整数。各位置について「自分を除く全要素の積」を空白区切りで出力してください（割り算は使わない想定）。\n\n入力例:\n4\n1 2 3 4\n\n出力例:\n24 12 8 6',
    starter: 'n = int(input())\na = list(map(int, input().split()))\n',
    hints: [
      'まず「自分より左の積」を前から累積して埋めます。',
      '次に「自分より右の積」を後ろから掛け合わせます。',
      '答え:\nn = int(input())\na = list(map(int, input().split()))\nres = [1] * n\nfor i in range(1, n):\n    res[i] = res[i - 1] * a[i - 1]\nr = 1\nfor i in range(n - 1, -1, -1):\n    res[i] *= r\n    r *= a[i]\nprint(*res)',
    ],
    explanation:
      '左からの累積積と右からの累積積を掛ければ、割り算なしで O(N)。\n\n模範解答:\nn = int(input())\na = list(map(int, input().split()))\nres = [1] * n\nfor i in range(1, n):\n    res[i] = res[i - 1] * a[i - 1]\nr = 1\nfor i in range(n - 1, -1, -1):\n    res[i] *= r\n    r *= a[i]\nprint(*res)',
    reference:
      'n = int(input())\na = list(map(int, input().split()))\nres = [1] * n\nfor i in range(1, n):\n    res[i] = res[i - 1] * a[i - 1]\nr = 1\nfor i in range(n - 1, -1, -1):\n    res[i] *= r\n    r *= a[i]\nprint(*res)',
    cases: [
      { input: '4\n1 2 3 4\n', expected: '24 12 8 6', sample: true },
      { input: '3\n2 3 4\n', expected: '12 8 6' },
      { input: '2\n5 7\n', expected: '7 5' },
    ],
    tip: '💡 「割り算禁止の自分以外の積」は前後2方向の累積で解く定番。',
  },
])

// ===== lv150 頻出パターン：窓と接頭辞和(LeetCode) =====
const lv150 = build(150, 'lv150x', [
  {
    title: '重複なし最長部分文字列',
    concept: '頻出パターン補強',
    tags: ['スライディングウィンドウ', '文字列', 'アルゴリズム'],
    statement:
      '英小文字の文字列 s が与えられます。同じ文字を含まない連続部分文字列の最大の長さを出力してください。\n\n入力例:\nabcabcbb\n\n出力例:\n3',
    starter: 's = input()\n',
    hints: [
      '窓の左端 left と、各文字が最後に出た位置 last を持ちます。',
      '同じ文字が窓内に再登場したら left をその次へ動かします。',
      '答え:\ns = input()\nlast = {}\nleft = 0\nbest = 0\nfor right, ch in enumerate(s):\n    if ch in last and last[ch] >= left:\n        left = last[ch] + 1\n    last[ch] = right\n    best = max(best, right - left + 1)\nprint(best)',
    ],
    explanation:
      'スライディングウィンドウ。文字の最終出現位置を辞書で持ち、重複時に左端を縮める。\n\n模範解答:\ns = input()\nlast = {}\nleft = 0\nbest = 0\nfor right, ch in enumerate(s):\n    if ch in last and last[ch] >= left:\n        left = last[ch] + 1\n    last[ch] = right\n    best = max(best, right - left + 1)\nprint(best)',
    reference:
      's = input()\nlast = {}\nleft = 0\nbest = 0\nfor right, ch in enumerate(s):\n    if ch in last and last[ch] >= left:\n        left = last[ch] + 1\n    last[ch] = right\n    best = max(best, right - left + 1)\nprint(best)',
    cases: [
      { input: 'abcabcbb\n', expected: '3', sample: true },
      { input: 'bbbbb\n', expected: '1' },
      { input: 'pwwkew\n', expected: '3' },
      { input: 'abcdef\n', expected: '6' },
    ],
    tip: '💡 「最長の◯◯な連続部分」はスライディングウィンドウの合図。',
  },
  {
    title: '上位 K の頻出要素',
    concept: '頻出パターン補強',
    tags: ['ハッシュ', '複合キー', 'アルゴリズム'],
    statement:
      '1行目に「N K」、2行目に N 個の整数。出現回数が多い順に上位 K 個の値を出力してください。回数が同じなら値の小さい順。空白区切りで1行に出力します。\n\n入力例:\n7 2\n1 1 1 2 2 3 3\n\n出力例:\n1 2',
    starter: 'n, k = map(int, input().split())\na = list(map(int, input().split()))\n',
    hints: [
      'collections.Counter で各値の出現回数を数えます。',
      '「回数の多い順、同数なら値の小さい順」は key=lambda x: (-count, x) で並べます。',
      '答え:\nfrom collections import Counter\nn, k = map(int, input().split())\na = list(map(int, input().split()))\nc = Counter(a)\nres = sorted(c, key=lambda x: (-c[x], x))[:k]\nprint(*res)',
    ],
    explanation:
      'Counter で頻度を出し、複合キー (-頻度, 値) でソートして上位 K を取る。\n\n模範解答:\nfrom collections import Counter\nn, k = map(int, input().split())\na = list(map(int, input().split()))\nc = Counter(a)\nres = sorted(c, key=lambda x: (-c[x], x))[:k]\nprint(*res)',
    reference:
      'from collections import Counter\nn, k = map(int, input().split())\na = list(map(int, input().split()))\nc = Counter(a)\nres = sorted(c, key=lambda x: (-c[x], x))[:k]\nprint(*res)',
    cases: [
      { input: '7 2\n1 1 1 2 2 3 3\n', expected: '1 2', sample: true },
      { input: '4 1\n5 5 5 9\n', expected: '5' },
      { input: '6 3\n4 4 3 3 2 1\n', expected: '3 4 1' },
    ],
    tip: '💡 タイブレーク付きの並べ替えは key=lambda で (主, 副) のタプルを返すのが定石。',
  },
  {
    title: '和が K の部分配列の個数',
    concept: '頻出パターン補強',
    tags: ['累積和', 'ハッシュ', 'アルゴリズム'],
    statement:
      '1行目に「N K」、2行目に N 個の整数（負の数を含む）。連続部分配列のうち、和がちょうど K になるものの個数を出力してください。\n\n入力例:\n5 7\n3 4 7 1 2\n\n出力例:\n2',
    starter: 'n, k = map(int, input().split())\na = list(map(int, input().split()))\n',
    hints: [
      '累積和 s を進めながら「s - K がこれまで何回出たか」を足します。',
      'defaultdict(int) で累積和の出現回数を記録（最初に {0:1} を入れておく）。',
      '答え:\nfrom collections import defaultdict\nn, k = map(int, input().split())\na = list(map(int, input().split()))\ncnt = defaultdict(int)\ncnt[0] = 1\ns = 0\nans = 0\nfor x in a:\n    s += x\n    ans += cnt[s - k]\n    cnt[s] += 1\nprint(ans)',
    ],
    explanation:
      '区間和 = 累積和の差。s_r - s_l = K となる l の個数を辞書で数えると O(N)。\n\n模範解答:\nfrom collections import defaultdict\nn, k = map(int, input().split())\na = list(map(int, input().split()))\ncnt = defaultdict(int)\ncnt[0] = 1\ns = 0\nans = 0\nfor x in a:\n    s += x\n    ans += cnt[s - k]\n    cnt[s] += 1\nprint(ans)',
    reference:
      'from collections import defaultdict\nn, k = map(int, input().split())\na = list(map(int, input().split()))\ncnt = defaultdict(int)\ncnt[0] = 1\ns = 0\nans = 0\nfor x in a:\n    s += x\n    ans += cnt[s - k]\n    cnt[s] += 1\nprint(ans)',
    cases: [
      { input: '5 7\n3 4 7 1 2\n', expected: '2', sample: true },
      { input: '3 3\n1 1 1\n', expected: '1' },
      { input: '4 0\n1 -1 1 -1\n', expected: '4' },
      { input: '5 3\n1 2 3 -3 3\n', expected: '5' },
    ],
    tip: '💡 「和が K の部分配列の個数」は累積和＋ハッシュで O(N)。',
  },
])

// ===== lv120 全探索・累積和：多重全探索(AtCoder) =====
const lv120 = build(120, 'lv120x', [
  {
    title: '和が S の3つ組を数える',
    concept: '多重全探索',
    tags: ['全探索', 'アルゴリズム'],
    statement:
      '1行目に「N S」、2行目に N 個の整数。異なる3つの位置 i<j<k を選んで和が S になる組合せの個数を出力してください。\n\n入力例:\n5 6\n1 2 3 4 5\n\n出力例:\n1',
    starter: 'n, s = map(int, input().split())\na = list(map(int, input().split()))\n',
    hints: [
      'i<j<k となるよう3重ループを回します。',
      'range(i+1, n) のように、後ろのループの開始位置を1つ進めると重複しません。',
      '答え:\nn, s = map(int, input().split())\na = list(map(int, input().split()))\ncnt = 0\nfor i in range(n):\n    for j in range(i + 1, n):\n        for k in range(j + 1, n):\n            if a[i] + a[j] + a[k] == s:\n                cnt += 1\nprint(cnt)',
    ],
    explanation:
      '3重全探索 O(N^3)。開始位置をずらして i<j<k を保証し、重複カウントを防ぐ。\n\n模範解答:\nn, s = map(int, input().split())\na = list(map(int, input().split()))\ncnt = 0\nfor i in range(n):\n    for j in range(i + 1, n):\n        for k in range(j + 1, n):\n            if a[i] + a[j] + a[k] == s:\n                cnt += 1\nprint(cnt)',
    reference:
      'n, s = map(int, input().split())\na = list(map(int, input().split()))\ncnt = 0\nfor i in range(n):\n    for j in range(i + 1, n):\n        for k in range(j + 1, n):\n            if a[i] + a[j] + a[k] == s:\n                cnt += 1\nprint(cnt)',
    cases: [
      { input: '5 6\n1 2 3 4 5\n', expected: '1', sample: true },
      { input: '4 10\n1 2 3 4\n', expected: '0' },
      { input: '6 9\n1 2 3 4 5 6\n', expected: '3' },
      { input: '3 100\n1 2 3\n', expected: '0' },
    ],
    tip: '💡 組合せの全探索は「後ろのループほど開始を +1」で i<j<k を保つ。',
  },
])

// ===== lv130 数論：約数と素因数分解(AtCoder) =====
const lv130 = build(130, 'lv130x', [
  {
    title: '約数の列挙',
    concept: '約数と素因数',
    tags: ['素数', '数論', 'アルゴリズム'],
    statement:
      '正の整数 N が与えられます。N のすべての正の約数を、小さい順に空白区切りで出力してください。\n\n入力例:\n12\n\n出力例:\n1 2 3 4 6 12',
    starter: 'n = int(input())\n',
    hints: [
      'i が約数なら N//i も約数。i は √N まで調べれば十分です。',
      'i と N//i が同じ（平方数の中央）ときは重複に注意。',
      '答え:\nn = int(input())\nds = []\ni = 1\nwhile i * i <= n:\n    if n % i == 0:\n        ds.append(i)\n        if i != n // i:\n            ds.append(n // i)\n    i += 1\nprint(*sorted(ds))',
    ],
    explanation:
      '約数はペア (i, N//i) で現れるので √N まで調べれば全部見つかる。最後にソート。\n\n模範解答:\nn = int(input())\nds = []\ni = 1\nwhile i * i <= n:\n    if n % i == 0:\n        ds.append(i)\n        if i != n // i:\n            ds.append(n // i)\n    i += 1\nprint(*sorted(ds))',
    reference:
      'n = int(input())\nds = []\ni = 1\nwhile i * i <= n:\n    if n % i == 0:\n        ds.append(i)\n        if i != n // i:\n            ds.append(n // i)\n    i += 1\nprint(*sorted(ds))',
    cases: [
      { input: '12\n', expected: '1 2 3 4 6 12', sample: true },
      { input: '1\n', expected: '1' },
      { input: '16\n', expected: '1 2 4 8 16' },
      { input: '7\n', expected: '1 7' },
    ],
    tip: '💡 √N までのループで約数列挙は O(√N)。全部回す O(N) より圧倒的に速い。',
  },
  {
    title: '素因数分解',
    concept: '約数と素因数',
    tags: ['素数', '数論', 'アルゴリズム'],
    statement:
      '2以上の整数 N が与えられます。N を素因数分解し、素因数を小さい順（重複もそのまま）に空白区切りで出力してください。\n\n入力例:\n60\n\n出力例:\n2 2 3 5',
    starter: 'n = int(input())\n',
    hints: [
      'd = 2 から順に、割り切れる間は割り続けて d を記録します。',
      'd*d > n になったら、残った n（>1）自身が最後の素因数です。',
      '答え:\nn = int(input())\nres = []\nd = 2\nwhile d * d <= n:\n    while n % d == 0:\n        res.append(d)\n        n //= d\n    d += 1\nif n > 1:\n    res.append(n)\nprint(*res)',
    ],
    explanation:
      '小さい素因数から割り切れるだけ割る。残りが1より大きければそれも素因数。\n\n模範解答:\nn = int(input())\nres = []\nd = 2\nwhile d * d <= n:\n    while n % d == 0:\n        res.append(d)\n        n //= d\n    d += 1\nif n > 1:\n    res.append(n)\nprint(*res)',
    reference:
      'n = int(input())\nres = []\nd = 2\nwhile d * d <= n:\n    while n % d == 0:\n        res.append(d)\n        n //= d\n    d += 1\nif n > 1:\n    res.append(n)\nprint(*res)',
    cases: [
      { input: '60\n', expected: '2 2 3 5', sample: true },
      { input: '2\n', expected: '2' },
      { input: '97\n', expected: '97' },
      { input: '128\n', expected: '2 2 2 2 2 2 2' },
    ],
    tip: '💡 試し割りは √N まで。それを超えて残った数は素数そのもの。',
  },
])

export const expand1Problems: Problem[] = [
  ...lv003,
  ...lv005,
  ...lv006,
  ...lv007,
  ...lv008,
  ...lv100,
  ...lv150,
  ...lv120,
  ...lv130,
]
