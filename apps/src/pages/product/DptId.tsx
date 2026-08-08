import { useEffect, useRef } from 'react'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import ProductLayout from './ProductLayout'
import { useBatchReveal } from '../../utils/useScrollReveal'
import prdDptiImg1 from '../../assets/images/img_dptid_con_1.png'
import prdDptiImg1_line from '../../assets/images/img_dptid_con_1_bg.png'
import prdDptiW2Ico from '../../assets/images/img_dpt_eraser_2.png'
import prdDptiw3Img2 from '../../assets/images/img_dpt_eraser_3.png'
import imgDpt8_1 from '../../assets/images/img_dpt_eraser8_1.png'
import imgDpt8_2 from '../../assets/images/img_dpt_eraser8_2.png'
import imgDpt8_3 from '../../assets/images/img_dpt_eraser8_3.png'
import imgDpt8_4 from '../../assets/images/img_dpt_eraser8_4.png'
import imgDpt8Plus from '../../assets/images/img_dpt_8_plus.png'
import productCon2 from '../../assets/images/product_eraser_con2.png'
import mainImgKiosk1 from '../../assets/images/img_dptid_Kiosk_1.png'
import mainImgKiosk2 from '../../assets/images/img_raser_Kiosk_2.png'
import mainClImg1 from '../../assets/images/main_cl_img_1.png'
import mainClImg2 from '../../assets/images/main_cl_img_2.png'
import mainClImg3 from '../../assets/images/main_cl_img_3.png'
import mainClImg4 from '../../assets/images/main_cl_img_4.png'
import mainClImg5 from '../../assets/images/main_cl_img_5.png'

import prdDpteraserImg1 from '../../assets/images/ico_eraser_new1.png'
import prdDpteraserImg2 from '../../assets/images/ico_eraser_new2.png'
import prdDpteraserImg3 from '../../assets/images/ico_eraser_new3.png'
import prdDpteraserImg4 from '../../assets/images/ico_eraser_new4.png'
import prdDpteraserImg5 from '../../assets/images/ico_eraser_new5.png'

import product3Con1_1 from '../../assets/images/product3_con1_1.jpg'
import product3Con1_2 from '../../assets/images/product3_con1_2.jpg'
import product3Con1_3 from '../../assets/images/product3_con1_3.jpg'
import product3Con1_4 from '../../assets/images/product3_con1_4.jpg'
import product3Con1_5 from '../../assets/images/product3_con1_5.jpg'

import product3Con4_1 from '../../assets/images/product3_con4_1.jpg'
import product3Con4_2 from '../../assets/images/product3_con4_2.jpg'
import product3Con4_3 from '../../assets/images/product3_con4_3.jpg'
import product3Con4_4 from '../../assets/images/product3_con4_4.jpg'
import product5Con2 from '../../assets/images/product5_con2.jpg'

import product5Con3_1 from '../../assets/images/product5_con3_1.png'
import product5Con3_2 from '../../assets/images/product5_con3_2.png'
import product5Con3_3 from '../../assets/images/product5_con3_3.png'
import product5Con3_4 from '../../assets/images/product5_con3_4.png'
import product5Con3_5 from '../../assets/images/product5_con3_5.png'

