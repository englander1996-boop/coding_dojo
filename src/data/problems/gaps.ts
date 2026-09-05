import type { Problem } from '../../types'
import { build } from './_build.ts'

/**
 * 機能カバレッジの「未出題(✗)」を埋めるための問題群。
 * tuple / divmod / 論理演算 / strip / 角括弧リスト内包表記 / re / datetime /
 * heapq / yield / with / BFS-DFS / コメント を新たにカバーする。
 */

// ===== 既存帯への追加（明示 id で番号を継続） =====
const extensions: Problem[] = [
  {
    id: 'lv004-003',
    level: 4,
    index: 3,
    title: '前後の空白を除去',
    concept: '文字列の操作',
    tags: ['文字列メソッド', 'strip'],
    statement: '前後に空白が付いた文字列が与えられます。前後の空白を取り除いて出力してください。\n\n入力例:\n   hello   \n\n出力例:\nhello',
    starterCode: 's = input()\n',
    hints: ['前後の空白除去は .strip()。', 'print(input().strip())。', '答え:\nprint(input().strip())'],
    explanation: '.strip() は文字列の前後の空白(改行も)を取り除く。\n\n模範解答:\nprint(input().strip())',
    reference: 'print(input().strip())',
    testCases: [
      { input: '   hello   \n', expected: 'hello', sample: true },
      { input: '  a b c  \n', expected: 'a b c' },
      { input: 'x\n', expected: 'x' },
    ],
    tip: '💡 .lstrip()/.rstrip() で片側だけ、.strip("0") で特定文字の除去もできる。',
  },
  {
    id: 'lv006-002',
    level: 6,
    index: 2,
    title: '片方だけが偶数か',
    concept: '論理演算',
    tags: ['論理演算'],
    statement: '2つの整数 a b が空白区切りで与えられます。a と b のうち「ちょうど片方だけ」が偶数なら yes、両方とも偶数または両方とも奇数なら no を出力してください。\n\n入力例:\n4 7\n\n出力例:\nyes',
    starterCode: 'a, b = map(int, input().split())\n',
    hints: ['「a は偶数か」「b は偶数か」を、それぞれ真偽値として変数に入れてみましょう。', '真偽値どうしは != で比べられます。2つが食い違うときが「ちょうど片方だけ」です。', '答え:\nea = a % 2 == 0\neb = b % 2 == 0\nprint("yes" if ea != eb else "no")'],
    explanation: '比較の結果 True / False は変数に入れて持ち回せる。ea != eb は「ちょうど一方だけが真」を表し、これが排他的論理和にあたる。and / or / not だけで書くなら (ea and not eb) or (eb and not ea) と同じ意味。\n\n模範解答:\na, b = map(int, input().split())\nea = a % 2 == 0\neb = b % 2 == 0\nprint("yes" if ea != eb else "no")',
    reference: 'a, b = map(int, input().split())\nea = a % 2 == 0\neb = b % 2 == 0\nprint("yes" if ea != eb else "no")',
    testCases: [
      { input: '4 7\n', expected: 'yes', sample: true },
      { input: '4 8\n', expected: 'no' },
      { input: '3 9\n', expected: 'no' },
      { input: '10 3\n', expected: 'yes' },
      { input: '0 1\n', expected: 'yes' },
    ],
    tip: '💡 真偽値は比べられる。ea != eb は「どちらか一方だけ真」、ea == eb は「2つがそろっている」。and/or を並べるより短く書ける。',
  },
  {
    id: 'lv030-005',
    level: 30,
    index: 5,
    title: '2倍のリスト（角括弧の内包表記）',
    concept: '内包表記',
    tags: ['内包表記'],
    statement: '整数列の各要素を2倍したリストを、[..] 形式で出力してください（角括弧のリスト内包表記を使う）。\n\n入力例:\n1 2 3\n\n出力例:\n[2, 4, 6]',
    starterCode: 'a = list(map(int, input().split()))\n',
    hints: ['[式 for x in 列] でリストを作ります。', '[x * 2 for x in a]。', '答え:\ndoubled = [x * 2 for x in a]\nprint(doubled)'],
    explanation: '角括弧 [..] のリスト内包表記は新しいリストを返す。\n\n模範解答:\na = list(map(int, input().split()))\ndoubled = [x * 2 for x in a]\nprint(doubled)',
    reference: 'a = list(map(int, input().split()))\ndoubled = [x * 2 for x in a]\nprint(doubled)',
    testCases: [
      { input: '1 2 3\n', expected: '[2, 4, 6]', sample: true },
      { input: '5\n', expected: '[10]' },
      { input: '-1 0 1\n', expected: '[-2, 0, 2]' },
    ],
  },
]

