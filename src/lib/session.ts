import { CurrentUser } from '../types'

const GUEST_KEY = 'zos_guest_id'
const USER_KEY = 'zos_current_user'

export function getGuestId(): string {
  let id = localStorage.getItem(GUEST_KEY)
  if (!id) {
    id = 'guest_' + Math.random().toString(36).slice(2) + Date.now().toString(36)
    localStorage.setItem(GUEST_KEY, id)
  }
  return id
}

export function getCurrentUser(): CurrentUser | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as CurrentUser
  } catch {
    return null
  }
}

export function setCurrentUser(user: CurrentUser | null): void {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(USER_KEY)
  }
}
