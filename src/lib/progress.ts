// 進捗の保存。アカウント代わりの「ローカルプロフィール」をブラウザ(localStorage)に
// 複数持てる。バックエンド不要・同一端末のみ。プロフィールごとに「解いた問題ID」
// 「コード下書き」「解いた日付(ストリーク用)」を名前空間を分けて保存する。
//
// React から購読できるよう、変更時にバージョンを上げて通知する簡易ストアを兼ねる。
// 既存の API (isSolved/markSolved/solvedIds/solvedInLevel/loadCode/saveCode) は
// アクティブなプロフィールに対して動くよう維持している。

import { useSyncExternalStore } from 'react'

export type Profile = { id: string; name: string; createdAt: number }

const PROFILES_KEY = 'code-dojo:profiles'
const ACTIVE_KEY = 'code-dojo:active'
// 旧キー(プロフィール導入前)。初回に default プロフィールへ移行する。
const LEGACY_SOLVED = 'code-dojo:solved'
const LEGACY_CODE = 'code-dojo:code'

// ---- 変更通知(購読) ---------------------------------------------------------
let version = 0
const listeners = new Set<() => void>()
function notify() {
  version++
  listeners.forEach((l) => l())
}
function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}
function getVersion() {
  return version
}

/** 進捗/プロフィールの変更に追随する React フック(値はバージョン番号)。 */
export function useProgressVersion(): number {
  return useSyncExternalStore(subscribe, getVersion, getVersion)
}

// ---- プロフィール管理 -------------------------------------------------------
function readProfiles(): Profile[] {
  try {
    const raw = localStorage.getItem(PROFILES_KEY)
    return raw ? (JSON.parse(raw) as Profile[]) : []
  } catch {
    return []
  }
}
function writeProfiles(ps: Profile[]) {
  localStorage.setItem(PROFILES_KEY, JSON.stringify(ps))
}

function ensureInit(): void {
  let ps = readProfiles()
  if (ps.length === 0) {
    const id = 'p' + Date.now().toString(36)
    const def: Profile = { id, name: 'プレイヤー1', createdAt: Date.now() }
    ps = [def]
    writeProfiles(ps)
    localStorage.setItem(ACTIVE_KEY, id)
    // 旧データの移行
    try {
      const oldSolved = localStorage.getItem(LEGACY_SOLVED)
      if (oldSolved) localStorage.setItem(nsKey(id, 'solved'), oldSolved)
      const oldCode = localStorage.getItem(LEGACY_CODE)
      if (oldCode) localStorage.setItem(nsKey(id, 'code'), oldCode)
    } catch {
      // ignore
    }
  }
  if (!localStorage.getItem(ACTIVE_KEY)) {
    localStorage.setItem(ACTIVE_KEY, ps[0].id)
  }
}

export function listProfiles(): Profile[] {
  ensureInit()
  return readProfiles()
}

export function activeProfileId(): string {
  ensureInit()
  return localStorage.getItem(ACTIVE_KEY) || readProfiles()[0].id
}

export function activeProfile(): Profile {
  const id = activeProfileId()
  return readProfiles().find((p) => p.id === id) || readProfiles()[0]
}

export function switchProfile(id: string) {
  if (readProfiles().some((p) => p.id === id)) {
    localStorage.setItem(ACTIVE_KEY, id)
    notify()
  }
}

export function createProfile(name: string): Profile {
  ensureInit()
  const id = 'p' + Date.now().toString(36) + Math.floor(Math.random() * 1000).toString(36)
  const prof: Profile = { id, name: name.trim() || '名無し', createdAt: Date.now() }
  const ps = readProfiles()
  ps.push(prof)
  writeProfiles(ps)
  localStorage.setItem(ACTIVE_KEY, id)
  notify()
  return prof
}

export function renameProfile(id: string, name: string) {
  const ps = readProfiles()
  const p = ps.find((x) => x.id === id)
  if (p) {
    p.name = name.trim() || p.name
    writeProfiles(ps)
    notify()
  }
}