// ===== lv011 タプルとアンパック =====
const lv011 = build(11, 'lv011', [
  {
    title: 'divmod でまとめて取得',
    concept: 'タプルとアンパック',
    tags: ['タプル', 'divmod'],
    statement: '2つの整数 a, b。divmod を使って商と余りを求め、「商 余り」を出力してください。\n\n入力例:\n17 5\n\n出力例:\n3 2',
    starter: 'a, b = map(int, input().split())\n',
    hints: ['divmod(a, b) は (商, 余り) のタプルを返します。', 'タプルは result[0], result[1] で取り出せる。', '答え:\nresult = divmod(a, b)\nprint(result[0], result[1])'],
    explanation: 'divmod は商と余りをタプルで一度に返す。タプルは「変更できない並び」。\n\n模範解答:\na, b = map(int, input().split())\nresult = divmod(a, b)  # (商, 余り) のタプル\nprint(result[0], result[1])',
    reference: 'a, b = map(int, input().split())\nresult = divmod(a, b)  # (商, 余り) のタプル\nprint(result[0], result[1])',
    cases: [
      { input: '17 5\n', expected: '3 2', sample: true },
      { input: '10 3\n', expected: '3 1' },
      { input: '20 4\n', expected: '5 0' },
    ],
    tip: '💡 q, r = divmod(a, b) とタプルを分解して受け取るのが普通。タプルは () で作る変更不可の並び。',
  },
  {
    title: '先頭と残りに分ける',
    concept: 'タプルとアンパック',
    tags: ['タプル', 'アンパック'],
    statement: '整数列が与えられます。先頭の要素と、「残りの個数」を空白区切りで出力してください。\n\n入力例:\n10 20 30 40\n\n出力例:\n10 3',
    hints: ['first, *rest = リスト で先頭と残りに分けられます。', 'rest はリスト。len(rest) が残りの個数。', '答え:\nfirst, *rest = input().split()\nprint(first, len(rest))'],
    explanation: '* を付けた変数が「残り全部」をまとめて受け取る(アンパック)。\n\n模範解答:\nfirst, *rest = input().split()\nprint(first, len(rest))',
    reference: 'first, *rest = input().split()\nprint(first, len(rest))',
    cases: [
      { input: '10 20 30 40\n', expected: '10 3', sample: true },
      { input: '5\n', expected: '5 0' },
      { input: '1 2\n', expected: '1 1' },
    ],
    tip: '💡 first, *rest = ... で先頭、*init, last = ... で末尾を取れる。a, *_ , c = ... も可。',
  },
])

