// 生成タスク 第4波。すべて別の計算(オリジナル)。1タスク=1問。
const TASKS = []
const t = (obj) => TASKS.push(obj)

// ---- 数の性質 (lv7) ----
const NUMPROP = [
  { title: 'アームストロング数か', ask: '各桁を「桁数」乗して足した値が元の数に等しいか (yes/no)', ref: 'n=int(input())\nd=str(n)\nk=len(d)\nprint("yes" if sum(int(c)**k for c in d)==n else "no")', h1: '桁数 k 乗して合計。', h2: '153=1³+5³+3³。', ins: ['153\n', '9474\n', '10\n', '370\n', '100\n', '1\n'], tip: '💡 ナルシシスト数とも呼ばれる有名な数。' },
  { title: 'ハーシャッド数か', ask: '各桁の和で割り切れるか (yes/no)', ref: 'n=int(input())\nds=sum(int(c) for c in str(n))\nprint("yes" if n%ds==0 else "no")', h1: '桁和で割る。', h2: '余り0なら yes。', ins: ['18\n', '12\n', '19\n', '21\n', '100\n', '7\n'] },
  { title: '回文数か', ask: '数字を逆に並べても同じか (yes/no)', ref: 'n=input()\nprint("yes" if n==n[::-1] else "no")', h1: '文字列の反転と比較。', h2: '[::-1]。', ins: ['121\n', '123\n', '1\n', '1221\n', '10\n', '7\n'] },
  { title: '自己同形数か', ref: 'n=int(input())\nprint("yes" if str(n*n).endswith(str(n)) else "no")', ask: '2乗した数の末尾が元の数になるか (yes/no)', h1: 'n*n の末尾。', h2: '5²=25,6²=36。', ins: ['5\n', '6\n', '25\n', '76\n', '7\n', '1\n'] },
  { title: 'ハッピー数か', ref: 'n=int(input())\nseen=set()\nwhile n!=1 and n not in seen:\n    seen.add(n)\n    n=sum(int(c)**2 for c in str(n))\nprint("yes" if n==1 else "no")', ask: '各桁の2乗和を繰り返して1になるか (yes/no)', h1: '桁の2乗和を反復。', h2: 'ループ検出で停止。', ins: ['19\n', '7\n', '4\n', '1\n', '23\n', '2\n'] },
  { title: '過剰数か', ref: 'n=int(input())\ns=sum(i for i in range(1,n) if n%i==0)\nprint("yes" if s>n else "no")', ask: '真の約数の和が自分より大きいか (yes/no)', h1: '真の約数の和と比較。', h2: '> なら過剰数。', ins: ['12\n', '6\n', '18\n', '10\n', '24\n', '7\n'] },
  { title: '不足数か', ref: 'n=int(input())\ns=sum(i for i in range(1,n) if n%i==0)\nprint("yes" if s<n else "no")', ask: '真の約数の和が自分より小さいか (yes/no)', h1: '真の約数の和と比較。', h2: '< なら不足数。', ins: ['8\n', '6\n', '10\n', '12\n', '15\n', '28\n'] },
  { title: '三角数か', ref: 'n=int(input())\nk=1\nwhile k*(k+1)//2<n:\n    k+=1\nprint("yes" if k*(k+1)//2==n else "no")', ask: 'k(k+1)/2 の形で表せるか (yes/no)', h1: '三角数を順に作る。', h2: '一致するか。', ins: ['10\n', '15\n', '11\n', '21\n', '1\n', '7\n'] },
  { title: 'フィボナッチ数か', ref: 'import math\nn=int(input())\ndef sq(x):\n    r=math.isqrt(x)\n    return r*r==x\nprint("yes" if sq(5*n*n+4) or sq(5*n*n-4) else "no")', ask: 'フィボナッチ数列に現れる数か (yes/no)', h1: '5n²±4 が平方数なら fib。', h2: 'isqrt で判定。', ins: ['13\n', '21\n', '22\n', '1\n', '8\n', '100\n'], tip: '💡 n がフィボナッチ数 ⇔ 5n²±4 のどちらかが平方数。' },
]
for (const f of NUMPROP) t({ lv: 7, concept: '数の性質: ' + f.title, title: f.title, tags: ['整数', '判定'], io: '1つの整数 n が与えられます。', ask: f.ask + 'を出力してください。', h1: f.h1, h2: f.h2, ref: f.ref, ins: f.ins, tip: f.tip })

