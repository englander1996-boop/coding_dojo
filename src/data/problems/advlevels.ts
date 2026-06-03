import type { Problem } from '../../types'
import { build } from './_build.ts'

/**
 * 上級帯。クラス/OOP、再帰、二分探索、動的計画法(DP)。
 */

// ===== lv200 クラスとOOP =====
const lv200 = build(200, 'lv200', [
  {
    title: 'クラスを定義する',
    concept: 'クラスとOOP',
    tags: ['class', 'OOP'],
    statement: '名前 name と年齢 age を持つクラス Person を作り、greet() で "I am 名前, 年齢 years old" を返すようにします。入力に対して greet() の結果を出力してください。\n\n入力例:\nTaro 20\n\n出力例:\nI am Taro, 20 years old',
    starter: 'class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    def greet(self):\n        pass\n\nname, age = input().split()\n',
    hints: ['__init__ で属性 self.name などを設定。', 'メソッドは def greet(self): と第1引数 self を取る。', '答え:\n    def greet(self):\n        return f"I am {self.name}, {self.age} years old"'],
    explanation: 'class は「データ＋振る舞い」をまとめる設計図。__init__ は生成時の初期化、self は自分自身。\n\n模範解答:\nclass Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    def greet(self):\n        return f"I am {self.name}, {self.age} years old"\n\nname, age = input().split()\nprint(Person(name, age).greet())',
    reference: 'class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    def greet(self):\n        return f"I am {self.name}, {self.age} years old"\n\nname, age = input().split()\nprint(Person(name, age).greet())',
    cases: [
      { input: 'Taro 20\n', expected: 'I am Taro, 20 years old', sample: true },
      { input: 'Bob 30\n', expected: 'I am Bob, 30 years old' },
    ],
    tip: '💡 self は「そのインスタンス自身」。__init__ は生成時に自動で呼ばれる初期化メソッド。',
  },
  {
    title: '状態を持つオブジェクト',
    concept: 'クラスとOOP',
    tags: ['class', 'OOP'],
    statement: '合計を貯めるクラス Accumulator を作り、add(x) で内部合計に x を足し、total() で合計を返すようにします。整数列を順に add し、最後に合計を出力してください。\n\n入力例:\n1 2 3\n\n出力例:\n6',
    starter: 'class Accumulator:\n    def __init__(self):\n        self.s = 0\n\n    def add(self, x):\n        pass\n\n    def total(self):\n        return self.s\n',
    hints: ['__init__ で self.s = 0。', 'add で self.s += x。', '答え:\n    def add(self, x):\n        self.s += x'],
    explanation: 'インスタンスは状態(属性)を持ち続けられる。\n\n模範解答:\nclass Accumulator:\n    def __init__(self):\n        self.s = 0\n\n    def add(self, x):\n        self.s += x\n\n    def total(self):\n        return self.s\n\nc = Accumulator()\nfor x in map(int, input().split()):\n    c.add(x)\nprint(c.total())',
    reference: 'class Accumulator:\n    def __init__(self):\n        self.s = 0\n\n    def add(self, x):\n        self.s += x\n\n    def total(self):\n        return self.s\n\nc = Accumulator()\nfor x in map(int, input().split()):\n    c.add(x)\nprint(c.total())',
    cases: [
      { input: '1 2 3\n', expected: '6', sample: true },
      { input: '5\n', expected: '5' },
      { input: '-1 1\n', expected: '0' },
    ],
  },
  {
    title: '継承とオーバーライド',
    concept: 'クラスとOOP',
    tags: ['class', '継承'],
    statement: 'Animal クラスの speak() は "..." を返します。これを継承した Dog は speak() で "Woof" を返すようにし、Dog().speak() を出力してください。（入力はありません）\n\n出力例:\nWoof',
    starter: 'class Animal:\n    def speak(self):\n        return "..."\n\nclass Dog(Animal):\n    def speak(self):\n        pass\n',
    hints: ['class Dog(Animal): で Animal を継承。', 'メソッドを再定義(オーバーライド)できる。', '答え:\nclass Dog(Animal):\n    def speak(self):\n        return "Woof"'],
    explanation: '継承は親の機能を引き継ぎ、必要な部分だけ上書きできる。\n\n模範解答:\nclass Animal:\n    def speak(self):\n        return "..."\n\nclass Dog(Animal):\n    def speak(self):\n        return "Woof"\n\nprint(Dog().speak())',
    reference: 'class Animal:\n    def speak(self):\n        return "..."\n\nclass Dog(Animal):\n    def speak(self):\n        return "Woof"\n\nprint(Dog().speak())',
    cases: [{ input: '', expected: 'Woof', sample: true }],
    tip: '💡 super().__init__() で親の初期化を呼べる。共通処理は親に、違いだけ子に書く。',
  },
  {
    title: '__str__ で表示をカスタマイズ',
    concept: 'クラスとOOP',
    tags: ['class', 'ダンダー'],
    statement: '点 Point(x, y) を作り、print したとき "(x, y)" と表示されるよう __str__ を定義します。入力 x, y に対して print(Point(x, y)) の結果を出力してください。\n\n入力例:\n3 4\n\n出力例:\n(3, 4)',
    starter: 'class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __str__(self):\n        pass\n\nx, y = input().split()\n',
    hints: ['__str__ は print 時の表示を決める特殊メソッド。', 'f"({self.x}, {self.y})" を返す。', '答え:\n    def __str__(self):\n        return f"({self.x}, {self.y})"'],
    explanation: '__str__ などの「ダンダー(二重アンダースコア)メソッド」で組み込み動作をカスタマイズできる。\n\n模範解答:\nclass Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __str__(self):\n        return f"({self.x}, {self.y})"\n\nx, y = input().split()\nprint(Point(x, y))',
    reference: 'class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __str__(self):\n        return f"({self.x}, {self.y})"\n\nx, y = input().split()\nprint(Point(x, y))',
    cases: [
      { input: '3 4\n', expected: '(3, 4)', sample: true },
      { input: '0 0\n', expected: '(0, 0)' },
    ],
    tip: '💡 __eq__ で == 、__lt__ で < 、__len__ で len() 、__add__ で + を自分のクラスに定義できる。',
  },
])

