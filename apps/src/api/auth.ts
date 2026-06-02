import { getStoredToken } from '@/store/useAuthStore'

const API_BASE = '/renewal_react_v1/backend'

export interface LoginResult {
  token: string
  user: { id: number; name: string }
}

export async function loginAdmin(id: string, password: string): Promise<LoginResult> {
  const res = await fetch(`${API_BASE}/api/login.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, password }),
  })
  let data: { success: boolean; message?: string; token?: string; user?: { id: number; name: string } }
  try {
    data = await res.json()
  } catch {
    throw new Error(`서버 응답을 처리할 수 없습니다. (HTTP ${res.status})`)
  }
  if (!res.ok || !data.success) {
    throw new Error(data.message ?? '로그인에 실패했습니다.')
  }
  return data as LoginResult
}

export async function changePassword(currentPw: string, newPw: string, _confirmPw?: string): Promise<void> {
  const token = getStoredToken()
  const res = await fetch(`${API_BASE}/api/change-password.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ current_password: currentPw, new_password: newPw }),
  })
  const data = await res.json() as { success: boolean; message?: string }
  if (!res.ok || !data.success) {
    throw new Error(data.message ?? '비밀번호 변경에 실패했습니다.')
  }
}
