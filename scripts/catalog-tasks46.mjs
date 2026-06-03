// 生成タスク 第46波：各レベル2問化フェーズ(1)。lv14〜72 の薄いレベルに2問目を追加。
// 基礎帯なので易しい別計算の問題を配置。重複なし・決定的・採点一意。
const TASKS = []
const t = (obj) => TASKS.push(obj)

t({ lv: 14, concept: '基礎: 5の倍数の個数', title: '5で割り切れる数の個数', tags: ['基礎'], io: '整数列が1行で与えられます。', ask: '5で割り切れる要素の個数を出力してください。', h1: '余りが0か見る。', h2: '条件カウント。', ref: 'a=list(map(int,input().split()))\nprint(sum(1 for x in a if x%5==0))', tip: '倍数判定は x%5==0。0 は任意の数の倍数として数えられる。', ins: ['5 10 3 15 7\n', '1 2 3\n', '5\n', '0 5 10\n', '-5 -10 4\n', '25 50\n'] })

t({ lv: 16, concept: '基礎: 2番目に大きい値', title: '2番目に大きい要素', tags: ['基礎'], io: '相異なる整数の列が1行で与えられます(2個以上)。', ask: '2番目に大きい値を出力してください。', h1: '降順にソートする。', h2: '添字1の要素を取る。', ref: 'a=sorted(map(int,input().split()),reverse=True)\nprint(a[1])', tip: '降順ソート後の添字1が2番目に大きい値。sorted(reverse=True) で簡潔に書ける。', ins: ['3 1 4 1 5\n', '10 20\n', '5 3 8 1\n', '100 50 75\n', '-1 -2 -3\n', '7 9 2 6\n'] })

t({ lv: 17, concept: '基礎: 整数の桁和', title: '整数の各桁の和', tags: ['基礎'], io: '非負整数 n が1行で与えられます。', ask: '各桁の数字の和を出力してください。', h1: '文字列にして各文字を整数化。', h2: 'sum で合計する。', ref: 'n=input().strip()\nprint(sum(int(c) for c in n))', tip: '桁和は文字列化して各文字を int に変換し合計する。% 10 と // 10 のループでも書ける。', ins: ['123\n', '0\n', '9\n', '1000\n', '99999\n', '4567\n'] })

t({ lv: 18, concept: '基礎: 各要素を2倍', title: '全要素を2倍した列', tags: ['基礎'], io: '整数列が1行で与えられます。', ask: '各要素を2倍した列を空白区切りで出力してください。', h1: '内包表記で2倍。', h2: 'そのまま出力。', ref: 'a=list(map(int,input().split()))\nprint(*[x*2 for x in a])', tip: '要素ごとの変換は内包表記 [f(x) for x in a] が基本。', ins: ['1 2 3\n', '5\n', '0 0 0\n', '-1 1\n', '10 20\n', '7 7 7\n'] })

t({ lv: 19, concept: '基礎: 母音の数', title: '文字列中の母音の個数', tags: ['基礎'], io: '英小文字の文字列が1行で与えられます。', ask: '母音(a,e,i,o,u)の個数を出力してください。', h1: '母音の集合を用意する。', h2: '各文字が集合にあるか数える。', ref: 's=input()\nvowels=set("aeiou")\nprint(sum(1 for c in s if c in vowels))', tip: '集合 in 判定は O(1)。母音カウントは set("aeiou") に含まれるかで数える。', ins: ['hello\n', 'xyz\n', 'aeiou\n', 'a\n', 'programming\n', 'bcd\n'] })

t({ lv: 22, concept: '基礎: 階乗の計算', title: 'nの階乗', tags: ['基礎'], io: '非負整数 n が1行で与えられます。', ask: 'n! を出力してください(0!=1)。', h1: '1からnまで掛ける。', h2: '0! は1。', ref: 'n=int(input())\nr=1\nfor i in range(2,n+1):\n    r*=i\nprint(r)', tip: '階乗は1から順に掛ける。Pythonは多倍長整数なので桁あふれの心配がない。', ins: ['5\n', '0\n', '1\n', '10\n', '3\n', '7\n'] })

