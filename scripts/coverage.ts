// Prints the Python-feature coverage (same logic as the in-app page).
import { computeCoverage } from '../src/data/features.ts'

const statuses = computeCoverage()
const covered = statuses.filter((s) => s.example)
const missing = statuses.filter((s) => !s.example)

console.log(`カバー率: ${covered.length} / ${statuses.length} (${Math.round((covered.length / statuses.length) * 100)}%)`)
console.log(`\n未出題 (${missing.length}):`)
for (const m of missing) console.log(`  ✗ ${m.feature.category} / ${m.feature.key}`)
