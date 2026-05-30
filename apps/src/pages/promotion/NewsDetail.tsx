import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import PromotionLayout from './PromotionLayout'
import { newsData } from './newsData'

function NewsDetail() {
  const { id } = useParams<{ id: string }>()
  const numId = Number(id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])
  const currentIndex = newsData.findIndex(n => n.id === numId)
  const article = newsData[currentIndex]

  if (!article) {
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
                <span className="datetime">{article.date}</span>
              </div>
            </div>
            <div className="v_content">
              {article.content.split('\n').map((line, i) =>
                line.trim() === '' ? <br key={i} /> : <p key={i}>{line}</p>
              )}
            </div>
            <div className="v_bottom">
              <Link to="/promotion" className="bo_list_btn">목록으로</Link>
            </div>
            <div id="bo_list">
              <table>
                <tbody>
                  {newsData.slice(0, 5).map(item => (
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
            </div>
          </div>
        </div>
      </div>
    </PromotionLayout>
  )
}

export default NewsDetail
