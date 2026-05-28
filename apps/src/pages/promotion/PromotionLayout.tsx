import type { ReactNode } from 'react'
import SubLayout from '../../components/common/SubLayout'

const lnbItems = [
  { label: '뉴스룸', href: '/promotion' },
  { label: '홍보자료', href: '/promotion/material' },
]

function PromotionLayout({ children }: { children: ReactNode }) {
  return (
    <SubLayout
      visualClass="pr"
      visualTitle="PR CENTER"
      lnbItems={lnbItems}
    >
      {children}
    </SubLayout>
  )
}

export default PromotionLayout
