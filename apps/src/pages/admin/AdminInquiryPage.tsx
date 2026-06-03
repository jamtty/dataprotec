import { useState, useEffect, useCallback } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { fetchInquiryList, deleteInquiry, type InquiryItem } from '@/api/inquiry'

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

  const handleDelete = async (id: number) => {
    if (!confirm('이 문의를 삭제하시겠습니까?')) return
    try {
      await deleteInquiry(id)
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
      setCheckedIds([])
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
                    <th style={{ width: '13%' }}>회사명</th>
                    <th style={{ width: '10%' }}>담당자</th>
                    <th style={{ width: '13%' }}>연락처</th>
                    <th style={{ width: '16%' }}>이메일</th>
                    <th>문의내용</th>
                    <th style={{ width: '7%' }}>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={7} className="adm_table_empty">불러오는 중...</td></tr>
                  ) : error ? (
                    <tr><td colSpan={7} className="adm_table_empty">오류: {error}</td></tr>
                  ) : items.length === 0 ? (
                    <tr><td colSpan={7} className="adm_table_empty">문의가 없습니다.</td></tr>
                  ) : items.map((item) => (
                    <tr key={item.id}>
                      <td className="adm_td_center">
                        <input type="checkbox" checked={checkedIds.includes(item.id)} onChange={() => handleCheckOne(item.id)} />
                      </td>
                      <td className="adm_td_center">{item.company}</td>
                      <td className="adm_td_center">{item.manager}</td>
                      <td className="adm_td_center">{item.phone}</td>
                      <td className="adm_td_center">{item.email}</td>
                      <td style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{item.content.replace(/\n{2,}/g, '\n')}</td>
                      <td className="adm_td_center">
                        <button className="adm_btn_delete" onClick={() => handleDelete(item.id)}>삭제</button>
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