import product5Con4_1 from '../../assets/images/product5_con4_1.jpg'
import product5Con4_2 from '../../assets/images/product5_con4_2.jpg'
import product5Con4_3 from '../../assets/images/product5_con4_3.jpg'
import product5Con4_4 from '../../assets/images/product5_con4_4.jpg'
import product5Con4_5 from '../../assets/images/product5_con4_5.jpg'
import product5Con4_6 from '../../assets/images/product5_con4_6.jpg'


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
          <h2 data-reveal>DPT-ID Kiosk <span>DPT-IDentification Kiosk</span></h2>
          <p data-reveal data-delay="200">
            DPT-ID 키오스크는 기업의 출입 보안 이슈와 방문객 혼잡으로 인한 대기를 신분증 인식, 출입증 발급 및 회수 절차를 자동화하여 운영의<span className="br"></span>
            효율성을 높이는 키오스크 시스템입니다. 신분증 인식, QR코드 리더기, 대용량 출입카드 디스펜서 등으로 구성되어 있습니다. 방문시스템과<span className="br"></span> 연동하여 대기 없이 방문객 스스로 출입절차를 진행할 수 있고, 물품 반입도 확인 절차 후 편리하게 반입이 가능한 출입증 발급 시스템입니다.
          </p>
        </div>

        <div className='responsive section_con'>
            <h3>
              <span data-reveal />
              <div data-reveal data-delay="200">도입 필요성</div>
            </h3>
            <div className='work' data-reveal>
                <h4 data-reveal data-delay="200">방문자 보안이 필요한 사업장의 지능형 출입증 발급 시스템</h4>
                <p data-reveal data-delay="300">
                    방문객 출입 인증과 방문 절차 과정을 개선하는 지능형 무인 출입증 발급 시스템으로 방문시스템 연동형 출입증 발급 키오스크입니다.<br />
                    500여장의 출입 카드가 듀얼로 연결 운영되어 하나의 장치에 장애가 발생해도 예비 장치로 전환되어 발급 중단 사태를 방지할 수 있습니다.
                </p>
                <div className='max-width' data-reveal data-delay="400">
                    <div className='dptIdimgWrap'>
                        <img src={prdDptiImg1} data-reveal data-delay="100" alt="" />
                        <div className='line' data-reveal data-delay="200"><img src={prdDptiImg1_line} alt="" /></div>
                        <div className='po_txt a' data-reveal data-delay="300">
                            <div className='tit'>신분증/고속 OCR 지원</div>
                            <div className='info'>
                                - 방문시스템, 주차, 게이트 시스템 연동<br />
                                - 주민등록증/면허증 진위확인 단말기 모듈<br />
                                <span></span>(행정자치부 진위확인시스템 표준규격 인증)
                            </div>
                        </div>
                        <div className='po_txt b' data-reveal data-delay="400">
                            <div className='tit'>듀얼 디스펜서 시스템</div>
                            <div className='info'>
                                - 장애 발생 시 자동 예비 장치 가동<br />
                                - 1,000장 출입 카드 발급 가능
                            </div>
                        </div>
                        <div className='po_txt c' data-reveal data-delay="500">
                            <div className='tit'>32인치 대화면/지능형UX</div>
                            <div className='info'>
                                - 근접 센서 사용자 자동 감지<br />
                                - 키오스크 무인 안내(음성포함)
                            </div>
                        </div>
                        <div className='po_txt d' data-reveal data-delay="600">
                            <div className='tit'>QR, 바코드 인식</div>
                            <div className='info'>
                                - 다양한 인증 방식<br />
                                - 사전 등록된 물품 반입 관리
                            </div>
                        </div>
                        <div className='po_txt e' data-reveal data-delay="700">
                            <div className='tit'>무정전 전원 관리</div>
                            <div className='info'>
                                - UPS 전원 장치<br />
                                - 실시간 장비 상태 모니터링
                            </div>
                        </div>
                    </div>
                </div>
                <div className='imgCon' data-reveal>
                    <ul>
                        <li data-reveal data-delay="100">
                            <div className='txt'>
                                <div className='txt-tit'>
                                    <div><span>01</span></div>
                                    <div><span>방문자 입출문, 물품 반입 등의 이력관리</span></div>
                                </div>
                                <p>
                                    주민등록증/면증 진위확인 단말기 모듈과 사전방문시스템<span className="br"></span>연동으로 방문자 입출문 관리와 물품 반입 등의 이력관리
                                </p>
                            </div>
                        </li>
                        <li data-reveal data-delay="200">
                            <div className='txt'>
                                <div className='txt-tit'>
                                    <div><span>02</span></div>
                                    <div><span>듀얼 디스펜스 시스템으로 무장애 운영</span></div>
                                </div>
                                <p>
                                    출입 카드 발급/회수 디스펜서 모듈로 운영하여 장애 발생<span className="br"></span>시 자동으로 정상 디스펜스가 작동하여 무장애 운영이<span className="br"></span>가능하며 1,000장의 출입증 운영이 가능
                                </p>
                            </div>
                        </li>
                        <li data-reveal data-delay="300">
                            <div className='txt'>
                                <div className='txt-tit'>
                                    <div><span>03</span></div>
                                    <div><span>개인정보보안/웹매니저 모니터링</span></div>
                                </div>
                                <p>
                                    신분증 정보는 가상 메모리에서만 처리하고 전송 즉시<span className="br"></span>데이터를 삭제하여 개인정보보안을 충족, 웹매니저를<span className="br"></span>통한 각종 통계와 실시간 모니터링 가능
                                </p>
                            </div>
                        </li>
                        <li data-reveal data-delay="400">
                            <div className='txt'>
                                <div className='txt-tit'>
                                    <div><span>04</span></div>
                                    <div><span>방문시스템 연동/보안 솔루션 통합 연계</span></div>
                                </div>
                                <p>
                                    다양한 환경의 방문 시스템 연동과 커스터마이징,<span className="br"></span>데이타프로텍의 방문 시스템인 DVMS와 저장매체<span className="br"></span>보안솔루션 통합 연계 가능 
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="responsive section_con bg">
            <h3>
              <span data-reveal />
              <div data-reveal data-delay="200">DPT-ID Kiosk 주요기능</div>
            </h3>
            <h4 data-reveal data-delay="200">지능형 무인 출입증 발급 키오스크</h4>
            <p data-reveal data-delay="300">
                방문객은 안내 데스크에 줄을 설 필요 없이 DPT-ID Kiosk에 신분증을 투입하고 전화번호를 입력해 본인 확인을 끝내는 절차로<span className="br"></span>
                출입증 발급이 되고 게이트를 통과할 수 있습니다. 대규모 사업장의 경우 오전 시간대에 방문객이 몰려 출입 혼잡이 발생하는  단점을 해소할 수 있습니다.<br />
                물품 반입시 QR코드 리더기를 통해 확인 절차를 거쳐 반입이 가능하므로 최소한의 인원 운영으로 보안과 운용의 효율성을 극대화할 수 있습니다.
            </p>
            <ul className="info">
                <li>주민등록증/면허증 진위확인 단말기 모듈 (행정자치부 주관 주민등록증 진위확인시스템 관공서용 단말기 표준규격 인증)</li>
                <li>출입 카드 발급/회수 듀얼 디스펜서 모듈 (카드 로딩 용량 0.76mm 두께 기준, 1,000장 보관 및 처리 가능) 구성으로 무장애 구현</li>
                <li>고해상도 카메라 모듈 (얼굴인식)</li>
                <li>QR코드 리더기 모듈</li>
                <li>바코드 인쇄 모듈(선택)</li>
                <li>방문신청사이트 DB연동</li>
                <li>방문신청 웹매니저 관리자 페이지</li>
            </ul>
            <div className='max-width' data-reveal data-delay="400">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={product5Con2} alt="" />
                </div>
            </div>
        </div>

        <div className="responsive section_con">
            <h3>
              <span data-reveal />
              <div data-reveal data-delay="200">기대효과</div>
            </h3>
            <div className='work' data-reveal>
                <h4 data-reveal data-delay="200">방문자 보안을 위한 출입 보안의 시작점</h4>
                <p data-reveal data-delay="300">
                    DPT-ID Kiosk는 안내데스크에서 수작업으로 이뤄지던 여러단계의 확인 절차와 출입카드 발급과 반납 등의 절차를 방문객<span className="br"></span>
                    스스로가 키오스크에서 한번에 처리할 수 있게 하는 편리하고 안전한 보안솔루션입니다. 또한 방문예약사이트와 연동하여 보다 빠르고<span className="br"></span>
                    효율적으로 방문객 출입을 관리 할 수 있어 방문객의 대기 시간을 획기적으로 줄일 수 있습니다. 
                </p>
                <div className='img2 bg'>
                    <ul>
                        <li data-reveal>
                            <div><img src={product5Con3_1} alt="" /></div>
                            <p>방문시스템 연동</p>
                        </li>
                        <li data-reveal data-delay="100"><img src={imgDpt8Plus} alt="" /></li>
                        <li data-reveal data-delay="150">
                            <div><img src={product5Con3_2} alt="" /></div>
                            <p>출입증 발급/회수</p>
                        </li>
                        <li data-reveal data-delay="200"><img src={imgDpt8Plus} alt="" /></li>
                        <li data-reveal data-delay="250">
                            <div><img src={product5Con3_3} alt="" /></div>
                            <p>QR코드 리더기</p>
                        </li>
                        <li data-reveal data-delay="300"><img src={imgDpt8Plus} alt="" /></li>
                        <li data-reveal data-delay="350">
                            <div><img src={product5Con3_4} alt="" /></div>
                            <p>고해상도 카메라</p>
                        </li>
                        <li data-reveal data-delay="400"><img src={imgDpt8Plus} alt="" /></li>
                        <li data-reveal data-delay="450">
                            <div><img src={product5Con3_5} alt="" /></div>
                            <p>개인정보보호</p>
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
            <div className='work' data-reveal>
                <p data-reveal data-delay="300">
                    DPT-ID Kiosk는 간결한 인터페이스와 보안 기능으로 안내인력의 개입 없이 사용자가 스스로 입문과 출문을 진행하고<span className="br"></span>
                    관리포인트를 최소화하는 지능형 출입증 발급 시스템입니다. 보다 탁월한 디자인과 성능으로 도입의 효과를 약속드립니다. 
                </p>
                <div className="img3" data-reveal>
                    <ul>
                        <li data-reveal data-delay="100">
                            <div><img src={product5Con4_1} alt="" /></div>
                        </li>
                        <li data-reveal data-delay="200">
                            <div><img src={product5Con4_2} alt="" /></div>
                        </li>
                        <li data-reveal data-delay="300">
                            <div><img src={product5Con4_3} alt="" /></div>
                        </li>
                        <li data-reveal data-delay="400">
                            <div><img src={product5Con4_4} alt="" /></div>
                        </li>
                        <li data-reveal data-delay="500">
                            <div><img src={product5Con4_5} alt="" /></div>
                        </li>
                        <li data-reveal data-delay="600">
                            <div><img src={product5Con4_6} alt="" /></div>
                        </li>
                    </ul>
                </div>
                <div className='width-1140'>
                    <table className="pyo2">
                        <tbody>
                        <tr>
                            <th>구분</th>
                            <th>상세내역</th>
                        </tr>
                        <tr>
                            <td>KIOSK<span className="br"></span>Appliance</td>
                            <td>
                            Intel/AMD 2.0Ghz 이상<span className="br"></span>
                            <span className="blue">DDR4 8Gbyte (RAM)</span><span className="br"></span>
                            Nvme 240Gbyte (OS Disk)<span className="br"></span>
                            <span className="blue">Windows 11 (O/S)</span><span className="br"></span>
                            DPT-ID Kiosk Program/Device modules (Kiosk Programs)<span className="br"></span>
                            <span className="blue">PCI Serial Card/LED Controller (Dev. Interface)</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Touch Monitor</td>
                            <td>
                            32인치 터치모니터 (698.4(H) x 392.9(V)mm)<span className="br"></span>
                            <span className="blue">1,920 x 1,080 (Resolution)</span><span className="br"></span>
                            PCAP, 10 points (Touch Screen)<span className="br"></span>
                            <span className="blue">739(W) x 447(H) x 62(D)mm</span>
                            </td>
                        </tr>
                        <tr>
                            <td>바코드<span className="br"></span>QR 코드 스캐너</td>
                            <td>
                            QR Code, 1D (Type)<span className="br"></span>
                            <span className="blue">Wiegand26/34, RS232, USB, RS485, TTL (Interface)</span><span className="br"></span>
                            Camera centric slant 45'(Reading directions)<span className="br"></span>
                            <span className="blue">3-6CM (Reading range of range)</span><span className="br"></span>
                            0-20CM (Reading range of QR)
                            </td>
                        </tr>
                        <tr>
                            <td>Elevator Type<span className="br"></span>Card Dispenser</td>
                            <td>
                            Dispensing: 500±3 cards (Card Loading Capacity)<span className="br"></span>
                            <span className="blue">150 mm/Sec±10% (Dispensing and Collecting speed (sec))</span><span className="br"></span>
                            0 ~ 55℃, 0 ~ 95% RH (Operating Temperature and Humidity)<span className="br"></span>
                            <span className="blue">-20 ~ 70℃, 0 ~ 95% RH (Conservation Temperature and Humidity)</span><span className="br"></span>
                            209.2 mm(W) x 392 mm(L) x 746.4 mm(H)
                            </td>
                        </tr>
                        <tr>
                            <td>신분증 인식기</td>
                            <td>
                            600dpi 3ch dlso, 300 dpi 1.6초 이내 (Scan Speed)<span className="br"></span>
                            <span className="blue">주민등록증 사진 본인 거부율(FRR) 5% 미만, 사진 타인 인식률(FAR) 0.01% 미만</span><span className="br"></span>
                            주민등록증 지문 본인 거부율(FRR) 5% 미만, 지문 타인인식률(FAR) 0.01% 미만<span className="br"></span>
                            <span className="blue">ISO7811 Credit card size (Scan size)</span><span className="br"></span>
                            USB 2.0 Interface<span className="br"></span>
                            <span className="blue">57 mm(Scanning Width)</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <p className="notice">※ Kiosk와 사양은 납품사의 사정에 따라 협의 없이 변경 될 수 있습니다.</p>
                </div>
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
                    <div className='img_kiosk col1 kiosk_slide swiper-container'>
                        <div className='swiper-wrapper'>
                            <div className='swiper-slide'>
                                <img src={mainImgKiosk1} alt="" />
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