t({ lv: 23, concept: '基礎: 最大公約数(ユークリッド)', title: '2数の最大公約数', tags: ['基礎'], io: 'a b が空白区切りで与えられます。', ask: 'a と b の最大公約数を出力してください。', h1: 'ユークリッドの互除法。', h2: 'b が0になるまで a%b を繰り返す。', ref: 'a,b=map(int,input().split())\nwhile b:\n    a,b=b,a%b\nprint(a)', tip: 'ユークリッドの互除法は a,b=b,a%b を b が0になるまで繰り返す。math.gcd でも求まる。', ins: ['12 18\n', '7 5\n', '100 10\n', '17 13\n', '0 5\n', '24 36\n'] })

t({ lv: 24, concept: '基礎: 文字の整列', title: '文字を辞書順に並べる', tags: ['基礎'], io: '文字列が1行で与えられます。', ask: '文字を辞書順(昇順)に並べた文字列を出力してください。', h1: 'sorted で文字を並べる。', h2: 'join で結合。', ref: 's=input()\nprint("".join(sorted(s)))', tip: 'sorted(s) は文字のリストを返すので "".join で文字列に戻す。アナグラム判定の正規化に使える。', ins: ['dcba\n', 'abc\n', 'hello\n', 'a\n', 'zyx\n', 'bca\n'] })

t({ lv: 26, concept: '基礎: 等比数列の項', title: '等比数列のn番目の項', tags: ['基礎'], io: 'a r n が空白区切りで与えられます(初項a・公比r・項番号n、1始まり)。', ask: '等比数列の n 番目の項を出力してください。', h1: '初項 × 公比^(n-1)。', h2: 'べき乗 ** を使う。', ref: 'a,r,n=map(int,input().split())\nprint(a*r**(n-1))', tip: '等比数列の一般項は a·r^(n-1)。べき乗は ** 演算子で計算する。', ins: ['2 3 4\n', '1 2 5\n', '3 1 10\n', '5 0 3\n', '1 10 4\n', '2 2 1\n'] })

t({ lv: 27, concept: '基礎: 3文字以上の単語数', title: '3文字以上の単語の数', tags: ['基礎'], io: '空白区切りの文章が1行で与えられます。', ask: '長さが3文字以上の単語の個数を出力してください。', h1: 'split で単語に分ける。', h2: '長さ3以上を数える。', ref: 's=input()\nprint(sum(1 for w in s.split() if len(w)>=3))', tip: '条件に合う単語数は split 後に len(w) を見て数える。語の長さフィルタの基本。', ins: ['the quick brown\n', 'a bb ccc\n', 'hello\n', 'i am ok\n', 'one two three\n', 'xy z abcd\n'] })

t({ lv: 28, concept: '基礎: 隣接要素の最大差', title: '隣り合う要素の最大の差', tags: ['基礎'], io: '整数列が1行で与えられます(2個以上)。', ask: '隣り合う要素の差(絶対値)の最大値を出力してください。', h1: '隣接ペアを順に見る。', h2: '差の絶対値の最大を取る。', ref: 'a=list(map(int,input().split()))\nprint(max(abs(a[i+1]-a[i]) for i in range(len(a)-1)))', tip: '隣接差は zip(a, a[1:]) でペアを作っても書ける。絶対値は abs。', ins: ['1 5 2 8\n', '3 3 3\n', '1 2\n', '10 1 10\n', '-5 5\n', '0 100 50\n'] })

t({ lv: 29, concept: '基礎: 絶対値の和', title: '絶対値の合計', tags: ['基礎'], io: '整数列が1行で与えられます。', ask: '各要素の絶対値の合計を出力してください。', h1: 'abs を各要素に。', h2: 'その合計。', ref: 'a=list(map(int,input().split()))\nprint(sum(abs(x) for x in a))', tip: '絶対値の和は sum(abs(x) for x in a)。符号を無視した大きさの合計。', ins: ['-1 2 -3\n', '1 2 3\n', '-5\n', '0 0\n', '-10 10\n', '4 -4 4\n'] })

