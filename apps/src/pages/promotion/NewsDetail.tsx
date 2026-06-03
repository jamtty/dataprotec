import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PromotionLayout from './PromotionLayout'
import { fetchNewsroomDetail, fetchNewsroomList, type NewsroomItem } from '@/api/newsroom'
import blankImg from '../../assets/images/blank.jpg'

function NewsDetail() {
  const { id } = useParams<{ id: string }>()
  const numId = Number(id)

  const [article, setArticle] = useState<NewsroomItem | null>(null)
  const [recentItems, setRecentItems] = useState<NewsroomItem[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)
    setNotFound(false)

    Promise.all([
      fetchNewsroomDetail(numId),
      fetchNewsroomList({ page: 1, size: 5 }),
    ])
      .then(([detail, list]) => {
        setArticle(detail.item)
        setRecentItems(list.items)
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [numId])

  if (loading) {
    return (
      <PromotionLayout>
        <div className="contetns">
          <div className="responsive section_con" style={{ padding: '8rem 0', textAlign: 'center' }}>
            <p style={{ fontSize: '1.8rem', color: '#888' }}>불러오는 중...</p>
          </div>
        </div>
      </PromotionLayout>
    )
  }

  if (notFound || !article) {
    return (
      <PromotionLayout>
        <div className="contetns">
          <div className="responsive section_con" style={{ padding: '8rem 0', textAlign: 'center' }}>
            <p style={{ fontSize: '1.8rem', color: '#888' }}>존재하지 않는 게시글입니다.</p>
            <Link to="/promotion" style={{ display: 'inline-block', marginTop: '3rem', padding: '1rem 3rem', border: '1px solid #999', fontSize: '1.5rem', color: '#555', textDecoration: 'none' }}>목록으로</Link>
          </div>
        </div>
      </PromotionLayout>
    )
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
          <div id="bo_v">
            <Link to="/promotion" className="list_icon_btn">목록</Link>
            <div className="v_top">
              <h4 className="v_title">{article.title}</h4>
              <div className="v_info">
                <span className="datetime">{article.news_date}</span>
              </div>
            </div>
            <div className="v_content" dangerouslySetInnerHTML={{ __html: article.content }} />
            <div className="v_bottom">
              <Link to="/promotion" className="bo_list_btn">목록으로</Link>
            </div>
            <div id="bo_list">
              <table>
                <tbody>
                  {recentItems.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="result">
                          <Link to={`/promotion/news/${item.id}`} className="thumbnail">
                            <img src={item.thumbnail || blankImg} alt={item.title} />
                          </Link>
                          <div className="txt">
                            <p className="datetime">{item.news_date}</p>
                            <Link to={`/promotion/news/${item.id}`}>{item.title}</Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PromotionLayout>
  )
}

export default NewsDetail

