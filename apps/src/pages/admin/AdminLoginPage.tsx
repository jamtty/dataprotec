import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuthStore, isTokenExpired } from '@/store/useAuthStore'
import { loginAdmin } from '@/api/auth'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const { isAuthenticated, accessToken, setAuth } = useAuthStore()

  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated && !isTokenExpired(accessToken)) {
    return <Navigate to="/admin/newsroom" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await loginAdmin(id, pw)
      setAuth(
        {
          id: result.user.id,
          email: id,
          name: result.user.name,
          role: 'ADMIN',
          createdAt: new Date().toISOString(),
        },
        result.token,
      )
      navigate('/admin/newsroom', { replace: true })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '로그인에 실패했습니다.'
      alert(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        height: '100%',
        position: 'relative',
        background: "#171c2b url('https://www.dataprotec.co.kr/renewal/theme/basic/skin/member/basic/img/login_bg.png') center no-repeat",
        backgroundSize: 'cover',
      }}
    >
      <div id="mb_login" className="mbskin">
        <div>
          <h1>관리자 로그인</h1>
          <form onSubmit={handleSubmit} id="flogin">
            <div id="login_frm">
              <label htmlFor="login_id" className="sound_only">
                아이디<strong className="sound_only"> 필수</strong>
              </label>
              <input
                type="text"
                id="login_id"
                placeholder="관리자 아이디"
                required
                className="frm_input"
                maxLength={20}
                value={id}
                onChange={e => setId(e.target.value)}
              />
              <label htmlFor="login_pw" className="sound_only">
                비밀번호<strong className="sound_only"> 필수</strong>
              </label>
              <input
                type="password"
                id="login_pw"
                placeholder="관리자 비밀번호"
                required
                className="frm_input"
                maxLength={20}
                value={pw}
                onChange={e => setPw(e.target.value)}
              />
              <input
                type="submit"
                value={loading ? '로그인 중...' : '로그인'}
                className="btn_submit"
                disabled={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
