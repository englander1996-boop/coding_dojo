// 生成元タスクのカタログ。各タスク = 1つの「別計算」(オリジナル)。
// generate.mjs が各タスクを最大3問のクラスタ(①②③)へ展開する。
//
// タスクの形:
//   { lv, concept, title, tags, io, ask, h1, h2, exp?, ref, ins[], tip?, starter? }
//   ref: stdin を読んで答えを print する Python。期待値は Python 実行で自動生成。
//   ins: 入力例の配列(>=3推奨)。3グループに分割され ①②③ になる。
//
// 注意: 出力はバージョン非依存に(整数/明示書式)。modulo/整数除算は負で挙動が違うので
//       入力は基本非負にする。

const TASKS = []
const t = (obj) => TASKS.push(obj)

// 汎用 input セット
const INTS = ['12\n', '7\n', '100\n', '1\n', '45\n', '36\n']
const DIGITY = ['1234\n', '9\n', '5050\n', '100\n', '98765\n', '40\n']
const SMALL = ['5\n', '6\n', '8\n', '10\n', '3\n', '12\n']
const LISTS = ['3 1 4 1 5\n', '2 7 1 8 2\n', '10 20 30\n', '5 5 5 5\n', '9 1 2 8 3 7\n', '100 1\n']
const STRS = ['hello\n', 'abcabc\n', 'banana\n', 'Programming\n', 'aAbBcC\n', 'racecar\n']
const WORDS = ['the quick brown fox\n', 'a b c d e\n', 'hello world\n', 'one two two three three three\n', 'x\n', 'pen pen apple\n']