t({ lv: 31, concept: '基礎: 平方数のリスト', title: '1からnの平方を並べる', tags: ['基礎'], io: '正整数 n が1行で与えられます。', ask: '1²,2²,...,n² を空白区切りで出力してください。', h1: '内包表記で平方を作る。', h2: 'range(1,n+1) を使う。', ref: 'n=int(input())\nprint(*[i*i for i in range(1,n+1)])', tip: '内包表記 [i*i for i in range(1,n+1)] で平方列を生成し、* で展開出力する。', ins: ['5\n', '1\n', '3\n', '10\n', '2\n', '7\n'] })

t({ lv: 32, concept: '基礎: 文字の出現回数', title: '指定文字の出現回数', tags: ['基礎'], io: '1行目に文字列、2行目に1文字 c が与えられます。', ask: '文字列中の c の出現回数を出力してください。', h1: 'count メソッドを使う。', h2: 's.count(c)。', ref: 's=input()\nc=input()\nprint(s.count(c))', tip: '文字列の count メソッドは部分文字列の出現回数を返す。重なりは数えない。', ins: ['banana\na\n', 'hello\nl\n', 'abc\nd\n', 'aaaa\na\n', 'mississippi\ns\n', 'x\nx\n'] })

t({ lv: 33, concept: '基礎: 整数平均(切り捨て)', title: 'リストの平均(切り捨て)', tags: ['基礎'], io: '整数列が1行で与えられます。', ask: '要素の平均を切り捨てた整数を出力してください。', h1: '合計を要素数で割る。', h2: '整数除算 // を使う。', ref: 'a=list(map(int,input().split()))\nprint(sum(a)//len(a))', tip: '整数の平均(切り捨て)は sum//len。// は床除算で負数では切り下げになる点に注意。', ins: ['1 2 3 4\n', '10\n', '1 2\n', '5 5 5\n', '1 2 3\n', '0 10\n'] })

t({ lv: 34, concept: '基礎: 3進数へ変換', title: '3進表記に変換', tags: ['基礎'], io: '非負整数 n が1行で与えられます。', ask: 'n の3進表記(先頭0なし、0は"0")を出力してください。', h1: '3で割った余りを集める。', h2: '逆順にして繋ぐ。', ref: 'n=int(input())\nif n==0:\n    print(0)\nelse:\n    d=[]\n    while n>0:\n        d.append(str(n%3))\n        n//=3\n    print("".join(reversed(d)))', tip: '任意の基数変換は「基数で割った余りを集めて逆順」。', ins: ['5\n', '0\n', '1\n', '9\n', '26\n', '100\n'] })

t({ lv: 35, concept: '基礎: 空白の個数', title: '文字列中の空白の個数', tags: ['基礎'], io: '文字列が1行で与えられます。', ask: '空白文字の個数を出力してください。', h1: 'count で数える。', h2: 's.count(" ")。', ref: 's=input()\nprint(s.count(" "))', tip: '空白の数は s.count(" ")。単語数(空白+1)を数える前処理にも使える。', ins: ['a b c\n', 'hello\n', '   \n', 'one two\n', 'x\n', 'a  b\n'] })

t({ lv: 36, concept: '基礎: 0の個数', title: 'リスト中の0の個数', tags: ['基礎'], io: '整数列が1行で与えられます。', ask: '値が0である要素の個数を出力してください。', h1: '0と等しいか見る。', h2: '条件カウント。', ref: 'a=list(map(int,input().split()))\nprint(sum(1 for x in a if x==0))', tip: '特定値の個数は a.count(0) でも条件カウントでも求まる。', ins: ['0 1 0 2 0\n', '1 2 3\n', '0\n', '0 0 0\n', '-1 0 1\n', '5 5\n'] })

