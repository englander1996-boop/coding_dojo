// 生成タスク 第2波。すべて「別の計算」(オリジナル)。1タスク=1問。
// ①②③の数値違い量産はしない（=水増しにしない）。ins は同じ問題の隠しテストケース。

const TASKS = []
const t = (obj) => TASKS.push(obj)

// ---- 2つの整数リスト（2行）に対する集合演算 (lv13) ----
const TWOLISTS = ['1 2 3 4\n2 4 6 8\n', '5 5 6\n6 7\n', '1 2 3\n1 2 3\n', '10 20\n20 30 40\n', '1 3 5 7\n2 4 6\n', '9 8 7\n7 8 9 10\n']
const SETFUN = [
  { title: '共通要素の個数', ref: 'a=set(input().split())\nb=set(input().split())\nprint(len(a&b))', h1: 'set 同士の & が積集合。', h2: 'len で個数。', tip: '💡 集合の & 積、| 和、- 差、^ 対称差。' },
  { title: '和集合の要素数', ref: 'a=set(input().split())\nb=set(input().split())\nprint(len(a|b))', h1: '| が和集合。', h2: '重複は1回。' },
  { title: 'aにだけある要素数', ref: 'a=set(input().split())\nb=set(input().split())\nprint(len(a-b))', h1: '- が差集合。', h2: 'a から b を引く。' },
  { title: '対称差の要素数', ref: 'a=set(input().split())\nb=set(input().split())\nprint(len(a^b))', h1: '^ が対称差。', h2: 'どちらか一方だけ。' },
  { title: 'aはbの部分集合か', ref: 'a=set(input().split())\nb=set(input().split())\nprint("yes" if a<=b else "no")', h1: '<= で部分集合判定。', h2: 'a の全要素が b に。' },
  { title: '共通要素を昇順で', ref: 'a=set(map(int,input().split()))\nb=set(map(int,input().split()))\nprint(*sorted(a&b))', h1: '積集合をソート。', h2: 'print(*...)。' },
]
for (const f of SETFUN) t({ lv: 13, concept: '集合演算: ' + f.title, title: f.title, tags: ['set', '集合'], io: '1行目と2行目に、それぞれ空白区切りの整数列が与えられます。', ask: `${f.title}を出力してください。`, h1: f.h1, h2: f.h2, ref: f.ref, ins: TWOLISTS, tip: f.tip })

// ---- リスト→リスト変換（出力も列） (lv30) ----
const LISTS = ['3 1 4 1 5\n', '2 7 1 8 2\n', '10 20 30\n', '5 4 3 2 1\n', '1 2 3 4 5\n', '9 1 2 8 3\n']
const TRANSFUN = [
  { title: '累積和の列', ref: 'from itertools import accumulate\na=list(map(int,input().split()))\nprint(*accumulate(a))', h1: 'itertools.accumulate。', h2: '先頭からの和の列。', tip: '💡 accumulate は累積和(既定)や任意の累積演算。' },
  { title: '隣接要素の差の列', ref: 'a=list(map(int,input().split()))\nprint(*[a[i+1]-a[i] for i in range(len(a)-1)])', h1: '次−今 の列。', h2: '長さは1短い。' },
  { title: 'ここまでの最大の列', ref: 'a=list(map(int,input().split()))\nm=a[0]\nr=[]\nfor x in a:\n    m=max(m,x)\n    r.append(m)\nprint(*r)', h1: 'running max。', h2: '更新しながら記録。' },
  { title: '各要素の符号', ref: 'a=list(map(int,input().split()))\nprint(*[(x>0)-(x<0) for x in a])', h1: '正なら1,負なら-1,0は0。', h2: '(x>0)-(x<0)。' },
  { title: '順序を保って重複除去', ref: 'a=input().split()\nprint(*dict.fromkeys(a))', h1: 'dict.fromkeys は順序維持。', h2: '初出のみ残る。', tip: '💡 dict.fromkeys(seq) で順序を保った重複除去。' },
  { title: '各要素を2乗', ref: 'a=list(map(int,input().split()))\nprint(*[x*x for x in a])', h1: '内包表記で2乗。', h2: 'x*x。' },
  { title: '偶数だけ抜き出す', ref: 'a=list(map(int,input().split()))\nprint(*[x for x in a if x%2==0])', h1: '条件付き内包。', h2: '%2==0。' },
  { title: '逆順の列', ref: 'a=list(map(int,input().split()))\nprint(*a[::-1])', h1: '[::-1]。', h2: '反転。' },
]
for (const f of TRANSFUN) t({ lv: 30, concept: 'リスト変換: ' + f.title, title: f.title, tags: ['list', '内包表記'], io: '空白区切りの整数列が1行で与えられます。', ask: `${f.title}を空白区切りで出力してください。`, h1: f.h1, h2: f.h2, ref: f.ref, ins: LISTS, tip: f.tip })

