import { useState, useEffect } from 'react'

export interface AuthUser {
  id: number | string
  email: string
  name: string
  role: string
  createdAt: string
}

interface AuthState {
  isAuthenticated: boolean
  accessToken: string | null
  user: AuthUser | null
}

const STORAGE_KEY = 'admin_auth'

function loadFromStorage(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { isAuthenticated: false, accessToken: null, user: null }
    return JSON.parse(raw) as AuthState
  } catch {
    return { isAuthenticated: false, accessToken: null, user: null }
  }
}

// 모듈 레벨 싱글톤 상태
let _state: AuthState = loadFromStorage()
const _listeners = new Set<() => void>()

function notify() {
  _listeners.forEach(fn => fn())
}

export function useAuthStore() {
  const [, rerender] = useState(0)

  useEffect(() => {
    const trigger = () => rerender(n => n + 1)
    _listeners.add(trigger)
    return () => {
      _listeners.delete(trigger)
    }
  }, [])

  const setAuth = (user: AuthUser, token: string) => {
    _state = { isAuthenticated: true, accessToken: token, user }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(_state))
    notify()
  }

  const clearAuth = () => {
    _state = { isAuthenticated: false, accessToken: null, user: null }
    localStorage.removeItem(STORAGE_KEY)
    notify()
  }

  return { ..._state, setAuth, clearAuth }
}

export function isTokenExpired(token: string | null): boolean {
  if (!token) return true
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return true
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
    const payload = JSON.parse(atob(padded)) as { exp?: number }
    return typeof payload.exp === 'number' && payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}

export function getStoredToken(): string | null {
  return loadFromStorage().accessToken
}
