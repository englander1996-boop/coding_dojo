// 各レベルの問題数を数え、N問未満のレベルを列挙する。N は引数で指定(既定2)。
// 例: node scripts/check-thin.ts 3
import { ALL_PROBLEMS } from '../src/data/index.ts'
import { MAX_LEVEL } from '../src/data/levels.ts'

const N = Math.max(1, Number(process.argv[2] ?? 2))

const count = new Map<number, number>()
for (const p of ALL_PROBLEMS) count.set(p.level, (count.get(p.level) ?? 0) + 1)

const thin: number[] = []
for (let L = 1; L <= MAX_LEVEL; L++) if ((count.get(L) ?? 0) < N) thin.push(L)

console.log(`${N}問未満のレベル: ${thin.length} 段`)
console.log(thin.map((l) => 'lv' + String(l).padStart(3, '0')).join(', '))