// ===== lv500 再帰・二分探索 =====
const lv500 = build(500, 'lv500', [
  {
    title: '階乗（再帰）',
    concept: '再帰',
    tags: ['再帰', '関数'],
    statement: '整数 n の階乗 n! を再帰関数で求めて出力してください。\n\n入力例:\n5\n\n出力例:\n120',
    starter: 'def fact(n):\n    # 終了条件と再帰\n    pass\n\nprint(fact(int(input())))\n',
    hints: ['再帰は「自分自身を呼ぶ関数」。', '終了条件(n<=1で1)を必ず作る。', '答え:\ndef fact(n):\n    if n <= 1:\n        return 1\n    return n * fact(n - 1)'],
    explanation: '再帰は基底ケース(止まる条件)と再帰ケースで構成。\n\n模範解答:\ndef fact(n):\n    if n <= 1:\n        return 1\n    return n * fact(n - 1)\n\nprint(fact(int(input())))',
    reference: 'def fact(n):\n    if n <= 1:\n        return 1\n    return n * fact(n - 1)\n\nprint(fact(int(input())))',
    cases: [
      { input: '5\n', expected: '120', sample: true },
      { input: '0\n', expected: '1' },
      { input: '1\n', expected: '1' },
      { input: '6\n', expected: '720' },
    ],
    tip: '💡 再帰が深いと RecursionError。sys.setrecursionlimit で上限を上げられる。',
  },
  {
    title: 'フィボナッチ（メモ化）',
    concept: '再帰',
    tags: ['再帰', 'デコレータ', 'メモ化'],
    statement: 'フィボナッチ数列の第 n 項を出力してください（F(0)=0, F(1)=1, F(2)=1, ...）。\n\n入力例:\n10\n\n出力例:\n55',
    hints: ['F(n) = F(n-1) + F(n-2)。', '@lru_cache を付けると結果が自動でメモ化され高速に。', '答え:\nfrom functools import lru_cache\n@lru_cache(maxsize=None)\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)'],
    explanation: '素朴な再帰は指数時間。lru_cache(メモ化)で多項式時間に。デコレータの実用例。\n\n模範解答:\nfrom functools import lru_cache\n@lru_cache(maxsize=None)\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nprint(fib(int(input())))',
    reference: 'from functools import lru_cache\n@lru_cache(maxsize=None)\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nprint(fib(int(input())))',
    cases: [
      { input: '10\n', expected: '55', sample: true },
      { input: '0\n', expected: '0' },
      { input: '1\n', expected: '1' },
      { input: '20\n', expected: '6765' },
    ],
    tip: '💡 @lru_cache を付けるだけで関数の結果がキャッシュされ、重い再帰が一瞬に。デコレータの威力。',
  },
  {
    title: '二分探索を書く',
    concept: '二分探索',
    tags: ['二分探索', 'アルゴリズム'],
    statement: '1行目に昇順の整数列、2行目に整数 x。x が何番目(0始まり)にあるか出力してください。無ければ -1。自分で二分探索を書いてみましょう。\n\n入力例:\n1 3 5 7 9\n5\n\n出力例:\n2',
    starter: 'a = list(map(int, input().split()))\nx = int(input())\nlo, hi = 0, len(a) - 1\n',
    hints: ['lo, hi で探索範囲を半分ずつ絞り込む。', 'mid = (lo+hi)//2 で中央を見て範囲を更新。', '答え:\nwhile lo <= hi:\n    mid = (lo + hi) // 2\n    if a[mid] == x: ...'],
    explanation: '二分探索は O(log N)。ソート済みが前提。\n\n模範解答:\na = list(map(int, input().split()))\nx = int(input())\nlo, hi = 0, len(a) - 1\nans = -1\nwhile lo <= hi:\n    mid = (lo + hi) // 2\n    if a[mid] == x:\n        ans = mid\n        break\n    elif a[mid] < x:\n        lo = mid + 1\n    else:\n        hi = mid - 1\nprint(ans)',
    reference: 'a = list(map(int, input().split()))\nx = int(input())\nlo, hi = 0, len(a) - 1\nans = -1\nwhile lo <= hi:\n    mid = (lo + hi) // 2\n    if a[mid] == x:\n        ans = mid\n        break\n    elif a[mid] < x:\n        lo = mid + 1\n    else:\n        hi = mid - 1\nprint(ans)',
    cases: [
      { input: '1 3 5 7 9\n5\n', expected: '2', sample: true },
      { input: '1 2 3\n4\n', expected: '-1' },
      { input: '10\n10\n', expected: '0' },
    ],
    tip: '💡 実務では標準の bisect モジュールを使えば自分で書かずに済む(lv070)。仕組みを知るのも大事。',
  },
])

