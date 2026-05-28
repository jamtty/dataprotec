import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/css/common.css'
import './assets/css/style.css'
import Main from './pages/Main'
import ProductEnterprise from './pages/product/DptEnterprise'
import ProductPro from './pages/product/DptPro'
import ProductEraser from './pages/product/DptEraser'
import ProductDptI from './pages/product/DptI'
import ProductDptId from './pages/product/DptId'
import CompanyGreeting from './pages/company/Greeting'
import CompanyHistory from './pages/company/History'
import CompanyRnd from './pages/company/Rnd'
import CompanyLocation from './pages/company/Location'
import PromotionNews from './pages/promotion/News'
import PromotionMaterial from './pages/promotion/Material'
import RecruitmentTalent from './pages/recruitment/Talent'
import RecruitmentWelfare from './pages/recruitment/Welfare'
import RecruitmentGuide from './pages/recruitment/Guide'
import Support from './pages/support/Support'

const basename = import.meta.env.PROD ? '/renewal_react_v1' : '/'

function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Main />} />
        {/* 제품소개 */}
        <Route path="/product" element={<ProductEnterprise />} />
        <Route path="/product/pro" element={<ProductPro />} />
        <Route path="/product/eraser" element={<ProductEraser />} />
        <Route path="/product/dpt-i" element={<ProductDptI />} />
        <Route path="/product/dpt-id" element={<ProductDptId />} />
        {/* 회사소개 */}
        <Route path="/company" element={<CompanyGreeting />} />
        <Route path="/company/history" element={<CompanyHistory />} />
        <Route path="/company/rnd" element={<CompanyRnd />} />
        <Route path="/company/location" element={<CompanyLocation />} />
        {/* 홍보센터 */}
        <Route path="/promotion" element={<PromotionNews />} />
        <Route path="/promotion/material" element={<PromotionMaterial />} />
        {/* 인재채용 */}
        <Route path="/recruitment" element={<RecruitmentTalent />} />
        <Route path="/recruitment/welfare" element={<RecruitmentWelfare />} />
        <Route path="/recruitment/guide" element={<RecruitmentGuide />} />
        {/* 고객지원 */}
        <Route path="/support" element={<Support />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
