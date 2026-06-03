// 各レベルの問題数を数え、2問未満のレベルを列挙する。
import { ALL_PROBLEMS } from '../src/data/index.ts'
import { MAX_LEVEL } from '../src/data/levels.ts'

const count = new Map<number, number>()
for (const p of ALL_PROBLEMS) count.set(p.level, (count.get(p.level) ?? 0) + 1)

const thin: number[] = []
for (let L = 1; L <= MAX_LEVEL; L++) if ((count.get(L) ?? 0) < 2) thin.push(L)

console.log(`2問未満のレベル: ${thin.length} 段`)
console.log(thin.map((l) => 'lv' + String(l).padStart(3, '0')).join(', '))