// ---- 数列・公式 (lv7) ----
const SEQ = [
  { title: 'カタラン数', ref: 'import math\nn=int(input())\nprint(math.comb(2*n,n)//(n+1))', ask: '第 n カタラン数', h1: 'C(2n,n)/(n+1)。', h2: 'math.comb。', ins: ['5\n', '0\n', '1\n', '3\n', '6\n', '10\n'], tip: '💡 カタラン数は括弧の対応や二分木の数え上げで登場。' },
  { title: 'リュカ数', ref: 'n=int(input())\na,b=2,1\nfor _ in range(n):\n    a,b=b,a+b\nprint(a)', ask: '第 n リュカ数 (L0=2, L1=1)', h1: 'フィボナッチと同じ漸化式。', h2: '初期値が 2,1。', ins: ['0\n', '1\n', '5\n', '8\n', '3\n', '10\n'] },
  { title: '階乗の和', ref: 'n=int(input())\ns=0\nf=1\nfor i in range(1,n+1):\n    f*=i\n    s+=f\nprint(s)', ask: '1! + 2! + ... + n!', h1: '階乗を更新しつつ足す。', h2: 'f*=i。', ins: ['3\n', '1\n', '5\n', '4\n', '2\n', '6\n'] },
  { title: '五角数', ref: 'n=int(input())\nprint(n*(3*n-1)//2)', ask: '第 n 五角数 n(3n-1)/2', h1: '公式に当てはめる。', h2: '整数除算。', ins: ['1\n', '2\n', '3\n', '5\n', '10\n', '4\n'] },
  { title: '平方和', ref: 'n=int(input())\nprint(n*(n+1)*(2*n+1)//6)', ask: '1² + 2² + ... + n²', h1: '公式 n(n+1)(2n+1)/6。', h2: 'ループでも可。', ins: ['3\n', '1\n', '10\n', '5\n', '100\n', '7\n'] },
  { title: '立方和', ref: 'n=int(input())\nprint((n*(n+1)//2)**2)', ask: '1³ + 2³ + ... + n³', h1: '(1+..+n)² に等しい。', h2: '三角数の2乗。', ins: ['3\n', '1\n', '10\n', '5\n', '4\n', '7\n'] },
]
for (const f of SEQ) t({ lv: 7, concept: '数列: ' + f.title, title: f.title, tags: ['整数', '数列'], io: '1つの整数 n が与えられます (n>=0)。', ask: f.ask + 'を出力してください。', h1: f.h1, h2: f.h2, ref: f.ref, ins: f.ins, tip: f.tip })

// ---- 書式 (lv45) ----
const FMT = [
  { title: '3桁区切り', ref: 'n=int(input())\nprint(f"{n:,}")', ask: '3桁ごとにカンマ区切りにして', h1: 'f"{n:,}"。', h2: '書式指定子 ,。', ins: ['1000\n', '1234567\n', '100\n', '0\n', '999999\n', '12\n'], tip: '💡 f"{n:,}" で3桁区切りが一発。' },
  { title: '2進8桁ゼロ埋め', ref: 'n=int(input())\nprint(format(n,"08b"))', ask: '8桁ゼロ埋めの2進数で', h1: 'format(n,"08b")。', h2: '幅8・0埋め・2進。', ins: ['5\n', '255\n', '1\n', '128\n', '0\n', '42\n'] },
  { title: '16進大文字', ref: 'n=int(input())\nprint(format(n,"X"))', ask: '大文字の16進数で', h1: 'format(n,"X")。', h2: '大文字 hex。', ins: ['255\n', '16\n', '10\n', '4095\n', '1\n', '100\n'] },
  { title: '5桁ゼロ埋め', ref: 'n=int(input())\nprint(f"{n:05d}")', ask: '5桁になるよう前を0で埋めて', h1: 'f"{n:05d}"。', h2: '幅5・0埋め。', ins: ['42\n', '7\n', '12345\n', '0\n', '999\n', '100000\n'] },
]
for (const f of FMT) t({ lv: 45, concept: '書式: ' + f.title, title: f.title, tags: ['文字列', '書式'], io: '1つの非負整数 n が与えられます。', ask: f.ask + '出力してください。', h1: f.h1, h2: f.h2, ref: f.ref, ins: f.ins, tip: f.tip })

// ---- 単位変換 (lv70) ----
t({ lv: 70, concept: '変換: 秒を時分秒', title: '秒を hh:mm:ss に', tags: ['書式', '算術演算子'], io: '秒数 s が与えられます (0<=s<86400)。', ask: 'hh:mm:ss 形式 (各2桁ゼロ埋め) で出力してください。', h1: '3600で時、残りを60で分。', h2: 'f"{x:02d}"。', ref: 's=int(input())\nprint(f"{s//3600:02d}:{s%3600//60:02d}:{s%60:02d}")', ins: ['3661\n', '0\n', '59\n', '3600\n', '86399\n', '125\n'] })
t({ lv: 70, concept: '変換: 摂氏を華氏', title: '摂氏を華氏に', tags: ['書式'], io: '摂氏温度 c (整数) が与えられます。', ask: '華氏 (小数1桁) に変換して出力してください。F = C*9/5 + 32。', h1: 'C*9/5+32。', h2: 'f"{...:.1f}"。', ref: 'c=int(input())\nprint(f"{c*9/5+32:.1f}")', ins: ['0\n', '100\n', '37\n', '-40\n', '25\n', '10\n'] })
t({ lv: 70, concept: '変換: 分を時分', title: '分を h:mm に', tags: ['書式'], io: '分数 m が与えられます (m>=0)。', ask: '「時:分」形式 (分は2桁ゼロ埋め) で出力してください。', h1: '60で割って時と分。', h2: 'f"{m//60}:{m%60:02d}"。', ref: 'm=int(input())\nprint(f"{m//60}:{m%60:02d}")', ins: ['125\n', '60\n', '0\n', '59\n', '600\n', '61\n'] })
t({ lv: 70, concept: '変換: 任意の進数', title: 'n を b 進数に', tags: ['進数変換'], io: '整数 n と基数 b (2<=b<=16) が空白区切りで与えられます。', ask: 'n を b 進数で表した文字列を出力してください (a〜f は小文字)。', h1: 'b で割った余りを並べる。', h2: '余りを digits 表で文字に。', ref: 'n,b=map(int,input().split())\ndigs="0123456789abcdef"\nif n==0:\n    print("0")\nelse:\n    r=""\n    while n>0:\n        r=digs[n%b]+r\n        n//=b\n    print(r)', ins: ['255 16\n', '10 2\n', '100 8\n', '0 2\n', '31 16\n', '7 2\n'], tip: '💡 余りを下の桁から並べると任意の進数に変換できる。' })

export const CATALOG = TASKS
