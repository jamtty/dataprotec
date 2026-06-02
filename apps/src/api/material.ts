import { getStoredToken } from '@/store/useAuthStore'

const API_BASE = '/renewal_react_v1/backend'

function authHeaders(): Record<string, string> {
  const token = getStoredToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export interface MaterialFile {
  id: number
  ori_name: string
  file_url: string
  file_ext: string
  file_size: number
}

export interface MaterialItem {
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
  files?: MaterialFile[]
}

export interface MaterialFormData {
  title: string
  category: string
  news_date: string
  desc: string
  content: string
  files?: File[]
}

export async function fetchMaterialList(
  params: Record<string, string | number>,
): Promise<{ items: MaterialItem[]; totalCount: number; totalPages: number }> {
  const query = new URLSearchParams(params as Record<string, string>).toString()
  const res = await fetch(`${API_BASE}/api/material.php?${query}`, { headers: authHeaders() })
  const data = await res.json() as {
    success: boolean; message?: string
    items?: MaterialItem[]; totalCount?: number; totalPages?: number
  }
  if (!data.success) throw new Error(data.message ?? '목록을 불러오지 못했습니다.')
  return {
    items:      data.items      ?? [],
    totalCount: data.totalCount ?? 0,
    totalPages: data.totalPages ?? 1,
  }
}

export async function fetchMaterialDetail(
  id: number,
): Promise<{ item: MaterialItem; files: MaterialFile[] }> {
  const res = await fetch(`${API_BASE}/api/material.php?id=${id}&with_files=1`, { headers: authHeaders() })
  const data = await res.json() as {
    success: boolean; message?: string
    item?: MaterialItem; files?: MaterialFile[]
  }
  if (!data.success) throw new Error(data.message ?? '상세 정보를 불러오지 못했습니다.')
  return { item: data.item!, files: data.files ?? [] }
}

export async function createMaterial(formData: MaterialFormData): Promise<void> {
  const form = new FormData()
  form.append('title',     formData.title)
  form.append('category',  formData.category)
  form.append('news_date', formData.news_date)
  form.append('desc',      formData.desc)
  form.append('content',   formData.content)
  if (formData.files) formData.files.forEach(f => form.append('files[]', f))
  const res = await fetch(`${API_BASE}/api/material.php`, {
    method: 'POST',
    headers: authHeaders(),
    body: form,
  })
  const data = await res.json() as { success: boolean; message?: string }
  if (!data.success) throw new Error(data.message ?? '등록에 실패했습니다.')
}

export async function updateMaterial(id: number, formData: MaterialFormData): Promise<void> {
  const form = new FormData()
  form.append('_method',   'PUT')
  form.append('id',        String(id))
  form.append('title',     formData.title)
  form.append('category',  formData.category)
  form.append('news_date', formData.news_date)
  form.append('desc',      formData.desc)
  form.append('content',   formData.content)
  if (formData.files) formData.files.forEach(f => form.append('files[]', f))
  const res = await fetch(`${API_BASE}/api/material.php`, {
    method: 'POST',
    headers: authHeaders(),
    body: form,
  })
  const data = await res.json() as { success: boolean; message?: string }
  if (!data.success) throw new Error(data.message ?? '수정에 실패했습니다.')
}

export async function deleteMaterial(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/material.php?id=${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  const data = await res.json() as { success: boolean; message?: string }
  if (!data.success) throw new Error(data.message ?? '삭제에 실패했습니다.')
}

export async function deleteMaterialFile(fileId: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/material-file.php?id=${fileId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  const data = await res.json() as { success: boolean; message?: string }
  if (!data.success) throw new Error(data.message ?? '파일 삭제에 실패했습니다.')
}
