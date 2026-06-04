import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSidebar'
import RichEditor from '@/components/admin/RichEditor'
import { fetchPopup, createPopup, updatePopup, type PopupFormData } from '@/api/popup'

const DEVICE_OPTIONS = [
  { value: 'both',   label: 'PC와 모바일' },
  { value: 'pc',     label: 'PC' },
  { value: 'mobile', label: '모바일' },
]

const DEFAULT_FORM: PopupFormData = {
  device:        'both',
  begin_time:    '',
  end_time:      '',
  disable_hours: 24,
  pos_left:      50,
  pos_top:       120,
  width:         600,
  height:        600,
  subject:       '',
  content:       '',
  content_html:  1,
  is_active:     1,
}

export default function AdminPopupFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()
  const isEdit = !!id

  const [form, setForm] = useState<PopupFormData>(DEFAULT_FORM)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 수정 시 기존 데이터 로드
  useEffect(() => {
    if (!isEdit) return
    setFetching(true)
    fetchPopup(Number(id))
      .then((item) => {
        setForm({
          device:        item.device,
          begin_time:    item.begin_time?.slice(0, 16) ?? '',
          end_time:      item.end_time?.slice(0, 16) ?? '',
          disable_hours: item.disable_hours,
          pos_left:      item.pos_left,
          pos_top:       item.pos_top,
          width:         item.width,
          height:        item.height,
          subject:       item.subject,
          content:       item.content,
          content_html:  item.content_html,
          is_active:     item.is_active,
        })
      })
      .catch((err: unknown) => setError(err instanceof Error ? err.message : '불러오기 실패'))
      .finally(() => setFetching(false))
  }, [id, isEdit])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.subject.trim()) { alert('팝업 제목을 입력해주세요.'); return }
    setLoading(true)
    setError(null)
    try {
      // datetime-local → 'YYYY-MM-DD HH:MM:SS' 변환
      const toDbDate = (v: string) => v ? v.replace('T', ' ') + ':00' : '0000-00-00 00:00:00'
      const payload: PopupFormData = {
        ...form,
        begin_time: toDbDate(form.begin_time),
        end_time:   toDbDate(form.end_time),
      }
      if (isEdit) {
        await updatePopup(Number(id), payload)
      } else {
        await createPopup(payload)
      }
      navigate('/admin/popup')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '저장 실패')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) return (
    <div className="adm_wrap">
      <AdminSidebar />
      <div className="adm_content">
        <AdminHeader pageTitle={isEdit ? '팝업 수정' : '팝업 등록'} />
        <main className="adm_main">
          <p style={{ padding: '2rem' }}>불러오는 중...</p>
        </main>
      </div>
    </div>
  )

  return (
    <div className="adm_wrap">
      <AdminSidebar />
      <div className="adm_content">
        <AdminHeader pageTitle={isEdit ? '팝업 수정' : '팝업 등록'} />
        <main className="adm_main">
          <section className="adm_section">
            {error && <p className="adm_error_msg">{error}</p>}
            <form className="adm_form" onSubmit={handleSubmit}>

              {/* 사용여부 */}
              <div className="adm_form_row">
                <label className="adm_form_label">사용여부</label>
                <div className="adm_form_field">
                  <label className="adm_radio_label">
                    <input
                      type="radio" name="is_active" value={1}
                      checked={form.is_active === 1}
                      onChange={() => setForm((prev) => ({ ...prev, is_active: 1 }))}
                    />
                    사용
                  </label>
                  <label className="adm_radio_label" style={{ marginLeft: '1.5rem' }}>
                    <input
                      type="radio" name="is_active" value={0}
                      checked={form.is_active === 0}
                      onChange={() => setForm((prev) => ({ ...prev, is_active: 0 }))}
                    />
                    사용 안함
                  </label>
                </div>
              </div>

              {/* 접속기기 */}
              <div className="adm_form_row">
                <label className="adm_form_label">접속기기</label>
                <select name="device" value={form.device} onChange={handleChange} className="adm_form_select">
                  {DEVICE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* 팝업 제목 */}
              <div className="adm_form_row">
                <label className="adm_form_label">
                  팝업 제목 <span className="required">*</span>
                </label>
                <input
                  type="text" name="subject"
                  value={form.subject} onChange={handleChange}
                  className="adm_form_input"
                  placeholder="팝업 제목을 입력해주세요."
                  required
                />
              </div>

              {/* 시작/종료 일시 */}
              <div className="adm_form_row">
                <label className="adm_form_label">시작일시</label>
                <input
                  type="datetime-local" name="begin_time"
                  value={form.begin_time} onChange={handleChange}
                  className="adm_form_input" style={{ width: '20rem', flex: 'none' }}
                />
              </div>
              <div className="adm_form_row">
                <label className="adm_form_label">종료일시</label>
                <input
                  type="datetime-local" name="end_time"
                  value={form.end_time} onChange={handleChange}
                  className="adm_form_input" style={{ width: '20rem', flex: 'none' }}
                />
              </div>

              {/* 다시보지않음 */}
              <div className="adm_form_row">
                <label className="adm_form_label">다시보지않음</label>
                <div className="adm_form_field adm_form_inline">
                  <input
                    type="number" name="disable_hours" min={0} max={720}
                    value={form.disable_hours} onChange={handleChange}
                    className="adm_form_input adm_input_sm"
                  />
                  <span className="adm_form_unit">시간</span>
                </div>
              </div>

              {/* 위치 / 크기 */}
              <div className="adm_form_row">
                <label className="adm_form_label">팝업레이어 좌측 위치</label>
                <div className="adm_form_field adm_form_inline">
                  <input
                    type="number" name="pos_left" min={0}
                    value={form.pos_left} onChange={handleChange}
                    className="adm_form_input adm_input_sm"
                  />
                  <span className="adm_form_unit">px</span>
                </div>
              </div>
              <div className="adm_form_row">
                <label className="adm_form_label">팝업레이어 상단 위치</label>
                <div className="adm_form_field adm_form_inline">
                  <input
                    type="number" name="pos_top" min={0}
                    value={form.pos_top} onChange={handleChange}
                    className="adm_form_input adm_input_sm"
                  />
                  <span className="adm_form_unit">px</span>
                </div>
              </div>
              <div className="adm_form_row">
                <label className="adm_form_label">팝업레이어 넓이</label>
                <div className="adm_form_field adm_form_inline">
                  <input
                    type="number" name="width" min={100}
                    value={form.width} onChange={handleChange}
                    className="adm_form_input adm_input_sm"
                  />
                  <span className="adm_form_unit">px</span>
                </div>
              </div>
              <div className="adm_form_row">
                <label className="adm_form_label">팝업레이어 높이</label>
                <div className="adm_form_field adm_form_inline">
                  <input
                    type="number" name="height" min={100}
                    value={form.height} onChange={handleChange}
                    className="adm_form_input adm_input_sm"
                  />
                  <span className="adm_form_unit">px</span>
                </div>
              </div>

              {/* 내용 */}
              <div className="adm_form_row adm_form_row_col">
                <label className="adm_form_label">내용</label>
                <div className="adm_form_field">
                  <RichEditor
                    value={form.content}
                    onChange={(html) => setForm((prev) => ({ ...prev, content: html, content_html: 1 }))}
                    placeholder="팝업 내용을 입력해주세요."
                  />
                </div>
              </div>

              {/* 저장/취소 */}
              <div className="adm_form_actions">
                <button type="submit" className="adm_btn_primary" disabled={loading}>
                  {loading ? '저장 중...' : isEdit ? '수정' : '등록'}
                </button>
                <button type="button" className="adm_btn_secondary" onClick={() => navigate('/admin/popup')}>
                  취소
                </button>
              </div>

            </form>
          </section>
        </main>
      </div>
    </div>
  )
}

