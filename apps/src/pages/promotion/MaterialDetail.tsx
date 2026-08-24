import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import PromotionLayout from './PromotionLayout'
import { fetchMaterialDetail, fetchMaterialList, type MaterialItem, type MaterialFile } from '@/api/material'
import { submitBrochureRequest } from '@/api/brochure'
import { toAbsUrl } from '@/utils/uploadUrl'

const FORM_REQUIRED_ID = 5  // 신청폼 후 다운로드가 필요한 게시글 ID

function MaterialDetail() {
  const { id } = useParams<{ id: string }>()
  const numId = Number(id)
  const [item, setItem] = useState<MaterialItem | null>(null)
  const [files, setFiles] = useState<MaterialFile[]>([])
  const [allItems, setAllItems] = useState<MaterialItem[]>([])
  const [loadingItem, setLoadingItem] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoadingItem(true)
    setNotFound(false)
    fetchMaterialDetail(numId, true)
      .then(res => {
        setItem(res.item)
        setFiles(res.files ?? [])
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoadingItem(false))
  }, [numId])

  useEffect(() => {
    fetchMaterialList({ page: 1, size: 100 })
      .then(res => setAllItems(res.items))
      .catch(() => setAllItems([]))
  }, [])

  const [company, setCompany] = useState('')
  const [manager, setManager] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [agree, setAgree] = useState('')
  const [captchaKey, setCaptchaKey] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formSubmitting, setFormSubmitting] = useState(false)
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
  }, [captchaCode, loadingItem])

  const refreshCaptcha = () => {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
    setCaptchaCode(Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join(''))
    setCaptchaKey('')
  }

  const IMG_EXTS = /^(jpg|jpeg|png|gif|webp)$/i
  const isImageFile = (f: MaterialFile) => f.file_type === 1 || IMG_EXTS.test(f.file_ext)
  const imageFiles = files.filter(isImageFile)
  const downloadFiles = files.filter(f => !isImageFile(f))

  const handleFormSubmit = async () => {
    if (!company.trim()) { alert('회사명을 입력해주세요.'); return }
    if (!manager.trim()) { alert('담당자를 입력해주세요.'); return }
    if (!phone.trim())   { alert('연락처를 입력해주세요.'); return }
    if (!email.trim())   { alert('이메일을 입력해주세요.'); return }
    if (agree !== '1')   { alert('개인정보 수집에 동의해주세요.'); return }
    if (captchaKey.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      alert('자동입력방지 문자가 올바르지 않습니다.')
      refreshCaptcha()
      return
    }

    setFormSubmitting(true)
    try {
      await submitBrochureRequest({ company, manager, phone, email })
    } catch {
      // 저장 실패해도 다운로드는 진행
    } finally {
      setFormSubmitting(false)
    }

    setFormSubmitted(true)
  }

  if (loadingItem) {
    return (
      <PromotionLayout>
        <div className="contetns">
          <div className="responsive section_con" style={{ padding: '8rem 0', textAlign: 'center' }}>
            <p style={{ fontSize: '1.8rem', color: '#888' }}>불러오는 중...</p>
          </div>
        </div>
      </PromotionLayout>
    )
  }

  if (notFound || !item) {
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
          <p data-aos="fade-up" data-aos-delay="200">저장매체 정보보안의 '처음과 끝을 책임지는' 기업,<span className="br"></span> 데이타프로텍 홍보자료실입니다.</p>
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
                {numId === FORM_REQUIRED_ID ? (
                  /* ── ID=5: 신청폼 → 제출 후 다운로드 ── */
                  formSubmitted ? (
                    <div style={{ padding: '3rem 0', textAlign: 'center' }}>
                      <p style={{ fontSize: '1.6rem', marginBottom: '2rem', color: '#1a3a6b', fontWeight: 600 }}>신청이 완료되었습니다. 파일을 다운로드하세요.</p>
                      {downloadFiles.length > 0 ? (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {downloadFiles.map(f => (
                            <li key={f.bf_no} style={{ marginBottom: '1rem' }}>
                              <a
                                href={toAbsUrl(f.file_url)}
                                download={f.ori_name}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', padding: '1rem 2.4rem', background: '#1a3a6b', color: '#fff', fontSize: '1.5rem', textDecoration: 'none', borderRadius: '3px' }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                {f.ori_name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p style={{ color: '#888', fontSize: '1.5rem' }}>다운로드 파일이 없습니다.</p>
                      )}
                    </div>
                  ) : (
                    <form name="brochure" autoComplete="off" onSubmit={e => { e.preventDefault(); handleFormSubmit() }}>
                      <h4>하단 정보를 입력 후, 확인 버튼을 누르면 브로슈어(PDF) 파일을 <span>다운로드</span>받을 수 있습니다.</h4>
                      <table className="tbl_form">
                        <tbody>
                          <tr>
                            <th scope="row"><span className="re" aria-hidden="true">*</span> 회사명</th>
                            <td><input type="text" name="wr_subject" className="frm_input" aria-label="회사명" aria-required="true" value={company} onChange={e => setCompany(e.target.value)} /></td>
                          </tr>
                          <tr>
                            <th scope="row"><span className="re" aria-hidden="true">*</span> 담당자</th>
                            <td><input type="text" name="wr_name" className="frm_input" aria-label="담당자" aria-required="true" value={manager} onChange={e => setManager(e.target.value)} /></td>
                          </tr>
                          <tr>
                            <th scope="row"><span className="re" aria-hidden="true">*</span> 연락처</th>
                            <td><input type="text" name="wr_1" className="frm_input" aria-label="연락처" aria-required="true" maxLength={13} value={phone} onChange={e => setPhone(e.target.value)} /></td>
                          </tr>
                          <tr>
                            <th scope="row"><span className="re" aria-hidden="true">*</span> 이메일</th>
                            <td><input type="text" name="wr_2" className="frm_input" aria-label="이메일" aria-required="true" value={email} onChange={e => setEmail(e.target.value)} /></td>
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
                          당사는 고객님의 정보를 중요시 하며, 개인정보보호법을 준수하고 있습니다. 고객문의를 통해 수집된 개인정보는 문의에 대한 답변을 회신드리기 위한 목적으로 활용되며 최소한의 범위 내에서 개인정보를 수집하고 있습니다.<br />
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
                        <button type="submit" className="submit chk_form" disabled={formSubmitting}>
                          {formSubmitting ? '처리 중...' : '확인'}
                        </button>
                      </div>
                    </form>
                  )
                ) : (
                  /* ── 일반 게시글: 첨부 이미지 표시 + 파일 다운로드 ── */
                  <div>
                    {/* 에디터 본문 */}
                    {item.content && (
                      <div
                        className="tbl_content"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                        style={{ padding: '2rem 0', lineHeight: 1.8 }}
                      />
                    )}
                    {/* 첨부 이미지 파일 */}
                    {imageFiles.length > 0 && (
                      <div style={{ margin: '2rem 0' }}>
                        {imageFiles.map(f => (
                          <img
                            key={f.bf_no}
                            src={toAbsUrl(f.file_url)}
                            alt={f.ori_name}
                            style={{ maxWidth: '100%', display: 'block', marginBottom: '1.2rem' }}
                          />
                        ))}
                      </div>
                    )}
                    {/* 첨부 파일 다운로드 */}
                    {downloadFiles.length > 0 && (
                      <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem', marginTop: '2rem' }}>
                        <p style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem', color: '#374151' }}>첨부파일</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {downloadFiles.map(f => (
                            <li key={f.bf_no} style={{ marginBottom: '0.8rem' }}>
                              <a
                                href={toAbsUrl(f.file_url)}
                                download={f.ori_name}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.4rem', color: '#1a3a6b', textDecoration: 'none' }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                {f.ori_name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="btn_wr">
                <Link to="/promotion/material">목록으로</Link>
              </div>
            </div>
            <div className="tbl_list">
              <ul>
                {allItems.map((m) => (
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