t({ lv: 37, concept: '基礎: 最小値の位置', title: '最小要素の添字', tags: ['基礎'], io: '整数列が1行で与えられます。', ask: '最小値が最初に現れる添字(0始まり)を出力してください。', h1: 'min で最小値。', h2: 'index で位置。', ref: 'a=list(map(int,input().split()))\nprint(a.index(min(a)))', tip: 'a.index(min(a)) で最小値の最初の位置。最大値版と対称。', ins: ['3 1 4 1 5\n', '10\n', '5 5 5\n', '3 2 1\n', '0 9 0\n', '7 8 9\n'] })

t({ lv: 38, concept: '基礎: 重複の除去(順序保持)', title: '重複を除いた列(出現順)', tags: ['基礎'], io: '整数列が1行で与えられます。', ask: '初めて現れた順序を保ったまま重複を取り除いた列を空白区切りで出力してください。', h1: '既出集合を持つ。', h2: '未出のものだけ追加。', ref: 'a=list(map(int,input().split()))\nseen=set()\nres=[]\nfor x in a:\n    if x not in seen:\n        seen.add(x)\n        res.append(x)\nprint(*res)', tip: '出現順を保つ重複除去は「既出集合」で管理する。dict.fromkeys(a) でも順序保持できる。', ins: ['1 2 2 3 1\n', '5 5 5\n', '1 2 3\n', '3 3 2 1 1\n', '7\n', '1 1 2 2 3 3\n'] })

t({ lv: 39, concept: '基礎: 偶数の和', title: '偶数要素の合計', tags: ['基礎'], io: '整数列が1行で与えられます。', ask: '偶数の要素だけの合計を出力してください。', h1: '偶数を選ぶ。', h2: 'その合計。', ref: 'a=list(map(int,input().split()))\nprint(sum(x for x in a if x%2==0))', tip: '条件付き合計はジェネレータ式 sum(x for x in a if 条件) で簡潔に書ける。', ins: ['1 2 3 4\n', '1 3 5\n', '2 4 6\n', '0\n', '-2 3 -4\n', '10\n'] })

t({ lv: 41, concept: '基礎: 各単語の先頭を大文字に', title: '単語の頭文字を大文字化', tags: ['基礎'], io: '英小文字と空白の文章が1行で与えられます。', ask: '各単語の先頭を大文字にして空白1つ区切りで出力してください。', h1: 'split で単語に分ける。', h2: 'capitalize して結合。', ref: 's=input()\nprint(" ".join(w.capitalize() for w in s.split()))', tip: 'capitalize() は先頭を大文字・残りを小文字にする。title() でも似た結果になる。', ins: ['hello world\n', 'python\n', 'a b c\n', 'the quick fox\n', 'x\n', 'one two\n'] })

t({ lv: 42, concept: '基礎: 一度だけ現れる要素数', title: 'ちょうど1回現れる要素数', tags: ['基礎', 'ハッシュ'], io: '整数列が1行で与えられます。', ask: '出現回数がちょうど1回の値の種類数を出力してください。', h1: 'Counter で数える。', h2: '回数1のものを数える。', ref: 'from collections import Counter\na=list(map(int,input().split()))\ncnt=Counter(a)\nprint(sum(1 for v in cnt.values() if v==1))', tip: 'Counter で頻度を集計し、値が1のキー数を数える。', ins: ['1 2 2 3\n', '1 1 1\n', '1 2 3\n', '5\n', '4 4 5 6 6\n', '7 7 8 8\n'] })

t({ lv: 43, concept: '基礎: 最小と最大', title: '最小値と最大値', tags: ['基礎'], io: '整数列が1行で与えられます。', ask: '最小値と最大値を空白区切りで出力してください。', h1: 'min と max を使う。', h2: '空白区切りで出力。', ref: 'a=list(map(int,input().split()))\nprint(min(a),max(a))', tip: 'min/max は組み込み関数。print に複数値を渡すと空白区切りで出力される。', ins: ['3 1 4 1 5\n', '10\n', '-5 5\n', '0 0 0\n', '100 50\n', '7 7 7\n'] })