// ---- 2点・3点の幾何 (lv70) ----
const PTS2 = ['0 0 3 4\n', '1 1 4 5\n', '2 3 2 3\n', '0 0 1 1\n', '5 5 1 2\n', '10 0 0 10\n']
const PTS3 = ['0 0 4 0 0 3\n', '0 0 2 0 0 2\n', '1 1 5 1 1 4\n', '0 0 6 0 3 4\n', '2 2 2 5 5 2\n', '0 0 10 0 0 10\n']
t({ lv: 70, concept: '幾何: マンハッタン距離', title: 'マンハッタン距離', tags: ['幾何', '算術演算子'], io: '2点の座標 x1 y1 x2 y2 が空白区切りで与えられます。', ask: '2点のマンハッタン距離 |x1-x2|+|y1-y2| を出力してください。', h1: '各軸の差の絶対値の和。', h2: 'abs を使う。', ref: 'x1,y1,x2,y2=map(int,input().split())\nprint(abs(x1-x2)+abs(y1-y2))', ins: PTS2 })
t({ lv: 70, concept: '幾何: チェビシェフ距離', title: 'チェビシェフ距離', tags: ['幾何'], io: '2点の座標 x1 y1 x2 y2 が空白区切りで与えられます。', ask: 'チェビシェフ距離 max(|x1-x2|,|y1-y2|) を出力してください。', h1: '各軸差の絶対値の最大。', h2: 'max(abs,abs)。', ref: 'x1,y1,x2,y2=map(int,input().split())\nprint(max(abs(x1-x2),abs(y1-y2)))', ins: PTS2 })
t({ lv: 70, concept: '幾何: 距離の2乗', title: 'ユークリッド距離の2乗', tags: ['幾何'], io: '2点の座標 x1 y1 x2 y2 が空白区切りで与えられます。', ask: '2点間のユークリッド距離の2乗 (整数) を出力してください。', h1: '差の2乗の和。', h2: 'sqrt は取らない。', ref: 'x1,y1,x2,y2=map(int,input().split())\nprint((x1-x2)**2+(y1-y2)**2)', ins: PTS2 })
t({ lv: 70, concept: '幾何: 三角形の面積2倍', title: '三角形の面積×2', tags: ['幾何'], io: '三角形の3頂点 x1 y1 x2 y2 x3 y3 が空白区切りで与えられます。', ask: '面積の2倍 (整数) を出力してください。', h1: '外積(シューレース)の絶対値。', h2: '|x1(y2-y3)+x2(y3-y1)+x3(y1-y2)|。', ref: 'x1,y1,x2,y2,x3,y3=map(int,input().split())\nprint(abs(x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2)))', ins: PTS3, tip: '💡 シューレース公式で多角形の面積が出る。' })

// ---- 組合せ・数論 (lv130) ----
const NR = ['5 2\n', '10 3\n', '6 0\n', '7 7\n', '8 4\n', '9 1\n']
t({ lv: 130, concept: '組合せ: nCr', title: '二項係数 nCr', tags: ['組合せ', '数論'], io: '整数 n r が空白区切りで与えられます (0<=r<=n)。', ask: '組合せの数 nCr を出力してください。', h1: 'math.comb。', h2: '標準ライブラリ。', ref: 'import math\nn,r=map(int,input().split())\nprint(math.comb(n,r))', ins: NR, tip: '💡 math.comb(n,r)/math.perm(n,r) で組合せ・順列。' })
t({ lv: 130, concept: '組合せ: nPr', title: '順列の数 nPr', tags: ['組合せ', '数論'], io: '整数 n r が空白区切りで与えられます (0<=r<=n)。', ask: '順列の数 nPr を出力してください。', h1: 'math.perm。', h2: 'n!/(n-r)!。', ref: 'import math\nn,r=map(int,input().split())\nprint(math.perm(n,r))', ins: NR })
const NN = ['12\n', '10\n', '7\n', '36\n', '1\n', '60\n']
t({ lv: 130, concept: '数論: 最大の素因数', title: '最大の素因数', tags: ['素数', '数論'], io: '2以上の整数 n が与えられます。', ask: '最大の素因数を出力してください。', h1: '小さい素因数で割り続ける。', h2: '残りが最大の素因数。', ref: 'n=int(input())\nd=2\nlast=n\nwhile d*d<=n:\n    while n%d==0:\n        last=d\n        n//=d\n    d+=1\nif n>1:\n    last=n\nprint(last)', ins: NN })
t({ lv: 130, concept: '数論: 素因数の種類数', title: '異なる素因数の個数', tags: ['素数', '数論'], io: '2以上の整数 n が与えられます。', ask: '異なる素因数の個数を出力してください。', h1: '割れる素因数の種類を数える。', h2: '集合に入れる。', ref: 'n=int(input())\nc=0\nd=2\nwhile d*d<=n:\n    if n%d==0:\n        c+=1\n        while n%d==0:\n            n//=d\n    d+=1\nif n>1:\n    c+=1\nprint(c)', ins: NN })
t({ lv: 130, concept: '数論: オイラーのφ', title: 'オイラーのφ関数', tags: ['素数', '数論'], io: '1以上の整数 n が与えられます。', ask: 'n 以下で n と互いに素な数の個数 φ(n) を出力してください。', h1: '素因数ごとに (1-1/p) を掛ける。', h2: '結果は整数。', ref: 'n=int(input())\nres=n\nm=n\nd=2\nwhile d*d<=m:\n    if m%d==0:\n        while m%d==0:\n            m//=d\n        res-=res//d\n    d+=1\nif m>1:\n    res-=res//m\nprint(res)', ins: NN, tip: '💡 φ(n) は素因数分解から積で求まる。' })

