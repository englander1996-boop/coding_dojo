// lv001..lv999 の全段に問題が1問以上あるかを検査する。
import { ALL_PROBLEMS } from '../src/data/index.ts'
import { MAX_LEVEL } from '../src/data/levels.ts'

const count = new Map<number, number>()
for (const p of ALL_PROBLEMS) count.set(p.level, (count.get(p.level) ?? 0) + 1)

const empty: number[] = []
for (let L = 1; L <= MAX_LEVEL; L++) if (!count.get(L)) empty.push(L)

const filled = MAX_LEVEL - empty.length
console.log(`lv001..lv${MAX_LEVEL}: ${filled}/${MAX_LEVEL} 段に問題あり`)
if (empty.length === 0) {
  console.log('空の段: なし（全段に1問以上）')
} else {
  console.log(`空の段 (${empty.length}): ${empty.slice(0, 60).map((l) => 'lv' + String(l).padStart(3, '0')).join(', ')}${empty.length > 60 ? ' …' : ''}`)
}
