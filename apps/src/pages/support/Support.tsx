import { useState, useEffect, useRef } from 'react'
import SupportLayout from './SupportLayout'
import { submitInquiry } from '@/api/inquiry'

function Support() {
  const [company, setCompany] = useState('')
  const [manager, setManager] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [agree, setAgree] = useState('')
  const [captchaKey, setCaptchaKey] = useState('')
  const [submitting, setSubmitting] = useState(false)
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

  const handleSubmit = async () => {
    if (!company.trim()) { alert('회사명을 입력해주세요.'); return }
    if (!manager.trim()) { alert('담당자를 입력해주세요.'); return }
    if (!phone.trim()) { alert('연락처를 입력해주세요.'); return }
    if (!content.trim()) { alert('문의내용을 입력해주세요.'); return }
    if (agree !== '1') { alert('개인정보 수집 및 이용에 동의해주세요.'); return }
    if (captchaKey.toLowerCase() !== captchaCode.toLowerCase()) { alert('보안코드가 일치하지 않습니다.'); refreshCaptcha(); return }

    setSubmitting(true)
    try {
      await submitInquiry({ company, manager, phone, email, content })
      alert('문의가 접수되었습니다. 담당자가 바로 연락드리겠습니다.')
      setCompany(''); setManager(''); setPhone(''); setEmail(''); setContent(''); setAgree(''); refreshCaptcha()
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : '문의 제출에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SupportLayout>
      <div className="contetns request1">

        <div className="responsive title_area">
          <h2 data-aos="fade-left">고객문의</h2>
          <p data-aos="fade-up" data-aos-delay="200">'처음과 끝을 책임지는' 기업,<span className="br"></span>데이타프로텍 담당자에게 문의 사항을 남겨주세요.</p>
        </div>

        <div className="section1"></div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">고객문의 내용</div></h3>

          <div className="tbl_width">
            <form name="request" method="post" autoComplete="off">
              <input type="hidden" name="uid" value="2026060110243753" id="uid" />
              <input type="hidden" name="w" value="" id="w" />
              <input type="hidden" name="bo_table" value="request" id="bo_table" />
              <input type="hidden" name="wr_id" value="0" id="wr_id" />

              <table className="tbl_form">
                <tbody>
                  <tr>
                    <th scope="row" id="label-company"><span className="re" aria-hidden="true">*</span> 회사명</th>
                    <td><input type="text" name="wr_subject" className="frm_input" id="wr_subject" aria-labelledby="label-company" aria-required="true" value={company} onChange={e => setCompany(e.target.value)} /></td>
                  </tr>
                  <tr>
                    <th scope="row" id="label-manager"><span className="re" aria-hidden="true">*</span> 담당자</th>
                    <td><input type="text" name="wr_name" className="frm_input" id="wr_name" aria-labelledby="label-manager" aria-required="true" value={manager} onChange={e => setManager(e.target.value)} /></td>
                  </tr>
                  <tr>
                    <th scope="row" id="label-phone"><span className="re" aria-hidden="true">*</span> 연락처</th>
                    <td><input type="text" name="wr_1" className="frm_input" id="wr_1" aria-labelledby="label-phone" aria-required="true" maxLength={13} value={phone} onChange={e => setPhone(e.target.value)} /></td>
                  </tr>
                  <tr>
                    <th scope="row" id="label-email"><span className="re" aria-hidden="true">*</span> 이메일</th>
                    <td><input type="text" name="wr_2" className="frm_input" id="wr_2" aria-labelledby="label-email" value={email} onChange={e => setEmail(e.target.value)} /></td>
                  </tr>
                  <tr>
                    <th scope="row" id="label-content" style={{ verticalAlign: 'top' }}><span className="re" aria-hidden="true">*</span> 문의내용</th>
                    <td><textarea name="wr_content" className="frm_input" id="wr_content" aria-labelledby="label-content" aria-required="true" value={content} onChange={e => setContent(e.target.value)}></textarea></td>
                  </tr>
                  <tr>
                    <th scope="row" className="cap"><span className="re" aria-hidden="true">*</span> 자동입력방지</th>
                    <td className="cap">
                      <fieldset className="captcha">
                        <legend><label htmlFor="captcha_key">자동등록방지</label></legend>
                        <canvas ref={canvasRef} width={170} height={50} role="img" aria-label="자동입력방지 문자 이미지" style={{ display: 'block', margin: '0 0 0.8rem', border: '1px solid #ddd' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <input type="text" name="captcha_key" id="captcha_key" className="captcha_box" maxLength={6} value={captchaKey} onChange={e => setCaptchaKey(e.target.value)} placeholder="위 문자를 입력하세요" />
                          <button type="button" onClick={refreshCaptcha} title="새로고침" aria-label="자동입력방지 문자 새로고침" style={{ height: '4.2rem', width: '4.2rem', border: '1px solid #ccc', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
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
                  당사는 고객님의 정보를 중요시 하며, 개인정보보호법을 준수하고 있습니다. 고객문의를 통해 수집된 개인정보는 문의에 대한 답변을 회신드리기 위한 목적으로 활용되며 최소한의 범위 내에서 개인정보를 수집하고 있습니다.<br /><br />

                  1. 개인정보 수집 목적 및 항목<br />
                  - 수집목적 : 제품/채용/기타문의에 대한 상담 및 처리를 위한 정보 수집<br /><br />

                  - 수집항목<br />
                  1) 고객문의 : 회사명, 이름, 연락처. 이메일<br /><br />

                  2. 개인정보의 보유기간<br />
                  개인정보 수집 및 이용에 관한 동의 후 1년간 개인정보를 보유하고 이후 해당 정보를 지체 없이 파기합니다. 단, 관련 법률에 의해 보존의무가 있는 경우에는 법령이 지정한 일정기간 동안 보존합니다.<br /><br />

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
                <button type="button" className="submit chk_form" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? '제출 중...' : '확인'}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </SupportLayout>
  )
}

export default Support