// ===== lv080 もっと標準ライブラリ =====
const lv080 = build(80, 'lv080', [
  {
    title: '数字だけ抜き出す (re)',
    concept: '正規表現',
    tags: ['re', '正規表現', '標準ライブラリ'],
    statement: '文字列から数字だけを取り出して連結して出力してください。数字が無ければ空行を出力。\n\n入力例:\na1b2c3\n\n出力例:\n123',
    starter: 'import re\ns = input()\n',
    hints: ['import re。', 're.findall(r"\\d", s) は数字を全部集めたリスト。', '答え:\nimport re\nprint("".join(re.findall(r"\\d", input())))'],
    explanation: 'reは正規表現モジュール。\\d は数字1文字、findall は全一致をリストで返す。\n\n模範解答:\nimport re\ns = input()\nprint("".join(re.findall(r"\\d", s)))',
    reference: 'import re\ns = input()\nprint("".join(re.findall(r"\\d", s)))',
    cases: [
      { input: 'a1b2c3\n', expected: '123', sample: true },
      { input: 'abc\n', expected: '' },
      { input: 'phone 090-1234\n', expected: '0901234' },
    ],
    tip: '💡 正規表現は「文字列のパターン検索」。\\d+ で数字の並び、re.sub で置換、re.match で先頭一致。',
  },
  {
    title: '曜日を求める (datetime)',
    concept: '日付',
    tags: ['datetime', '標準ライブラリ'],
    statement: '年 月 日 が空白区切りで与えられます。その日の曜日番号(月曜=0 〜 日曜=6)を出力してください。\n\n入力例:\n2024 1 1\n\n出力例:\n0',
    starter: 'import datetime\ny, m, d = map(int, input().split())\n',
    hints: ['import datetime。', 'datetime.date(y, m, d).weekday() が曜日番号。', '答え:\nimport datetime\ny, m, d = map(int, input().split())\nprint(datetime.date(y, m, d).weekday())'],
    explanation: 'datetime.date で日付オブジェクトを作り、.weekday() で曜日(月曜=0)が得られる。\n\n模範解答:\nimport datetime\ny, m, d = map(int, input().split())\nprint(datetime.date(y, m, d).weekday())',
    reference: 'import datetime\ny, m, d = map(int, input().split())\nprint(datetime.date(y, m, d).weekday())',
    cases: [
      { input: '2024 1 1\n', expected: '0', sample: true },
      { input: '2000 1 1\n', expected: '5' },
      { input: '2025 1 1\n', expected: '2' },
    ],
    tip: '💡 datetime は日付計算の定番。date(a) - date(b) で日数差、.strftime() で書式化もできる。',
  },
  {
    title: '小さい順に k 個 (heapq)',
    concept: 'ヒープ',
    tags: ['heapq', '標準ライブラリ'],
    statement: '1行目に整数列、2行目に整数 k。小さい方から k 個を昇順で空白区切りで出力してください。\n\n入力例:\n5 3 8 1 9\n3\n\n出力例:\n1 3 5',
    starter: 'import heapq\na = list(map(int, input().split()))\nk = int(input())\n',
    hints: ['import heapq。', 'heapq.nsmallest(k, a) で小さい順 k 個。', '答え:\nimport heapq\nprint(" ".join(map(str, heapq.nsmallest(k, a))))'],
    explanation: 'heapq はヒープ(優先度付きキュー)。nsmallest/nlargest で上位 k 件を効率よく取れる。\n\n模範解答:\nimport heapq\na = list(map(int, input().split()))\nk = int(input())\nprint(" ".join(map(str, heapq.nsmallest(k, a))))',
    reference: 'import heapq\na = list(map(int, input().split()))\nk = int(input())\nprint(" ".join(map(str, heapq.nsmallest(k, a))))',
    cases: [
      { input: '5 3 8 1 9\n3\n', expected: '1 3 5', sample: true },
      { input: '10\n1\n', expected: '10' },
      { input: '4 4 4\n2\n', expected: '4 4' },
    ],
    tip: '💡 heapq.heappush/heappop で最小値を O(log N) で出し入れ。ダイクストラ法などで必須。',
  },
])

