import { db } from './db'
import { setCurrentUser } from './session'
import { CurrentUser } from '../types'

async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder().encode(password)
  const buf = await crypto.subtle.digest('SHA-256', enc)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function registerUser(username: string, email: string, password: string): Promise<CurrentUser> {
  if (!username.trim() || !email.trim() || password.length < 4) {
    throw new Error('Lütfen kullanıcı adı, e-posta ve en az 4 karakterli bir şifre girin.')
  }
  const existing = await db.select('users', `?or=(email.eq.${encodeURIComponent(email)},username.eq.${encodeURIComponent(username)})`)
  if (existing && existing.length > 0) {
    throw new Error('Bu kullanıcı adı veya e-posta zaten kayıtlı.')
  }
  const password_hash = await hashPassword(password)
  const created = await db.insert('users', { username, email, password_hash })
  const user = created[0]
  const current: CurrentUser = { id: user.id, username: user.username }
  setCurrentUser(current)
  return current
}

export async function loginUser(email: string, password: string): Promise<CurrentUser> {
  const password_hash = await hashPassword(password)
  const users = await db.select('users', `?email=eq.${encodeURIComponent(email)}`)
  if (!users || users.length === 0) {
    throw new Error('Bu e-posta ile kayıtlı bir kullanıcı bulunamadı.')
  }
  const user = users[0]
  if (user.password_hash !== password_hash) {
    throw new Error('Şifre hatalı, tekrar dener misin?')
  }
  const current: CurrentUser = { id: user.id, username: user.username }
  setCurrentUser(current)
  return current
}

export function logoutUser(): void {
  setCurrentUser(null)
}
