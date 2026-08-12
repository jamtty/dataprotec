import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuthStore, isTokenExpired } from '@/store/useAuthStore'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminNewsroomPage from './pages/admin/AdminNewsroomPage'
import AdminNewsroomFormPage from './pages/admin/AdminNewsroomFormPage'
import AdminMaterialPage from './pages/admin/AdminMaterialPage'
import AdminMaterialFormPage from './pages/admin/AdminMaterialFormPage'
import AdminBrochurePage from './pages/admin/AdminBrochurePage'
import AdminBrochureFormPage from './pages/admin/AdminBrochureFormPage'
import AdminInquiryPage from './pages/admin/AdminInquiryPage'
import AdminPopupPage from './pages/admin/AdminPopupPage'
import AdminPopupFormPage from './pages/admin/AdminPopupFormPage'
import AdminMyPage from './pages/admin/AdminMyPage'
import Main from './pages/Main'
import ProductEnterprise from './pages/product/DptEnterprise'
import ProductDpt from './pages/product/Dpt'
import ProductPro from './pages/product/DptPro'
import ProductEraser from './pages/product/DptEraser'
import ProductDvms from './pages/product/Dvms'
import ProductDptI from './pages/product/DptI'
import ProductDptId from './pages/product/DptId'
import ProductVcs from './pages/product/DptVcs'
import CompanyGreeting from './pages/company/Greeting'
import CompanyAbout from './pages/company/About'
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

const basename = '/'

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, accessToken, clearAuth } = useAuthStore()
  const navigate = useNavigate()
  const [verified, setVerified] = useState(false)
  const [checking, setChecking] = useState(true)

  // 서버에 토큰 유효성 검증 요청 (클라이언트 측 변조 방지)
  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      setChecking(false)
      return
    }

    let cancelled = false
    fetch('/backend/api/verify-token.php', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(res => res.json())
      .then((data: { success: boolean }) => {
        if (cancelled) return
        if (data.success) {
          setVerified(true)
        } else {
          clearAuth()
          navigate('/admin/login', { replace: true })
        }
      })
      .catch(() => {
        if (cancelled) return
        clearAuth()
        navigate('/admin/login', { replace: true })
      })
      .finally(() => {
        if (!cancelled) setChecking(false)
      })

    return () => { cancelled = true }
  }, [isAuthenticated, accessToken, clearAuth, navigate])

  // 검증 완료 후 자동 로그아웃 타이머 설정
  useEffect(() => {
    if (!verified || !accessToken) return
    try {
      const parts = accessToken.split('.')
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))) as { exp?: number }
        if (typeof payload.exp === 'number') {
          const msUntilExpiry = payload.exp * 1000 - Date.now()
          if (msUntilExpiry <= 0) {
            clearAuth()
            navigate('/admin/login', { replace: true })
            return
          }
          const timer = setTimeout(() => {
            clearAuth()
            navigate('/admin/login', { replace: true })
          }, msUntilExpiry)
          return () => clearTimeout(timer)
        }
      }
    } catch {
      // 파싱 실패 시 무시
    }
  }, [verified, accessToken, clearAuth, navigate])

  // 초기 체크 중이면 로딩 표시
  if (checking && isAuthenticated && accessToken) {
    return <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100vh' }}>인증 확인 중...</div>
  }

  if (!isAuthenticated || isTokenExpired(accessToken) || !verified) {
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
        <Route path="/product/dpt" element={<ProductDpt />} />
        <Route path="/product/pro" element={<ProductPro />} />
        <Route path="/product/eraser" element={<ProductEraser />} />
        <Route path="/product/dvms" element={<ProductDvms />} />
        <Route path="/product/dpt-i" element={<ProductDptI />} />
        <Route path="/product/dpt-id" element={<ProductDptId />} />
        <Route path="/product/vcs" element={<ProductVcs />} />
        {/* 회사소개 */}
        <Route path="/company" element={<CompanyGreeting />} />
        <Route path="/company/about" element={<CompanyAbout />} />
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
        <Route path="/admin/popup" element={<AdminRoute><AdminPopupPage /></AdminRoute>} />
        <Route path="/admin/popup/new" element={<AdminRoute><AdminPopupFormPage /></AdminRoute>} />
        <Route path="/admin/popup/:id/edit" element={<AdminRoute><AdminPopupFormPage /></AdminRoute>} />
        <Route path="/admin/my" element={<AdminRoute><AdminMyPage /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
