import type { ReactNode } from 'react'
import SubLayout from '../../components/common/SubLayout'

const lnbItems = [
  { label: 'DVMS', href: '/product/dvms' },
  { label: 'DPT-ID', href: '/product/dpt-id' },
  { label: 'VCS', href: '/product/vcs' },
  // { label: 'DPT Enterprise', href: '/product' },
  { label: 'DPT', href: '/product/dpt' },
  // { label: 'DPT-PRO', href: '/product/pro' },
  { label: 'DPT-i', href: '/product/dpt-i' },
  { label: 'DIGITAL ERASER', href: '/product/eraser' },
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
