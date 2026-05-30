import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Header from './Header'
import Footer from './Footer'
import arrow1 from '../../assets/images/arrow1.png'
import arrow2 from '../../assets/images/arrow2.png'

interface LnbItem {
  label: string
  href: string
}

interface SubLayoutProps {
  visualClass: string
  visualTitle: string
  lnbItems?: LnbItem[]
  children: ReactNode
}

function SubLayout({ visualClass, visualTitle, lnbItems, children }: SubLayoutProps) {
  const [lnbFixed, setLnbFixed] = useState(false)
  const location = useLocation()

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 50 })
    window.scrollTo(0, 0)
    const handleScroll = () => setLnbFixed(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Header />
      <div id="sub">
        <div className={`visual ${visualClass}`}>
          <div className="responsive">
            <div className="visual_tit">
              <h1>{visualTitle}</h1>
              <span className="ico1" data-aos="fade-right" data-aos-delay="200">
                <img src={arrow1} alt="" />
              </span>
              <span className="ico2" data-aos="fade-left" data-aos-delay="400">
                <img src={arrow2} alt="" />
              </span>
            </div>
          </div>
        </div>

        {lnbItems && lnbItems.length > 0 && (
          <div className="lnb" style={lnbFixed ? { position: 'fixed', top: 0, left: 0, width: '100vw' } : {}}>
            <div className="lnb_wrap">
              <ul>
                {(() => {
                  const activeHref = lnbItems.reduce<string | null>((best, item) => {
                    const matches = location.pathname === item.href || location.pathname.startsWith(item.href + '/')
                    if (matches && (best === null || item.href.length > best.length)) return item.href
                    return best
                  }, null)
                  return lnbItems.map((item) => (
                    <li key={item.href} className={activeHref === item.href ? 'active' : ''}>
                      <Link to={item.href}>{item.label}</Link>
                      {activeHref === item.href && <div className="lnb_bg" />}
                    </li>
                  ))
                })()}
              </ul>
            </div>
          </div>
        )}

        {children}
      </div>
      <Footer />
    </>
  )
}

export default SubLayout
