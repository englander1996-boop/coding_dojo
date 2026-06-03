// 生成タスク 第3波。すべて別の計算(オリジナル)。1タスク=1問。
const TASKS = []
const t = (obj) => TASKS.push(obj)

// ---- ビット演算 (lv25) ----
const BITS = ['12 10\n', '7 3\n', '6 6\n', '15 1\n', '8 4\n', '5 9\n']
const BITFUN = [
  { title: 'ビット積 AND', ref: 'a,b=map(int,input().split())\nprint(a&b)', h1: '& がビットAND。', h2: '両方1のビット。' },
  { title: 'ビット和 OR', ref: 'a,b=map(int,input().split())\nprint(a|b)', h1: '| がビットOR。', h2: 'どちらか1。' },
  { title: 'ビット排他的論理和 XOR', ref: 'a,b=map(int,input().split())\nprint(a^b)', h1: '^ がXOR。', h2: '異なるビット。' },
  { title: '共通して立つビット数', ref: 'a,b=map(int,input().split())\nprint(bin(a&b).count("1"))', h1: 'a&b の1の数。', h2: 'popcount。' },
  { title: 'aだけに立つビット数', ref: 'a,b=map(int,input().split())\nprint(bin((a|b)^b).count("1"))', h1: 'a から共通を除く。', h2: '(a|b)^b。' },
  { title: '最下位の立つビットの値', ref: 'a,b=map(int,input().split())\nprint(a&(-a))', h1: 'a&(-a) で最下位ビット。', h2: '2の累乗になる。', tip: '💡 a&(-a) は最下位の立っているビットだけ取り出す常套句。' },
]
for (const f of BITFUN) t({ lv: 25, concept: 'ビット演算: ' + f.title, title: f.title, tags: ['ビット演算'], io: '2つの非負整数 a b が空白区切りで与えられます。', ask: `${f.title}を出力してください。`, h1: f.h1, h2: f.h2, ref: f.ref, ins: BITS, tip: f.tip })

// ---- 分類・条件 (lv6) ----
t({ lv: 6, concept: '分類: FizzBuzz単発', title: 'FizzBuzz (1つ)', tags: ['条件分岐'], io: '整数 n が与えられます。', ask: 'n が3の倍数なら Fizz、5の倍数なら Buzz、両方なら FizzBuzz、それ以外は n を出力してください。', h1: '15の倍数を先に判定。', h2: '条件式の連鎖。', ref: 'n=int(input())\nprint("FizzBuzz" if n%15==0 else "Fizz" if n%3==0 else "Buzz" if n%5==0 else n)', ins: ['3\n', '5\n', '15\n', '7\n', '30\n', '1\n'] })
t({ lv: 6, concept: '分類: 象限', title: '点の象限', tags: ['条件分岐', '比較'], io: '点の座標 x y が空白区切りで与えられます。', ask: '第1〜第4象限なら 1〜4、軸上なら 0 を出力してください。', h1: '符号の組合せで分ける。', h2: '軸上(0を含む)は0。', ref: 'x,y=map(int,input().split())\nif x>0 and y>0:\n    print(1)\nelif x<0 and y>0:\n    print(2)\nelif x<0 and y<0:\n    print(3)\nelif x>0 and y<0:\n    print(4)\nelse:\n    print(0)', ins: ['1 1\n', '-1 1\n', '-2 -3\n', '3 -4\n', '0 5\n', '5 0\n'] })
t({ lv: 6, concept: '分類: 三角形成立', title: '三角形が作れるか', tags: ['条件分岐', 'ソート'], io: '3辺の長さ a b c が空白区切りで与えられます。', ask: 'この3辺で三角形が作れるなら yes、作れないなら no を出力してください。', h1: '最大辺 < 他2辺の和。', h2: 'ソートして判定。', ref: 'a,b,c=sorted(map(int,input().split()))\nprint("yes" if a+b>c else "no")', ins: ['3 4 5\n', '1 1 5\n', '2 2 3\n', '10 1 1\n', '6 8 10\n', '5 5 5\n'] })
t({ lv: 6, concept: '分類: 世紀', title: '西暦から世紀', tags: ['算術演算子'], io: '西暦の年 y が与えられます。', ask: 'その年が何世紀かを出力してください (例: 2024 → 21)。', h1: '(y+99)//100。', h2: '切り上げ割り算。', ref: 'y=int(input())\nprint((y+99)//100)', ins: ['2024\n', '2000\n', '1\n', '100\n', '101\n', '1999\n'] })

