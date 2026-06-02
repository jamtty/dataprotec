import { useState, useEffect, useCallback } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { fetchInquiryList, fetchInquiryDetail, deleteInquiry, type InquiryItem } from '@/api/inquiry'

const PAGE_SIZE = 15

export default function AdminInquiryPage() {
  const [items, setItems] = useState<InquiryItem[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [inputKeyword, setInputKeyword] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkedIds, setCheckedIds] = useState<number[]>([])
  const [error, setError] = useState<string | null>(null)
  const [detail, setDetail] = useState<InquiryItem | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)

  const load = useCallback(async (p: number, kw: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchInquiryList({ page: p, size: PAGE_SIZE, ...(kw ? { keyword: kw } : {}) })
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

  useEffect(() => { load(page, keyword) }, [load, page, keyword])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    setKeyword(inputKeyword)
  }

  const handleReset = () => {
    setInputKeyword('')
    setPage(1)
    setKeyword('')
  }

  const allChecked = items.length > 0 && items.every((item) => checkedIds.includes(item.id))
  const handleCheckAll = () => setCheckedIds(allChecked ? [] : items.map((item) => item.id))
  const handleCheckOne = (id: number) =>
    setCheckedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]))

  const handleOpenDetail = async (id: number) => {
    setDetailLoading(true)
    try {
      const item = await fetchInquiryDetail(id)
      setDetail(item)
      // 목록의 is_read 상태 갱신
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, is_read: 1 } : i)))
    } catch {
      alert('상세 정보를 불러오지 못했습니다.')
    } finally {
      setDetailLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('이 문의를 삭제하시겠습니까?')) return
    try {
      await deleteInquiry(id)
      if (detail?.id === id) setDetail(null)
      load(page, keyword)
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : '삭제에 실패했습니다.')
    }
  }

  const handleBulkDelete = async () => {
    if (checkedIds.length === 0) return
    if (!confirm(`선택한 ${checkedIds.length}건을 삭제하시겠습니까?`)) return
    try {
      await Promise.all(checkedIds.map((id) => deleteInquiry(id)))
      setDetail(null)
      load(page, keyword)
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : '삭제에 실패했습니다.')
    }
  }

  return (
    <div className="adm_wrap">
      <AdminSidebar />
      <div className="adm_content">
        <AdminHeader pageTitle="고객문의 관리" />
        <main className="adm_main">
          <section className="adm_section">
            <div className="adm_toolbar">
              <form className="adm_search_form" onSubmit={handleSearch}>
                <div className="adm_search_row">
                  <label className="adm_search_label">검색어</label>
                  <input
                    type="text"
                    className="adm_search_keyword"
                    placeholder="회사명, 담당자, 내용으로 검색"
                    value={inputKeyword}
                    onChange={(e) => setInputKeyword(e.target.value)}
                  />
                  <button type="submit" className="adm_search_btn">
                    <span className="material-icons">search</span>
                  </button>
                  <button type="button" className="adm_btn_secondary" onClick={handleReset}>초기화</button>
                </div>
              </form>
            </div>

            <div className="adm_table_wrap">
              <table className="adm_table">
                <thead>
                  <tr>
                    <th style={{ width: '4%' }}>
                      <input type="checkbox" checked={allChecked} onChange={handleCheckAll} />
                    </th>
                    <th style={{ width: '5%' }}>번호</th>
                    <th style={{ width: '12%' }}>회사명</th>
                    <th style={{ width: '10%' }}>담당자</th>
                    <th style={{ width: '12%' }}>연락처</th>
                    <th>문의내용</th>
                    <th style={{ width: '8%' }}>상태</th>
                    <th style={{ width: '12%' }}>접수일</th>
                    <th style={{ width: '12%' }}>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={9} className="adm_table_empty">불러오는 중...</td></tr>
                  ) : error ? (
                    <tr><td colSpan={9} className="adm_table_empty">오류: {error}</td></tr>
                  ) : items.length === 0 ? (
                    <tr><td colSpan={9} className="adm_table_empty">문의가 없습니다.</td></tr>
                  ) : items.map((item, idx) => (
                    <tr key={item.id} style={!item.is_read ? { fontWeight: 'bold' } : undefined}>
                      <td className="adm_td_center">
                        <input type="checkbox" checked={checkedIds.includes(item.id)} onChange={() => handleCheckOne(item.id)} />
                      </td>
                      <td className="adm_td_center">{totalCount - (page - 1) * PAGE_SIZE - idx}</td>
                      <td className="adm_td_center">{item.company}</td>
                      <td className="adm_td_center">{item.manager}</td>
                      <td className="adm_td_center">{item.phone}</td>
                      <td>
                        <button
                          className="adm_table_link"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                          onClick={() => handleOpenDetail(item.id)}
                        >
                          {item.content_preview}
                        </button>
                      </td>
                      <td className="adm_td_center">
                        <span style={{ color: item.is_read ? '#888' : '#e44' }}>
                          {item.is_read ? '확인' : '미확인'}
                        </span>
                      </td>
                      <td className="adm_td_center">{item.created_at.slice(0, 10)}</td>
                      <td className="adm_td_center">
                        <div className="adm_action_btns">
                          <button className="adm_btn_edit" onClick={() => handleOpenDetail(item.id)}>상세</button>
                          <button className="adm_btn_delete" onClick={() => handleDelete(item.id)}>삭제</button>
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

          {/* 상세 모달 */}
          {(detail || detailLoading) && (
            <div
              className="adm_modal_overlay"
              onClick={() => setDetail(null)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <div
                className="adm_modal"
                onClick={(e) => e.stopPropagation()}
                style={{ background: '#fff', borderRadius: '8px', padding: '2.4rem', minWidth: '480px', maxWidth: '640px', width: '90%', maxHeight: '80vh', overflowY: 'auto' }}
              >
                {detailLoading ? (
                  <p>불러오는 중...</p>
                ) : detail && (
                  <>
                    <h2 style={{ marginBottom: '1.6rem', fontSize: '1.6rem' }}>고객문의 상세</h2>
                    <table className="adm_table" style={{ marginBottom: '1.6rem' }}>
                      <tbody>
                        <tr>
                          <th style={{ width: '30%' }}>회사명</th>
                          <td>{detail.company}</td>
                        </tr>
                        <tr>
                          <th>담당자</th>
                          <td>{detail.manager}</td>
                        </tr>
                        <tr>
                          <th>연락처</th>
                          <td>{detail.phone}</td>
                        </tr>
                        <tr>
                          <th>이메일</th>
                          <td>{detail.email}</td>
                        </tr>
                        <tr>
                          <th>접수일</th>
                          <td>{detail.created_at}</td>
                        </tr>
                        <tr>
                          <th style={{ verticalAlign: 'top' }}>문의내용</th>
                          <td style={{ whiteSpace: 'pre-wrap' }}>{detail.content}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
                      <button className="adm_btn_delete" onClick={() => handleDelete(detail.id)}>삭제</button>
                      <button className="adm_btn_secondary" onClick={() => setDetail(null)}>닫기</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
