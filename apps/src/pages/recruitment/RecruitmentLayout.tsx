import type { ReactNode } from 'react'
import SubLayout from '../../components/common/SubLayout'

const lnbItems = [
  { label: '인재상', href: '/recruitment' },
  { label: '복지후생', href: '/recruitment/welfare' },
  { label: '지원안내', href: '/recruitment/guide' },
]

function RecruitmentLayout({ children }: { children: ReactNode }) {
  return (
    <SubLayout
      visualClass="recruitment"
      visualTitle="RECRUITMENT"
      lnbItems={lnbItems}
    >
      {children}
    </SubLayout>
  )
}

export default RecruitmentLayout
