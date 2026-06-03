import type { Problem } from '../../types'

/**
 * lv001 — 超入門帯。
 * 「1問1学び」を基本に、1つの概念につき2〜3問のクラスタ(反復練習)で構成。
 * 出力・変数・型・入力・基本演算・文字列の基礎を、全部違う機能でカバーする。
 * 各問に reference(参照解) と、多くに tip(💡発見の豆知識) を持たせている。
 */

interface Spec {
  title: string
  concept: string
  tags: string[]
  statement: string
  starter?: string
  hints: [string, string, string]
  explanation: string
  reference: string
  cases: { input: string; expected: string; sample?: boolean }[]
  tip?: string
}

const DEFAULT_STARTER = '# ここにコードを書こう\n'

const specs: Spec[] = [
  // ===== 概念: 出力(print) =====
  {
    title: 'Hello, World!',
    concept: '出力(print)',
    tags: ['print', '出力'],
    statement: '画面に Hello, World! と出力してください。\n\n出力例:\nHello, World!',
    hints: [
      'Python で画面に出すには print() を使います。',
      '出したい文字は引用符 " " で囲みます。',
      '答え:\nprint("Hello, World!")',
    ],
    explanation: 'print() は引数を画面に表示し、最後に改行します。\n\n模範解答:\nprint("Hello, World!")',
    reference: 'print("Hello, World!")',
    cases: [{ input: '', expected: 'Hello, World!', sample: true }],
    tip: '💡 print() は一番よく使う関数。まずはこれから！',
  },
  {
    title: '入力をそのまま出力',
    concept: '出力(print)',
    tags: ['input', '出力'],
    statement: '入力された1行をそのまま出力してください。\n\n入力例:\nhello world\n\n出力例:\nhello world',
    starter: 's = input()\n',
    hints: ['input() で1行を読み込めます。', '読んだものを print() に渡します。', '答え:\nprint(input())'],
    explanation: 'input() は標準入力から1行(改行を除く)を文字列として返します。\n\n模範解答:\nprint(input())',
    reference: 'print(input())',
    cases: [
      { input: 'hello world\n', expected: 'hello world', sample: true },
      { input: 'Python\n', expected: 'Python' },
    ],
    tip: '💡 input() の戻り値は必ず文字列(str)。数として使うなら int() で変換が必要。',
  },
  {
    title: '2つの値を空白区切りで',
    concept: '出力(print)',
    tags: ['print'],
    statement: '整数 3 と 5 を、空白区切りで1行に出力してください。\n\n出力例:\n3 5',
    hints: ['print はカンマで区切ると複数の値を出せます。', 'print(3, 5) のように書きます。', '答え:\nprint(3, 5)'],
    explanation: 'print(a, b) は値の間に空白を入れて出力します。\n\n模範解答:\nprint(3, 5)',
    reference: 'print(3, 5)',
    cases: [{ input: '', expected: '3 5', sample: true }],
    tip: '💡 print(a, b, c) は自動で空白区切り。区切りを変えたいときは次に学ぶ sep を使う。',
  },

  // ===== 概念: print の書式 =====
  {
    title: '区切り文字を変える (sep)',
    concept: 'printの書式',
    tags: ['print', 'sep'],
    statement: '文字 a, b, c をハイフン区切りで a-b-c と出力してください。\n\n出力例:\na-b-c',
    hints: [
      'print の sep= で区切り文字を変えられます。',
      'sep="-" を指定します。',
      '答え:\nprint("a", "b", "c", sep="-")',
    ],
    explanation: 'sep は値の区切り文字(デフォルトは空白)。\n\n模範解答:\nprint("a", "b", "c", sep="-")',
    reference: 'print("a", "b", "c", sep="-")',
    cases: [{ input: '', expected: 'a-b-c', sample: true }],
    tip: '💡 print(*リスト, sep="\\n") でリストの各要素を改行区切りで一気に出力できる。',
  },
  {
    title: '改行しない (end)',
    concept: 'printの書式',
    tags: ['print', 'end'],
    statement: 'A と B を、改行せずに続けて AB と出力してください（print を2回使う）。\n\n出力例:\nAB',
    starter: '# print を2回使おう\n',
    hints: [
      'print は最後に自動で改行します。それを止めるのが end= です。',
      'print("A", end="") とすると改行されず次が続きます。',
      '答え:\nprint("A", end="")\nprint("B")',
    ],
    explanation: 'end は出力の最後に付ける文字(デフォルトは改行)。end="" で改行を消せます。\n\n模範解答:\nprint("A", end="")\nprint("B")',
    reference: 'print("A", end="")\nprint("B")',
    cases: [{ input: '', expected: 'AB', sample: true }],
    tip: '💡 ループ内で end=" " を使うと、結果を1行に並べて出力できる。',
  },

  // ===== 概念: f-string =====
  {
    title: 'f-string で埋め込み',
    concept: 'f-string',
    tags: ['f-string', '文字列'],
    statement:
      'コード内で name に "Taro"、age に 20 を代入し、Taro is 20 years old と出力してください（f-string を使う）。\n\n出力例:\nTaro is 20 years old',
    starter: 'name = "Taro"\nage = 20\n',
    hints: [
      '文字列の前に f を付けると f-string になります。',
      '{ } の中に変数を書くとその値が埋め込まれます。',
      '答え:\nprint(f"{name} is {age} years old")',
    ],
    explanation:
      'f"..." の中の {変数} は値に置き換わります。文字列と値を混ぜる一番読みやすい方法。\n\n模範解答:\nname = "Taro"\nage = 20\nprint(f"{name} is {age} years old")',
    reference: 'name = "Taro"\nage = 20\nprint(f"{name} is {age} years old")',
    cases: [{ input: '', expected: 'Taro is 20 years old', sample: true }],
    tip: '💡 f-string は超強力。f"{x:.2f}" で小数2桁、f"{n:03d}" でゼロ埋め、f"{x=}" でデバッグ表示まで！',
  },
  {
    title: 'f-string の中で計算',
    concept: 'f-string',
    tags: ['f-string'],
    statement:
      '2つの整数 a, b が空白区切りで与えられます。「a + b = 結果」の形で出力してください。\n\n入力例:\n3 5\n\n出力例:\n3 + 5 = 8',
    starter: 'a, b = map(int, input().split())\n',
    hints: [
      'f-string の { } の中には計算式も書けます。',
      '{a + b} と書けば和が埋め込まれます。',
      '答え:\nprint(f"{a} + {b} = {a + b}")',
    ],
    explanation: '{ } の中は式として評価されます。\n\n模範解答:\na, b = map(int, input().split())\nprint(f"{a} + {b} = {a + b}")',
    reference: 'a, b = map(int, input().split())\nprint(f"{a} + {b} = {a + b}")',
    cases: [
      { input: '3 5\n', expected: '3 + 5 = 8', sample: true },
      { input: '10 20\n', expected: '10 + 20 = 30' },
    ],
    tip: '💡 { } の中には関数やメソッド呼び出しも書ける。f"{name.upper()}" もOK。',
  },

  // ===== 概念: 変数 =====
  {
    title: '変数に代入して表示',
    concept: '変数',
    tags: ['変数'],
    statement: '変数 x に 100 を代入し、x の値を出力してください。\n\n出力例:\n100',
    hints: ['= で代入します。x = 100', 'print(x) で中身を出します。', '答え:\nx = 100\nprint(x)'],
    explanation: '= は「右の値に左の名前を付ける」操作。\n\n模範解答:\nx = 100\nprint(x)',
    reference: 'x = 100\nprint(x)',
    cases: [{ input: '', expected: '100', sample: true }],
    tip: '💡 x += 1 は「x = x + 1」の省略形。-=, *=, //= なども同様に使える。',
  },
  {
    title: '2つの値を入れ替え',
    concept: '変数',
    tags: ['変数', '多重代入'],
    statement: 'a に 1、b に 2 を代入したあと2つを入れ替え、各行に a, b を出力してください。\n\n出力例:\n2\n1',
    starter: 'a = 1\nb = 2\n',
    hints: [
      'Python は a, b = b, a で同時に入れ替えできます。',
      '一時変数は不要です。',
      '答え:\na, b = b, a\nprint(a)\nprint(b)',
    ],
    explanation:
      '右辺が先に1つのタプルとして評価されてから代入されるので、入れ替えができます。\n\n模範解答:\na, b = 1, 2\na, b = b, a\nprint(a)\nprint(b)',
    reference: 'a, b = 1, 2\na, b = b, a\nprint(a)\nprint(b)',
    cases: [{ input: '', expected: '2\n1', sample: true }],
    tip: '💡 この「多重代入」で a, b, c = 1, 2, 3 や、関数から複数の値を返して受け取るのも自在。',
  },

  // ===== 概念: 算術演算子 =====
  {
    title: '和・差・積',
    concept: '算術演算子',
    tags: ['算術演算子'],
    statement:
      '整数 a, b が空白区切りで与えられます。a+b, a-b, a*b を空白区切りで出力してください。\n\n入力例:\n7 3\n\n出力例:\n10 4 21',
    starter: 'a, b = map(int, input().split())\n',
    hints: [
      '足し算 + 引き算 - 掛け算 * です。',
      'print にカンマ区切りで3つ渡します。',
      '答え:\nprint(a + b, a - b, a * b)',
    ],
    explanation: '掛け算は × でなく *。\n\n模範解答:\na, b = map(int, input().split())\nprint(a + b, a - b, a * b)',
    reference: 'a, b = map(int, input().split())\nprint(a + b, a - b, a * b)',
    cases: [
      { input: '7 3\n', expected: '10 4 21', sample: true },
      { input: '5 5\n', expected: '10 0 25' },
    ],
  },
  {
    title: '商と余り',
    concept: '算術演算子',
    tags: ['算術演算子', '剰余'],
    statement:
      '整数 a, b。a を b で割った商と余りを空白区切りで出力してください。\n\n入力例:\n17 5\n\n出力例:\n3 2',
    starter: 'a, b = map(int, input().split())\n',
    hints: ['整数の割り算(商)は // 、余りは % です。', 'print(a // b, a % b)。', '答え:\nprint(a // b, a % b)'],
    explanation: '// は切り捨て除算、% は剰余。\n\n模範解答:\na, b = map(int, input().split())\nprint(a // b, a % b)',
    reference: 'a, b = map(int, input().split())\nprint(a // b, a % b)',
    cases: [
      { input: '17 5\n', expected: '3 2', sample: true },
      { input: '10 2\n', expected: '5 0' },
      { input: '7 3\n', expected: '2 1' },
    ],
    tip: '💡 商と余りを同時に得る divmod(a, b) もある。divmod(17, 5) は (3, 2)。',
  },
  {
    title: 'べき乗',
    concept: '算術演算子',
    tags: ['算術演算子', 'べき乗'],
    statement: '整数 n。2 の n 乗を出力してください。\n\n入力例:\n10\n\n出力例:\n1024',
    starter: 'n = int(input())\n',
    hints: ['べき乗は ** です。', '2 ** n と書きます。', '答え:\nprint(2 ** n)'],
    explanation: '** はべき乗。2**10 は 1024。\n\n模範解答:\nn = int(input())\nprint(2 ** n)',
    reference: 'n = int(input())\nprint(2 ** n)',
    cases: [
      { input: '10\n', expected: '1024', sample: true },
      { input: '0\n', expected: '1' },
      { input: '5\n', expected: '32' },
    ],
    tip: '💡 pow(a, b, m) は a**b を m で割った余りを高速計算してくれる(暗号などで活躍)。',
  },

  // ===== 概念: 数値入力と型変換 =====
  {
    title: '2数の和（入力）',
    concept: '数値入力と型変換',
    tags: ['input', '型変換', 'map'],
    statement: '2つの整数が空白区切りで与えられます。その和を出力してください。\n\n入力例:\n3 5\n\n出力例:\n8',
    starter: 'a, b = map(int, input().split())\n',
    hints: [
      'input().split() で空白ごとに分け、map(int, ...) で整数化します。',
      'a, b = map(int, input().split())。',
      '答え:\nprint(a + b)',
    ],
    explanation: 'input は文字列なので map(int, ...) で数値に変換します。\n\n模範解答:\na, b = map(int, input().split())\nprint(a + b)',
    reference: 'a, b = map(int, input().split())\nprint(a + b)',
    cases: [
      { input: '3 5\n', expected: '8', sample: true },
      { input: '100 200\n', expected: '300' },
      { input: '-4 4\n', expected: '0' },
    ],
    tip: '💡 数がたくさんなら a = list(map(int, input().split())) でリストに一括変換できる。',
  },
  {
    title: '小数の割り算',
    concept: '数値入力と型変換',
    tags: ['算術演算子', 'float', '型'],
    statement: '2つの整数 a, b。a を b で割った結果(小数)を出力してください。\n\n入力例:\n7 2\n\n出力例:\n3.5',
    starter: 'a, b = map(int, input().split())\n',
    hints: ['/ は小数になる割り算です(// と違う)。', 'print(a / b)。', '答え:\nprint(a / b)'],
    explanation: '/ は常に float を返します。6/3 も 2.0 になります。\n\n模範解答:\na, b = map(int, input().split())\nprint(a / b)',
    reference: 'a, b = map(int, input().split())\nprint(a / b)',
    cases: [
      { input: '7 2\n', expected: '3.5', sample: true },
      { input: '6 3\n', expected: '2.0' },
      { input: '1 4\n', expected: '0.25' },
    ],
    tip: '💡 / は必ず小数(float)、// は切り捨ての整数。割り切れても 2.0 になるのが / の特徴。',
  },
  {
    title: '四捨五入',
    concept: '数値入力と型変換',
    tags: ['round', 'float'],
    statement: '小数 x が与えられます。小数第2位までに四捨五入して出力してください。\n\n入力例:\n3.14159\n\n出力例:\n3.14',
    starter: 'x = float(input())\n',
    hints: ['小数は float(input()) で読みます。', 'round(x, 桁数) で四捨五入できます。', '答え:\nprint(round(x, 2))'],
    explanation: 'round(x, n) は小数第 n 位に丸めます。\n\n模範解答:\nx = float(input())\nprint(round(x, 2))',
    reference: 'x = float(input())\nprint(round(x, 2))',
    cases: [
      { input: '3.14159\n', expected: '3.14', sample: true },
      { input: '2.71828\n', expected: '2.72' },
    ],
    tip: '💡 round は「偶数丸め」で round(0.5)=0 になる点に注意。表示だけなら f"{x:.2f}" が確実。',
  },

  // ===== 概念: 文字列操作 =====
  {
    title: '文字列の連結',
    concept: '文字列操作',
    tags: ['文字列', '連結'],
    statement: '2つの文字列が2行で与えられます。連結して出力してください。\n\n入力例:\nfoo\nbar\n\n出力例:\nfoobar',
    starter: 'a = input()\nb = input()\n',
    hints: ['文字列同士は + でつなげます。', 'print(a + b)。', '答え:\nprint(a + b)'],
    explanation: '+ は数値なら加算、文字列なら連結。\n\n模範解答:\na = input()\nb = input()\nprint(a + b)',
    reference: 'a = input()\nb = input()\nprint(a + b)',
    cases: [
      { input: 'foo\nbar\n', expected: 'foobar', sample: true },
      { input: 'Hello\nWorld\n', expected: 'HelloWorld' },
    ],
    tip: '💡 たくさんの文字列をつなぐなら "".join(リスト) が速くてきれい。',
  },
  {
    title: '文字列の繰り返し',
    concept: '文字列操作',
    tags: ['文字列'],
    statement: '文字列 s と整数 n が2行で与えられます。s を n 回くり返して出力してください。\n\n入力例:\nab\n3\n\n出力例:\nababab',
    starter: 's = input()\nn = int(input())\n',
    hints: ['文字列 * 整数 でくり返せます。', 'print(s * n)。', '答え:\nprint(s * n)'],
    explanation: '"ab" * 3 は "ababab"。\n\n模範解答:\ns = input()\nn = int(input())\nprint(s * n)',
    reference: 's = input()\nn = int(input())\nprint(s * n)',
    cases: [
      { input: 'ab\n3\n', expected: 'ababab', sample: true },
      { input: 'x\n5\n', expected: 'xxxxx' },
    ],
    tip: '💡 "=" * 20 で区切り線、[0] * n で同じ値のリストも作れる。',
  },
  {
    title: '文字数を数える',
    concept: '文字列操作',
    tags: ['len', '文字列'],
    statement: '1行の文字列の文字数を出力してください。\n\n入力例:\nhello\n\n出力例:\n5',
    starter: 's = input()\n',
    hints: ['長さは len() で求まります。', 'len(s)。', '答え:\nprint(len(input()))'],
    explanation: 'len は文字列やリストの要素数を返す。\n\n模範解答:\nprint(len(input()))',
    reference: 'print(len(input()))',
    cases: [
      { input: 'hello\n', expected: '5', sample: true },
      { input: 'a\n', expected: '1' },
      { input: 'code dojo\n', expected: '9' },
    ],
    tip: '💡 len() は文字列だけでなくリスト・辞書・タプルなど「入れ物」全部に使える万能関数。',
  },

  // ===== 概念: 文字列メソッド =====
  {
    title: '大文字にする',
    concept: '文字列メソッド',
    tags: ['文字列メソッド'],
    statement: '文字列を全部大文字にして出力してください。\n\n入力例:\nhello\n\n出力例:\nHELLO',
    starter: 's = input()\n',
    hints: ['文字列には .upper() というメソッドがあります。', 's.upper()。', '答え:\nprint(input().upper())'],
    explanation: '.upper() は大文字化した新しい文字列を返す(元は変わらない)。\n\n模範解答:\nprint(input().upper())',
    reference: 'print(input().upper())',
    cases: [
      { input: 'hello\n', expected: 'HELLO', sample: true },
      { input: 'Hi There\n', expected: 'HI THERE' },
    ],
    tip: '💡 .lower() 小文字, .title() 単語先頭大文字, .strip() 前後の空白除去 など文字列メソッドは超充実。',
  },
  {
    title: '文字を置き換える',
    concept: '文字列メソッド',
    tags: ['文字列メソッド'],
    statement: '文字列が与えられます。含まれる空白をすべてハイフン(-)に置き換えて出力してください。\n\n入力例:\na b c\n\n出力例:\na-b-c',
    starter: 's = input()\n',
    hints: ['.replace(古い, 新しい) で置換できます。', 's.replace(" ", "-")。', '答え:\nprint(input().replace(" ", "-"))'],
    explanation: '.replace は該当箇所をすべて置き換える。\n\n模範解答:\nprint(input().replace(" ", "-"))',
    reference: 'print(input().replace(" ", "-"))',
    cases: [
      { input: 'a b c\n', expected: 'a-b-c', sample: true },
      { input: 'hello world\n', expected: 'hello-world' },
    ],
    tip: '💡 .split() で単語リストに、"-".join(...) で再結合、という組み合わせも定番テク。',
  },

  // ===== 概念: インデックスとスライス =====
  {
    title: '最初の文字',
    concept: 'インデックスとスライス',
    tags: ['インデックス', '文字列'],
    statement: '文字列の最初の1文字を出力してください。\n\n入力例:\npython\n\n出力例:\np',
    starter: 's = input()\n',
    hints: ['文字列は s[番号] で1文字取り出せます。番号は0から。', '最初は s[0]。', '答え:\nprint(input()[0])'],
    explanation: 'インデックスは0始まり。s[0] が先頭。\n\n模範解答:\nprint(input()[0])',
    reference: 'print(input()[0])',
    cases: [
      { input: 'python\n', expected: 'p', sample: true },
      { input: 'Apple\n', expected: 'A' },
    ],
    tip: '💡 インデックスはリストでも同じ。a[0] が最初の要素。',
  },
  {
    title: '最後の文字',
    concept: 'インデックスとスライス',
    tags: ['インデックス', '文字列'],
    statement: '文字列の最後の1文字を出力してください。\n\n入力例:\npython\n\n出力例:\nn',
    starter: 's = input()\n',
    hints: ['負のインデックスは後ろから数えます。', '最後は s[-1]。', '答え:\nprint(input()[-1])'],
    explanation: '-1 は末尾、-2 は末尾から2番目。\n\n模範解答:\nprint(input()[-1])',
    reference: 'print(input()[-1])',
    cases: [
      { input: 'python\n', expected: 'n', sample: true },
      { input: 'Apple\n', expected: 'e' },
    ],
    tip: '💡 負のインデックスは Python の便利機能。a[-1] で最後、a[-2] で後ろから2番目がすぐ取れる。',
  },
  {
    title: '先頭3文字を取り出す',
    concept: 'インデックスとスライス',
    tags: ['スライス', '文字列'],
    statement: '文字列の最初の3文字を出力してください。\n\n入力例:\npython\n\n出力例:\npyt',
    starter: 's = input()\n',
    hints: ['s[開始:終了] で範囲を取り出せます(終了は含まない)。', '先頭からなら s[:3]。', '答え:\nprint(input()[:3])'],
    explanation: 'スライス s[a:b] は a 以上 b 未満。省略すると端まで。\n\n模範解答:\nprint(input()[:3])',
    reference: 'print(input()[:3])',
    cases: [
      { input: 'python\n', expected: 'pyt', sample: true },
      { input: 'abcdef\n', expected: 'abc' },
    ],
    tip: '💡 s[::-1] で文字列を逆順に！ s[::2] で1つ飛ばし。スライスは魔法のように便利。',
  },

  // ===== 概念: 組み込み関数 =====
  {
    title: '絶対値',
    concept: '組み込み関数',
    tags: ['組み込み関数'],
    statement: '整数が与えられます。その絶対値を出力してください。\n\n入力例:\n-7\n\n出力例:\n7',
    starter: 'n = int(input())\n',
    hints: ['絶対値は abs() です。', 'abs(n)。', '答え:\nprint(abs(int(input())))'],
    explanation: 'abs は符号を取り除いた大きさ。\n\n模範解答:\nprint(abs(int(input())))',
    reference: 'print(abs(int(input())))',
    cases: [
      { input: '-7\n', expected: '7', sample: true },
      { input: '5\n', expected: '5' },
      { input: '0\n', expected: '0' },
    ],
    tip: '💡 abs, max, min, sum, sorted など「組み込み関数」は import 不要ですぐ使える。',
  },
  {
    title: '3つの最大値',
    concept: '組み込み関数',
    tags: ['組み込み関数'],
    statement: '3つの整数が空白区切りで与えられます。最大値を出力してください。\n\n入力例:\n3 7 5\n\n出力例:\n7',
    starter: 'a, b, c = map(int, input().split())\n',
    hints: ['最大値は max() です。', 'max(a, b, c)。', '答え:\nprint(max(a, b, c))'],
    explanation: 'max は複数引数の最大を返す。\n\n模範解答:\na, b, c = map(int, input().split())\nprint(max(a, b, c))',
    reference: 'a, b, c = map(int, input().split())\nprint(max(a, b, c))',
    cases: [
      { input: '3 7 5\n', expected: '7', sample: true },
      { input: '10 10 10\n', expected: '10' },
      { input: '-1 -5 -3\n', expected: '-1' },
    ],
  },
  {
    title: '最小値（個数不定）',
    concept: '組み込み関数',
    tags: ['組み込み関数', 'map'],
    statement: '空白区切りで複数の整数が与えられます(個数は不定)。最小値を出力してください。\n\n入力例:\n4 1 9 2\n\n出力例:\n1',
    starter: 'a = list(map(int, input().split()))\n',
    hints: ['min() はリストなどの「まとまり」も受け取れます。', 'min(map(int, input().split()))。', '答え:\nprint(min(map(int, input().split())))'],
    explanation: 'max/min は複数引数でも、1つのイテラブルでも使える。\n\n模範解答:\nprint(min(map(int, input().split())))',
    reference: 'print(min(map(int, input().split())))',
    cases: [
      { input: '4 1 9 2\n', expected: '1', sample: true },
      { input: '5\n', expected: '5' },
      { input: '-3 0 3\n', expected: '-3' },
    ],
    tip: '💡 max/min には key= も渡せる。max(words, key=len) で「一番長い単語」が取れる。',
  },

  // ===== 概念: 真偽値と比較 =====
  {
    title: '正の数か判定',
    concept: '真偽値と比較',
    tags: ['bool', '比較'],
    statement: '整数 n が与えられます。n が正なら True、そうでなければ False を出力してください。\n\n入力例:\n5\n\n出力例:\nTrue',
    starter: 'n = int(input())\n',
    hints: ['比較式 n > 0 はそれ自体が True / False という値になります。', 'print(n > 0) でOK。', '答え:\nprint(int(input()) > 0)'],
    explanation: '比較演算の結果は bool 値。print すると True/False と表示されます。\n\n模範解答:\nprint(int(input()) > 0)',
    reference: 'print(int(input()) > 0)',
    cases: [
      { input: '5\n', expected: 'True', sample: true },
      { input: '-3\n', expected: 'False' },
      { input: '0\n', expected: 'False' },
    ],
    tip: '💡 True は 1、False は 0 として計算にも使える。sum([True, False, True]) は 2 になる！',
  },

  // ===== 概念: エスケープ =====
  {
    title: '改行を含む出力',
    concept: 'エスケープ',
    tags: ['文字列', 'エスケープ'],
    statement: 'A, B, C を縦に3行で出力してください。ただし print は1回だけ使い、改行 \\n を使ってください。\n\n出力例:\nA\nB\nC',
    starter: '# print は1回だけ使おう\n',
    hints: ['文字列の中の \\n は「改行」を表します。', 'print("A\\nB\\nC") で3行になります。', '答え:\nprint("A\\nB\\nC")'],
    explanation: '\\n は改行、\\t はタブを表す「エスケープシーケンス」。\n\n模範解答:\nprint("A\\nB\\nC")',
    reference: 'print("A\\nB\\nC")',
    cases: [{ input: '', expected: 'A\nB\nC', sample: true }],
    tip: '💡 \\t タブ, \\\\ バックスラッシュ自身。逆に r"..." なら \\n をそのまま文字として出せる(正規表現で便利)。',
  },
]

export const lv001Problems: Problem[] = specs.map((s, i) => ({
  id: `lv001-${String(i + 1).padStart(3, '0')}`,
  level: 1,
  index: i + 1,
  title: s.title,
  statement: s.statement,
  tags: s.tags,
  concept: s.concept,
  starterCode: s.starter ?? DEFAULT_STARTER,
  hints: s.hints,
  explanation: s.explanation,
  testCases: s.cases,
  reference: s.reference,
  tip: s.tip,
}))