// ---- 文字列の解析 (lv45) ----
const SENT = ['the quick brown fox\n', 'hello world\n', 'a bb ccc dddd\n', 'one two three\n', 'I love python\n', 'sum of words\n']
t({ lv: 45, concept: '文字列: 単語を逆順に', title: '単語の並びを逆順に', tags: ['文字列', 'split'], io: '空白区切りの単語からなる1行が与えられます。', ask: '単語の並びを逆順にして空白区切りで出力してください。', h1: 'split して reversed。', h2: "' '.join。", ref: "s=input()\nprint(' '.join(reversed(s.split())))", ins: SENT })
t({ lv: 45, concept: '文字列: 頭文字をつなぐ', title: '頭文字の連結 (頭字語)', tags: ['文字列', 'split'], io: '空白区切りの単語からなる1行が与えられます。', ask: '各単語の先頭文字を大文字でつないで出力してください。', h1: '各単語 w[0]。', h2: '連結して upper。', ref: "s=input()\nprint(''.join(w[0] for w in s.split()).upper())", ins: SENT })
t({ lv: 45, concept: '文字列: 最長単語の長さ', title: '最長の単語の長さ', tags: ['文字列', 'split'], io: '空白区切りの単語からなる1行が与えられます。', ask: '最も長い単語の文字数を出力してください。', h1: 'split して len の最大。', h2: 'max(len(w) ...)。', ref: 's=input()\nprint(max(len(w) for w in s.split()))', ins: SENT })
t({ lv: 45, concept: '文字列: 各単語の文字数', title: '各単語の長さ', tags: ['文字列', 'split'], io: '空白区切りの単語からなる1行が与えられます。', ask: '各単語の文字数を空白区切りで出力してください。', h1: '単語ごとに len。', h2: 'print(*...)。', ref: 's=input()\nprint(*[len(w) for w in s.split()])', ins: SENT })
const CAES = ['abc\n', 'xyz\n', 'hello\n', 'zzz\n', 'python\n', 'abcxyz\n']
t({ lv: 45, concept: '文字列: シーザー暗号', title: 'シーザー暗号 (+3)', tags: ['文字列'], io: '英小文字の文字列 s が1行で与えられます。', ask: '各文字をアルファベット順に3つ後ろへずらして出力してください (z は a に戻る)。', h1: 'ord で番号化、+3 して 26 で剰余。', h2: 'chr で文字へ戻す。', ref: "s=input()\nprint(''.join(chr((ord(c)-97+3)%26+97) for c in s))", ins: CAES, tip: '💡 (ord(c)-97+k)%26+97 で巡回シフト。' })

// ---- 2文字列 (lv13/45) ----
const TWOSTR = ['listen\nsilent\n', 'abc\nabd\n', 'aabb\nbbaa\n', 'hello\nworld\n', 'evil\nvile\n', 'a\na\n']
t({ lv: 13, concept: '文字列: アナグラム判定', title: 'アナグラムか', tags: ['文字列', 'set'], io: '2つの文字列が各行で与えられます。', ask: '2つが互いのアナグラム (並べ替えで一致) なら yes、違えば no を出力してください。', h1: 'ソートして比較。', h2: 'sorted(a)==sorted(b)。', ref: 'a=input()\nb=input()\nprint("yes" if sorted(a)==sorted(b) else "no")', ins: TWOSTR })

// ---- 数列 (lv7) ----
const TERM = ['2 3 5\n', '1 1 10\n', '0 2 4\n', '5 5 1\n', '10 -2 6\n', '3 0 100\n']
t({ lv: 7, concept: '数列: 等差数列の第n項', title: '等差数列の第n項', tags: ['算術演算子'], io: '初項 a、公差 d、項番号 n が空白区切りで与えられます (n>=1)。', ask: '第 n 項を出力してください。', h1: 'a + (n-1)*d。', h2: '1始まりに注意。', ref: 'a,d,n=map(int,input().split())\nprint(a+(n-1)*d)', ins: TERM })
t({ lv: 7, concept: '数列: 等差数列の和', title: '等差数列の和', tags: ['算術演算子'], io: '初項 a、公差 d、項数 n が空白区切りで与えられます (n>=1)。', ask: '初項から第 n 項までの和を出力してください。', h1: '末項 = a+(n-1)d。', h2: 'n*(初項+末項)//2。', ref: 'a,d,n=map(int,input().split())\nlast=a+(n-1)*d\nprint(n*(a+last)//2)', ins: TERM })

export const CATALOG = TASKS
