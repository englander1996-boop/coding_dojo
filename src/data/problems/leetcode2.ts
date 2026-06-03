import type { Problem } from '../../types'
import { build } from './_build.ts'

/** LeetCode 頻出パターン2（Fast&Slow / 区間マージ / 単調スタック）。 */
const lv170 = build(170, 'lv170', [
  {
    title: '循環検出（Fast & Slow ポインタ）',
    concept: '頻出パターン2',
    tags: ['循環検出', '二点ポインタ', 'アルゴリズム'],
    statement:
      '連結リストを配列で表します。1行目に N、2行目に next 配列（next[i] = 次ノード番号、終端は -1）。ノード0から辿って循環があれば yes、なければ no を出力してください。\n\n入力例:\n4\n1 2 3 1\n\n出力例:\nyes',
    starter: 'n = int(input())\nnxt = list(map(int, input().split()))\n',
    hints: [
      '遅い(1歩)と速い(2歩)の2つのポインタを進める。', '循環があれば必ず速い方が遅い方に追いつく。',
      '答え:\nslow = fast = 0\nans = "no"\nwhile fast != -1 and nxt[fast] != -1:\n    slow = nxt[slow]\n    fast = nxt[nxt[fast]]\n    if slow == fast:\n        ans = "yes"\n        break\nprint(ans)',
    ],
    explanation: 'Floyd の循環検出。速さの違う2ポインタが出会えば循環。出会わず終端(-1)に着けば循環なし。\n\n模範解答:\nn = int(input())\nnxt = list(map(int, input().split()))\nslow = fast = 0\nans = "no"\nwhile fast != -1 and nxt[fast] != -1:\n    slow = nxt[slow]\n    fast = nxt[nxt[fast]]\n    if slow == fast:\n        ans = "yes"\n        break\nprint(ans)',
    reference: 'n = int(input())\nnxt = list(map(int, input().split()))\nslow = fast = 0\nans = "no"\nwhile fast != -1 and nxt[fast] != -1:\n    slow = nxt[slow]\n    fast = nxt[nxt[fast]]\n    if slow == fast:\n        ans = "yes"\n        break\nprint(ans)',
    cases: [
      { input: '4\n1 2 3 1\n', expected: 'yes', sample: true },
      { input: '4\n1 2 3 -1\n', expected: 'no' },
      { input: '3\n1 2 0\n', expected: 'yes' },
      { input: '1\n-1\n', expected: 'no' },
    ],
    tip: '💡 Fast & Slow は循環検出・中央ノード・循環の開始点に使える定番。O(1)メモリ。',
  },
  {
    title: '区間のマージ',
    concept: '頻出パターン2',
    tags: ['区間', 'ソート', 'アルゴリズム'],
    statement:
      '1行目に区間数 N、続く N 行に「左 右」。重なる区間をすべてマージした後の区間の個数を出力してください。\n\n入力例:\n3\n1 3\n2 6\n8 10\n\n出力例:\n2',
    starter: 'n = int(input())\niv = sorted(tuple(map(int, input().split())) for _ in range(n))\n',
    hints: ['左端でソートしてから順に見る。', '直前の区間の右端以下なら重なり→右端を更新、そうでなければ新区間。', '答え:\nmerged = []\nfor l, r in iv:\n    if merged and l <= merged[-1][1]:\n        merged[-1] = (merged[-1][0], max(merged[-1][1], r))\n    else:\n        merged.append((l, r))\nprint(len(merged))'],
    explanation: 'ソートしてから貪欲にマージ。重なり判定は「次の左端 ≤ 今の右端」。\n\n模範解答:\nn = int(input())\niv = sorted(tuple(map(int, input().split())) for _ in range(n))\nmerged = []\nfor l, r in iv:\n    if merged and l <= merged[-1][1]:\n        merged[-1] = (merged[-1][0], max(merged[-1][1], r))\n    else:\n        merged.append((l, r))\nprint(len(merged))',
    reference: 'n = int(input())\niv = sorted(tuple(map(int, input().split())) for _ in range(n))\nmerged = []\nfor l, r in iv:\n    if merged and l <= merged[-1][1]:\n        merged[-1] = (merged[-1][0], max(merged[-1][1], r))\n    else:\n        merged.append((l, r))\nprint(len(merged))',
    cases: [
      { input: '3\n1 3\n2 6\n8 10\n', expected: '2', sample: true },
      { input: '1\n0 5\n', expected: '1' },
      { input: '3\n1 2\n3 4\n5 6\n', expected: '3' },
      { input: '2\n1 5\n2 3\n', expected: '1' },
    ],
    tip: '💡 区間スケジューリング・会議室・カレンダーなど「区間」問題はまずソート。',
  },
  {
    title: '次に大きい要素（単調スタック）',
    concept: '頻出パターン2',
    tags: ['単調スタック', 'スタック', 'アルゴリズム'],
    statement:
      '整数列が与えられます。各要素について「右側で最初に自分より大きい要素の値」を、無ければ -1 を、空白区切りで出力してください。\n\n入力例:\n2 1 3\n\n出力例:\n3 3 -1',
    starter: 'a = list(map(int, input().split()))\n',
    hints: ['スタックに「まだ答えが決まっていない要素の番号」を積む。', '今の要素がスタック先頭より大きければ、その答えが確定してpop。', '答え:\nst = []\nres = [-1] * len(a)\nfor i in range(len(a)):\n    while st and a[st[-1]] < a[i]:\n        res[st.pop()] = a[i]\n    st.append(i)\nprint(" ".join(map(str, res)))'],
    explanation: '単調スタックは O(N) で「次に大きい/小さい要素」を求める手法。確定したらpopしていく。\n\n模範解答:\na = list(map(int, input().split()))\nst = []\nres = [-1] * len(a)\nfor i in range(len(a)):\n    while st and a[st[-1]] < a[i]:\n        res[st.pop()] = a[i]\n    st.append(i)\nprint(" ".join(map(str, res)))',
    reference: 'a = list(map(int, input().split()))\nst = []\nres = [-1] * len(a)\nfor i in range(len(a)):\n    while st and a[st[-1]] < a[i]:\n        res[st.pop()] = a[i]\n    st.append(i)\nprint(" ".join(map(str, res)))',
    cases: [
      { input: '2 1 3\n', expected: '3 3 -1', sample: true },
      { input: '1 2 3 4\n', expected: '2 3 4 -1' },
      { input: '4 3 2 1\n', expected: '-1 -1 -1 -1' },
    ],
    tip: '💡 単調スタックはヒストグラム最大長方形・株価スパン・気温問題などで頻出。',
  },
])

export const leetcode2Problems: Problem[] = lv170
