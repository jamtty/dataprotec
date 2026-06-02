import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSidebar'
import RichEditor from '@/components/admin/RichEditor'
import {
  createNewsroom,
  updateNewsroom,
  fetchNewsroomDetail,
  deleteNewsroomFile,
  type NewsroomFile,
} from '@/api/newsroom'
import { toAbsUrl } from '@/utils/uploadUrl'

export default function AdminNoticeFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)

  const LABEL = '뉴스룸'
  const LIST_PATH = '/admin/newsroom'

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // 첸부파일 1: 썸네일 (g5_board_file bf_no=0, bf_type=1)
  const [existingThumbnail, setExistingThumbnail] = useState<NewsroomFile | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)

  // 첸부파일 2: 다운로드 파일 (g5_board_file bf_no=1, bf_type=0)
  const [existingDownloadFile, setExistingDownloadFile] = useState<NewsroomFile | null>(null)
  const [downloadFile, setDownloadFile] = useState<File | null>(null)

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)

  useEffect(() => {
    if (!isEdit) return
    fetchNewsroomDetail(Number(id), true)
      .then((res) => {
        setTitle(res.item.title)
        setContent(res.item.content ?? '')
        // 썸네일: bf_no=0 (bf_type=1 또는 이미지 확장자)
        const IMG_EXTS = /^(jpg|jpeg|png|gif|webp)$/i
        setExistingThumbnail(
          res.files.find((f) => f.bf_no === 0 && (f.file_type === 1 || f.file_type === 2 || IMG_EXTS.test(f.file_ext))) ?? null
        )
        // 다운로드: bf_no=1
        setExistingDownloadFile(res.files.find((f) => f.bf_no === 1) ?? null)
      })
      .catch(() => {
        alert('게시글을 불러오지 못했습니다.')
        navigate(LIST_PATH)
      })
      .finally(() => setFetching(false))
  }, [id, isEdit, navigate])

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview)
    setThumbnailFile(file)
    setThumbnailPreview(URL.createObjectURL(file))
    e.target.value = ''
  }

  const removeThumbnailNew = () => {
    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview)
    setThumbnailFile(null)
    setThumbnailPreview(null)
  }

  const handleDownloadFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setDownloadFile(file)
    e.target.value = ''
  }

  const handleDeleteExistingThumbnail = async (wrId: number, bfNo: number) => {
    if (!confirm('썸네일을 삭제하시겠습니까?')) return
    try {
      await deleteNewsroomFile(wrId, bfNo)
      setExistingThumbnail(null)
    } catch {
      alert('썸네일 삭제에 실패했습니다.')
    }
  }

  const handleDeleteExistingDownloadFile = async (wrId: number, bfNo: number) => {
    if (!confirm('첨부파일을 삭제하시겠습니까?')) return
    try {
      await deleteNewsroomFile(wrId, bfNo)
      setExistingDownloadFile(null)
    } catch {
      alert('파일 삭제에 실패했습니다.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      alert('제목을 입력해주세요.')
      return
    }

    setLoading(true)
    try {
      const formData = {
        title,
        content,
        thumbnail:    thumbnailFile  ?? undefined,
        downloadFile: downloadFile   ?? undefined,
      }
      if (isEdit) {
        await updateNewsroom(Number(id), formData)
        alert('수정되었습니다.')
      } else {
        await createNewsroom(formData)
        alert('등록되었습니다.')
      }
      navigate(LIST_PATH)
    } catch (err: unknown) {
      const msg = err instanceof Error && err.message ? err.message : '저장에 실패했습니다.'
      if (msg.includes('인증') || msg.includes('토큰') || msg.includes('401')) {
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.')
        navigate('/admin/login')
      } else {
        alert(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="adm_wrap">
        <AdminSidebar />
        <div className="adm_content">
        <AdminHeader pageTitle={`${LABEL} 관리`} />
          <main className="adm_main">
            <p style={{ padding: '2rem' }}>불러오는 중...</p>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="adm_wrap">
      <AdminSidebar />
      <div className="adm_content">
        <AdminHeader pageTitle={isEdit ? `${LABEL} 수정` : `${LABEL} 등록`} />
        <main className="adm_main">
          <section className="adm_section">
            <form className="adm_form" onSubmit={handleSubmit}>

              {/* 제목 */}
              <div className="adm_form_row">
                <label className="adm_form_label">
                  제목 <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="adm_form_input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력해주세요."
                  required
                />
              </div>

              {/* 내용 */}
              <div className="adm_form_row adm_form_row_col">
                <label className="adm_form_label">내용</label>
                <RichEditor value={content} onChange={setContent} />
              </div>

              {/* 첨부파일 1: 썸네일 */}
              <div className="adm_form_row">
                <label className="adm_form_label">첨부파일 1 (썸네일)</label>
                <div>
                  {/* 기존 썸네일 (수정 시, 새 파일 미선택) */}
                  {existingThumbnail && !thumbnailFile && (
                    <div style={{ marginBottom: '8px' }}>
                      <img
                        src={toAbsUrl(existingThumbnail.file_url)}
                        alt="현재 썸네일"
                        style={{ width: 300, height: 200, objectFit: 'cover', display: 'block', borderRadius: 4, border: '1px solid #e5e7eb' }}
                      />
                      <div className="adm_file_item" style={{ marginTop: '6px' }}>
                        <span className="adm_file_name">{existingThumbnail.ori_name}</span>
                        <button
                          type="button"
                          className="adm_file_del"
                          onClick={() => handleDeleteExistingThumbnail(existingThumbnail.wr_id, existingThumbnail.bf_no)}
                        >
                          <span className="material-icons">close</span>
                        </button>
                      </div>
                    </div>
                  )}
                  {/* 새로 선택한 썸네일 미리보기 */}
                  {thumbnailPreview && (
                    <div style={{ marginBottom: '8px' }}>
                      <img
                        src={thumbnailPreview}
                        alt="새 썸네일"
                        style={{ width: 300, height: 200, objectFit: 'cover', display: 'block', borderRadius: 4, border: '1px solid #e5e7eb' }}
                      />
                      <div className="adm_file_item adm_file_new" style={{ marginTop: '6px' }}>
                        <span className="adm_file_name">{thumbnailFile?.name}</span>
                        <button type="button" className="adm_file_del" onClick={removeThumbnailNew}>
                          <span className="material-icons">close</span>
                        </button>
                      </div>
                    </div>
                  )}
                  <label className="adm_file_btn">
                    <span className="material-icons">image</span>
                    {existingThumbnail || thumbnailFile ? '썸네일 변경' : '썸네일 선택'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '6px' }}>
                    권장 크기: 300 × 200px · 이미지 파일(jpg, png, gif, webp)만 가능
                  </p>
                </div>
              </div>

              {/* 첨부파일 2: 다운로드 파일 */}
              <div className="adm_form_row">
                <label className="adm_form_label">첨부파일 2 (다운로드)</label>
                <div>
                  {/* 기존 다운로드 파일 */}
                  {existingDownloadFile && (
                    <div style={{ marginBottom: '8px' }}>
                      <div className="adm_file_item">
                        <span className="material-icons" style={{ fontSize: '20px', color: '#6b7280' }}>insert_drive_file</span>
                        <a
                          href={toAbsUrl(existingDownloadFile.file_url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="adm_file_name"
                        >
                          {existingDownloadFile.ori_name}
                        </a>
                        <button
                          type="button"
                          className="adm_file_del"
                          onClick={() => handleDeleteExistingDownloadFile(existingDownloadFile.wr_id, existingDownloadFile.bf_no)}
                        >
                          <span className="material-icons">close</span>
                        </button>
                      </div>
                    </div>
                  )}
                  {/* 새로 선택한 다운로드 파일 */}
                  {downloadFile && (
                    <div className="adm_file_item adm_file_new" style={{ marginBottom: '8px' }}>
                      <span className="material-icons" style={{ fontSize: '20px', color: '#6b7280' }}>insert_drive_file</span>
                      <span className="adm_file_name">{downloadFile.name}</span>
                      <button type="button" className="adm_file_del" onClick={() => setDownloadFile(null)}>
                        <span className="material-icons">close</span>
                      </button>
                    </div>
                  )}
                  <label className="adm_file_btn">
                    <span className="material-icons">attach_file</span>
                    {existingDownloadFile || downloadFile ? '파일 변경' : '파일 선택'}
                    <input
                      type="file"
                      onChange={handleDownloadFileChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </div>

              <div className="adm_form_btns">
                <button
                  type="button"
                  className="adm_btn_secondary"
                  onClick={() => navigate(LIST_PATH)}
                >
                  취소
                </button>
                <button type="submit" className="adm_btn_primary" disabled={loading}>
                  {loading ? '저장 중...' : isEdit ? '수정 완료' : '등록'}
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  )
}
