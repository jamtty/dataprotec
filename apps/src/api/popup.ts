import { getStoredToken } from '@/store/useAuthStore'
import { safeJson } from '@/utils/apiUtils'

const API_BASE = '/backend'

function authHeaders(): Record<string, string> {
  const token = getStoredToken()
  return token
    ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json' }
}

export interface PopupItem {
  id: number
  device: string
  begin_time: string
  end_time: string
  disable_hours: number
  pos_left: number
  pos_top: number
  width: number
  height: number
  subject: string
  content: string
  content_html: number
  is_active: number
}

export type PopupFormData = Omit<PopupItem, 'id'>

// -------------------------------------------------------
//  목록 조회
// -------------------------------------------------------
export async function fetchPopupList(
  params: Record<string, string | number> = {},
): Promise<{ items: PopupItem[]; totalCount: number; totalPages: number }> {
  const query = new URLSearchParams(params as Record<string, string>).toString()
  const res = await fetch(`${API_BASE}/api/popup.php?${query}`, { headers: authHeaders() })
  const data = await safeJson<{
    success: boolean; message?: string
    items?: PopupItem[]; totalCount?: number; totalPages?: number
  }>(res)
  if (!data.success) throw new Error(data.message ?? '목록을 불러오지 못했습니다.')
  return {
    items:      data.items      ?? [],
    totalCount: data.totalCount ?? 0,
    totalPages: data.totalPages ?? 1,
  }
}

// -------------------------------------------------------
//  단건 조회
// -------------------------------------------------------
export async function fetchPopup(id: number): Promise<PopupItem> {
  const res = await fetch(`${API_BASE}/api/popup.php?id=${id}`, { headers: authHeaders() })
  const data = await safeJson<{ success: boolean; message?: string; item?: PopupItem }>(res)
  if (!data.success) throw new Error(data.message ?? '팝업 정보를 불러오지 못했습니다.')
  return data.item!
}

// -------------------------------------------------------
//  등록
// -------------------------------------------------------
export async function createPopup(body: PopupFormData): Promise<number> {
  const res = await fetch(`${API_BASE}/api/popup.php`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
  })
  const data = await safeJson<{ success: boolean; message?: string; id?: number }>(res)
  if (!data.success) throw new Error(data.message ?? '등록에 실패했습니다.')
  return data.id!
}

// -------------------------------------------------------
//  수정
// -------------------------------------------------------
export async function updatePopup(id: number, body: PopupFormData): Promise<void> {
  const res = await fetch(`${API_BASE}/api/popup.php?id=${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(body),
  })
  const data = await safeJson<{ success: boolean; message?: string }>(res)
  if (!data.success) throw new Error(data.message ?? '수정에 실패했습니다.')
}

// -------------------------------------------------------
//  사용여부 토글 (PATCH)
// -------------------------------------------------------
export async function togglePopupActive(id: number): Promise<number> {
  const res = await fetch(`${API_BASE}/api/popup.php?id=${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ toggle: 'active' }),
  })
  const data = await safeJson<{ success: boolean; message?: string; is_active?: number }>(res)
  if (!data.success) throw new Error(data.message ?? '사용여부 변경에 실패했습니다.')
  return data.is_active ?? 0
}

// -------------------------------------------------------
//  삭제
// -------------------------------------------------------
export async function deletePopup(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/popup.php?id=${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  const data = await safeJson<{ success: boolean; message?: string }>(res)
  if (!data.success) throw new Error(data.message ?? '삭제에 실패했습니다.')
}