t({ lv: 44, concept: '基礎: リストの左回転', title: 'リストをk回左に回転', tags: ['基礎'], io: '1行目に整数列、2行目に回転数 k が与えられます。', ask: '左に k 回転した列を空白区切りで出力してください。', h1: 'スライスで前後を入れ替える。', h2: 'k を長さで割った余りを使う。', ref: 'a=list(map(int,input().split()))\nk=int(input())\nk%=len(a)\nprint(*(a[k:]+a[:k]))', tip: '左k回転は a[k:]+a[:k]。k を len で割った余りにすると大きな k でも正しく動く。', ins: ['1 2 3 4 5\n2\n', '1 2 3\n0\n', '1 2 3\n3\n', '1 2\n1\n', '5 4 3 2 1\n4\n', '7\n10\n'] })

t({ lv: 46, concept: '基礎: 母音を記号に置換', title: '母音を*に置き換える', tags: ['基礎'], io: '英小文字の文字列が1行で与えられます。', ask: '母音(a,e,i,o,u)を * に置き換えた文字列を出力してください。', h1: '各文字を見る。', h2: '母音なら * に。', ref: 's=input()\nvowels=set("aeiou")\nprint("".join("*" if c in vowels else c for c in s))', tip: '文字単位の変換は内包表記で「条件なら置換、でなければそのまま」を join する。', ins: ['hello\n', 'xyz\n', 'aeiou\n', 'programming\n', 'b\n', 'queue\n'] })

t({ lv: 47, concept: '基礎: 桁数を数える', title: '整数の桁数', tags: ['基礎'], io: '非負整数 n が1行で与えられます。', ask: 'n の桁数を出力してください(0は1桁)。', h1: '文字列化して長さを見る。', h2: 'len(str(n))。', ref: 'n=input().strip()\nprint(len(n))', tip: '桁数は文字列化して長さを取るのが簡単。数値演算なら //10 のループでも数えられる。', ins: ['123\n', '0\n', '9\n', '1000\n', '99999\n', '5\n'] })

t({ lv: 48, concept: '基礎: 1からnの和', title: '1からnまでの総和', tags: ['基礎'], io: '正整数 n が1行で与えられます。', ask: '1+2+...+n を出力してください。', h1: '公式 n(n+1)/2。', h2: '整数除算で。', ref: 'n=int(input())\nprint(n*(n+1)//2)', tip: '1からnの和はガウスの公式 n(n+1)/2 で O(1)。ループ sum(range(1,n+1)) でも可。', ins: ['10\n', '1\n', '100\n', '5\n', '3\n', '1000\n'] })

t({ lv: 49, concept: '基礎: 2のべき乗判定', title: '2のべき乗かどうか', tags: ['基礎'], io: '正整数 n が1行で与えられます。', ask: 'n が2のべき乗なら yes、違うなら no を出力してください。', h1: '2で割り続ける、またはビット演算。', h2: 'n>0 かつ n&(n-1)==0。', ref: 'n=int(input())\nprint("yes" if n>0 and (n&(n-1))==0 else "no")', tip: '2のべき乗は2進表記で1が1個だけ。n&(n-1)==0 で立っているビットが1個か判定できる。', ins: ['8\n', '6\n', '1\n', '1024\n', '3\n', '16\n'] })

t({ lv: 51, concept: '基礎: 最長の単語', title: '文中の最長の単語', tags: ['基礎'], io: '空白区切りの文章が1行で与えられます。', ask: '最も長い単語を出力してください。複数あれば最初に現れたもの。', h1: 'split で単語に分ける。', h2: 'max に key=len を渡す。', ref: 's=input()\nprint(max(s.split(),key=len))', tip: 'max に key=len を渡すと最長の要素が得られる。同点は先に現れたものが選ばれる。', ins: ['the quick brown fox\n', 'a bb ccc\n', 'hello\n', 'one two six\n', 'i am here\n', 'abc abcd ab\n'] })

