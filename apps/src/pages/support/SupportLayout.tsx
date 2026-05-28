import type { ReactNode } from 'react'
import SubLayout from '../../components/common/SubLayout'

const lnbItems = [
  { label: '고객지원', href: '/support' },
]

function SupportLayout({ children }: { children: ReactNode }) {
  return (
    <SubLayout
      visualClass="request"
      visualTitle="SUPPORT"
      lnbItems={lnbItems}
    >
      {children}
    </SubLayout>
  )
}

export default SupportLayout