// ===== lv210 ジェネレータと with =====
const lv210 = build(210, 'lv210', [
  {
    title: 'ジェネレータ (yield)',
    concept: 'ジェネレータ',
    tags: ['ジェネレータ', 'yield'],
    statement: '1からNまでを1つずつ生み出すジェネレータ gen(n) を yield で定義し、空白区切りで出力してください。\n\n入力例:\n5\n\n出力例:\n1 2 3 4 5',
    starter: 'def gen(n):\n    # yield を使う\n    pass\n',
    hints: ['return ではなく yield で値を1つずつ返すと「ジェネレータ」になります。', 'for ループ内で yield i。', '答え:\ndef gen(n):\n    for i in range(1, n + 1):\n        yield i\nprint(" ".join(map(str, gen(int(input())))))'],
    explanation: 'yield を含む関数はジェネレータ。値を「必要なときに1つずつ」生み出すので省メモリ。\n\n模範解答:\ndef gen(n):\n    for i in range(1, n + 1):\n        yield i\n\nprint(" ".join(map(str, gen(int(input())))))',
    reference: 'def gen(n):\n    for i in range(1, n + 1):\n        yield i\n\nprint(" ".join(map(str, gen(int(input())))))',
    cases: [
      { input: '5\n', expected: '1 2 3 4 5', sample: true },
      { input: '1\n', expected: '1' },
      { input: '3\n', expected: '1 2 3' },
    ],
    tip: '💡 ジェネレータは全要素をメモリに持たず1つずつ作る。巨大な列や無限列も扱える。',
  },
  {
    title: 'with でリソース管理',
    concept: 'with文',
    tags: ['with'],
    statement: '入力した文字列を大文字にして出力してください。ただし io.StringIO を with 文で使ってください。\n\n入力例:\nhello\n\n出力例:\nHELLO',
    starter: 'import io\ntext = input()\n',
    hints: ['with ... as 変数: でブロックを抜けると自動で後始末されます。', 'with io.StringIO() as buf: の中で buf.write して getvalue。', '答え:\nwith io.StringIO() as buf:\n    buf.write(text.upper())\n    print(buf.getvalue())'],
    explanation: 'with はコンテキストマネージャ。ブロックを抜けると自動で close などの後始末をしてくれる。\n\n模範解答:\nimport io\ntext = input()\nwith io.StringIO() as buf:\n    buf.write(text.upper())\n    print(buf.getvalue())',
    reference: 'import io\ntext = input()\nwith io.StringIO() as buf:\n    buf.write(text.upper())\n    print(buf.getvalue())',
    cases: [
      { input: 'hello\n', expected: 'HELLO', sample: true },
      { input: 'abc def\n', expected: 'ABC DEF' },
    ],
    tip: '💡 with open("file") as f: が定番。close 忘れを防げる。ファイル・ロック・DB接続などに使う。',
  },
])

// ===== lv600 グラフ探索 =====
const lv600 = build(600, 'lv600', [
  {
    title: '到達できる頂点数 (BFS)',
    concept: 'グラフ探索',
    tags: ['グラフ', 'BFS', 'アルゴリズム'],
    statement: 'N 頂点 M 辺の無向グラフ。1行目に N M、続く M 行に辺 "a b"（0始まりの頂点番号）。頂点0から到達できる頂点の数（0を含む）を出力してください。\n\n入力例:\n4 2\n0 1\n2 3\n\n出力例:\n2',
    starter: 'from collections import deque\nn, m = map(int, input().split())\ng = [[] for _ in range(n)]\n',
    hints: ['隣接リスト g[v] = v に繋がる頂点のリスト、を作る。', 'deque のキューで幅優先探索(BFS)。訪問済みフラグを持つ。', '答え:\nq = deque([0])\nvisited[0] = True\nwhile q:\n    v = q.popleft()\n    for u in g[v]:\n        if not visited[u]:\n            visited[u] = True\n            q.append(u)'],
    explanation: 'BFS は「近い頂点から順に」探索。キュー(deque)と訪問済み配列で実装する。\n\n模範解答:\nfrom collections import deque\nn, m = map(int, input().split())\ng = [[] for _ in range(n)]\nfor _ in range(m):\n    a, b = map(int, input().split())\n    g[a].append(b)\n    g[b].append(a)\nvisited = [False] * n  # 訪問済みフラグ\nq = deque([0])\nvisited[0] = True\nwhile q:\n    v = q.popleft()\n    for u in g[v]:\n        if not visited[u]:\n            visited[u] = True\n            q.append(u)\nprint(sum(visited))',
    reference: 'from collections import deque\nn, m = map(int, input().split())\ng = [[] for _ in range(n)]\nfor _ in range(m):\n    a, b = map(int, input().split())\n    g[a].append(b)\n    g[b].append(a)\nvisited = [False] * n  # 訪問済みフラグ\nq = deque([0])\nvisited[0] = True\nwhile q:\n    v = q.popleft()\n    for u in g[v]:\n        if not visited[u]:\n            visited[u] = True\n            q.append(u)\nprint(sum(visited))',
    cases: [
      { input: '4 2\n0 1\n2 3\n', expected: '2', sample: true },
      { input: '3 3\n0 1\n1 2\n0 2\n', expected: '3' },
      { input: '1 0\n', expected: '1' },
    ],
    tip: '💡 BFS は deque で「近い順」に探索し最短経路や連結成分に使う。DFS は再帰やスタックで「深く」探索。',
  },
])

export const gapProblems: Problem[] = [...extensions, ...lv011, ...lv080, ...lv210, ...lv600]