// ============================================================
// Family 1: 単一整数 n に対する関数 f(n)
// ============================================================
const NUMFUN = [
  { key: 'digitsum', title: '各桁の和', ref: 'n=int(input())\nprint(sum(int(c) for c in str(n)))', h1: 'str(n) で各文字に分解できる。', h2: '各文字を int にして合計。', exp: '各桁を取り出して足す。', ins: DIGITY, tip: '💡 sum(int(c) for c in str(n)) で桁和が一発。' },
  { key: 'digitprod', title: '各桁の積', ref: 'n=int(input())\np=1\nfor c in str(n):\n    p*=int(c)\nprint(p)', h1: '各桁を順に掛ける。', h2: '初期値1で掛け込む。', exp: '桁の積は初期値1で *=。', ins: DIGITY },
  { key: 'numdigits', title: '桁数', ref: 'n=int(input())\nprint(len(str(n)))', h1: '文字列にすると長さ=桁数。', h2: 'len(str(n))。', exp: '桁数は len(str(n))。', ins: DIGITY },
  { key: 'maxdigit', title: '最大の桁', ref: 'n=int(input())\nprint(max(str(n)))', h1: '文字の大小は数字の大小と一致。', h2: 'max(str(n))。', exp: '文字のままでも大小比較できる。', ins: DIGITY },
  { key: 'mindigit', title: '最小の桁', ref: 'n=int(input())\nprint(min(str(n)))', h1: 'min(str(n))。', h2: '文字の最小=最小の数字。', exp: 'min で最小桁。', ins: DIGITY },
  { key: 'revnum', title: '数字を逆順に', ref: 'n=int(input())\nprint(int(str(n)[::-1]))', h1: '文字列スライス [::-1] で反転。', h2: 'int に戻すと先頭0が消える。', exp: 's[::-1] で反転、int で数値化。', ins: DIGITY, tip: '💡 s[::-1] は文字列・リストの逆順の定番。' },
  { key: 'ndiv', title: '約数の個数', ref: 'n=int(input())\nc=0\ni=1\nwhile i*i<=n:\n    if n%i==0:\n        c+=2 if i*i!=n else 1\n    i+=1\nprint(c)', h1: '√n まで調べればペアで数えられる。', h2: 'i と n//i が同じときは1個。', exp: '約数はペアで現れる。', ins: INTS },
  { key: 'sumdiv', title: '約数の和', ref: 'n=int(input())\ns=0\ni=1\nwhile i*i<=n:\n    if n%i==0:\n        s+=i\n        if i*i!=n:\n            s+=n//i\n    i+=1\nprint(s)', h1: '√n までで約数をペアで集める。', h2: 'i と n//i を足す(同じなら1回)。', exp: '約数の和も√nで。', ins: INTS },
  { key: 'isprime', title: '素数判定', ref: 'n=int(input())\nif n<2:\n    print("no")\nelse:\n    p=True\n    i=2\n    while i*i<=n:\n        if n%i==0:\n            p=False\n            break\n        i+=1\n    print("yes" if p else "no")', h1: '2〜√n で割り切れなければ素数。', h2: '1以下は素数でない。', exp: '√nまでの試し割り。', ins: INTS },
  { key: 'fact', title: '階乗', ref: 'n=int(input())\np=1\nfor i in range(2,n+1):\n    p*=i\nprint(p)', h1: '1〜n を掛ける。', h2: '初期値1。', exp: 'n! の反復計算。', ins: SMALL },
  { key: 'fib', title: 'フィボナッチ数', ref: 'n=int(input())\na,b=0,1\nfor _ in range(n):\n    a,b=b,a+b\nprint(a)', h1: '多重代入で2項を更新。', h2: 'a,b=b,a+b を n 回。', exp: '反復フィボナッチ。', ins: SMALL, tip: '💡 a,b=b,a+b は一時変数なしで2値更新できる。' },
  { key: 'popcount', title: '立っているビット数', ref: 'n=int(input())\nprint(bin(n).count("1"))', h1: 'bin(n) は2進文字列。', h2: '"1" の個数を数える。', exp: 'popcount は bin().count("1")。', ins: DIGITY, tip: '💡 bin(n).count("1") でビット数。' },
  { key: 'tobin', title: '2進数に変換', ref: 'n=int(input())\nprint(bin(n)[2:])', h1: 'bin(n) は "0b.." を返す。', h2: '先頭2文字を除く。', exp: 'bin(n)[2:] で2進表記。', ins: DIGITY },
  { key: 'tohex', title: '16進数に変換', ref: 'n=int(input())\nprint(format(n,"x"))', h1: 'format(n,"x") で16進。', h2: '小文字hex。', exp: 'format の書式 "x"。', ins: DIGITY, tip: '💡 format(n,"x"/"o"/"b") で16/8/2進。' },
  { key: 'tooct', title: '8進数に変換', ref: 'n=int(input())\nprint(format(n,"o"))', h1: 'format(n,"o")。', h2: '8進表記。', exp: '書式 "o"。', ins: DIGITY },
  { key: 'isqrt', title: '平方根の整数部', ref: 'import math\nn=int(input())\nprint(math.isqrt(n))', h1: 'math.isqrt は整数平方根。', h2: '誤差なく floor(√n)。', exp: 'math.isqrt は浮動小数を使わず正確。', ins: DIGITY, tip: '💡 math.isqrt は誤差ゼロの整数平方根。' },
  { key: 'issquare', title: '平方数か', ref: 'import math\nn=int(input())\nr=math.isqrt(n)\nprint("yes" if r*r==n else "no")', h1: 'isqrt して2乗が戻るか。', h2: 'r*r==n なら平方数。', exp: '整数平方根で平方数判定。', ins: ['16\n', '15\n', '100\n', '99\n', '1\n', '49\n'] },
  { key: 'ispow2', title: '2のべき乗か', ref: 'n=int(input())\nprint("yes" if n>0 and n&(n-1)==0 else "no")', h1: 'n と n-1 の AND が0。', h2: '2のべきはビットが1つだけ。', exp: 'n&(n-1)==0 が2のべきの判定。', ins: ['8\n', '6\n', '1\n', '1024\n', '0\n', '64\n'], tip: '💡 n&(n-1)==0 で2のべき乗を一瞬で判定。' },
  { key: 'collatz', title: 'コラッツの手数', ref: 'n=int(input())\nc=0\nwhile n!=1:\n    n=n//2 if n%2==0 else 3*n+1\n    c+=1\nprint(c)', h1: '偶数は半分、奇数は3倍+1。', h2: '1になるまでの回数。', exp: 'コラッツ操作の回数。', ins: ['6\n', '7\n', '27\n', '1\n', '11\n', '19\n'] },
  { key: 'digroot', title: '数字根', ref: 'n=int(input())\nprint(0 if n==0 else (n-1)%9+1)', h1: '各桁を足し続けた1桁の値。', h2: '(n-1)%9+1 で一発。', exp: '数字根の公式。', ins: DIGITY },
  { key: 'aliquot', title: '真の約数の和', ref: 'n=int(input())\ns=0\nfor i in range(1,n):\n    if n%i==0:\n        s+=i\nprint(s)', h1: 'n 自身を除く約数の和。', h2: '1〜n-1 で割り切れるもの。', exp: '真の約数(自分以外)の和。', ins: ['28\n', '12\n', '6\n', '10\n', '496\n', '1\n'] },
  { key: 'isperfect', title: '完全数か', ref: 'n=int(input())\ns=sum(i for i in range(1,n) if n%i==0)\nprint("yes" if s==n else "no")', h1: '真の約数の和が自分自身。', h2: '6,28,496 が例。', exp: '完全数=真の約数和が n。', ins: ['6\n', '28\n', '12\n', '496\n', '8\n', '1\n'] },
  { key: 'trailzero', title: '階乗の末尾の0の数', ref: 'n=int(input())\nc=0\nf=5\nwhile f<=n:\n    c+=n//f\n    f*=5\nprint(c)', h1: '末尾0は因数5の個数で決まる。', h2: 'n//5 + n//25 + ...', exp: '階乗の末尾0は5の倍数の寄与。', ins: ['10\n', '25\n', '5\n', '100\n', '3\n', '50\n'], tip: '💡 階乗の末尾0は「5が何回掛かるか」。' },
  { key: 'nextprime', title: '次の素数', ref: 'n=int(input())\ndef ip(x):\n    if x<2:return False\n    i=2\n    while i*i<=x:\n        if x%i==0:return False\n        i+=1\n    return True\nm=n+1\nwhile not ip(m):\n    m+=1\nprint(m)', h1: 'n+1 から素数判定を試す。', h2: '見つかるまで+1。', exp: 'n より大きい最小の素数。', ins: ['10\n', '7\n', '1\n', '20\n', '2\n', '13\n'] },
  { key: 'sigmacount', title: 'n以下の素数の個数', ref: 'n=int(input())\nif n<2:\n    print(0)\nelse:\n    sieve=[True]*(n+1)\n    sieve[0]=sieve[1]=False\n    i=2\n    while i*i<=n:\n        if sieve[i]:\n            for j in range(i*i,n+1,i):\n                sieve[j]=False\n        i+=1\n    print(sum(sieve))', h1: 'エラトステネスの篩。', h2: '篩った後 True を数える。', exp: '篩で素数の個数。', ins: ['10\n', '20\n', '2\n', '100\n', '1\n', '30\n'] },
]
for (const f of NUMFUN) {
  t({ lv: 7, concept: '整数関数: ' + f.title, title: f.title, tags: ['整数', 'ループ'], io: '1つの整数 n が与えられます。', ask: `${f.title}を求めて出力してください。`, h1: f.h1, h2: f.h2, exp: f.exp, ref: f.ref, ins: f.ins, tip: f.tip })
}