t({ lv: 52, concept: '基礎: 空白以外の文字数', title: '空白を除いた文字数', tags: ['基礎'], io: '文字列が1行で与えられます。', ask: '空白以外の文字の個数を出力してください。', h1: '空白を数える、または置換。', h2: '空白を除いた長さ。', ref: 's=input()\nprint(sum(1 for c in s if c!=" "))', tip: '空白以外の数は len(s.replace(" ","")) でも、条件カウントでも求まる。', ins: ['hello world\n', 'abc\n', 'a b c\n', '   \n', 'x y z w\n', 'no_space\n'] })

t({ lv: 53, concept: '基礎: 交互符号の和', title: '符号を交互にした和', tags: ['基礎'], io: '整数列が1行で与えられます。', ask: 'a0 - a1 + a2 - a3 + ... を計算して出力してください。', h1: '偶数番は+、奇数番は-。', h2: '添字の偶奇で符号を決める。', ref: 'a=list(map(int,input().split()))\nprint(sum(x if i%2==0 else -x for i,x in enumerate(a)))', tip: 'enumerate で添字を取り、偶奇で符号を切り替える。交代和の基本パターン。', ins: ['1 2 3 4\n', '5\n', '10 1 10 1\n', '1 1 1\n', '0 0 0\n', '3 1 4 1 5\n'] })

t({ lv: 54, concept: '基礎: 最頻の文字', title: '最も多い文字', tags: ['基礎', 'ハッシュ'], io: '英小文字の文字列が1行で与えられます。', ask: '最も多く現れる文字を出力してください。複数あれば辞書順で最小。', h1: '出現回数を数える。', h2: '(回数降順, 文字昇順)で選ぶ。', ref: 'from collections import Counter\ns=input()\ncnt=Counter(s)\nbest=None\nbestc=-1\nfor c in sorted(cnt):\n    if cnt[c]>bestc:\n        bestc=cnt[c]\n        best=c\nprint(best)', tip: '最頻文字の同点は辞書順で割る。先に sorted してから最大回数を探すと安定して最小が選べる。', ins: ['banana\n', 'abc\n', 'aabb\n', 'x\n', 'mississippi\n', 'zzzaaa\n'] })

t({ lv: 55, concept: '基礎: 文字コードへ変換', title: '各文字のASCIIコード', tags: ['基礎'], io: '文字列が1行で与えられます。', ask: '各文字のASCIIコードを空白区切りで出力してください。', h1: 'ord で文字コードを得る。', h2: '各文字に適用。', ref: 's=input()\nprint(*[ord(c) for c in s])', tip: 'ord(c) は文字のコードポイントを返す。逆変換は chr(n)。', ins: ['abc\n', 'A\n', 'hello\n', 'Z\n', '123\n', 'xy\n'] })

t({ lv: 56, concept: '基礎: 3の倍数の個数', title: '3で割り切れる数の個数', tags: ['基礎'], io: '整数列が1行で与えられます。', ask: '3で割り切れる要素の個数を出力してください。', h1: '余りが0か見る。', h2: '条件に合う数を数える。', ref: 'a=list(map(int,input().split()))\nprint(sum(1 for x in a if x%3==0))', tip: '倍数判定は x%k==0。0 は任意の数の倍数として数えられる点に注意。', ins: ['3 6 9 1 2\n', '1 2 4\n', '3\n', '0 3 6\n', '-3 -6 5\n', '10 20 30\n'] })

t({ lv: 57, concept: '基礎: 累積和の列', title: '累積和を出力', tags: ['基礎'], io: '整数列が1行で与えられます。', ask: '先頭からの累積和の列を空白区切りで出力してください。', h1: '走りながら足していく。', h2: '途中結果を記録。', ref: 'a=list(map(int,input().split()))\ns=0\nres=[]\nfor x in a:\n    s+=x\n    res.append(s)\nprint(*res)', tip: '累積和は走査しながら加算し各段階を記録する。itertools.accumulate でも作れる。', ins: ['1 2 3 4\n', '5\n', '1 1 1\n', '-1 1 -1\n', '10 20 30\n', '0 0 0\n'] })

