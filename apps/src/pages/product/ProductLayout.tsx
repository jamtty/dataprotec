import type { ReactNode } from 'react'
import SubLayout from '../../components/common/SubLayout'

const lnbItems = [
  { label: 'DPT Enterprise', href: '/product' },
  { label: 'DPT-PRO', href: '/product/pro' },
  { label: 'DIGITAL ERASER', href: '/product/eraser' },
  { label: 'DPT-i', href: '/product/dpt-i' },
  { label: 'DPT-ID', href: '/product/dpt-id' },
  { label: 'VCS', href: '/product/vcs' },
]

function ProductLayout({ children }: { children: ReactNode }) {
  return (
    <SubLayout
      visualClass="product"
      visualTitle="PRODUCT"
      lnbItems={lnbItems}
    >
      {children}
    </SubLayout>
  )
}

export default ProductLayout