// ============================================================
// Family 2: 2整数 a b の演算
// ============================================================
const TWOPAIR = ['12 8\n', '7 3\n', '10 10\n', '100 7\n', '5 20\n', '9 6\n']
const TWO = [
  { title: '和', ref: 'a,b=map(int,input().split())\nprint(a+b)', h1: 'a+b。', h2: '足すだけ。' },
  { title: '差の絶対値', ref: 'a,b=map(int,input().split())\nprint(abs(a-b))', h1: 'abs で絶対値。', h2: '|a-b|。' },
  { title: '積', ref: 'a,b=map(int,input().split())\nprint(a*b)', h1: 'a*b。', h2: '掛ける。' },
  { title: '商と余り', ref: 'a,b=map(int,input().split())\nprint(a//b, a%b)', h1: '// と % を使う。', h2: '空白区切りで2値。' },
  { title: '大きい方', ref: 'a,b=map(int,input().split())\nprint(max(a,b))', h1: 'max(a,b)。', h2: '組み込み max。' },
  { title: '最大公約数', ref: 'import math\na,b=map(int,input().split())\nprint(math.gcd(a,b))', h1: 'math.gcd。', h2: '標準ライブラリ。' },
  { title: '最小公倍数', ref: 'import math\na,b=map(int,input().split())\nprint(math.lcm(a,b))', h1: 'math.lcm。', h2: 'a*b//gcd でも。' },
  { title: 'べき乗の余り', ref: 'a,b=map(int,input().split())\nprint(pow(a,b,1000000007))', h1: 'pow(a,b,M) で高速。', h2: '3引数 pow。' },
  { title: 'どちらが大きいか', ref: 'a,b=map(int,input().split())\nprint("a" if a>b else "b" if b>a else "eq")', h1: '3分岐。', h2: '条件式の連鎖。' },
  { title: '平均(小数2桁)', ref: 'a,b=map(int,input().split())\nprint(f"{(a+b)/2:.2f}")', h1: 'f-string の書式 .2f。', h2: '小数2桁固定。' },
  { title: 'a の b 乗', ref: 'a,b=map(int,input().split())\nprint(a**b)', h1: '** でべき乗。', h2: 'a**b。' },
]
for (const f of TWO) {
  t({ lv: 3, concept: '2数の演算: ' + f.title, title: f.title, tags: ['算術演算子', '多重代入'], io: '2つの整数 a b が空白区切りで与えられます。', ask: `${f.title}を出力してください。`, h1: f.h1, h2: f.h2, ref: f.ref, ins: TWOPAIR })
}