// ===== lv700 動的計画法 (DP) =====
const lv700 = build(700, 'lv700', [
  {
    title: '階段の上り方（DP入門）',
    concept: '動的計画法',
    tags: ['dp', 'アルゴリズム'],
    statement: 'n 段の階段を、1段または2段ずつ上ります。上り方は何通りか出力してください。\n\n入力例:\n4\n\n出力例:\n5',
    starter: 'n = int(input())\ndp = [0] * (n + 1)\n',
    hints: ['dp[i] = i 段目までの上り方の数。', 'dp[i] = dp[i-1] + dp[i-2]（最後の一歩が1段か2段か）。', '答え:\ndp[0] = 1\nfor i in range(1, n + 1):\n    dp[i] = dp[i - 1] + (dp[i - 2] if i >= 2 else 0)'],
    explanation: 'DPは「小さい問題の答えを表に貯めて大きい問題を解く」。状態と漸化式を決めるのがコツ。\n\n模範解答:\nn = int(input())\ndp = [0] * (n + 1)\ndp[0] = 1\nfor i in range(1, n + 1):\n    dp[i] = dp[i - 1] + (dp[i - 2] if i >= 2 else 0)\nprint(dp[n])',
    reference: 'n = int(input())\ndp = [0] * (n + 1)\ndp[0] = 1\nfor i in range(1, n + 1):\n    dp[i] = dp[i - 1] + (dp[i - 2] if i >= 2 else 0)\nprint(dp[n])',
    cases: [
      { input: '4\n', expected: '5', sample: true },
      { input: '1\n', expected: '1' },
      { input: '2\n', expected: '2' },
      { input: '5\n', expected: '8' },
    ],
    tip: '💡 DPの第一歩。状態(dp[i]の意味)と遷移(漸化式)を言葉にできれば半分解けたも同然。',
  },
  {
    title: '最大連続部分和（Kadane法）',
    concept: '動的計画法',
    tags: ['dp', 'アルゴリズム'],
    statement: '整数列の、連続する部分列の和の最大値を出力してください（空でない部分列）。\n\n入力例:\n-2 1 -3 4 -1 2 1 -5 4\n\n出力例:\n6',
    starter: 'a = list(map(int, input().split()))\n',
    hints: ['cur = 「今の要素で終わる連続和の最大」。', 'cur = max(x, cur + x)、best にその最大を記録。', '答え:\nbest = cur = a[0]\nfor x in a[1:]:\n    cur = max(x, cur + x)\n    best = max(best, cur)'],
    explanation: 'Kadane法。各位置で「そこで終わる最大和」を更新していく古典DP。O(N)。\n\n模範解答:\na = list(map(int, input().split()))\nbest = cur = a[0]\nfor x in a[1:]:\n    cur = max(x, cur + x)\n    best = max(best, cur)\nprint(best)',
    reference: 'a = list(map(int, input().split()))\nbest = cur = a[0]\nfor x in a[1:]:\n    cur = max(x, cur + x)\n    best = max(best, cur)\nprint(best)',
    cases: [
      { input: '-2 1 -3 4 -1 2 1 -5 4\n', expected: '6', sample: true },
      { input: '1 2 3\n', expected: '6' },
      { input: '-5 -2 -3\n', expected: '-2' },
    ],
    tip: '💡 「ここで終わる最大」を持つのがDPの定石。全探索 O(N²) を O(N) に落とす有名問題。',
  },
])

export const advProblems: Problem[] = [...lv200, ...lv500, ...lv700]
