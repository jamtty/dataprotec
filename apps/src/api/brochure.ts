import { getStoredToken } from '@/store/useAuthStore'
import { safeJson } from '@/utils/apiUtils'

const API_BASE = '/renewal_react_v1/backend'

function authHeaders(): Record<string, string> {
  const token = getStoredToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export interface BrochureFile {
  id: number
  ori_name: string
  file_url: string
  file_ext: string
  file_size: number
}

export interface BrochureItem {
  id: number
  title: string
  category: string
  news_date: string
  desc: string
  content: string
  thumbnail: string
  is_active: number
  author_name: string
  view_count: number
  created_at: string
  updated_at: string
  files?: BrochureFile[]
}

export interface BrochureFormData {
  title: string
  category: string
  news_date: string
  desc: string
  content: string
  files?: File[]
}

export async function fetchBrochureList(
  params: Record<string, string | number>,
): Promise<{ items: BrochureItem[]; totalCount: number; totalPages: number }> {
  const query = new URLSearchParams(params as Record<string, string>).toString()
  const res = await fetch(`${API_BASE}/api/brochure.php?${query}`, { headers: authHeaders() })
  const data = await safeJson<{
    success: boolean; message?: string
    items?: BrochureItem[]; totalCount?: number; totalPages?: number
  }>(res)
  if (!data.success) throw new Error(data.message ?? '목록을 불러오지 못했습니다.')
  return {
    items:      data.items      ?? [],
    totalCount: data.totalCount ?? 0,
    totalPages: data.totalPages ?? 1,
  }
}

export async function fetchBrochureDetail(
  id: number,
): Promise<{ item: BrochureItem; files: BrochureFile[] }> {
  const res = await fetch(`${API_BASE}/api/brochure.php?id=${id}&with_files=1`, { headers: authHeaders() })
  const data = await safeJson<{
    success: boolean; message?: string
    item?: BrochureItem; files?: BrochureFile[]
  }>(res)
  if (!data.success) throw new Error(data.message ?? '상세 정보를 불러오지 못했습니다.')
  return { item: data.item!, files: data.files ?? [] }
}

export async function createBrochure(formData: BrochureFormData): Promise<void> {
  const form = new FormData()
  form.append('title',     formData.title)
  form.append('category',  formData.category)
  form.append('news_date', formData.news_date)
  form.append('desc',      formData.desc)
  form.append('content',   formData.content)
  if (formData.files) formData.files.forEach(f => form.append('files[]', f))
  const res = await fetch(`${API_BASE}/api/brochure.php`, {
    method: 'POST',
    headers: authHeaders(),
    body: form,
  })
  const data = await safeJson<{ success: boolean; message?: string }>(res)
  if (!data.success) throw new Error(data.message ?? '등록에 실패했습니다.')
}

export async function updateBrochure(id: number, formData: BrochureFormData): Promise<void> {
  const form = new FormData()
  form.append('_method',   'PUT')
  form.append('id',        String(id))
  form.append('title',     formData.title)
  form.append('category',  formData.category)
  form.append('news_date', formData.news_date)
  form.append('desc',      formData.desc)
  form.append('content',   formData.content)
  if (formData.files) formData.files.forEach(f => form.append('files[]', f))
  const res = await fetch(`${API_BASE}/api/brochure.php`, {
    method: 'POST',
    headers: authHeaders(),
    body: form,
  })
  const data = await safeJson<{ success: boolean; message?: string }>(res)
  if (!data.success) throw new Error(data.message ?? '수정에 실패했습니다.')
}

export async function deleteBrochure(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/brochure.php?id=${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  const data = await safeJson<{ success: boolean; message?: string }>(res)
  if (!data.success) throw new Error(data.message ?? '삭제에 실패했습니다.')
}

export async function deleteBrochureFile(fileId: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/brochure-file.php?id=${fileId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  const data = await safeJson<{ success: boolean; message?: string }>(res)
  if (!data.success) throw new Error(data.message ?? '파일 삭제에 실패했습니다.')
}

// ── 브로슈어 신청 (g5_write_brochure) ───────────────────────────

export interface BrochureRequestPayload {
  company: string
  manager: string
  phone: string
  email: string
  memo?: string
}

export interface BrochureRequestItem {
  id: number
  company: string
  manager: string
  phone: string
  email: string
  download_at: string
  memo: string
}

export async function submitBrochureRequest(payload: BrochureRequestPayload): Promise<void> {
  const res = await fetch(`${API_BASE}/api/brochure-request.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await safeJson<{ success: boolean; message?: string }>(res)
  if (!data.success) throw new Error(data.message ?? '신청에 실패했습니다.')
}

export async function fetchBrochureRequestList(
  params: Record<string, string | number>,
): Promise<{ items: BrochureRequestItem[]; totalCount: number; totalPages: number }> {
  const query = new URLSearchParams(params as Record<string, string>).toString()
  const res = await fetch(`${API_BASE}/api/brochure-request.php?${query}`, { headers: authHeaders() })
  const data = await safeJson<{
    success: boolean; message?: string
    items?: BrochureRequestItem[]; totalCount?: number; totalPages?: number
  }>(res)
  if (!data.success) throw new Error(data.message ?? '목록을 불러오지 못했습니다.')
  return {
    items:      data.items      ?? [],
    totalCount: data.totalCount ?? 0,
    totalPages: data.totalPages ?? 1,
  }
}

export async function deleteBrochureRequest(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/brochure-request.php?id=${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  const data = await safeJson<{ success: boolean; message?: string }>(res)
  if (!data.success) throw new Error(data.message ?? '삭제에 실패했습니다.')
}
