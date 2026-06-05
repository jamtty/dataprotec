import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo@2x.png'
import logohover from '../../assets/images/logo_hover@2x.png'

interface NavItem {
  label: string
  href: string
  sub: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    label: '제품소개',
    href: '/product',
    sub: [
      { label: 'DPT Enterprise', href: '/product' },
      { label: 'DPT-PRO', href: '/product/pro' },
      { label: 'DIGITAL ERASER', href: '/product/eraser' },
      { label: 'DPT-i', href: '/product/dpt-i' },
      { label: 'DPT-ID', href: '/product/dpt-id' },
      { label: 'VCS', href: '/product/vcs' },
    ],
  },
  {
    label: '회사소개',
    href: '/company',
    sub: [
      { label: 'CEO 인사말', href: '/company' },
      { label: '사업연혁', href: '/company/history' },
      { label: 'R&D', href: '/company/rnd' },
      { label: '사업장안내', href: '/company/location' },
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

  const isActive = (href: string) => {
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
      {/* 모바일 메뉴 */}
      <div id="mobile_menu" className={mobileOpen ? 'open' : ''}>
        <div className="container">
          <button
            type="button"
            className="mobile_close"
            onClick={() => setMobileOpen(false)}
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
                    <button type="button" onClick={() => toggleSub(idx)}>
                      <i className={openSubIdx === idx ? 'fas fa-minus' : 'fas fa-plus'} aria-hidden="true" />
                    </button>
                    <ul
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
          <ul className="gnb">
            {navItems.map((item, idx) => (
              <li key={idx} className={isActive(item.href) ? 'active' : ''} style={{ position: 'relative' }}>
                <Link
                  to={item.href}
                  style={isActive(item.href) ? { color: '#0064af' } : {}}
                >{item.label}</Link>
                <div
                  className="active_line"
                  style={isActive(item.href) ? { left: 0, opacity: 1 } : {}}
                />
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mo_menu mobile_open"
            onClick={() => setMobileOpen(true)}
          />
        </div>
      </div>
    </>
  )
}

export default Header
