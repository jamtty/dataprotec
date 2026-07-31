import { useEffect, useRef } from 'react'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import ProductLayout from './ProductLayout'
import { useBatchReveal } from '../../utils/useScrollReveal'
import prdDptiImg1 from '../../assets/images/img_dpti_1.png'
import prdDptiW2Ico from '../../assets/images/img_dpti_w2_ico.png'
import prdDptiw3Img1 from '../../assets/images/img_dpti_w3_1.png'
import prdDptiw3Img2 from '../../assets/images/img_dpti_w3_2.png'
import imgDpt8_1 from '../../assets/images/img_dpt_8_1.png'
import imgDpt8_2 from '../../assets/images/img_dpt_8_2.png'
import imgDpt8_3 from '../../assets/images/img_dpt_8_3.png'
import imgDpt8_4 from '../../assets/images/img_dpt_8_4.png'
import imgDpt8_5 from '../../assets/images/img_dpt_8_5.png'
import imgDpt8Plus from '../../assets/images/img_dpt_8_plus.png'



import product4Bg1Img from '../../assets/images/product4_bg1_img.png'
import product4Con1_1 from '../../assets/images/product4_con1_1.jpg'
import product4Con1_2 from '../../assets/images/product4_con1_2.jpg'
import product4Con1_3 from '../../assets/images/product4_con1_3.jpg'
import product4Con1_4 from '../../assets/images/product4_con1_4.jpg'
import product4Con1_5 from '../../assets/images/product4_con1_5.jpg'
import productCon2 from '../../assets/images/product_con2.jpg'
import product4Con2 from '../../assets/images/product4_con2.jpg'
import product4Con3 from '../../assets/images/product4_con3.png'
import product4Bg2Logo from '../../assets/images/product4_bg2_logo.png'
import productCon3_1 from '../../assets/images/product_con3_1.jpg'
import productCon3Plus from '../../assets/images/product_con3_plus.jpg'
import productCon3_2 from '../../assets/images/product_con3_2.jpg'
import productCon3_3 from '../../assets/images/product_con3_3.jpg'
import productCon3_4 from '../../assets/images/product_con3_4.jpg'
import productCon3_5 from '../../assets/images/product_con3_5.jpg'
import product4Con4_1 from '../../assets/images/product4_con4_1.png'
import product4Con4_2 from '../../assets/images/product4_con4_2.png'
import product4Con4_3 from '../../assets/images/product4_con4_3.png'
import product4Con4_4 from '../../assets/images/product4_con4_4.png'
import product4Con4_2_1 from '../../assets/images/product4_con4-2_1.png'
import product4Con4_2_2 from '../../assets/images/product4_con4-2_2.png'
import mainImgKiosk1 from '../../assets/images/img_dpti_Kiosk_1.png'
import mainImgKiosk2 from '../../assets/images/img_dpti_Kiosk_2.png'
import mainClImg1 from '../../assets/images/main_cl_img_1.png'
import mainClImg2 from '../../assets/images/main_cl_img_2.png'
import mainClImg3 from '../../assets/images/main_cl_img_3.png'
import mainClImg4 from '../../assets/images/main_cl_img_4.png'
import mainClImg5 from '../../assets/images/main_cl_img_5.png'



