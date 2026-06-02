import { getStoredToken } from '@/store/useAuthStore'

const API_BASE = '/renewal_react_v1/backend'

function authHeaders(): Record<string, string> {
  const token = getStoredToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export interface NewsroomFile {
  bf_no: number      // g5_board_file.bf_no (0-based slot)
  wr_id: number      // g5_board_file.wr_id (post id)
  ori_name: string   // bf_source
  file_url: string   // bf_fileurl
  thumb_url: string  // bf_thumburl (이미지일 때 썸네일)
  file_type: number  // bf_type: 0=일반, 1=이미지
  file_ext: string
  file_size: number  // bf_filesize
}

export interface NewsroomItem {
  id: number
  title: string
  news_date: string    // YYYY-MM-DD
  content: string      // 본문
  thumbnail: string    // 썸네일 URL
  author_name: string
  view_count: number
  created_at: string
  updated_at: string
  files?: NewsroomFile[]
}

export interface NewsroomFormData {
  title: string
  content: string
  thumbnail?: File       // 썸네일 이미지 (wr_2)
  downloadFile?: File   // 다운로드 첨부파일 (newsroom_files)
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
  form.append('title',   formData.title)
  form.append('content', formData.content)
  if (formData.thumbnail)    form.append('thumbnail',     formData.thumbnail)
  if (formData.downloadFile) form.append('download_file', formData.downloadFile)
  const res = await fetch(`${API_BASE}/api/newsroom.php`, {
    method: 'POST',
    headers: authHeaders(),
    body: form,
  })
  if (res.status === 401) throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.')
  const data = await res.json() as { success: boolean; message?: string }
  if (!data.success) throw new Error(data.message ?? '등록에 실패했습니다.')
}

// -------------------------------------------------------
//  수정
// -------------------------------------------------------
export async function updateNewsroom(id: number, formData: NewsroomFormData): Promise<void> {
  const form = new FormData()
  form.append('_method',  'PUT')
  form.append('id',       String(id))
  form.append('title',    formData.title)
  form.append('content',  formData.content)
  if (formData.thumbnail)    form.append('thumbnail',     formData.thumbnail)
  if (formData.downloadFile) form.append('download_file', formData.downloadFile)
  const res = await fetch(`${API_BASE}/api/newsroom.php`, {
    method: 'POST',
    headers: authHeaders(),
    body: form,
  })
  if (res.status === 401) throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.')
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
export async function deleteNewsroomFile(wrId: number, bfNo: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/newsroom-file.php?wr_id=${wrId}&bf_no=${bfNo}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  const data = await res.json() as { success: boolean; message?: string }
  if (!data.success) throw new Error(data.message ?? '파일 삭제에 실패했습니다.')
}
