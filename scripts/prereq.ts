// 前提知識チェック: 「難しい問題が、より前で教わっていない土台機能を初めて使っていないか」を検査。
// = 『そんなコード知らない！』をゼロにするための検証ツール。
import { firstIntroducers, findPrereqGaps, FEATURES, FOUNDATIONAL_CATEGORIES } from '../src/data/features.ts'
import { levelLabel } from '../src/data/levels.ts'

const intro = firstIntroducers()

// 土台機能が「いつ初登場するか」を一覧（遅すぎる初出は穴の候補）
const rows = FEATURES.filter((f) => FOUNDATIONAL_CATEGORIES.includes(f.category))
  .map((f) => ({ key: f.key, p: intro.get(f.key) }))
  .filter((r) => r.p)
  .sort((a, b) => a.p!.level - b.p!.level)

console.log('=== 土台機能の初出レベル ===')
for (const r of rows) console.log(`  ${levelLabel(r.p!.level)}  ${r.key}  (${r.p!.id})`)

const gaps = findPrereqGaps(50)
console.log(`\n=== 前提の穴（応用問題が土台機能を初出させている）: ${gaps.length}件 ===`)
for (const g of gaps) {
  console.log(`  ${levelLabel(g.problem.level)} ${g.problem.id} 「${g.problem.title}」`)
  for (const f of g.untaught) console.log(`      初出: ${f.key}`)
}
process.exit(gaps.length ? 1 : 0)
