import type { ReactNode } from 'react'
import SubLayout from '../../components/common/SubLayout'

const lnbItems = [
  { label: 'CEO 인사말', href: '/company' },
  { label: '회사소개', href: '/company/about' },
  { label: '연혁', href: '/company/history' },
  { label: 'R&D', href: '/company/rnd' },
  { label: '위치안내', href: '/company/location' },
]

function CompanyLayout({ children }: { children: ReactNode }) {
  return (
    <SubLayout
      visualClass="company"
      visualTitle="COMPANY"
      lnbItems={lnbItems}
    >
      {children}
    </SubLayout>
  )
}

export default CompanyLayout
