import { getStoredToken } from '@/store/useAuthStore'
import { safeJson } from '@/utils/apiUtils'

const API_BASE = '/backend'

function authHeaders(): Record<string, string> {
  const token = getStoredToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export interface InquiryItem {
  id: number
  company: string
  manager: string
  phone: string
  email: string
  content: string
  is_read: number
  created_at: string
}

// -------------------------------------------------------
//  목록 조회
// -------------------------------------------------------
export async function fetchInquiryList(
  params: Record<string, string | number>,
): Promise<{ items: InquiryItem[]; totalCount: number; totalPages: number }> {
  const query = new URLSearchParams(params as Record<string, string>).toString()
  const res = await fetch(`${API_BASE}/api/inquiry.php?${query}`, { headers: authHeaders() })
  const data = await safeJson<{
    success: boolean; message?: string
    items?: InquiryItem[]; totalCount?: number; totalPages?: number
  }>(res)
  if (!data.success) throw new Error(data.message ?? '목록을 불러오지 못했습니다.')
  return {
    items:      data.items      ?? [],
    totalCount: data.totalCount ?? 0,
    totalPages: data.totalPages ?? 1,
  }
}

// -------------------------------------------------------
//  상세 조회
// -------------------------------------------------------
export async function fetchInquiryDetail(id: number): Promise<InquiryItem> {
  const res = await fetch(`${API_BASE}/api/inquiry.php?id=${id}`, { headers: authHeaders() })
  const data = await safeJson<{ success: boolean; message?: string; item?: InquiryItem }>(res)
  if (!data.success) throw new Error(data.message ?? '상세 정보를 불러오지 못했습니다.')
  return data.item!
}

// -------------------------------------------------------
//  등록 (공개 - 고객 문의 제출)
// -------------------------------------------------------
export async function submitInquiry(body: {
  company: string; manager: string; phone: string; email: string; content: string
}): Promise<void> {
  const res = await fetch(`${API_BASE}/api/inquiry.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await safeJson<{ success: boolean; message?: string }>(res)
  if (!data.success) throw new Error(data.message ?? '문의 전송에 실패했습니다.')
}

// -------------------------------------------------------
//  삭제
// -------------------------------------------------------
export async function deleteInquiry(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/inquiry.php?id=${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  const data = await safeJson<{ success: boolean; message?: string }>(res)
  if (!data.success) throw new Error(data.message ?? '삭제에 실패했습니다.')
}
