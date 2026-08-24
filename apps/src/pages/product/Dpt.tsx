import { useEffect, useRef } from 'react'
import Swiper from 'swiper'
import { Navigation, A11y } from 'swiper/modules'
import 'swiper/css'
import ProductLayout from './ProductLayout'
import { useBatchReveal } from '../../utils/useScrollReveal'
import imgDpt1 from '../../assets/images/img_dpt_1.png'
import imgDpt2 from '../../assets/images/img_dpt_2.png'
import imgDpt2_1 from '../../assets/images/img_dpt_2_1.png'
import imgDpt2_2 from '../../assets/images/img_dpt_2_2.png'
import imgDpt3 from '../../assets/images/img_dpt_3.png'
import imgDpt4 from '../../assets/images/img_dpt_4.png'
import imgDpt5 from '../../assets/images/img_dpt_5.png'
import imgDpt6 from '../../assets/images/img_dpt_6.png'
import imgDpt7 from '../../assets/images/img_dpt_7.png'
import imgDpt8_1 from '../../assets/images/img_dpt_8_1.png'
import imgDpt8_2 from '../../assets/images/img_dpt_8_2.png'
import imgDpt8_3 from '../../assets/images/img_dpt_8_3.png'
import imgDpt8_4 from '../../assets/images/img_dpt_8_4.png'
import imgDpt8_5 from '../../assets/images/img_dpt_8_5.png'
import imgDpt8Plus from '../../assets/images/img_dpt_8_plus.png'
import imgDpt9_1 from '../../assets/images/img_dpt_9_1.png'
import imgDpt9_2 from '../../assets/images/img_dpt_9_2.png'
import imgDpt9_3 from '../../assets/images/img_dpt_9_3.png'
import imgDpt9_4 from '../../assets/images/img_dpt_9_4.png'
import mainImgKiosk1 from '../../assets/images/img_dpt_Kiosk.png'
import mainImgKiosk2 from '../../assets/images/img_dpt_Kiosk2.png'
import mainImgKiosk3 from '../../assets/images/img_dpt_Kiosk3.png'
import mainClImg1 from '../../assets/images/main_cl_img_1.png'
import mainClImg2 from '../../assets/images/main_cl_img_2.png'
import mainClImg3 from '../../assets/images/main_cl_img_3.png'
import mainClImg4 from '../../assets/images/main_cl_img_4.png'
import mainClImg5 from '../../assets/images/main_cl_img_5.png'

