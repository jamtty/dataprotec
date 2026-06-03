import { getStoredToken } from '@/store/useAuthStore'
import { safeJson } from '@/utils/apiUtils'

const API_BASE = '/renewal_react_v1/backend'

function authHeaders(): Record<string, string> {
  const token = getStoredToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export interface MaterialFile {
  bf_no: number
  wr_id: number
  ori_name: string
  file_url: string
  thumb_url?: string
  file_type: number   // 1=이미지(썸네일), 0=일반파일
  file_ext: string
  file_size: number
}

export interface MaterialItem {
  id: number
  title: string
  news_date: string
  content: string
  thumbnail: string
  author_name: string
  view_count: number
  created_at: string
  updated_at: string
  files?: MaterialFile[]
}

export interface MaterialFormData {
  title: string
  content: string
  thumbnail?: File
  downloadFile?: File
}

export async function fetchMaterialList(
  params: Record<string, string | number>,
): Promise<{ items: MaterialItem[]; totalCount: number; totalPages: number }> {
  const query = new URLSearchParams(params as Record<string, string>).toString()
  const res = await fetch(`${API_BASE}/api/material.php?${query}`, { headers: authHeaders() })
  const data = await safeJson<{
    success: boolean; message?: string
    items?: MaterialItem[]; totalCount?: number; totalPages?: number
  }>(res)
  if (!data.success) throw new Error(data.message ?? '목록을 불러오지 못했습니다.')
  return {
    items:      data.items      ?? [],
    totalCount: data.totalCount ?? 0,
    totalPages: data.totalPages ?? 1,
  }
}

export async function fetchMaterialDetail(
  id: number,
  _withFiles?: boolean,
): Promise<{ item: MaterialItem; files: MaterialFile[] }> {
  const res = await fetch(`${API_BASE}/api/material.php?id=${id}&with_files=1`, { headers: authHeaders() })
  const data = await safeJson<{
    success: boolean; message?: string
    item?: MaterialItem; files?: MaterialFile[]
  }>(res)
  if (!data.success) throw new Error(data.message ?? '상세 정보를 불러오지 못했습니다.')
  return { item: data.item!, files: data.files ?? [] }
}

export async function createMaterial(formData: MaterialFormData): Promise<void> {
  const form = new FormData()
  form.append('title',   formData.title)
  form.append('content', formData.content)
  if (formData.thumbnail)    form.append('thumbnail',     formData.thumbnail)
  if (formData.downloadFile) form.append('download_file', formData.downloadFile)
  const res = await fetch(`${API_BASE}/api/material.php`, {
    method: 'POST',
    headers: authHeaders(),
    body: form,
  })
  if (res.status === 401) throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.')
  const data = await safeJson<{ success: boolean; message?: string }>(res)
  if (!data.success) throw new Error(data.message ?? '등록에 실패했습니다.')
}

export async function updateMaterial(id: number, formData: MaterialFormData): Promise<void> {
  const form = new FormData()
  form.append('_method',  'PUT')
  form.append('id',       String(id))
  form.append('title',    formData.title)
  form.append('content',  formData.content)
  if (formData.thumbnail)    form.append('thumbnail',     formData.thumbnail)
  if (formData.downloadFile) form.append('download_file', formData.downloadFile)
  const res = await fetch(`${API_BASE}/api/material.php`, {
    method: 'POST',
    headers: authHeaders(),
    body: form,
  })
  if (res.status === 401) throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.')
  const data = await safeJson<{ success: boolean; message?: string }>(res)
  if (!data.success) throw new Error(data.message ?? '수정에 실패했습니다.')
}

export async function deleteMaterial(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/material.php?id=${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  const data = await safeJson<{ success: boolean; message?: string }>(res)
  if (!data.success) throw new Error(data.message ?? '삭제에 실패했습니다.')
}

export async function deleteMaterialFile(wrId: number, bfNo: number, fileType?: number): Promise<void> {
  const ftParam = fileType !== undefined ? `&file_type=${fileType}` : ''
  const res = await fetch(`${API_BASE}/api/material-file.php?wr_id=${wrId}&bf_no=${bfNo}${ftParam}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  const data = await safeJson<{ success: boolean; message?: string }>(res)
  if (!data.success) throw new Error(data.message ?? '파일 삭제에 실패했습니다.')
}
