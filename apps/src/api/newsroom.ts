import { getStoredToken } from '@/store/useAuthStore'

const API_BASE = '/renewal_react_v1/backend'

function authHeaders(): Record<string, string> {
  const token = getStoredToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export interface NewsroomFile {
  id: number
  ori_name: string   // 원본 파일명
  file_url: string   // 접근 URL
  file_ext: string   // 확장자 (소문자, 점 없음)
  file_size: number
}

export interface NewsroomItem {
  id: number
  title: string
  news_date: string    // YYYY-MM-DD
  desc: string         // 목록용 요약문
  content: string      // 본문
  thumbnail: string    // 썸네일 URL (첫 번째 이미지 파일 자동 설정)
  is_active: number    // 1: 게시, 0: 숨김
  author_name: string
  view_count: number
  created_at: string
  updated_at: string
  files?: NewsroomFile[]
}

export interface NewsroomFormData {
  title: string
  news_date: string
  desc: string
  content: string
  files?: File[]
}

// -------------------------------------------------------
//  목록 조회
// -------------------------------------------------------
export async function fetchNewsroomList(
  params: Record<string, string | number>,
): Promise<{ items: NewsroomItem[]; totalCount: number; totalPages: number }> {
  const query = new URLSearchParams(params as Record<string, string>).toString()
  const res = await fetch(`${API_BASE}/api/newsroom.php?${query}`, { headers: authHeaders() })
  const data = await res.json() as {
    success: boolean; message?: string
    items?: NewsroomItem[]; totalCount?: number; totalPages?: number
  }
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
export async function fetchNewsroomDetail(
  id: number,
  _withFiles?: boolean,
): Promise<{ item: NewsroomItem; files: NewsroomFile[] }> {
  const res = await fetch(`${API_BASE}/api/newsroom.php?id=${id}&with_files=1`, { headers: authHeaders() })
  const data = await res.json() as {
    success: boolean; message?: string
    item?: NewsroomItem; files?: NewsroomFile[]
  }
  if (!data.success) throw new Error(data.message ?? '상세 정보를 불러오지 못했습니다.')
  return { item: data.item!, files: data.files ?? [] }
}

// -------------------------------------------------------
//  등록
// -------------------------------------------------------
export async function createNewsroom(formData: NewsroomFormData): Promise<void> {
  const form = new FormData()
  form.append('title',     formData.title)
  form.append('category',  formData.category)
  form.append('news_date', formData.news_date)
  form.append('desc',      formData.desc)
  form.append('content',   formData.content)
  if (formData.files) formData.files.forEach(f => form.append('files[]', f))
  const res = await fetch(`${API_BASE}/api/newsroom.php`, {
    method: 'POST',
    headers: authHeaders(),
    body: form,
  })
  const data = await res.json() as { success: boolean; message?: string }
  if (!data.success) throw new Error(data.message ?? '등록에 실패했습니다.')
}

// -------------------------------------------------------
//  수정
// -------------------------------------------------------
export async function updateNewsroom(id: number, formData: NewsroomFormData): Promise<void> {
  const form = new FormData()
  form.append('_method',   'PUT')
  form.append('id',        String(id))
  form.append('title',     formData.title)
  form.append('news_date', formData.news_date)
  form.append('desc',      formData.desc)
  form.append('content',   formData.content)
  if (formData.files) formData.files.forEach(f => form.append('files[]', f))
  const res = await fetch(`${API_BASE}/api/newsroom.php`, {
    method: 'POST',
    headers: authHeaders(),
    body: form,
  })
  const data = await res.json() as { success: boolean; message?: string }
  if (!data.success) throw new Error(data.message ?? '수정에 실패했습니다.')
}

// -------------------------------------------------------
//  삭제
// -------------------------------------------------------
export async function deleteNewsroom(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/newsroom.php?id=${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  const data = await res.json() as { success: boolean; message?: string }
  if (!data.success) throw new Error(data.message ?? '삭제에 실패했습니다.')
}

// -------------------------------------------------------
//  첨부파일 삭제
// -------------------------------------------------------
export async function deleteNewsroomFile(fileId: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/newsroom-file.php?id=${fileId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  const data = await res.json() as { success: boolean; message?: string }
  if (!data.success) throw new Error(data.message ?? '파일 삭제에 실패했습니다.')
}