export function deleteProfile(id: string) {
  let ps = readProfiles()
  if (ps.length <= 1) return // 最低1つは残す
  ps = ps.filter((p) => p.id !== id)
  writeProfiles(ps)
  // 名前空間のデータも消す
  for (const suffix of ['solved', 'code', 'days']) {
    localStorage.removeItem(nsKey(id, suffix))
  }
  if (activeProfileId() === id) localStorage.setItem(ACTIVE_KEY, ps[0].id)
  notify()
}

/** プロフィールの進捗をJSON文字列で書き出す。 */
export function exportProfile(id: string): string {
  const prof = readProfiles().find((p) => p.id === id)
  return JSON.stringify({
    name: prof?.name ?? '名無し',
    solved: localStorage.getItem(nsKey(id, 'solved')) ? JSON.parse(localStorage.getItem(nsKey(id, 'solved'))!) : [],
    days: localStorage.getItem(nsKey(id, 'days')) ? JSON.parse(localStorage.getItem(nsKey(id, 'days'))!) : [],
  })
}

/** JSON文字列から新しいプロフィールとして取り込む。 */
export function importProfile(json: string): Profile | null {
  try {
    const data = JSON.parse(json) as { name?: string; solved?: string[]; days?: string[] }
    const prof = createProfile(data.name || 'インポート')
    if (Array.isArray(data.solved)) localStorage.setItem(nsKey(prof.id, 'solved'), JSON.stringify(data.solved))
    if (Array.isArray(data.days)) localStorage.setItem(nsKey(prof.id, 'days'), JSON.stringify(data.days))
    notify()
    return prof
  } catch {
    return null
  }
}

// ---- 名前空間キー -----------------------------------------------------------
function nsKey(profileId: string, suffix: string): string {
  return `cd:${profileId}:${suffix}`
}
function solvedKey() {
  return nsKey(activeProfileId(), 'solved')
}
function codeKey() {
  return nsKey(activeProfileId(), 'code')
}
function daysKey() {
  return nsKey(activeProfileId(), 'days')
}

// ---- 解いた問題(AC) ---------------------------------------------------------
function readSet(): Set<string> {
  try {
    ensureInit()
    const raw = localStorage.getItem(solvedKey())
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}
function writeSet(set: Set<string>) {
  localStorage.setItem(solvedKey(), JSON.stringify([...set]))
}

export function isSolved(id: string): boolean {
  return readSet().has(id)
}

export function markSolved(id: string) {
  const set = readSet()
  if (!set.has(id)) {
    set.add(id)
    writeSet(set)
    recordToday()
    notify()
  }
}

export function solvedIds(): Set<string> {
  return readSet()
}

/** あるレベル内で解いた問題数。 */
export function solvedInLevel(ids: string[]): number {
  const set = readSet()
  return ids.filter((id) => set.has(id)).length
}

// ---- 解いた日付(ストリーク用) ----------------------------------------------
function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
function recordToday() {
  try {
    const raw = localStorage.getItem(daysKey())
    const days: string[] = raw ? JSON.parse(raw) : []
    const t = todayStr()
    if (!days.includes(t)) {
      days.push(t)
      localStorage.setItem(daysKey(), JSON.stringify(days))
    }
  } catch {
    // ignore
  }
}
/** 解いた日付(YYYY-MM-DD)の一覧。 */
export function solvedDays(): string[] {
  try {
    ensureInit()
    const raw = localStorage.getItem(daysKey())
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

// ---- 問題ごとのコード下書き ------------------------------------------------
export function loadCode(id: string): string | null {
  try {
    const map = JSON.parse(localStorage.getItem(codeKey()) || '{}') as Record<string, string>
    return map[id] ?? null
  } catch {
    return null
  }
}

export function saveCode(id: string, code: string) {
  try {
    const map = JSON.parse(localStorage.getItem(codeKey()) || '{}') as Record<string, string>
    map[id] = code
    localStorage.setItem(codeKey(), JSON.stringify(map))
  } catch {
    // ignore quota errors
  }
}
