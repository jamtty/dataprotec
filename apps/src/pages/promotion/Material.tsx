import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PromotionLayout from './PromotionLayout'
import { fetchMaterialList, type MaterialItem } from '@/api/material'
import { toAbsUrl } from '@/utils/uploadUrl'
import blankImg from '../../assets/images/blank.jpg'

function PromotionMaterial() {
  const [items, setItems] = useState<MaterialItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMaterialList({ page: 1, size: 100 })
      .then(res => setItems(res.items))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <PromotionLayout>
      <div className="contetns">
        <div className="responsive title_area">
          <h2 data-aos="fade-left">홍보자료</h2>
          <p data-aos="fade-up" data-aos-delay="200">저장매체 정보보안의 '처음과 끝을 책임지는' 기업,<span className="br"></span> 데이타프로텍 홍보자료실입니다.</p>
        </div>
        <div className="section1_pr"></div>
        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">홍보자료</div></h3>
          <div id="bo_gall">
            {loading ? (
              <p style={{ padding: '4rem 0', textAlign: 'center', color: '#888' }}>불러오는 중...</p>
            ) : (
              <ul id="gall_ul" className="gall_row">
                {items.map((item, index) => (
                  <li
                    key={item.id}
                    className={`gall_li col-gn-4${index === items.length - 1 ? ' box_clear' : ''}`}
                  >
                    <div className="gall_box">
                      <div className="gall_con">
                        <div className="gall_img">
                          <Link to={`/promotion/material/${item.id}`}>
                            <img src={item.thumbnail ? toAbsUrl(item.thumbnail) : blankImg} alt={item.title} />
                          </Link>
                        </div>
                        <div className="gall_text_href">
                          <Link to={`/promotion/material/${item.id}`} className="bo_tit">
                            {item.title}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </PromotionLayout>
  )
}

export default PromotionMaterial
