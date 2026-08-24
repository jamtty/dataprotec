import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo_svg.svg'
import logohover from '../../assets/images/logo_hover@2x.png'

interface NavItem {
  label: string
  href: string
  match?: string
  sub: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    label: '제품소개',
    href: '/product/dvms',
    match: '/product',
    sub: [
      { label: 'DVMS', href: '/product/dvms' },
      { label: 'DPT-ID', href: '/product/dpt-id' },
      { label: 'VCS', href: '/product/vcs' },
      // { label: 'DPT Enterprise', href: '/product' },
      { label: 'DPT', href: '/product/dpt' },
      // { label: 'DPT-PRO', href: '/product/pro' },
      { label: 'DPT-i', href: '/product/dpt-i' },
      { label: 'DIGITAL ERASER', href: '/product/eraser' },
    ],
  },
  {
    label: '회사소개',
    href: '/company',
    sub: [
      { label: 'CEO 인사말', href: '/company' },
      { label: '회사소개', href: '/company/about' },
      { label: '연혁', href: '/company/history' },
      { label: 'R&D', href: '/company/rnd' },
      { label: '위치안내', href: '/company/location' },
    ],
  },
  {
    label: '홍보센터',
    href: '/promotion',
    sub: [
      { label: '뉴스룸', href: '/promotion' },
      { label: '홍보자료', href: '/promotion/material' },
    ],
  },
  {
    label: '인재채용',
    href: '/recruitment',
    sub: [
      { label: '인재상', href: '/recruitment' },
      { label: '복지후생', href: '/recruitment/welfare' },
      { label: '지원안내', href: '/recruitment/guide' },
    ],
  },
  {
    label: '고객지원',
    href: '/support',
    sub: [],
  },
]

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSubIdx, setOpenSubIdx] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isSubPage = location.pathname !== '/'

  const isActive = (item: NavItem) => {
    const href = item.match ?? item.href
    if (href === '#') return false
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [mobileOpen])

  const toggleSub = (idx: number) => {
    setOpenSubIdx(openSubIdx === idx ? null : idx)
  }

  return (
    <>
      {/* 스킵 내비게이션 */}
      <a href={isSubPage ? '#sub' : '#index'} className="skip-nav">본문 바로가기</a>

      {/* 모바일 메뉴 */}
      <div id="mobile_menu" className={mobileOpen ? 'open' : ''} aria-label="모바일 메뉴">
        <div className="container">
          <button
            type="button"
            className="mobile_close"
            onClick={() => setMobileOpen(false)}
            aria-label="메뉴 닫기"
          />
          <div className="logo">
            <img
              src={logohover}
              alt="데이타프로텍"
            />
          </div>
          <ul>
            {navItems.map((item, idx) => (
              <li key={idx}>
                <Link to={item.href}>{item.label}</Link>
                {item.sub.length > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleSub(idx)}
                      aria-label={`${item.label} 하위 메뉴 ${openSubIdx === idx ? '닫기' : '열기'}`}
                      aria-expanded={openSubIdx === idx}
                      aria-controls={`submenu-${idx}`}
                    >
                      <i className={openSubIdx === idx ? 'fas fa-minus' : 'fas fa-plus'} aria-hidden="true" />
                    </button>
                    <ul
                      id={`submenu-${idx}`}
                      className="sub"
                      style={{ maxHeight: openSubIdx === idx ? '40rem' : '0' }}
                    >
                      {item.sub.map((subItem, subIdx) => (
                        <li key={subIdx}>
                          <Link to={subItem.href}>{subItem.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        id="header_main"
        className={[isSubPage ? 'sub-page' : '', scrolled ? 'scrolled' : ''].filter(Boolean).join(' ')}
      >
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="데이타프로텍" className="logo-white" />
              <img src={logohover} alt="데이타프로텍" className="logo-hover" />
            </Link>
          </div>
          <ul className="gnb" role="navigation" aria-label="주요 메뉴">
            {navItems.map((item, idx) => (
              <li key={idx} className={isActive(item) ? 'active' : ''} style={{ position: 'relative' }}>
                <Link
                  to={item.href}
                  style={isActive(item) ? { color: '#0064af' } : {}}
                  aria-current={isActive(item) ? 'page' : undefined}
                >{item.label}</Link>
                <div
                  className="active_line"
                  style={isActive(item) ? { left: 0, opacity: 1 } : {}}
                />
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mo_menu mobile_open"
            onClick={() => setMobileOpen(true)}
            aria-label="메뉴 열기"
            aria-expanded={mobileOpen}
            aria-controls="mobile_menu"
          />
        </div>
      </div>
    </>
  )
}

export default Header
