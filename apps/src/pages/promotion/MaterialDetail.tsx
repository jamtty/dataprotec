import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import PromotionLayout from './PromotionLayout'
import { materialData } from './materialData'

function MaterialDetail() {
  const { id } = useParams<{ id: string }>()
  const numId = Number(id)
  const item = materialData.find(m => m.id === numId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const [company, setCompany] = useState('')
  const [manager, setManager] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [agree, setAgree] = useState('')
  const [captchaKey, setCaptchaKey] = useState('')
  const [captchaCode, setCaptchaCode] = useState(() => {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#f2f4f8'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `hsl(${Math.random() * 360},40%,75%)`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `hsl(${Math.random() * 360},40%,70%)`
      ctx.beginPath()
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1.2, 0, Math.PI * 2)
      ctx.fill()
    }
    captchaCode.split('').forEach((char, i) => {
      ctx.save()
      ctx.font = `bold ${22 + Math.random() * 6}px Arial`
      ctx.fillStyle = `hsl(${Math.random() * 360},60%,28%)`
      ctx.translate(16 + i * 24, 32)
      ctx.rotate((Math.random() - 0.5) * 0.45)
      ctx.fillText(char, 0, 0)
      ctx.restore()
    })
  }, [captchaCode])

  const refreshCaptcha = () => {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
    setCaptchaCode(Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join(''))
    setCaptchaKey('')
  }

  if (!item) {
    return (
      <PromotionLayout>
        <div className="contetns">
          <div className="responsive section_con" style={{ padding: '8rem 0', textAlign: 'center' }}>
            <p style={{ fontSize: '1.8rem', color: '#888' }}>존재하지 않는 게시글입니다.</p>
            <Link to="/promotion/material" style={{ display: 'inline-block', marginTop: '3rem', padding: '1rem 3rem', border: '1px solid #999', fontSize: '1.5rem', color: '#555', textDecoration: 'none' }}>목록으로</Link>
          </div>
        </div>
      </PromotionLayout>
    )
  }

  return (
    <PromotionLayout>
      <div className="contetns">
        <div className="responsive title_area">
          <h2 data-aos="fade-left">홍보자료</h2>
          <p data-aos="fade-up" data-aos-delay="200">저장매체 정보보안의 '처음과 끝을 책임지는' 기업,<span className="br"></span> 데이타프로텍 홍보자료실 입니다.</p>
        </div>
        <div className="section1_pr"></div>
        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">홍보자료</div></h3>
          <div id="tbl_view">
            <Link to="/promotion/material" className="list_icon_btn">목록</Link>
            <div className="tbl_view">
              <div className="tbl_tit">
                <h4>{item.title}</h4>
              </div>
              <div className="tbl_width">
                <form name="brochure" method="post" autoComplete="off">
                  <input type="hidden" name="uid" value="2026053014321072" />
                  <input type="hidden" name="w" value="" />
                  <input type="hidden" name="bo_table" value="brochure" />
                  <input type="hidden" name="wr_id" value={String(item.id)} />
                  <input type="hidden" name="wr_content" value="브로슈어 다운로드" />
                  <h4>하단 정보를 입력 후, 확인 버튼을 누르면 브로슈어(PDF)파일을 <span>다운로드</span>받을 수 있습니다.</h4>
                  <table className="tbl_form">
                    <tbody>
                      <tr>
                        <th><span className="re">*</span> 회사명</th>
                        <td><input type="text" name="wr_subject" className="frm_input" value={company} onChange={e => setCompany(e.target.value)} /></td>
                      </tr>
                      <tr>
                        <th><span className="re">*</span> 담당자</th>
                        <td><input type="text" name="wr_name" className="frm_input" value={manager} onChange={e => setManager(e.target.value)} /></td>
                      </tr>
                      <tr>
                        <th><span className="re">*</span> 연락처</th>
                        <td><input type="text" name="wr_1" className="frm_input" maxLength={13} value={phone} onChange={e => setPhone(e.target.value)} /></td>
                      </tr>
                      <tr>
                        <th><span className="re">*</span> 이메일</th>
                        <td><input type="text" name="wr_2" className="frm_input" value={email} onChange={e => setEmail(e.target.value)} /></td>
                      </tr>
                      <tr>
                        <th className="cap"><span className="re">*</span> 자동입력방지</th>
                        <td className="cap">
                          <fieldset className="captcha">
                            <legend><label htmlFor="captcha_key">자동등록방지</label></legend>
                            <canvas ref={canvasRef} width={170} height={50} style={{ display: 'block', margin: '0 0 0.8rem', border: '1px solid #ddd' }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <input type="text" name="captcha_key" id="captcha_key" required className="captcha_box" maxLength={6} value={captchaKey} onChange={e => setCaptchaKey(e.target.value)} placeholder="위 문자를 입력하세요" />
                              <button type="button" onClick={refreshCaptcha} title="새로고침" style={{ height: '4.2rem', width: '4.2rem', border: '1px solid #ccc', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                              </button>
                            </div>
                          </fieldset>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="agree_wr">
                    <p><span style={{ color: 'red' }}>(필수)</span> 개인정보 수집 및 이용에 대한 동의</p>
                    <div className="agree_txt">
                      당사는 고객님의 정보를 중요시 하며, 개인정보보호법을 준수하고 있습니다. 고객문의를 통해 수집된 개인정보는 문의에 대한 답변을 회신 드리기 위한 목적으로 활용되며 최소한의 범위 내에서 개인정보를 수집하고 있습니다.<br />
                      <br />
                      1. 개인정보 수집 목적 및 항목<br />
                      - 수집목적 : 제품/채용/기타문의에 대한 상담 및 처리를 위한 정보 수집<br />
                      <br />
                      - 수집항목<br />
                      1) 고객문의 : 회사명, 이름, 연락처. 이메일<br />
                      <br />
                      2. 개인정보의 보유기간<br />
                      개인정보 수집 및 이용에 관한 동의 후 1년간 개인정보를 보유하고 이후 해당 정보를 지체 없이 파기합니다. 단, 관련 법률에 의해 보존의무가 있는 경우에는 법령이 지정한 일정기간 동안 보존합니다.<br />
                      <br />
                      3. 개인정보 수집 동의 거부 권리<br />
                      정보주체께서는 개인정보 수집 동의에 대한 거부 권리가 있으며, 미동의 시 서비스 제공에 제약이 있을 수 있고, 미동의 하신 경우 정보가 제공되지 않습니다.
                    </div>
                    <div className="chk_wr chk_box">
                      <input type="radio" name="agree" value="1" id="agree1" checked={agree === '1'} onChange={e => setAgree(e.target.value)} />
                      <label htmlFor="agree1"><span></span> 동의함</label>
                      <input type="radio" name="agree" value="" id="agree2" checked={agree === ''} onChange={e => setAgree(e.target.value)} />
                      <label htmlFor="agree2"><span></span> 동의하지 않음</label>
                    </div>
                  </div>
                  <div className="btn_wr">
                    <button type="button" className="submit chk_form">확인</button>
                  </div>
                </form>
              </div>
              <div className="btn_wr">
                <Link to="/promotion/material">목록으로</Link>
              </div>
            </div>
            <div className="tbl_list">
              <ul>
                {materialData.map((m) => (
                  <li key={m.id} className={m.id === numId ? 'tbl_now' : ''}>
                    <Link to={`/promotion/material/${m.id}`}>
                      <img src={m.thumbnail} alt={m.title} />
                    </Link>
                    <div className="txt">
                      <Link to={`/promotion/material/${m.id}`}>{m.title}</Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PromotionLayout>
  )
}

export default MaterialDetail