t({ lv: 58, concept: '基礎: 昇順かの判定', title: '昇順に並んでいるか', tags: ['基礎'], io: '整数列が1行で与えられます。', ask: '非減少(<=)に並んでいれば yes、そうでなければ no を出力してください。', h1: '隣接ペアを比べる。', h2: '全ペアで前<=後なら yes。', ref: 'a=list(map(int,input().split()))\nprint("yes" if all(a[i]<=a[i+1] for i in range(len(a)-1)) else "no")', tip: 'ソート済み判定は all() と隣接比較。a==sorted(a) でも判定できる。', ins: ['1 2 3\n', '3 2 1\n', '1 1 2\n', '5\n', '1 3 2\n', '0 0 0\n'] })

t({ lv: 59, concept: '基礎: 子音の数', title: '子音の個数', tags: ['基礎'], io: '英小文字の文字列が1行で与えられます。', ask: '子音(母音aeiou以外の英字)の個数を出力してください。', h1: '英字かつ母音でないものを数える。', h2: '集合で母音を除く。', ref: 's=input()\nvowels=set("aeiou")\nprint(sum(1 for c in s if c.isalpha() and c not in vowels))', tip: '子音=英字かつ母音でない。isalpha で英字に限定してから母音集合を除く。', ins: ['hello\n', 'aeiou\n', 'xyz\n', 'a\n', 'programming\n', 'bcd\n'] })

t({ lv: 61, concept: '基礎: 相異なる要素を昇順に', title: '重複を除いて昇順出力', tags: ['基礎'], io: '整数列が1行で与えられます。', ask: '相異なる値を昇順に並べて空白区切りで出力してください。', h1: '集合で重複を除く。', h2: 'ソートして出力。', ref: 'a=list(map(int,input().split()))\nprint(*sorted(set(a)))', tip: 'sorted(set(a)) で重複除去と昇順整列を同時に行える定番イディオム。', ins: ['3 1 2 3 1\n', '5 5 5\n', '1 2 3\n', '7\n', '4 3 2 1\n', '0 -1 1 0\n'] })

t({ lv: 62, concept: '基礎: 2乗の和', title: 'リストの要素の2乗和', tags: ['基礎'], io: '整数列が1行で与えられます。', ask: '各要素の2乗の合計を出力してください。', h1: '各要素を2乗する。', h2: 'その合計。', ref: 'a=list(map(int,input().split()))\nprint(sum(x*x for x in a))', tip: '2乗和はジェネレータ式 sum(x*x for x in a)。x**2 でも同じ。', ins: ['1 2 3\n', '5\n', '-1 -2\n', '0 0\n', '3 4\n', '10\n'] })

t({ lv: 63, concept: '基礎: 平均超えの個数', title: '平均より大きい要素の数', tags: ['基礎'], io: '整数列が1行で与えられます。', ask: '平均(実数)より真に大きい要素の個数を出力してください。', h1: '平均を求める。', h2: 'それより大きい数を数える。', ref: 'a=list(map(int,input().split()))\navg=sum(a)/len(a)\nprint(sum(1 for x in a if x>avg))', tip: '平均は実数で計算(/)。それと比較して大きい要素を数える2パスの処理。', ins: ['1 2 3 4\n', '5 5 5\n', '1 10\n', '1 2 3\n', '10 20 30\n', '0 0 100\n'] })

t({ lv: 64, concept: '基礎: 立方和', title: '1からnの3乗の和', tags: ['基礎'], io: '正整数 n が1行で与えられます。', ask: '1³+2³+...+n³ を出力してください。', h1: '公式 (n(n+1)/2)²。', h2: '三角数の2乗に等しい。', ref: 'n=int(input())\ns=n*(n+1)//2\nprint(s*s)', tip: '立方和 Σi³ は (n(n+1)/2)² に等しい(ニコマコスの定理)。', ins: ['3\n', '1\n', '5\n', '10\n', '2\n', '100\n'] })

t({ lv: 65, concept: '基礎: 最大の桁', title: '整数の最大の桁', tags: ['基礎'], io: '非負整数 n が1行で与えられます。', ask: 'n の各桁のうち最大の数字を出力してください。', h1: '文字列にして各桁を見る。', h2: 'max を取る。', ref: 'n=input().strip()\nprint(max(int(c) for c in n))', tip: '桁ごとの最大は文字列化して各文字を int 化し max を取る。最小なら min。', ins: ['123\n', '0\n', '9\n', '581\n', '999\n', '4070\n'] })

