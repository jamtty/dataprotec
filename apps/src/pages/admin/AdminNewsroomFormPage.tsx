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
  const [newsDate, setNewsDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [desc, setDesc] = useState('')
  const [content, setContent] = useState('')
  const [existingFiles, setExistingFiles] = useState<NewsroomFile[]>([])
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [newFilePreviews, setNewFilePreviews] = useState<(string | null)[]>([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)

  const isImageFile = (name: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(name)

  useEffect(() => {
    if (!isEdit) return
    fetchNewsroomDetail(Number(id), true)
      .then((res) => {
        setTitle(res.item.title)
        setNewsDate(res.item.news_date || '')
        setDesc(res.item.desc || '')
        setContent(res.item.content ?? '')
        setExistingFiles(res.files)
      })
      .catch(() => {
        alert('게시글을 불러오지 못했습니다.')
        navigate(LIST_PATH)
      })
      .finally(() => setFetching(false))
  }, [id, isEdit, navigate])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const added = Array.from(e.target.files!)
    setNewFiles((prev) => [...prev, ...added])
    setNewFilePreviews((prev) => [
      ...prev,
      ...added.map((f) => (isImageFile(f.name) ? URL.createObjectURL(f) : null)),
    ])
    e.target.value = ''
  }

  const removeNewFile = (index: number) => {
    const preview = newFilePreviews[index]
    if (preview) URL.revokeObjectURL(preview)
    setNewFiles((prev) => prev.filter((_, i) => i !== index))
    setNewFilePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDeleteExistingFile = async (fileId: number) => {
    if (!confirm('첨부파일을 삭제하시겠습니까?')) return
    try {
      await deleteNewsroomFile(fileId)
      setExistingFiles((prev) => prev.filter((f) => f.id !== fileId))
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
        news_date: newsDate,
        desc,
        content,
        files: newFiles.length > 0 ? newFiles : undefined,
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
      alert(err instanceof Error && err.message ? err.message : '저장에 실패했습니다.')
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

              {/* 게시일 */}
              <div className="adm_form_row">
                <label className="adm_form_label">게시일 <span className="required">*</span></label>
                <input
                  type="date"
                  className="adm_form_input"
                  value={newsDate}
                  onChange={(e) => setNewsDate(e.target.value)}
                  required
                />
              </div>

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

              {/* 요약 */}
              <div className="adm_form_row adm_form_row_col">
                <label className="adm_form_label">요약</label>
                <textarea
                  className="adm_form_input"
                  rows={3}
                  placeholder="목록화면에 표시되는 단락 요약을 입력하세요."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              {/* 내용 */}
              <div className="adm_form_row adm_form_row_col">
                <label className="adm_form_label">내용</label>
                <RichEditor value={content} onChange={setContent} />
              </div>

              {/* 첨부파일 */}
              <div className="adm_form_row adm_form_row_col">
                <label className="adm_form_label">첨부파일</label>
                <div>
                  {existingFiles.length > 0 && (
                    <ul className="adm_file_list">
                      {existingFiles.map((f) => (
                        <li key={f.id} className="adm_file_item">
                          {/^(jpg|jpeg|png|gif|webp)$/i.test(f.file_ext) && (
                            <img
                              src={toAbsUrl(f.file_url)}
                              className="adm_file_thumb"
                              alt={f.ori_name}
                            />
                          )}
                          <a
                            href={toAbsUrl(f.file_url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="adm_file_name"
                          >
                            {f.ori_name}
                          </a>
                          <button
                            type="button"
                            className="adm_file_del"
                            onClick={() => handleDeleteExistingFile(f.id)}
                          >
                            <span className="material-icons">close</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {newFiles.map((f, i) => (
                    <div key={i} className="adm_file_item adm_file_new">
                      {newFilePreviews[i] && (
                        <img src={newFilePreviews[i]!} className="adm_file_thumb" alt={f.name} />
                      )}
                      <span className="adm_file_name">{f.name}</span>
                      <button type="button" className="adm_file_del" onClick={() => removeNewFile(i)}>
                        <span className="material-icons">close</span>
                      </button>
                    </div>
                  ))}
                  <label className="adm_file_btn">
                    <span className="material-icons">attach_file</span>
                    파일 선택
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
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
