import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSidebar'
import DatePicker from '@/components/admin/DatePicker'
import { fetchPopupList, deletePopup, togglePopupActive, type PopupItem } from '@/api/popup'

const PAGE_SIZE = 15

const DEVICE_LABEL: Record<string, string> = {
  both:   'PC+모바일',
  pc:     'PC',
  mobile: '모바일',
}

function formatDate(dt: string) {
  if (!dt || dt.startsWith('0000')) return '-'
  return dt.replace('T', ' ').slice(0, 16)
}

type SearchParams = { keyword: string; type: number; date_from: string; date_to: string }
const defaultParams: SearchParams = { keyword: '', type: 2, date_from: '', date_to: '' }

export default function AdminPopupPage() {
  const navigate = useNavigate()
  const [items, setItems] = useState<PopupItem[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [searchParams, setSearchParams] = useState<SearchParams>(defaultParams)
  const [inputKeyword, setInputKeyword] = useState('')
  const [inputType, setInputType] = useState(2)
  const [inputDateFrom, setInputDateFrom] = useState('')
  const [inputDateTo, setInputDateTo] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkedIds, setCheckedIds] = useState<number[]>([])
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async (p: number, params: SearchParams) => {
    setLoading(true)
    setError(null)
    try {
      const query: Record<string, string | number> = { page: p, size: PAGE_SIZE }
      if (params.keyword) { query.keyword = params.keyword; query.type = params.type }
      if (params.date_from) query.date_from = params.date_from
      if (params.date_to)   query.date_to   = params.date_to
      const res = await fetchPopupList(query)
      setItems(res.items)
      setTotalCount(res.totalCount)
      setTotalPages(res.totalPages)
      setCheckedIds([])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '목록을 불러오지 못했습니다.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load(page, searchParams) }, [load, page, searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    setSearchParams({ keyword: inputKeyword, type: inputType, date_from: inputDateFrom, date_to: inputDateTo })
  }

  const handleReset = () => {
    setInputKeyword('')
    setInputType(2)
    setInputDateFrom('')
    setInputDateTo('')
    setPage(1)
    setSearchParams(defaultParams)
  }

  const allChecked = items.length > 0 && items.every((item) => checkedIds.includes(item.id))
  const handleCheckAll = () => setCheckedIds(allChecked ? [] : items.map((item) => item.id))
  const handleCheckOne = (id: number) =>
    setCheckedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`"${title}" 을(를) 삭제하시겠습니까?`)) return
    try {
      await deletePopup(id)
      load(page, searchParams)
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : '삭제 실패')
    }
  }

  const handleToggleActive = async (id: number) => {
    try {
      const newVal = await togglePopupActive(id)
      setItems((prev) => prev.map((item) => item.id === id ? { ...item, is_active: newVal } : item))
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : '사용여부 변경 실패')
    }
  }

  const handleBulkDelete = async () => {
    if (checkedIds.length === 0) return
    if (!confirm(`선택한 ${checkedIds.length}건을 삭제하시겠습니까?`)) return
    try {
      await Promise.all(checkedIds.map((id) => deletePopup(id)))
      load(page, searchParams)
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : '삭제 실패')
    }
  }

  return (
    <div className="adm_wrap">
      <AdminSidebar />
      <div className="adm_content">
        <AdminHeader pageTitle="팝업 관리" />
        <main className="adm_main">
          <section className="adm_section">
            <div className="adm_toolbar">
              <form className="adm_search_form" onSubmit={handleSearch}>
                <div className="adm_search_row">
                  <label className="adm_search_label">시작일</label>
                  <DatePicker value={inputDateFrom} onChange={setInputDateFrom} maxDate={inputDateTo || undefined} />
                  <label className="adm_search_label">종료일</label>
                  <DatePicker value={inputDateTo} onChange={setInputDateTo} minDate={inputDateFrom || undefined} />
                </div>
                <div className="adm_search_row">
                  <label className="adm_search_label">검색어</label>
                  <select className="adm_search_select" value={inputType} onChange={(e) => setInputType(Number(e.target.value))}>
                    <option value={2}>전체</option>
                    <option value={0}>제목</option>
                    <option value={1}>내용</option>
                  </select>
                  <input
                    type="text"
                    className="adm_search_keyword"
                    placeholder="검색어를 입력해주세요."
                    value={inputKeyword}
                    onChange={(e) => setInputKeyword(e.target.value)}
                  />
                  <button type="submit" className="adm_search_btn">
                    <span className="material-icons">search</span>
                  </button>
                  <button type="button" className="adm_btn_secondary" onClick={handleReset}>초기화</button>
                </div>
              </form>
              <button className="adm_btn_primary" onClick={() => navigate('/admin/popup/new')}>
                + 팝업 등록
              </button>
            </div>

            <div className="adm_table_wrap">
              <table className="adm_table">
                <thead>
                  <tr>
                    <th style={{ width: '4%' }}>
                      <input type="checkbox" checked={allChecked} onChange={handleCheckAll} />
                    </th>
                    <th style={{ width: '5%' }}>번호</th>
                    <th>제목</th>
                    <th style={{ width: '10%' }}>접속기기</th>
                    <th style={{ width: '14%' }}>시작일시</th>
                    <th style={{ width: '14%' }}>종료일시</th>
                    <th style={{ width: '10%' }}>크기(W×H)</th>
                    <th style={{ width: '9%' }}>사용여부</th>
                    <th style={{ width: '14%' }}>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={9} className="adm_table_empty">불러오는 중...</td></tr>
                  ) : error ? (
                    <tr><td colSpan={9} className="adm_table_empty">오류: {error}</td></tr>
                  ) : items.length === 0 ? (
                    <tr><td colSpan={9} className="adm_table_empty">팝업이 없습니다.</td></tr>
                  ) : items.map((item, idx) => (
                    <tr key={item.id}>
                      <td className="adm_td_center">
                        <input type="checkbox" checked={checkedIds.includes(item.id)} onChange={() => handleCheckOne(item.id)} />
                      </td>
                      <td className="adm_td_center">
                        {totalCount - (page - 1) * PAGE_SIZE - idx}
                      </td>
                      <td>
                        <Link to={`/admin/popup/${item.id}/edit`} className="adm_table_link">
                          {item.subject}
                        </Link>
                      </td>
                      <td className="adm_td_center">{DEVICE_LABEL[item.device] ?? item.device}</td>
                      <td className="adm_td_center">{formatDate(item.begin_time)}</td>
                      <td className="adm_td_center">{formatDate(item.end_time)}</td>
                      <td className="adm_td_center">{item.width} × {item.height}</td>
                      <td className="adm_td_center">
                        {(() => {
                          const expired = item.end_time && new Date(item.end_time) < new Date()
                          return (
                            <button
                              className={`adm_toggle_btn${(!expired && item.is_active) ? ' on' : ' off'}`}
                              onClick={() => !expired && handleToggleActive(item.id)}
                              disabled={!!expired}
                              title={expired ? '종료일이 지난 팝업' : item.is_active ? '사용 중 (클릭하면 사용 안함으로 변경)' : '사용 안함 (클릭하면 사용으로 변경)'}
                            >
                              {expired ? '만료' : item.is_active ? 'ON' : 'OFF'}
                            </button>
                          )
                        })()}
                      </td>
                      <td className="adm_td_center">
                        <div className="adm_action_btns">
                          <button
                            className="adm_btn_edit"
                            onClick={() => navigate(`/admin/popup/${item.id}/edit`)}
                          >
                            수정
                          </button>
                          <button
                            className="adm_btn_delete"
                            onClick={() => handleDelete(item.id, item.subject)}
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="adm_pagination">
              <div className="adm_pagination_left">
                {checkedIds.length > 0 && (
                  <button className="adm_btn_delete" onClick={handleBulkDelete}>선택 삭제 ({checkedIds.length})</button>
                )}
                <span className="adm_total_count">전 {totalCount.toLocaleString()}건</span>
              </div>
              <div className="adm_page_btns">
                <button className="adm_page_btn" disabled={page <= 1} onClick={() => setPage(1)}>{'<<'}</button>
                <button className="adm_page_btn" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>{'<'}</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => Math.abs(p - page) <= 2)
                  .map((p) => (
                    <button
                      key={p}
                      className={`adm_page_btn${p === page ? ' active' : ''}`}
                      onClick={() => setPage(p)}
                    >{p}</button>
                  ))}
                <button className="adm_page_btn" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>{'>'}</button>
                <button className="adm_page_btn" disabled={page >= totalPages} onClick={() => setPage(totalPages)}>{'>>'}</button>
              </div>
            </div>

          </section>
        </main>
      </div>
    </div>
  )
}
