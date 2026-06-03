// 生成タスク 第16波：確率・物理・日付応用・ゲーム理論。整数/固定小数=採点一意。
const TASKS = []
const t = (obj) => TASKS.push(obj)

// 確率・場合の数 (lv130)
t({ lv: 130, concept: '確率: サイコロ2個の和', title: 'サイコロ2個の和=k の場合の数', tags: ['全探索', '確率'], io: '整数 k が与えられます。', ask: '2個のサイコロ(各1〜6)の目の和が k になる出方の数を出力してください。', h1: '6×6 を全列挙。', h2: '和が k のものを数える。', ref: 'k=int(input())\nprint(sum(1 for i in range(1,7) for j in range(1,7) if i+j==k))', ins: ['7\n', '2\n', '12\n', '9\n', '1\n', '6\n'] })
t({ lv: 130, concept: '確率: サイコロn個の和', title: 'サイコロn個の和=k の場合の数', tags: ['dp', '確率'], io: '整数 n k が空白区切りで与えられます。', ask: 'n 個のサイコロ(各1〜6)の目の和が k になる出方の数を出力してください。', h1: 'DPで和の分布を更新。', h2: '1個増やすごとに1〜6を足す。', ref: 'n,k=map(int,input().split())\ndp=[1]+[0]*k\nfor _ in range(n):\n    nd=[0]*(k+1)\n    for s in range(k+1):\n        if dp[s]:\n            for f in range(1,7):\n                if s+f<=k:\n                    nd[s+f]+=dp[s]\n    dp=nd\nprint(dp[k])', ins: ['2 7\n', '2 2\n', '3 10\n', '1 4\n', '2 13\n', '3 3\n'] })
t({ lv: 130, concept: '確率: コインで丁度h回表', title: 'コインでちょうどh回表の確率', tags: ['組合せ', '確率'], io: '整数 n h が空白区切りで与えられます。', ask: '公平なコインを n 回投げて表がちょうど h 回出る確率を小数6桁で出力してください。', h1: 'C(n,h) 通り / 2ⁿ 通り。', h2: 'math.comb。', ref: 'import math\nn,h=map(int,input().split())\nprint(f"{math.comb(n,h)/2**n:.6f}")', ins: ['4 2\n', '1 0\n', '3 3\n', '10 5\n', '6 2\n', '2 1\n'] })

// 物理 (lv70)
t({ lv: 70, concept: '物理: 自由落下の距離', title: '自由落下の距離', tags: ['物理'], io: '時間 t 秒 (整数) が与えられます。', ask: '初速0で t 秒落下したときの距離 (g=9.8) を小数2桁で出力してください。', h1: '½gt²。', h2: '0.5*9.8*t*t。', ref: 't=int(input())\nprint(f"{0.5*9.8*t*t:.2f}")', ins: ['1\n', '2\n', '3\n', '0\n', '5\n', '10\n'] })
t({ lv: 70, concept: '物理: 自由落下の速度', title: '自由落下の速度', tags: ['物理'], io: '時間 t 秒 (整数) が与えられます。', ask: '初速0で t 秒後の速度 (g=9.8) を小数2桁で出力してください。', h1: 'v=gt。', h2: '9.8*t。', ref: 't=int(input())\nprint(f"{9.8*t:.2f}")', ins: ['1\n', '2\n', '3\n', '0\n', '5\n', '10\n'] })
t({ lv: 70, concept: '物理: 等加速度の距離', title: '等加速度運動の距離', tags: ['物理'], io: '初速 v0、加速度 a、時間 t が空白区切り (整数) で与えられます。', ask: '進む距離 v0·t + ½·a·t² を小数2桁で出力してください。', h1: '公式に代入。', h2: 'v0*t+0.5*a*t*t。', ref: 'v0,a,t=map(int,input().split())\nprint(f"{v0*t+0.5*a*t*t:.2f}")', ins: ['10 2 5\n', '0 9 3\n', '5 0 4\n', '2 2 2\n', '0 0 0\n', '3 1 10\n'] })
t({ lv: 70, concept: '物理: 運動エネルギー', title: '運動エネルギー', tags: ['物理'], io: '質量 m、速度 v が空白区切り (整数) で与えられます。', ask: '運動エネルギー ½mv² を小数2桁で出力してください。', h1: '½mv²。', h2: '0.5*m*v*v。', ref: 'm,v=map(int,input().split())\nprint(f"{0.5*m*v*v:.2f}")', ins: ['2 3\n', '1 10\n', '5 0\n', '10 2\n', '3 4\n', '1 1\n'] })

// 日付応用 (lv80)
t({ lv: 80, concept: '日付: 範囲内のうるう年数', title: '範囲内のうるう年の数', tags: ['datetime'], io: '年の範囲 y1 y2 (y1<=y2) が空白区切りで与えられます。', ask: 'y1 以上 y2 以下のうるう年の個数を出力してください。', h1: 'calendar.isleap で判定。', h2: '範囲を数える。', ref: 'import calendar\ny1,y2=map(int,input().split())\nprint(sum(1 for y in range(y1,y2+1) if calendar.isleap(y)))', ins: ['2000 2020\n', '1900 1900\n', '2024 2024\n', '1 100\n', '2000 2000\n', '2019 2023\n'] })

// ゲーム理論 (lv550)
t({ lv: 550, concept: 'ゲーム: Nim', title: 'Nimの勝敗', tags: ['ビット演算', 'ゲーム'], io: '各山の石の数が空白区切りで与えられます。', ask: '通常ルールのNimで、先手必勝なら first、後手必勝なら second を出力してください。', h1: '全山のXOR(ニム和)。', h2: '0でなければ先手勝ち。', ref: 'a=list(map(int,input().split()))\nx=0\nfor v in a:\n    x^=v\nprint("first" if x else "second")', ins: ['1 2 3\n', '1 1\n', '5\n', '3 4 5\n', '2 2 2\n', '0 0\n'], tip: '💡 Nimの必勝判定は全山のXOR(ニム和)が0かどうか。' })
t({ lv: 550, concept: 'ゲーム: 石取り(1〜3)', title: '石取りゲーム (1〜3個)', tags: ['ゲーム'], io: '石の総数 n が与えられます。', ask: '1〜3個ずつ交互に取り最後を取った人が勝つとき、先手必勝なら first、後手必勝なら second を出力してください。', h1: '4の倍数が負け形。', h2: 'n%4==0 で後手勝ち。', ref: 'n=int(input())\nprint("second" if n%4==0 else "first")', ins: ['4\n', '5\n', '1\n', '8\n', '3\n', '7\n'], tip: '💡 「k個まで取れる」ゲームは (k+1) で割った余りが鍵。' })

export const CATALOG = TASKS