// ---- 2次元グリッド (lv50) ----
const GRIDS = ['2 3\n1 2 3\n4 5 6\n', '2 2\n1 0\n0 1\n', '3 3\n1 2 3\n4 5 6\n7 8 9\n', '1 4\n5 5 5 5\n', '3 1\n2\n4\n6\n', '2 2\n9 8\n7 6\n']
t({ lv: 50, concept: 'グリッド: 総和', title: 'グリッドの総和', tags: ['2次元リスト', 'ループ'], io: '1行目に H W、続く H 行に W 個の整数が与えられます。', ask: 'すべての要素の合計を出力してください。', h1: '各行を読んで足す。', h2: '行の和の総和。', ref: 'h,w=map(int,input().split())\nprint(sum(sum(map(int,input().split())) for _ in range(h)))', ins: GRIDS })
t({ lv: 50, concept: 'グリッド: 最大', title: 'グリッドの最大値', tags: ['2次元リスト', 'ループ'], io: '1行目に H W、続く H 行に W 個の整数が与えられます。', ask: '最大の要素を出力してください。', h1: '行ごとの最大の最大。', h2: 'max を更新。', ref: 'h,w=map(int,input().split())\nm=None\nfor _ in range(h):\n    row=list(map(int,input().split()))\n    m=max(row) if m is None else max(m,max(row))\nprint(m)', ins: GRIDS })
t({ lv: 50, concept: 'グリッド: 行の和', title: '各行の和', tags: ['2次元リスト', 'ループ'], io: '1行目に H W、続く H 行に W 個の整数が与えられます。', ask: '各行の和を1行ずつ出力してください。', h1: '行ごとに sum。', h2: 'H 行出力。', ref: 'h,w=map(int,input().split())\nfor _ in range(h):\n    print(sum(map(int,input().split())))', ins: GRIDS })
t({ lv: 50, concept: 'グリッド: 対角和', title: '対角成分の和', tags: ['2次元リスト'], io: '1行目に H W、続く H 行に W 個の整数が与えられます。', ask: '左上から右下への対角成分 (i,i) の和を出力してください。', h1: 'g[i][i] を i=0..min(H,W)-1 で。', h2: '正方でなくても短い方まで。', ref: 'h,w=map(int,input().split())\ng=[list(map(int,input().split())) for _ in range(h)]\nprint(sum(g[i][i] for i in range(min(h,w))))', ins: GRIDS })
t({ lv: 50, concept: 'グリッド: 転置', title: 'グリッドの転置', tags: ['2次元リスト', 'zip'], io: '1行目に H W、続く H 行に W 個の整数が与えられます。', ask: '行と列を入れ替えた (転置した) グリッドを出力してください。', h1: 'zip(*g) で列を取り出せる。', h2: '各列を1行に。', ref: 'h,w=map(int,input().split())\ng=[list(map(int,input().split())) for _ in range(h)]\nfor col in zip(*g):\n    print(*col)', ins: GRIDS, tip: '💡 zip(*行列) で行列の転置ができる。' })

