import { useState, useEffect } from 'react'
import bottomLogo from '../../assets/images/logo_bottom@2x.png'

function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 130)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <footer id="bottom">
        <div className="inner">
            <div className="logo">
                <img
                src={bottomLogo}
                alt="데이타프로텍"
                />
            </div>
            <div className="copyright">
                <p>
                    경기도 군포시 고산로148번길 17 군포IT밸리 B동 1501호  / 대구시 북구 관음동 1378-4 번지 4층<span className='br'></span>
                    대표자. 정해선<span></span>TEL. 031-701-0712<span></span>FAX. 031-701-0714  / 솔루션문의. sales@dataprotec.co.kr<br />
                    Copyright(c) 2021 DATAPROTEC Corp.  All rights reserved.
                </p>
                <p>
                    <strong>AS 및 기술지원센터 TEL. 1660-1614 (평일 오전 9시 부터 오후 6시 까지)</strong><span className='br'></span>
                    솔루션 AS 및 기술문의. support@dataprotec.co.kr
                </p>
            </div>
        </div>
      </footer>

      <div
        id="top-btn"
        style={{
          opacity: showTopBtn ? 1 : 0,
          transition: 'bottom 0.3s, opacity 0.3s',
        }}
      >
        <button type="button" className="top" onClick={scrollToTop} aria-label="맨 위로 이동" />
      </div>
    </>
  )
}

export default Footer
