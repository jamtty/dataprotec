import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import PromotionLayout from './PromotionLayout'
import { newsData } from './newsData'

const ITEMS_PER_PAGE = 5
const searchTypes = ['전체', '제목', '제목+내용']

function PromotionNews() {
  const [searchInput, setSearchInput] = useState('')
  const [searchText, setSearchText] = useState('')
  const [searchType, setSearchType] = useState('전체')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(() => {
    if (!searchText) return newsData
    return newsData.filter(item => {
      if (searchType === '제목') return item.title.includes(searchText)
      return item.title.includes(searchText) || item.content.includes(searchText)
    })
  }, [searchText, searchType])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const pageItems = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleSearch = () => {
    setSearchText(searchInput)
    setCurrentPage(1)
  }

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value)
    setCurrentPage(1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <PromotionLayout>
      <div className="contetns">
        <div className="responsive title_area">
          <h2 data-aos="fade-left">뉴스룸</h2>
          <p data-aos="fade-up" data-aos-delay="200">저장매체 정보보안의 '처음과 끝을 책임지는' 기업,<span className="br"></span>데이타프로텍 최근 뉴스를 전해드립니다.</p>
        </div>
        <div className="section1_pr"></div>
        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">뉴스룸</div></h3>
          <div id="bo_list">
            <div className="search">
              <select value={searchType} onChange={handleSearchTypeChange}>
                {searchTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="검색어를 입력하세요"
              />
              <button type="button" className="sch_btn" onClick={handleSearch} aria-label="검색"></button>
            </div>
            {pageItems.length === 0 ? (
              <p className="news_empty">검색 결과가 없습니다.</p>
            ) : (
              <table>
                <tbody>
                  {pageItems.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="result">
                          <Link to={`/promotion/news/${item.id}`} className="thumbnail">
                            <img src={item.img} alt={item.title} />
                          </Link>
                          <div className="txt">
                            <p className="datetime">{item.date}</p>
                            <Link to={`/promotion/news/${item.id}`}>{item.title}</Link>
                            <p className="memo">{item.desc}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {totalPages > 1 && (
              <div className="news_paging">
                <button type="button" onClick={() => setCurrentPage(1)} disabled={currentPage === 1} aria-label="처음">{'<<'}</button>
                <button type="button" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} aria-label="이전">{'<'}</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    type="button"
                    className={currentPage === page ? 'active' : ''}
                    onClick={() => setCurrentPage(page)}
                  >{page}</button>
                ))}
                <button type="button" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} aria-label="다음">{'>'}</button>
                <button type="button" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} aria-label="마지막">{'>>'}</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PromotionLayout>
  )
}

export default PromotionNews