// ---- 日付 (lv80) ----
const DATES = ['2024 1 1\n', '2000 12 31\n', '2024 2 29\n', '1999 7 15\n', '2025 6 1\n', '2024 12 25\n']
t({ lv: 80, concept: '日付: 曜日', title: '曜日を求める', tags: ['datetime'], io: '年 月 日 が空白区切りで与えられます。', ask: 'その日の曜日 (Monday〜Sunday) を英語で出力してください。', h1: 'datetime.date(y,m,d).weekday()。', h2: '0=Monday。名前は配列で。', ref: 'import datetime\nnames=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]\ny,m,d=map(int,input().split())\nprint(names[datetime.date(y,m,d).weekday()])', ins: DATES, tip: '💡 datetime.date(...).weekday() は月曜=0。' })
t({ lv: 80, concept: '日付: 通算日', title: 'その年の通算日', tags: ['datetime'], io: '年 月 日 が空白区切りで与えられます。', ask: 'その年の1月1日から数えて何日目かを出力してください。', h1: 'timetuple().tm_yday。', h2: '1月1日は1。', ref: 'import datetime\ny,m,d=map(int,input().split())\nprint(datetime.date(y,m,d).timetuple().tm_yday)', ins: DATES })
const DATE2 = ['2024 1 1 2024 1 31\n', '2000 1 1 2000 12 31\n', '2024 2 28 2024 3 1\n', '2023 1 1 2024 1 1\n', '2025 6 1 2025 6 1\n', '2024 12 31 2025 1 1\n']
t({ lv: 80, concept: '日付: 日数差', title: '2つの日付の差', tags: ['datetime'], io: '2つの日付 y1 m1 d1 y2 m2 d2 が空白区切りで与えられます。', ask: '2つの日付の間の日数 (絶対値) を出力してください。', h1: 'date 同士の引き算は timedelta。', h2: '.days を取る。', ref: 'import datetime\nv=list(map(int,input().split()))\na=datetime.date(v[0],v[1],v[2])\nb=datetime.date(v[3],v[4],v[5])\nprint(abs((b-a).days))', ins: DATE2 })

// ---- 頻度・組合せ (lv60/70) ----
const SENT = ['a b a c\n', 'one two two three three three\n', 'x\n', 'pen pen apple\n', 'red green blue\n', 'a a a b b\n']
t({ lv: 60, concept: '頻度: 最頻単語', title: '最も多い単語', tags: ['collections', 'Counter'], io: '空白区切りの単語からなる1行が与えられます。', ask: '最も多く現れる単語を出力してください (同数なら先に最大回数に達したもの)。', h1: 'Counter で数える。', h2: 'most_common(1)。', ref: 'from collections import Counter\nprint(Counter(input().split()).most_common(1)[0][0])', ins: SENT })
t({ lv: 13, concept: '判定: 全文字が異なるか', title: '全文字が異なるか', tags: ['set'], io: '1行の文字列 s が与えられます。', ask: 'すべての文字が異なれば yes、重複があれば no を出力してください。', h1: 'set の長さと比較。', h2: '等しければ全部ユニーク。', ref: 's=input()\nprint("yes" if len(set(s))==len(s) else "no")', ins: ['abc\n', 'aab\n', 'python\n', 'hello\n', 'xyz\n', 'aa\n'] })
const MS = ['aab\n', 'abc\n', 'aaa\n', 'aabb\n', 'abcd\n', 'aaab\n']
t({ lv: 70, concept: '組合せ: 異なる並べ替え数', title: '異なる並べ替えの総数', tags: ['組合せ', 'collections'], io: '英小文字の文字列 s が与えられます。', ask: 's の文字を並べ替えてできる異なる文字列の総数を出力してください。', h1: '全体の階乗を、各文字の重複の階乗で割る。', h2: '多重集合の順列。', ref: 'import math\nfrom collections import Counter\ns=input()\nd=math.factorial(len(s))\nfor v in Counter(s).values():\n    d//=math.factorial(v)\nprint(d)', ins: MS, tip: '💡 重複ありの並べ替え数 = n! / Π(各重複!)。' })
t({ lv: 25, concept: '組合せ: 部分集合の個数', title: '部分集合の個数', tags: ['ビットシフト', 'べき乗'], io: '要素数 n が与えられます。', ask: 'n 個の要素からなる集合の部分集合の総数 (2^n) を出力してください。', h1: '各要素を入れる/入れない。', h2: '2のn乗。', ref: 'n=int(input())\nprint(1<<n)', ins: ['3\n', '5\n', '0\n', '10\n', '1\n', '8\n'], tip: '💡 2^n は 1<<n と書ける(ビットシフト)。' })

export const CATALOG = TASKS