t({ lv: 66, concept: '基礎: 最小の桁', title: '整数の最小の桁', tags: ['基礎'], io: '非負整数 n が1行で与えられます。', ask: 'n の各桁のうち最小の数字を出力してください。', h1: '文字列にして各桁を見る。', h2: 'min を取る。', ref: 'n=input().strip()\nprint(min(int(c) for c in n))', tip: '桁ごとの最小は max と対称に min を使う。0 を含むと最小は0になる。', ins: ['123\n', '0\n', '9\n', '581\n', '777\n', '4070\n'] })

t({ lv: 67, concept: '基礎: 整数の桁反転', title: '整数の桁を逆順にする', tags: ['基礎'], io: '非負整数 n が1行で与えられます。', ask: 'n の桁を逆順にした整数を出力してください(先頭の0は消える)。', h1: '文字列を反転する。', h2: 'int に戻す。', ref: 'n=input().strip()\nprint(int(n[::-1]))', tip: '桁反転は文字列を [::-1] で逆転して int に戻すと先頭の0が自動的に消える。', ins: ['123\n', '0\n', '100\n', '9\n', '1200\n', '54321\n'] })

t({ lv: 68, concept: '基礎: 負の数の個数', title: '負の数の個数', tags: ['基礎'], io: '整数列が1行で与えられます。', ask: '負の数の個数を出力してください。', h1: '0未満を数える。', h2: '条件カウント。', ref: 'a=list(map(int,input().split()))\nprint(sum(1 for x in a if x<0))', tip: '符号判定は x<0。条件に合う個数は sum(1 for ...) のイディオムで数える。', ins: ['-1 2 -3 4\n', '1 2 3\n', '-1 -2 -3\n', '0\n', '-5\n', '0 0 0\n'] })

t({ lv: 69, concept: '基礎: 最小と最大の和', title: '最小値と最大値の和', tags: ['基礎'], io: '整数列が1行で与えられます。', ask: '最小値と最大値の和を出力してください。', h1: 'min と max を求める。', h2: 'その和。', ref: 'a=list(map(int,input().split()))\nprint(min(a)+max(a))', tip: 'min と max を別々に求めて足す。両端の値の合計。', ins: ['1 5 2 8\n', '5\n', '-3 3\n', '0 0 0\n', '10 20 30\n', '7 7 7\n'] })

t({ lv: 71, concept: '基礎: 絶対値で昇順整列', title: '絶対値の小さい順に並べる', tags: ['基礎'], io: '整数列が1行で与えられます。', ask: '絶対値の小さい順に並べて空白区切りで出力してください(同絶対値は元の順)。', h1: 'sorted の key に abs。', h2: '安定ソートなので同値は元順。', ref: 'a=list(map(int,input().split()))\nprint(*sorted(a,key=abs))', tip: 'sorted(a, key=abs) で絶対値順。Pythonのソートは安定。', ins: ['-3 1 -2 4\n', '5\n', '-1 1\n', '0 -2 2\n', '3 -3 1\n', '-5 -1 -3\n'] })

t({ lv: 72, concept: '基礎: 母音で始まる単語数', title: '母音で始まる単語の数', tags: ['基礎'], io: '空白区切りの英小文字の文章が1行で与えられます。', ask: '母音(a,e,i,o,u)で始まる単語の個数を出力してください。', h1: '単語に分ける。', h2: '先頭文字が母音か数える。', ref: 's=input()\nvowels=set("aeiou")\nprint(sum(1 for w in s.split() if w and w[0] in vowels))', tip: '単語の先頭文字は w[0]。空単語を避けるため w があることも確認すると安全。', ins: ['apple banana orange\n', 'cat dog\n', 'i am here\n', 'one\n', 'the end is near\n', 'x y z\n'] })

export const CATALOG = TASKS