function ProductDpt() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  useBatchReveal(containerRef)

  useEffect(() => {
    let kioskSwiper: Swiper | null = null
    if (document.querySelector('.kiosk_slide')) {
      const numEl = document.querySelector<HTMLElement>('.section_kiosk .slide-nav .num')
      const totalSlides = document.querySelectorAll('.kiosk_slide .swiper-slide').length
      kioskSwiper = new Swiper('.kiosk_slide', {
        modules: [Navigation, A11y],
        a11y: {
          enabled: true,
          prevSlideMessage: '이전 슬라이드',
          nextSlideMessage: '다음 슬라이드',
        },
        loop: false,
        navigation: {
          prevEl: '.section_kiosk .btn-prev',
          nextEl: '.section_kiosk .btn-next',
        },
        on: {
          slideChange(swiper) {
            if (numEl) numEl.textContent = `${swiper.activeIndex + 1}/${totalSlides}`
          },
        },
      })
      if (numEl) numEl.textContent = `1/${totalSlides}`
    }
    return () => {
      kioskSwiper?.destroy(true, true)
    }
  }, [])
  return (
    <ProductLayout>
      <div className="contetns prd NewDpt" ref={containerRef}>

          <div className="responsive title_area">
            <h2 data-reveal>DPT <span>Data protection Technology</span></h2>
            <p data-reveal data-delay="200">
                완벽한 통제, 유연한 협업! 100% 선별적 변화 파일 탐지 기반, 노트북 반출입 정보보안 시스템 DPT(Data Protection Technology)은<span className="br"></span>
                기업 협업의 딜레마인 외부 노트북 '보안 사각지대'를 완벽하게 해결할 수 있는 정보보안 시스템으로, 3중 융합 하이브리드 아키텍처 기술로<span className="br"></span>
                외부 노트북(저장매체)을 통제하는 국내 유일의 무결점 검증 시스템입니다.
            </p>
          </div>

          <div className="responsive section_con">
            <h3>
              <span data-reveal />
              <div data-reveal data-delay="200">도입 필요성</div>
            </h3>
            <h4 data-reveal data-delay="200">기업 협업의 딜레마, 외부 노트북이라는 '보안 사각지대'</h4>
            <p data-reveal data-delay="200">
                협력사 및 방문객의 노트북 반입은 필수적이지만, 기존 기업 보안망의 통제를 벗어난 가장 취약한 유출 경로가 될 수 있습니다.<br />
                3중 융합 하이브리드 기술로 원천 차단할 수 있고 생성, 수정된 기밀 데이터가 외부로 유출될 경우 사후 추적이 가능합니다.
            </p>
            <div className='work' data-reveal>
                <div className='imgCon'>
                    <img src={imgDpt1} alt="기업 협업의 딜레마, 외부 노트북이라는 '보안 사각지대'" />
                </div>
                <div className='txtCon'>
                    <ul>
                        <li data-reveal data-delay="200"><span>무선 통신 우회(Wi-Fi, 블루투스, 테더링)</span></li>
                        <li data-reveal data-delay="400"><span>비인가 저장매체(USB, 클라우드 동기화)</span></li>
                        <li data-reveal data-delay="600"><span>파일 은닉(확장자 변경, 숨김/시스템 폴더 위장)</span></li>
                    </ul>
                </div>
            </div>
            <div className='work2' data-reveal>
                <h4 data-reveal data-delay="200">패러다임의 전환, 맹목적 포맷 대신 변화된 파일만 선별적으로 통제</h4>
                <p data-reveal data-delay="200">
                    반입한 노트북은 보안의 이유로 맹목적인 포맷을 진행하는 경우가 많습니다. 이는 보안의 이유로 파트너사의 작업 효율성을 떨어뜨리고<span className="br"></span>
                    OS 운영팀의 과도한 업무 부담과 업무와 상관없는 개인 자료 등의 유실로 인한 분쟁이 발생할 수 있습니다. DPT는 변화된 파일만 선별해서 통제하는<span className="br"></span>
                    특허 기술로 효율과 보안을 모두 만족시킬 수 있는 방안을 제안합니다.
                </p>
                <div className='imgCon' data-reveal>
                    <ul>
                        <li>
                            <div className='ico'><img src={imgDpt2_1} alt="맹목적 포맷" /></div>
                            <div className='txt'>
                                <div className='txt-tit'>
                                    <div><span>기존방식</span></div>
                                    <div><span>전체 포맷 / 일괄 삭제 통제</span></div>
                                </div>
                                <p>
                                    - 협력사 및 방문객 불만 고조 및 협업 지연<br />
                                    - OS 운영팀의 과도한 업무 부담<br />
                                    - 개인 자료 유실로 인한 분쟁 위험
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='ico'><img src={imgDpt2_2} alt="변화된 파일만 선별 통제" /></div>
                            <div className='txt'>
                                <div className='txt-tit'>
                                    <div><span>DPT</span></div>
                                    <div><span>선별적 변화된 파일 통제</span></div>
                                </div>
                                <p>
                                    - 반입 이후 생성, 수정 등 변화된 파일만 자동 검출<br />
                                    - 기존 업무 및 개인 자료 100% 보존<br />
                                    - 보안성과 방문객 편의의 완벽한 균형
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
          </div>

          <div className="responsive section_con">
            <h3>
              <span data-reveal />
              <div data-reveal data-delay="200">제품 특장점</div>
            </h3>
            <div className='work3' data-reveal>
                <h4 data-reveal data-delay="200">3중 융합 하이브리드 아키텍처 기술로 외부 노트북(저장매체)을 통제하는 무결점 검증 시스템</h4>
                <p data-reveal data-delay="200">
                    DPT는 외부 노트북이 기업 내부로 반입될 때부터 반출되는 순간까지 모든 보안 사각지대를 해소하는 보안 솔루션입니다.<br />
                    파일스캔(특허방식), 시점복원, 에이전트로 실시간 통제까지 3중 융합 하이브리드 기술로 변화된 파일만 정밀 검증하는 국내 선두 기술입니다.
                </p>
                <div className='imgCon'>
                    <div className='ico'><img src={imgDpt3} alt="" /></div>
                    <ul className='txt'>
                        <li data-reveal data-delay="200">
                            <div className='txt-tit'>
                                <div><span>01</span></div>
                                <div><span>DPT Agent (실시간 통제)</span></div>
                            </div>
                            <p>
                                - 업무 중 무선 통신 및 매체(USB 등) 원천 차단<br />
                                - 악의적인 우회 시도 실시간 감시
                            </p>
                        </li>
                        <li data-reveal data-delay="400">
                            <div className='txt-tit'>
                                <div><span>02</span></div>
                                <div><span>Volume Snapshot (시점복원)</span></div>
                            </div>
                            <p>
                                - 변화 이전 상태로의 완벽한 회귀점 생성<br />
                                - 수정된 파일을 반입 전 상태로 100% 복원
                            </p>
                        </li>
                        <li data-reveal data-delay="600">
                            <div className='txt-tit'>
                                <div><span>03</span></div>
                                <div><span>File Scan (메타정보 스캔)</span></div>
                            </div>
                            <p>
                                - 반입 시점의 기준선 확립 후 반출 시 비교분석<br />
                                - 메타데이터 및 시그니처 정밀 분석 기록
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='work3' data-reveal>
                <h4 data-reveal data-delay="200">반입 처리 시 압도적 성능, 업무 지연 없는 초고속 파일 스캔 기술</h4>
                <p data-reveal data-delay="200">
                    500GB HDD 기준, 30초에서 1분 이내로 핵심 메타 정보만을 타겟팅하여 초고속 분석 수행이 가능해서 대규모 사업장 및 출입 집중 시간대에도<span className="br"></span>
                    병목 현상 없이, 강력한 보안을 적용하면서도 운영의 효율성을 극대화할 수 있습니다.
                </p>
                <div className='imgCon'>
                    <div className='ico'><img src={imgDpt4} alt="" /></div>
                    <ul className='txt top'>
                        <li data-reveal data-delay="200">
                            <div className='txt-tit'>
                                <div><span>01</span></div>
                                <div><span>500GB HDD 파일 스캔, 30~60초 이내</span></div>
                            </div>
                            <p>
                                - 윈도우 OS의 병목 현상을 우회하는 Direct Disk Access<br />
                                - 핵심 메타 정보만을 선별하여 스캔하는 초고속 분석 기술
                            </p>
                        </li>
                        <li data-reveal data-delay="400">
                            <div className='txt-tit'>
                                <div><span>02</span></div>
                                <div><span>Direct Disk Access (OS 병목 우회)</span></div>
                            </div>
                            <p>
                                - 대규모 사업장, 출입 집중 시간대 병목 현상 해소<br />
                                - 강력한 보안 적용과 방문객의 대기 시간 최소화 운영
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='work3' data-reveal>
                <h4 data-reveal data-delay="200">지능형 유출 방어 매트릭스 (Threat Defense Matrix)</h4>
                <p data-reveal data-delay="200">
                    정상적으로 반입한 노트북의 경우에도 악의적인 다양한 활동으로 인해 보안 유출의 가능성은 존재합니다. DPT는 확장자 위장, 시스템 폴더에<span className="br"></span>
                    숨김 폴더로 은닉, 삭제 후 반출 시도 후에 복원하는 등의 다양한 시도를 완벽하게 차단하는 기술을 보유하고 있습니다.
                </p>
                <div className='imgCon'>
                    <img src={imgDpt5} alt="지능형 유출 방어 매트릭스" />
                </div>
            </div>
          </div>

          <div className="responsive section_con">
            <h3>
              <span data-reveal />
              <div data-reveal data-delay="200">스마트 운영 플로우</div>
            </h3>
            <div className='work4' data-reveal>
                <h4 data-reveal data-delay="200">노트북 반입 절차</h4>
                <p data-reveal data-delay="200">
                    정상적으로 반입한 노트북의 경우에도 악의적인 다양한 활동으로 인해 보안 유출의 가능성은 존재합니다. DPT는 확장자 위장, 시스템 폴더에<span className="br"></span>
                    숨김 폴더로 은닉, 삭제 후 반출 시도 후에 복원하는 등의 다양한 시도를 완벽하게 차단하는 기술을 보유하고 있습니다.
                </p>
                <div className='imgCon'>
                    <div className='ico'>
                        <img src={imgDpt6} alt="노트북 반입 절차" />
                    </div>
                    <div className='txt'>
                        <ul>
                            <li data-reveal data-delay="200">
                                <p className='t1'>방문객 확인</p>
                                <p className='t2'>
                                    01. 키오스크 기반 무인화<br />
                                    (방문객 정보 및 하드웨어 정보 자동 추출)
                                </p>
                            </li>
                            <li data-reveal data-delay="400">
                                <p className='t1'>동의서 작성</p>
                                <p className='t2'>
                                    02. 키오스크 동의서 작성<br />
                                    개인정보 수집 및 보안서약 전자서명
                                </p>
                            </li>
                            <li data-reveal data-delay="600">
                                <p className='t1'>노트북 파일 스캔</p>
                                <p className='t2'>
                                    03. 노트북 파일 스캔<br />
                                    방문자 노트북 파일 메타정보 스캔 및<br />
                                    Volume Snapshot 생성
                                </p>
                            </li>
                            <li data-reveal data-delay="800">
                                <p className='t1'>정책 적용</p>
                                <p className='t2'>
                                    04. 정책적용<br />
                                    DPT Agent 설치 및 통신/매체 차단 정책 활성화
                                </p>
                            </li>
                            <li data-reveal data-delay="1000">
                                <p className='t1'>반입 완료(입문)</p>
                                <p className='t2'>
                                    05. 반입 절차 완료 후 입문<br />
                                    반입 절차 확인 후 정상 입문 가능
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='work5' data-reveal>
                <h4 data-reveal data-delay="200">노트북 반출 절차</h4>
                <p data-reveal data-delay="200">
                    정상적으로 반출한 노트북의 경우에도 악의적인 다양한 활동으로 인해 보안 유출의 가능성은 존재합니다. DPT는 확장자 위장, 시스템 폴더에<span className="br"></span>
                    숨김 폴더로 은닉, 삭제 후 반출 시도 후에 복원하는 등의 다양한 시도를 완벽하게 차단하는 기술을 보유하고 있습니다.
                </p>
                <div className='imgCon'>
                    <ul>
                        <li data-reveal data-delay="200">
                            <p className='t1'>방문객 확인</p>
                            <p className='t2'>
                                01. 반출 노트북 인증<br />
                                QR/바코드를 통한 동일 노트북 식별
                            </p>
                        </li>
                        <li data-reveal data-delay="400">
                            <p className='t1'>동의서 작성</p>
                            <p className='t2'>
                                02. 변화된 파일 검출<br />
                                반입 기준 정보와 현재 파일 상태 시그니처 정밀 분석
                            </p>
                        </li>
                        <li data-reveal data-delay="600">
                            <p className="t1">03. 정책 설정에 따른 자동 조치<span className='mo-br'></span>(변화된 파일 전송만/영구삭제/시점 복원)</p>
                        </li>
                        <li className='col-3' data-reveal data-delay="800">
                            <p className="t1">변화된 파일 사본 서버 전송</p>
                            <p className="t1">노트북 생성 파일 영구 삭제</p>
                            <p className="t1">수정된 파일 반입 시점 복구</p>
                        </li>
                        <li data-reveal data-delay="400">
                            <p className='t1'>반출 완료 (입문)</p>
                            <p className='t2'>
                                04. 반출 완료<br />
                                DPT Agent 자동삭제 및 반출 이력 기록 
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
          </div>

          <div className="responsive section_con">
            <h3>
              <span data-reveal />
              <div data-reveal data-delay="200">기대효과</div>
            </h3>
            <div className='work3' data-reveal>
                <h4 data-reveal data-delay="200">외부 노트북 및 저장매체로 인한 바이러스 및 악성코드 차단, 기업정보 유출 원천 차단</h4>
                <p data-reveal data-delay="200">
                    노트북 반입·반출 통제, 외부 저장매체 USB 메모리 CD-ROM 등의 바이러스 및 악성코드 검사, 기존 방문자 시스템 연동, 디스크 영구삭제,<span className="br"></span>
                    노트북 시점 복원 및 관리에 특화된 보안 솔루션으로 파트너사 협업 인원의 출입이 있는 사업장에서 보안 유출과 바이러스 유입을 원천 차단합니다.
                </p>
                <div className='img2 bg'>
                    <ul>
                        <li data-reveal>
                            <div><img src={imgDpt8_1} alt="" /></div>
                            <p>핵심정보 유출대비</p>
                        </li>
                        <li data-reveal data-delay="100"><img src={imgDpt8Plus} alt="" /></li>
                        <li data-reveal data-delay="150">
                            <div><img src={imgDpt8_2} alt="" /></div>
                            <p>바이러스 사전 차단</p>
                        </li>
                        <li data-reveal data-delay="200"><img src={imgDpt8Plus} alt="" /></li>
                        <li data-reveal data-delay="250">
                            <div><img src={imgDpt8_3} alt="" /></div>
                            <p>노트북 통제관리</p>
                        </li>
                        <li data-reveal data-delay="300"><img src={imgDpt8Plus} alt="" /></li>
                        <li data-reveal data-delay="350">
                            <div><img src={imgDpt8_4} alt="" /></div>
                            <p>노트북 매체제어</p>
                        </li>
                        <li data-reveal data-delay="400"><img src={imgDpt8Plus} alt="" /></li>
                        <li data-reveal data-delay="450">
                            <div><img src={imgDpt8_5} alt="" /></div>
                            <p>방문자 관리</p>
                        </li>
                    </ul>
                </div>
            </div>
          </div>

          <div className="responsive section_con">
            <h3>
              <span data-reveal />
              <div data-reveal data-delay="200">주요화면 및 규격</div>
            </h3>
            <div className='work3' data-reveal>
                <h4 data-reveal data-delay="200">무인 키오스크에서 방문자 스스로 반입과 반출 진행, 관리자의 강력한 통제 및 관리</h4>
                <p data-reveal data-delay="200">
                    DPT는 간결한 인터페이스와 보안 기능으로 보안담당자의 개입 없이 사용자가 스스로 반입과 반출을 진행하고, 관리자는 별도의 웹매니저로<span className="br"></span>
                    현황 리포트, 정책 관리, 반·출입 통제, 매체제어, 보안 이슈 관리 등을 할 수 있습니다.
                </p>
            </div>
            <div className="img3" data-reveal>
                <ul>
                    <li>
                        <div><img src={imgDpt9_1} alt="" /></div>
                        <p>키오스크 반출입 안내/보안동의서 작성</p>
                    </li>
                    <li>
                        <div><img src={imgDpt9_2} alt="" /></div>
                        <p>보안솔루션 실행</p>
                    </li>
                    <li>
                        <div><img src={imgDpt9_3} alt="" /></div>
                        <p>윈도우 업데이트/바이러스 백신 체크</p>
                    </li>
                    <li>
                        <div><img src={imgDpt9_4} alt="" /></div>
                        <p>반입 노트북 파일 스캔</p>
                    </li>
                </ul>
            </div>
            <div className='width-1105'>
                <table className="pyo" data-reveal>
                    <tbody>
                    <tr>
                        <th scope="col">구분</th>
                        <th scope="col">상세내역</th>
                    </tr>
                    <tr>
                        <th scope="row">DPT Client</th>
                        <td>
                            반출입 되는 저장매체(노트북, PC, USB)에 대한 검색/비교 소프트웨어<br />
                            <span className="blue">모든 변화된 파일 검출 / Hidden 파티션 검출 또는 사용금지 기능</span><br />
                            DPT Client : windows XP ~ 10 (스캐닝방식+Agent방식)<br />
                            <span className="blue">파일 스캐닝 + 매체차단 Agent 프로그램의 융합 방식</span><br />
                            <span className="blue">(유무선네트워크 , 블루투스, 웹캠, USB, CD-ROM 등 매체 차단 또는 선택적 사용)</span>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">DPT 관리<br />Appliance</th>
                        <td>
                            반출입 관리, 통계, 리포팅 수행 및 Gate별 Appliance 통합 관리 (웹매니저)<br />
                            <span className="blue">내방객 노트북 반입/반출 관리, 조회 및 통계 분석, 변화된 파일 내역 관리</span><br />
                            매체 차단 개인/Gate/전체 정책 관리<br />
                            <span className="blue">파일 ID 분석, 키워드 기반 파일 검색(DB)</span><br />
                            하드웨어 사양 : Gate Appliance 데이터량에 따른 별도 제안
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">DPT Gate<br />Appliance</th>
                        <td>
                            <span className="blue">출입Gate에 설치되는 일체형 Kiosk 타입으로 반출입 절차 수행</span><br />
                            검색대 및 전자서명 모듈 포함한 일체형 Kiosk 타입<br />
                            Kiosk :  670 x 1770 x 500 (mm)<br />
                            하드웨어 사양(Kiosk) 별도 제안
                        </td>
                    </tr>
                    </tbody>
                </table>
                <p className="notice" data-reveal>※ Kiosk와 사양은 납품사의 사정에 따라 협의 없이 변경 될 수 있습니다.</p>
            </div>
          </div>

          <div className="section_con section_kiosk">
            <div className='inner'>
                <h3>
                    <span data-reveal />
                    <div data-reveal data-delay="200">현장 상황에 맞춘 유연한 키오스크 선택</div>
                </h3>
                <div className='con-banner'>
                    <div className='txtBox' data-reveal>
                        <h3>다양한 형태의 키오스크는<br />현장 상황에 유연하게 대응합니다</h3>
                        <p>
                            첨단 대기업 및 공공기관 현장에서 외부 저장<span className='br'></span>
                            매체로 인한 보안 유출을 통제하는 시스템으로<span className='br'></span>
                            핵심 솔루션에 맞춰 키오스크를 선택하실 수 있습니다
                        </p>
                        <div className='btn-area'>
                            <div className='slide-nav'>
                                <button type='button' className='btn-prev' aria-label="이전 슬라이드"></button>
                                <span className='num' aria-live="polite">1/N</span>
                                <button type='button' className='btn-next' aria-label="다음 슬라이드"></button>
                            </div>
                        </div>
                    </div>
                    <div className='img_kiosk kiosk_slide swiper-container'>
                        <div className='swiper-wrapper'>
                            <div className='swiper-slide'>
                                <img src={mainImgKiosk1} alt="" />
                            </div>
                            <div className='swiper-slide'>
                                <img src={mainImgKiosk2} alt="" />
                            </div>
                            <div className='swiper-slide'>
                                <img src={mainImgKiosk3} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className='bg'></div>
                </div>
            </div>
          </div>

          <div className="section_con section_client">
            <div className='inner'>
                <div className='tit-area'>
                    <h3>
                        <span data-reveal />
                        <div data-reveal data-delay="200">고객사</div>
                    </h3>
                </div>
                <div className='con'>
                    <ul className='cl-list' data-reveal data-delay="150">
                        <li data-reveal><img src={mainClImg1} alt="고객사" /></li>
                        <li data-reveal data-delay="100"><img src={mainClImg2} alt="고객사" /></li>
                        <li data-reveal data-delay="150"><img src={mainClImg3} alt="고객사" /></li>
                        <li data-reveal data-delay="200"><img src={mainClImg4} alt="고객사" /></li>
                        <li data-reveal data-delay="250"><img src={mainClImg5} alt="고객사" /></li>
                    </ul>
                </div>
            </div>
          </div>

        </div>
    </ProductLayout>
  )
}

export default ProductDpt