// ============================================================
// Family 3: 整数リストの集計 g(list)
// ============================================================
const LISTFUN = [
  { title: '合計', ref: 'a=list(map(int,input().split()))\nprint(sum(a))', h1: 'sum。', h2: '足し上げる。' },
  { title: '最大値', ref: 'a=list(map(int,input().split()))\nprint(max(a))', h1: 'max。', h2: '組み込み。' },
  { title: '最小値', ref: 'a=list(map(int,input().split()))\nprint(min(a))', h1: 'min。', h2: '組み込み。' },
  { title: '最大と最小の差', ref: 'a=list(map(int,input().split()))\nprint(max(a)-min(a))', h1: 'max-min。', h2: 'レンジ。' },
  { title: '偶数の個数', ref: 'a=list(map(int,input().split()))\nprint(sum(1 for x in a if x%2==0))', h1: '%2==0 を数える。', h2: '内包で件数。' },
  { title: '奇数の個数', ref: 'a=list(map(int,input().split()))\nprint(sum(1 for x in a if x%2==1))', h1: '%2==1。', h2: '件数。' },
  { title: '種類の数', ref: 'a=list(map(int,input().split()))\nprint(len(set(a)))', h1: 'set で重複除去。', h2: 'len(set)。' },
  { title: '2番目に大きい値', ref: 'a=list(map(int,input().split()))\nprint(sorted(set(a))[-2])', h1: '重複を除いてソート。', h2: '後ろから2番目。', ins: ['3 1 4 1 5\n', '9 2 6 5 3\n', '1 2\n', '7 8 9\n', '10 1 100 50 2\n', '8 6 4 2\n'] },
  { title: '昇順に並べて出力', ref: 'a=list(map(int,input().split()))\nprint(*sorted(a))', h1: 'sorted。', h2: 'print(*list)。' },
  { title: '降順に並べて出力', ref: 'a=list(map(int,input().split()))\nprint(*sorted(a,reverse=True))', h1: 'reverse=True。', h2: '降順ソート。' },
  { title: '合計が偶数か', ref: 'a=list(map(int,input().split()))\nprint("yes" if sum(a)%2==0 else "no")', h1: 'sum の偶奇。', h2: '%2。' },
  { title: '全要素の積', ref: 'a=list(map(int,input().split()))\np=1\nfor x in a:\n    p*=x\nprint(p)', h1: '初期値1で掛ける。', h2: '総積。' },
  { title: '最大値の位置', ref: 'a=list(map(int,input().split()))\nprint(a.index(max(a)))', h1: 'index(max)。', h2: '0始まり。' },
  { title: '平均より大きい個数', ref: 'a=list(map(int,input().split()))\nm=sum(a)/len(a)\nprint(sum(1 for x in a if x>m))', h1: '平均を出す。', h2: 'それより大きい数。' },
  { title: '重複している値の有無', ref: 'a=list(map(int,input().split()))\nprint("yes" if len(set(a))<len(a) else "no")', h1: 'set の長さ比較。', h2: '減れば重複あり。' },
  { title: '最頻値', ref: 'from collections import Counter\na=list(map(int,input().split()))\nprint(Counter(a).most_common(1)[0][0])', h1: 'Counter。', h2: 'most_common(1)。' },
  { title: '連続する差の最大', ref: 'a=list(map(int,input().split()))\nprint(max(a[i+1]-a[i] for i in range(len(a)-1)))', h1: '隣接の差。', h2: 'その最大。' },
  { title: '中央値(奇数長)', ref: 'a=sorted(map(int,input().split()))\nprint(a[len(a)//2])', h1: 'ソートして真ん中。', h2: 'len//2。' },
  { title: 'ソート済みか', ref: 'a=list(map(int,input().split()))\nprint("yes" if a==sorted(a) else "no")', h1: 'sorted と比較。', h2: '一致なら昇順。' },
]
const LISTODD = ['3 1 4 1 5\n', '9 2 6 5 3\n', '1 2 3\n', '7 7 7\n', '10 1 100 50 2\n', '8 6 4 2\n'] // 奇数長を含む
for (const f of LISTFUN) {
  const ins = f.ins ?? (f.title.includes('中央値') ? LISTODD : LISTS)
  t({ lv: 10, concept: 'リスト集計: ' + f.title, title: f.title, tags: ['list', '集計'], io: '空白区切りの整数列が1行で与えられます。', ask: `${f.title}を出力してください。`, h1: f.h1, h2: f.h2, ref: f.ref, ins })
}