function ProductDptI() {
  const containerRef = useRef<HTMLDivElement>(null)
  useBatchReveal(containerRef)

  useEffect(() => {
    let kioskSwiper: Swiper | null = null
    if (document.querySelector('.kiosk_slide')) {
      const numEl = document.querySelector<HTMLElement>('.section_kiosk .slide-nav .num')
      const totalSlides = document.querySelectorAll('.kiosk_slide .swiper-slide').length
      kioskSwiper = new Swiper('.kiosk_slide', {
        modules: [Navigation],
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
      <div className="contetns prd NewDpt-i" ref={containerRef}>

        <div className="responsive title_area">
          <h2 data-reveal>DPT-i <span>Intelligent Notebook Security</span></h2>
          <p data-reveal data-delay="200">
            DPT-i (Intelligent Notebook Security Solution)는 노트북의 무단 반출을 통제하고 승인된 반출절차를 통해 사내 노트북의 보안 통제<span className="br"></span>관리 솔루션입니다.  사내 공용 노트북, 업무용 노트북 출장의 통합 보안 관리와 주변장치 제어 및 통제, 파일 분석 및 백업 등을 통해 사내<span className="br"></span>
            기밀자료 정보 유출을 대비할 수 있고, 복귀 시점 복원 및 변화된 파일 분석과 초기화 등의 절차로 운용의 편리성을 동시에 추구합니다.
          </p>
        </div>

        <div className='responsive section_con'>
            <h3>
              <span data-reveal />
              <div data-reveal data-delay="200">도입 필요성</div>
            </h3>
            <div className='work' data-reveal>
                <h4 data-reveal data-delay="200">사내(지급/대여) 노트북 통합 관리를 위한 지능형 보안 운영 사이클</h4>
                <p data-reveal data-delay="300">
                    DPT-i는 기존의 수기 기반 노트북 대여 관리를, 자동화된 지능형 보안 허브로 전환합니다. 스마트 하드웨어와 강력한 소프트웨어를 결합하여<span className="br"></span>
                    기업 노트북의 대여, 사용, 반납, 초기화 및 완전삭제 등의 전 과정을 안전하고 체계적으로 관리합니다.  
                </p>
                <div className='max-width' data-reveal data-delay="400">
                    <img src={prdDptiImg1} alt="" />
                </div>
                <div className='imgCon' data-reveal>
                    <ul>
                        <li data-reveal data-delay="100">
                            <div className='txt'>
                                <div className='txt-tit'>
                                    <div><span>01</span></div>
                                    <div><span>노트북 대여, 반납 절차 이력의 표준화</span></div>
                                </div>
                                <p>
                                    노트북 대여, 반납 이력을 표준화된 방식으로 자동 기록하여 기존 수기 관리에서 발생하던 자산 누락, 반납 착오, 수량 집계 오류를 예방
                                </p>
                            </div>
                        </li>
                        <li data-reveal data-delay="200">
                            <div className='txt'>
                                <div className='txt-tit'>
                                    <div><span>02</span></div>
                                    <div><span>개인정보 및 업무 정보 유출 방지</span></div>
                                </div>
                                <p>
                                    노트북 반납과 동시에 브라우저 사용기록, 인증서, 임시 파일 등 사용자 흔적 데이터를 자동으로 삭제하여 개인정보 및 업무정보 잔존 위험 방지
                                </p>
                            </div>
                        </li>
                        <li data-reveal data-delay="300">
                            <div className='txt'>
                                <div className='txt-tit'>
                                    <div><span>03</span></div>
                                    <div><span>사외 사용 시 정보 유출 원천 차단</span></div>
                                </div>
                                <p>
                                    노트북이 사외에서 사용되는 경우에도 USB 연결, 프린터기 출력물 보안, 외부 네트워크 연결을 정책 기반으로 엄격히 통제하여 정보 유출 위험 원천 차단
                                </p>
                            </div>
                        </li>
                        <li data-reveal data-delay="400">
                            <div className='txt'>
                                <div className='txt-tit'>
                                    <div><span>04</span></div>
                                    <div><span>실시간 보안 정책 적용으로 보안 유출 방지 </span></div>
                                </div>
                                <p>
                                    DPT-i 클라이언트는 노트북 대여 기간 동안 파일 사용, 외부장치 연결, 네트워크 접속 등 실시간 보안 이벤트를 모니터링하며 실시간 보안 정책 적용 
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='tbl-scroll'>
                    <table className="pyo5" data-reveal>
                        <thead>
                            <tr>
                                <th>구분</th>
                                <th>수동 보관 장치</th>
                                <th>단순 보안 에이전트</th>
                                <th>DPT-i 통합 시스템</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>자동 대여/반납</td>
                                <td>수동</td>
                                <td>해당없음</td>
                                <td>전과정 자동 대여/반납<br />(무인 키오스크 보관함)</td>
                            </tr>
                            <tr>
                                <td>자동 삭제/백업·복원</td>
                                <td>해당없음</td>
                                <td>해당없음</td>
                                <td>자동 삭제/백업·복원<br />(무인 키오스크 보관 동시)</td>
                            </tr>
                            <tr>
                                <td>HW/SW 통합 연동</td>
                                <td>해당없음</td>
                                <td>해당없음</td>
                                <td>키오스크, 클라이언트, 서버<br />실시간 동기화로 통합 보안 관리</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div className='responsive section_con'>
            <h3>
              <span data-reveal />
              <div data-reveal data-delay="200">제품 특장점</div>
            </h3>
            <div className='work2' data-reveal>
                <h4 data-reveal data-delay="200">사내(지급/대여) 노트북 새로운 보안의 기준!</h4>
                <p data-reveal data-delay="300">
                    사내(지급/대여)노트북을 위한 이력관리, 매체제어, 대여 노트북의 무인 키오스크와 보관함을 연동한 24H 관리자 무개입의 관리 효율성까지 한번에!<span className="br"></span>
                    DPT-i(Intelligent Notebook Security)가 사내 노트북 관리와 보안의 새로운 기준을 제시합니다!   
                </p>
                <div className='imgCon mt-70' data-reveal data-delay="400">
                    <img src={prdDptiW2Ico} alt="" />
                    <div className='txt'>
                        <p className='tit'>DPT-i 솔루션</p>
                        <p className='info'>
                            - 무인 키오스크 및 스마트 보관함<br />
                            - DPT-i Client 프로그램<br />
                            - 중앙 관리 서버/웹매니저
                        </p>
                    </div>
                </div>
                <ul className='txtBox'>
                    <li data-reveal data-delay="100">
                        <p className='tit'><span>운영 자동화</span></p>
                        <p className='info'>대여/반납 업무 절차의 표준화, 담당자의 단순 반복 업무 최소화</p>
                    </li>
                    <li data-reveal data-delay="150">
                        <p className='tit'><span>보안 내재화</span></p>
                        <p className='info'>반납 즉시 노트북의 데이터 영구삭제 및 표준 이미지로 노트북 자동 복원</p>
                    </li>
                    <li data-reveal data-delay="200">
                        <p className='tit'><span>이력 투명성</span></p>
                        <p className='info'>신청 및 승인 인원, 사용기간, 초기화 결과 및 장애 이력 등 통합 모니터링</p>
                    </li>
                    <li data-reveal data-delay="250">
                        <p className='tit'><span>24H 무인 운영</span></p>
                        <p className='info'>24H 무인으로 운영, 승인된 사용자가 키오스크를 통해 자율 수령 및 반납</p>
                    </li>
                    <li data-reveal data-delay="300">
                        <p className='tit'><span>지속 운영성</span></p>
                        <p className='info'>보관 동시에 OS 패치, 백신 엔진 업데이트, 정책 최신 유지 등 대여 가능의 상태 유지</p>
                    </li>
                </ul>
            </div>
            <div className='work3' data-reveal>
                <h4 data-reveal data-delay="200">무중단 자동화 사이클, 최적의 대여 준비상태 유지</h4>
                <p data-reveal data-delay="300">
                    노트북 반납과 동시에 브라우저 사용기록, 인증서, 임시 파일 등 사용자 흔적 데이터를 자동으로 삭제하여 개인 정보 및 업무정보 잔존 위험 방지하고<span className="br"></span>
                    특수 설계된 보관함 내부에 노트북을 거치 시 자동으로 사용 이력 업로드, 데이터 자동 초기화 등의 상시 '대여가능' 상태를 유지합니다.  
                </p>
                <div className='imgCon' data-reveal data-delay="400">
                    <div className='ico'><img src={prdDptiw3Img1} alt="" /></div>
                    <ul className='txt'>
                        <li data-reveal data-delay="200">
                            <div className='txt-tit'>
                                <div><span>01</span></div>
                                <div><span>반납 및 자동 보안 처리</span></div>
                            </div>
                            <p>
                                - 보관함 거치및 네트워크 자동 연결<br />
                                - 사용이력업로드 후 자동 초기화로 ‘대여가능’ 전환  
                            </p>
                        </li>
                        <li data-reveal data-delay="400">
                            <div className='txt-tit'>
                                <div><span>02</span></div>
                                <div><span>스마트 무인 키오스크/보관함 설계</span></div>
                            </div>
                            <p>
                                - 다중 인증 체계(사원증, QR, 승인코드 등)<br />
                                - 노트북 거치 감지, 연결상태 감지, 비정상 강제 개방 알림<br />
                                - 자동 충전 및 지속 충전 방지, 온도/습도 센서로 위험 알림
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='work3' data-reveal>
                <h4 data-reveal data-delay="200">외부망에서도 완벽히 통제되는 DPT-i Client 보안</h4>
                <p data-reveal data-delay="300">
                    DPT-i Client 프로그램을 통해 지급 노트북의 외부망에 대해서도 보안 위협에 대응하기 위한 매체 및 네트워크 통제, 행위 모니터링, 출력보안,<span className="br"></span>
                    분실 및 미반납 등에 통제 및 대응합니다. 
                </p>
                <div className='imgCon' data-reveal data-delay="400">
                    <div className='ico top'><img src={prdDptiw3Img2} alt="" /></div>
                    <ul className='txt'>
                        <li data-reveal data-delay="200">
                            <div className='txt-tit'>
                                <div><span>01</span></div>
                                <div><span>매체 및 네트워크 통제</span></div>
                            </div>
                            <p>
                                - 승인된 USB만 허용<br />
                                - Wi-Fi, 블루투스, 테더링 등외부 네트워크 사용 제한 
                            </p>
                        </li>
                        <li data-reveal data-delay="400">
                            <div className='txt-tit'>
                                <div><span>02</span></div>
                                <div><span>노트북 사용 행위 모니터링</span></div>
                            </div>
                            <p>
                                - 특정 확장자 파일복사, 업로드, 첨부 행위 실시간 감시<br />
                                - 비인가 프로그램 설치 및 실행 차단 
                            </p>
                        </li>
                        <li data-reveal data-delay="400">
                            <div className='txt-tit'>
                                <div><span>03</span></div>
                                <div><span>출력 보안, 분실/미반납 대응</span></div>
                            </div>
                            <p>
                                - 승인된 사내/지정 프린터에서만 출력 허용<br />
                                - 반납 기한 만료 시 경고 후 네트워크 차단 및 원격 잠금<br />
                                - 회수 프로세스 강제 실행
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="responsive section_con bg">
            <h3>
              <span data-reveal />
              <div data-reveal data-delay="200">DPT-i 주요기능</div>
            </h3>
            <h4 data-reveal data-delay="200">사내(지급/대여) 노트북 보안의 완벽한 대안</h4>
            <p data-reveal data-delay="300">
                DPT-i는 공용대여 노트북의 관리와 사내 인원의 출장으로 인한 보안 유출을 대비한 솔루션으로 대여 기간 중이나 출장지에서 유출될 수 있는<span className="br"></span>
                보안 유출을 대비하기 위해 시점분석 및 시점복원, 주변 장치 제어, 복귀 후 노트북 복원과 초기화 등의 관리의 효율성을 모두 충족할 수 있습니다.
            </p>
            <ul className="info">
                <li data-reveal data-delay="100">노트북 파일 보안 관리  : 대여 시점과 비교하여 파일 변경정보 저장 및 삭제와 시점 복원</li>
                <li data-reveal data-delay="150">장치 제어 기능: 주변 장치 사용 권한 전체 정책 적용 및 개인 정책 적용 가능</li>
                <li data-reveal data-delay="200">사내 사용자정보 기본정보 연동 가능</li>
                <li data-reveal data-delay="250">반출 요청 시 e-Mail을 이용한 승인 요청 가능</li>
                <li data-reveal data-delay="300">관리자 웹으로 실시간 대여 노트북 이력관리</li>
                <li data-reveal data-delay="350">웹 기반 반출 신청 (사내, 사외용)</li>
                <li data-reveal data-delay="400">반출 신청 시 반출기간 및 매체 허용 요청</li>
                <li data-reveal data-delay="450">무단 반출 시 사용제한(일회성 키를 통하여 사용 허가가능)</li>
            </ul>
            <div className="bg_img" data-reveal data-delay="200">
              <img src={productCon2} alt="" />
            </div>
        </div>

        <div className='mt-100' data-reveal>
            <img src={product4Con2} alt="" />
        </div>

        <div className="responsive section_con">
            <h3>
              <span data-reveal />
              <div data-reveal data-delay="200">기대효과</div>
            </h3>
            <h4 data-reveal data-delay="200">사내 지급 노트북 관리와 출장 노트북에 대한 정보 유출 및 분실에 대한 대비, 기업정보 유출 원천 차단</h4>
            <p data-reveal data-delay="300">
                사내 지급 노트북 관리와 출장 노트북에 대한 정보 유출 및 분실에 대한 대비는 어떻게 하시나요? DPT-i는 공용대여 노트북의 관리와<span className="br"></span>
                사내 인원의 출장으로 인한 보안 유출을 대비한 솔루션으로 대여 기간 중이나 출장지에서 유출될 수 있는 보안 유출을 대비하기 위해<span className="br"></span>
                시점분석 및 시점복원, 주변 장치 제어, 복귀 후 노트북 복원과 초기화 등의 관리의 효율성을 모두 충족할 수 있습니다.
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
                        <p>출장자 보안</p>
                    </li>
                </ul>
            </div>
        </div>

        <div className="responsive section_con">
            <h3>
              <span data-reveal />
              <div data-reveal data-delay="200">주요화면 및 규격</div>
            </h3>
            <h4 data-reveal data-delay="200">사내(지급/대여) 노트북 관리와 보안 유출 대비를 통합 솔루션으로 하나로</h4>
            <p data-reveal data-delay="300">
                DPT-i는 간결한 인터페이스와 보안 기능으로 보안담당자의 개입 없이 출장(대여)자가 스스로 반입과 반출을 진행하고 관리자는<span className="br"></span>
                별도의 웹매니저로 현황 리포트, 정책 관리, 반출입 통제, 매체제어, 보안 이슈 관리 등을 할 수 있습니다.
            </p>
            <div className="img3">
                <ul>
                <li data-reveal data-delay="100">
                    <div><img src={product4Con4_1} alt="" /></div>
                    <p>노트북 등록</p>
                </li>
                <li data-reveal data-delay="200">
                    <div><img src={product4Con4_2} alt="" /></div>
                    <p>노트북 정보수집</p>
                </li>
                <li data-reveal data-delay="300">
                    <div><img src={product4Con4_3} alt="" /></div>
                    <p>노트북 대여 중 화면</p>
                </li>
                <li data-reveal data-delay="400">
                    <div><img src={product4Con4_4} alt="" /></div>
                    <p>노트북대여 만료 화면</p>
                </li>
                </ul>
            </div>
            <div className='width-1105'>
                <table className="pyo" data-reveal>
                    <tbody>
                    <tr>
                        <th>구분</th>
                        <th>상세내역</th>
                    </tr>
                    <tr>
                        <td>승인코드로<br />보관함 개폐</td>
                        <td>
                        <span className="blue">대여 승인 완료 후 지급 받는 '승인코드' 입력 후 보관함 자동 개폐</span><span className="br"></span>
                        관리 서버와 통신으로 개폐되며 무단 개방 방지
                        </td>
                    </tr>
                    <tr>
                        <td>자동 초기화/복원</td>
                        <td>
                        노트북 반납 시점 관리 서버 통신 후 로그 기록 이관 후 자동 초기화<span className="br"></span>
                        <span className="blue">초기화(이미지 복원)는 보관함 내부 USB-C 연결 후 진행(자동 기능)</span>
                        </td>
                    </tr>
                    <tr>
                        <td>자동 SW 업데이트</td>
                        <td>
                        보관함에 수납된 노트북은 자동으로 충전<span className="br"></span>
                        <span className="blue">이미지 복원 후 보안소프트웨어 업데이트 기능 지원</span>
                        </td>
                    </tr>
                    <tr>
                        <td>이력전송<br />로그저장</td>
                        <td>
                        <span className="blue">대여 및 반납 이벤트 이력정보를 관리서버에 실시간 보고</span><span className="br"></span>
                        네트워크 장애 시 이력 정보 임시 저장 기능
                        </td>
                    </tr>
                    <tr>
                        <td>보안/안전 기능</td>
                        <td>
                        비인가 개방 시도 시 경보 및 중앙 서버 경고 전송<span className="br"></span>
                        <span className="blue">비정상 코드 입력 차단 기능 (일정횟수 승인코드 오류 시, 일정시간 동안 입력 기능 차단)</span><span className="br"></span>
                        정전 대비 UPS 장착<span className="br"></span>
                        <span className="blue">화재 감지 및 경보 기능</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <p className="notice" data-reveal>※ Kiosk와 사양은 납품사의 사정에 따라 협의 없이 변경 될 수 있습니다.</p>
            </div>
            <div className="img3 gap">
                <ul>
                <li data-reveal data-delay="100">
                    <div><img src={product4Con4_2_1} alt="" /></div>
                    <p>모니터 보관함 일체형(12대 보관)</p>
                </li>
                <li data-reveal data-delay="200">
                    <div><img src={product4Con4_2_2} alt="" /></div>
                    <p>콘트롤 타워+보관함 확장형(16대 이상 확장 가능)</p>
                </li>
                </ul>
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
                                <button type='button' className='btn-prev'></button>
                                <span className='num'>1/N</span>
                                <button type='button' className='btn-next'></button>
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
                        </div>
                    </div>
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

export default ProductDptI
