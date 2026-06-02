import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './assets/css/common.css'
import './assets/css/style.css'
import { useAuthStore, isTokenExpired } from '@/store/useAuthStore'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminNewsroomPage from './pages/admin/AdminNewsroomPage'
import AdminNewsroomFormPage from './pages/admin/AdminNewsroomFormPage'
import AdminMaterialPage from './pages/admin/AdminMaterialPage'
import AdminMaterialFormPage from './pages/admin/AdminMaterialFormPage'
import AdminBrochurePage from './pages/admin/AdminBrochurePage'
import AdminBrochureFormPage from './pages/admin/AdminBrochureFormPage'
import AdminInquiryPage from './pages/admin/AdminInquiryPage'
import AdminMyPage from './pages/admin/AdminMyPage'
import Main from './pages/Main'
import ProductEnterprise from './pages/product/DptEnterprise'
import ProductPro from './pages/product/DptPro'
import ProductEraser from './pages/product/DptEraser'
import ProductDptI from './pages/product/DptI'
import ProductDptId from './pages/product/DptId'
import ProductVcs from './pages/product/DptVcs'
import CompanyGreeting from './pages/company/Greeting'
import CompanyHistory from './pages/company/History'
import CompanyRnd from './pages/company/Rnd'
import CompanyLocation from './pages/company/Location'
import PromotionNews from './pages/promotion/News'
import PromotionMaterial from './pages/promotion/Material'
import NewsDetail from './pages/promotion/NewsDetail'
import MaterialDetail from './pages/promotion/MaterialDetail'
import RecruitmentTalent from './pages/recruitment/Talent'
import RecruitmentWelfare from './pages/recruitment/Welfare'
import RecruitmentGuide from './pages/recruitment/Guide'
import Support from './pages/support/Support'

const basename = import.meta.env.PROD ? '/renewal_react_v1' : '/'

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, accessToken } = useAuthStore()
  if (!isAuthenticated || isTokenExpired(accessToken)) {
    return <Navigate to="/admin/login" replace />
  }
  return <>{children}</>
}

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
        <Route path="/product/vcs" element={<ProductVcs />} />
        {/* 회사소개 */}
        <Route path="/company" element={<CompanyGreeting />} />
        <Route path="/company/history" element={<CompanyHistory />} />
        <Route path="/company/rnd" element={<CompanyRnd />} />
        <Route path="/company/location" element={<CompanyLocation />} />
        {/* 홍보센터 */}
        <Route path="/promotion" element={<PromotionNews />} />
        <Route path="/promotion/news/:id" element={<NewsDetail />} />
        <Route path="/promotion/material" element={<PromotionMaterial />} />
        <Route path="/promotion/material/:id" element={<MaterialDetail />} />
        {/* 인재채용 */}
        <Route path="/recruitment" element={<RecruitmentTalent />} />
        <Route path="/recruitment/welfare" element={<RecruitmentWelfare />} />
        <Route path="/recruitment/guide" element={<RecruitmentGuide />} />
        {/* 고객지원 */}
        <Route path="/support" element={<Support />} />
        {/* 관리자 */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<Navigate to="/admin/newsroom" replace />} />
        <Route path="/admin/newsroom" element={<AdminRoute><AdminNewsroomPage /></AdminRoute>} />
        <Route path="/admin/newsroom/new" element={<AdminRoute><AdminNewsroomFormPage /></AdminRoute>} />
        <Route path="/admin/newsroom/:id/edit" element={<AdminRoute><AdminNewsroomFormPage /></AdminRoute>} />
        <Route path="/admin/material" element={<AdminRoute><AdminMaterialPage /></AdminRoute>} />
        <Route path="/admin/material/new" element={<AdminRoute><AdminMaterialFormPage /></AdminRoute>} />
        <Route path="/admin/material/:id/edit" element={<AdminRoute><AdminMaterialFormPage /></AdminRoute>} />
        <Route path="/admin/brochure" element={<AdminRoute><AdminBrochurePage /></AdminRoute>} />
        <Route path="/admin/brochure/new" element={<AdminRoute><AdminBrochureFormPage /></AdminRoute>} />
        <Route path="/admin/brochure/:id/edit" element={<AdminRoute><AdminBrochureFormPage /></AdminRoute>} />
        <Route path="/admin/inquiry" element={<AdminRoute><AdminInquiryPage /></AdminRoute>} />
        <Route path="/admin/my" element={<AdminRoute><AdminMyPage /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