// ============================================================
// Family 4: 文字列操作 h(s)
// ============================================================
const STRFUN = [
  { title: '長さ', ref: 's=input()\nprint(len(s))', h1: 'len。', h2: '文字数。' },
  { title: '大文字に', ref: 's=input()\nprint(s.upper())', h1: '.upper()。', h2: '全部大文字。' },
  { title: '小文字に', ref: 's=input()\nprint(s.lower())', h1: '.lower()。', h2: '全部小文字。' },
  { title: '大文字小文字を反転', ref: 's=input()\nprint(s.swapcase())', h1: '.swapcase()。', h2: '入れ替え。', tip: '💡 .swapcase() は大文字↔小文字を一括反転。' },
  { title: '逆順に', ref: 's=input()\nprint(s[::-1])', h1: '[::-1]。', h2: '反転スライス。' },
  { title: '母音の数', ref: 's=input()\nprint(sum(1 for c in s.lower() if c in "aeiou"))', h1: 'aeiou に含まれるか。', h2: '件数。' },
  { title: '回文か', ref: 's=input()\nprint("yes" if s==s[::-1] else "no")', h1: '反転と一致。', h2: '回文判定。' },
  { title: '最も多い文字', ref: 'from collections import Counter\ns=input()\nprint(Counter(s).most_common(1)[0][0])', h1: 'Counter。', h2: 'most_common。' },
  { title: '異なる文字の数', ref: 's=input()\nprint(len(set(s)))', h1: 'set。', h2: '種類数。' },
  { title: '先頭を大文字に', ref: 's=input()\nprint(s.capitalize())', h1: '.capitalize()。', h2: '文頭だけ大文字。' },
  { title: '各単語の先頭を大文字に', ref: 's=input()\nprint(s.title())', h1: '.title()。', h2: '単語ごと。', tip: '💡 .title() は各単語の頭文字を大文字化。' },
  { title: '数字を除いた文字列', ref: 's=input()\nprint("".join(c for c in s if not c.isdigit()))', h1: '.isdigit() で判定。', h2: '数字以外を連結。' },
  { title: 'a の出現回数', ref: 's=input()\nprint(s.count("a"))', h1: '.count("a")。', h2: '回数。' },
  { title: '中央寄せ(幅11,*)', ref: 's=input()\nprint(s.center(11,"*"))', h1: '.center(幅,文字)。', h2: '左右を*で埋める。', tip: '💡 .center/.ljust/.rjust で寄せ＋パディング。' },
  { title: '各文字をコード順で', ref: 's=input()\nprint(*sorted(s))', h1: 'sorted(s)。', h2: '文字を並べ替え。' },
  { title: '連続重複を除く', ref: 's=input()\nr=[]\nfor c in s:\n    if not r or r[-1]!=c:\n        r.append(c)\nprint("".join(r))', h1: '直前と違う時だけ追加。', h2: 'ランレングス的圧縮。' },
  { title: '最長の同一文字の連続', ref: 's=input()\nbest=cur=1\nfor i in range(1,len(s)):\n    cur=cur+1 if s[i]==s[i-1] else 1\n    best=max(best,cur)\nprint(best)', h1: '連続を数える。', h2: '最大を更新。' },
  { title: '単語数', ref: 's=input()\nprint(len(s.split()))', h1: '.split() で分割。', h2: '要素数。' },
  { title: 'ASCIIコードの合計', ref: 's=input()\nprint(sum(ord(c) for c in s))', h1: 'ord で文字コード。', h2: '合計。', tip: '💡 ord(文字)→コード、chr(コード)→文字。' },
  { title: '最初の大文字の位置', ref: 's=input()\nfor i,c in enumerate(s):\n    if c.isupper():\n        print(i)\n        break\nelse:\n    print(-1)', h1: 'enumerate で位置付き。', h2: 'isupper、無ければ-1。', tip: '💡 for-else: break しなければ else が実行される。' },
]
for (const f of STRFUN) {
  const useWords = f.title.includes('単語')
  t({ lv: 45, concept: '文字列処理: ' + f.title, title: f.title, tags: ['文字列'], io: '1行の文字列 s が与えられます。', ask: `${f.title}を出力してください。`, h1: f.h1, h2: f.h2, ref: f.ref, ins: useWords ? WORDS : STRS, tip: f.tip })
}

export const CATALOG = TASKS
