import { useEffect, useRef } from 'react'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import ProductLayout from './ProductLayout'
import { useBatchReveal } from '../../utils/useScrollReveal'
import prdDptiImg1 from '../../assets/images/img_dpt_eraser_1.png'
import prdDptiW2Ico from '../../assets/images/img_dpt_eraser_2.png'
import prdDptiw3Img2 from '../../assets/images/img_dpt_eraser_3.png'
import imgDpt8_1 from '../../assets/images/img_dpt_eraser8_1.png'
import imgDpt8_2 from '../../assets/images/img_dpt_eraser8_2.png'
import imgDpt8_3 from '../../assets/images/img_dpt_eraser8_3.png'
import imgDpt8_4 from '../../assets/images/img_dpt_eraser8_4.png'
import imgDpt8Plus from '../../assets/images/img_dpt_8_plus.png'
import productCon2 from '../../assets/images/product_eraser_con2.png'
import mainImgKiosk1 from '../../assets/images/img_raser_Kiosk_1.png'
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
          <h2 data-reveal>Digital Eraser <span>All-in-one Data Erasing</span></h2>
          <p data-reveal data-delay="200">
            디지털이레이저는 국가정보원 보안적합성 검증필(NSPL-2010-018)을 인증 받은 데이터 영구삭제 솔루션 입니다. 하나의 어플라이언스로<span className="br"></span>
            네트워크 연동 삭제, USB 부팅 삭제, 디바이스 삭제 방식 등의 세 가지 방식을 통합지원 및 관리 가능하여 경쟁력과 업무 효율성을 갖춘<span className="br"></span>솔루션으로 영구삭제의 새로운 기준을 제시하는 올인원 어플라이언스입니다.
          </p>
        </div>

        <div className='responsive section_con'>
            <h3>
              <span data-reveal />
              <div data-reveal data-delay="200">도입 필요성</div>
            </h3>
            <div className='work' data-reveal>
                <h4 data-reveal data-delay="200">데이터 유출 제로를 위한 통합 영구삭제 솔루션</h4>
                <p data-reveal data-delay="300">
                    네트워크 연동, USB 부팅, 디바이스 삭제 방식을 한 번에 구현한, 국가정보원 보안적합성 검증필 영구삭제 솔루션으로 저장장치의 단순 초기화를 넘어<span className="br"></span>복구 불가능한 영구삭제와 체계적인 증적 관리를위한 통합 보안 강화 프로세스를 제안합니다.  
                </p>
                <div className='max-width' data-reveal data-delay="400">
                    <div className='ImgMargin'>
                        <img src={prdDptiImg1} alt="" />
                    </div>
                </div>
                <div className='imgCon' data-reveal>
                    <ul>
                        <li data-reveal data-delay="100">
                            <div className='txt'>
                                <div className='txt-tit'>
                                    <div><span>01</span></div>
                                    <div><span>복구 불가능한 완벽한 보안을 위한 기술력</span></div>
                                </div>
                                <p>
                                    보안 정책에 따라 데이터를 완전히 제거하여 외부<span className="br"></span>유출 가능성을 완전 차단
                                </p>
                            </div>
                        </li>
                        <li data-reveal data-delay="200">
                            <div className='txt'>
                                <div className='txt-tit'>
                                    <div><span>02</span></div>
                                    <div><span>다양한 저장 장치의 삭제 가능한 호환성</span></div>
                                </div>
                                <p>
                                    PC, 서버, NVMe, SSD, USB, SD카드 등 기업에서 사용<span className="br"></span>하는 모든 저장 매체를 지원
                                </p>
                            </div>
                        </li>
                        <li data-reveal data-delay="300">
                            <div className='txt'>
                                <div className='txt-tit'>
                                    <div><span>03</span></div>
                                    <div><span>중앙 집중형 Web Manager 관리</span></div>
                                </div>
                                <p>
                                    삭제 신청부터 결과 리포트, 증적 자료, 감사 로그 관리<span className="br"></span>가능 
                                </p>
                            </div>
                        </li>
                        <li data-reveal data-delay="400">
                            <div className='txt'>
                                <div className='txt-tit'>
                                    <div><span>04</span></div>
                                    <div><span>국내, 글로벌 보안 삭제 규격 충족</span></div>
                                </div>
                                <p>
                                    장비 정보 등록 후 국정원 기준(3회) 또는 기업<span className="br"></span>기준(1,3,7회)를 선택적으로 가능한 영구삭제 옵션 
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='tbl-scroll'>
                    <table className="pyo5 bg" data-reveal>
                        <thead>
                            <tr>
                                <th>구분</th>
                                <th>일반 포맷(OS초기화)</th>
                                <th>디가우저/천공</th>
                                <th>Digital Eraser</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>데이터 잔존 여부</td>
                                <td>표면적 연결만 끊음<br />(데이터 잔존)</td>
                                <td>디스크 물리적 파괴<br />(재사용 불가)</td>
                                <td>다중 OverWrite로<br />데이터 잔존 완벽 제거</td>
                            </tr>
                            <tr>
                                <td>포렌식 복구가능성</td>
                                <td>전문 장비<br />100% 복구 가능</td>
                                <td>복구 불가</td>
                                <td>복구 절대불가<br />(국정원 인증)</td>
                            </tr>
                            <tr>
                                <td>보안 감사 대응력</td>
                                <td>대응불가<br />(기록없음)</td>
                                <td>수기 기록 필요<br />(자동화 불가)</td>
                                <td>삭제 리포트 및<br />로그 중앙 저장 기능</td>
                            </tr>
                            <tr>
                                <td>운영 효율성</td>
                                <td>빠르지만<br />보안 유출 가능</td>
                                <td>디스크 탈부착 필수<br />(전문 인력 배치)</td>
                                <td>디스크 탈착 없이<br />원클릭 대량 작업</td>
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
                <h4 data-reveal data-delay="200">Digital Eraser 주요 특징</h4>
                <p data-reveal data-delay="300">
                    국가정보원 보안적합성 검증필(NSPL-2010-018)을 인증 받은 데이터 영구삭제 솔루션 으로 하나의 어플라이언스로 네트워크 연동 삭제,<span className="br"></span>
                    USB 부팅 삭제, 디바이스 삭제 방식 등의 세 가지 방식을 통합지원 및 관리 가능하여 경쟁력과 업무 효율성을 갖춘 올인원 어플라이언스입니다. 
                </p>
                <div className='imgCon mt-70 w-auto' data-reveal data-delay="400">
                    <img src={prdDptiW2Ico} alt="" />
                </div>
                <ul className='txtBox'>
                    <li data-reveal data-delay="100">
                        <p className='tit'><span>보안성 Security</span></p>
                        <p className='info'>
                            복구 불가능한 영구 삭제로<span className="br"></span>
                            기업의 내부자료, 지적 재산,<span className="br"></span>
                            개인정보 등 자산의 유출<span className="br"></span>
                            가능성 원천 차단
                        </p>
                    </li>
                    <li data-reveal data-delay="150">
                        <p className='tit'><span>검증성 Verification</span></p>
                        <p className='info'>
                            증적 및 리포트로<span className="br"></span>
                            삭제와 관련된 이력과<span className="br"></span>
                            결과 리포트 발송 가능
                        </p>
                    </li>
                    <li data-reveal data-delay="200">
                        <p className='tit'><span>운영성 Operations</span></p>
                        <p className='info'>
                            중앙 집중식 통합관리로<span className="br"></span>
                            신청, 진행, 결과를 웹 방식<span className="br"></span>
                            관리자 페이지로 관리 가능
                        </p>
                    </li>
                    <li data-reveal data-delay="250">
                        <p className='tit'><span>연계성 Intergration</span></p>
                        <p className='info'>
                            보안/자산 시스템 연동<span className="br"></span>
                            보안 시스템 DPT,<span className="br"></span>
                            자산관리, 방문 시스템<span className="br"></span>
                            등과 연계 가능
                        </p>
                    </li>
                </ul>
            </div>
            <div className='work-eraser' data-reveal>
                <h4 data-reveal data-delay="200">모든 주요 매체의 영구삭제 및 통합 관리</h4>
                <p data-reveal data-delay="300">
                    노트북 디스크의 탈부착 없이 영구 삭제가 가능하며 HDD, SSD, U.2/U.3 NVMe, 서버용 HDD/SSD 까지 모든 주요 저장매체의 영구 삭제 가능합니다.  
                </p>
                <div className='imgCon' data-reveal data-delay="400">
                    <div className='ul-list-eraser'>
                        <ul>
                            <li data-reveal data-delay="100">
                                <img src={prdDpteraserImg1} alt="" />
                                <p><strong>업무용 단말기</strong>노트북, PC</p>
                            </li>
                            <li data-reveal data-delay="300">
                                <img src={prdDpteraserImg2} alt="" />
                                <p><strong>내부 저장장치</strong>HDD, SDD, M.2 SSD,<br />U.2/U.3 NVMe</p>
                            </li>
                            <li data-reveal data-delay="500">
                                <img src={prdDpteraserImg3} alt="" />
                                <p><strong>외부 저장장치</strong>USB메모리, 외장HDD,<br />외장SDD</p>
                            </li>
                            <li data-reveal data-delay="700">
                                <img src={prdDpteraserImg4} alt="" />
                                <p><strong>이동식 저장매체</strong>SD, Micro SD Card</p>
                            </li>
                            <li data-reveal data-delay="900">
                                <img src={prdDpteraserImg5} alt="" />
                                <p><strong>서버/기타</strong>서버용HDD/SDD,<br />외주/협력업체<br />반출 매체</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='work3' data-reveal>
                <h4 data-reveal data-delay="200">4가지 맞춤형 삭제 운영 방식</h4>
                <p data-reveal data-delay="300">
                    Digital Eraser 는 고객사의 환경과 목적에 맞춘 네크워크 방식, USB 부팅 방식, 에이전트 방식, 디바이스 방식 등 4가지 운영방식이 가능합니다. 
                </p>
                <div className='imgCon' data-reveal data-delay="400">
                    <div className='ico top'><img src={prdDptiw3Img2} alt="" /></div>
                    <ul className='txt'>
                        <li data-reveal data-delay="200">
                            <div className='txt-tit'>
                                <div><span>01</span></div>
                                <div><span>네트워크 삭제 방식</span></div>
                            </div>
                            <p>
                                - 관리자 웹 매니저를 통한 중앙 통제식/원격 삭제
                            </p>
                        </li>
                        <li data-reveal data-delay="400">
                            <div className='txt-tit'>
                                <div><span>02</span></div>
                                <div><span>USB 부팅 삭제 방식</span></div>
                            </div>
                            <p>
                                - OS와 무관하게 USB 개별 부팅으로 즉시 삭제
                            </p>
                        </li>
                        <li data-reveal data-delay="400">
                            <div className='txt-tit'>
                                <div><span>03</span></div>
                                <div><span>에이전트 설치 삭제 방식</span></div>
                            </div>
                            <p>
                                - 사내망 PC에 사전 설치 후 개별 삭제 방식
                            </p>
                        </li>
                        <li data-reveal data-delay="400">
                            <div className='txt-tit'>
                                <div><span>04</span></div>
                                <div><span>디바이스(머신) 삭제 장비</span></div>
                            </div>
                            <p>
                                - 다수 디스크를 장비에 연결, 멀티태스킹 하드웨어 삭제<br />
                                - 반출 센터, IT 부서 대량 폐기 후 결과 서버 전송
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="responsive section_con bg five">
            <h3>
              <span data-reveal />
              <div data-reveal data-delay="200">Digital Eraser 주요기능</div>
            </h3>
            <h4 data-reveal data-delay="200">네트워크 연동, USB 부팅, 디바이스 삭제 방식을 하나로 해결하는 올인원 시스템</h4>
            <p data-reveal data-delay="300">
                디지털이레이저는 국가정보원 보안적합성 검증필(NSPL-2010-018)을 인증 받은 데이터 영구삭제 솔루션 으로 하나의 어플라이언스로 네트워크<span className="br"></span>
                연동 삭제, USB 부팅 삭제, 디바이스 삭제 방식 등의 세 가지 방식을 통합지원 및 관리 가능하여 경쟁력과 업무 효율성을 갖춘 올인원 어플라이언스<span className="br"></span>
                입니다. 특히, 검증받은 완전삭제 핵심 기능의 보안성과 운영의 편리성을 동시에 갖춰 삭제방식에 따른 추가 장비와 소프트웨어를 따로 구입해야 하는<span className="br"></span>부담을 줄일 수 있습니다. 
            </p>
            <div className="img">
                <ul>
                    <li data-reveal><img src={product3Con1_1} alt="" /></li>
                    <li data-reveal data-delay="100"><img src={product3Con1_2} alt="" /></li>
                    <li data-reveal data-delay="200"><img src={product3Con1_3} alt="" /></li>
                    <li data-reveal data-delay="300"><img src={product3Con1_4} alt="" /></li>
                    <li data-reveal data-delay="400"><img src={product3Con1_5} alt="" /></li>
                </ul>
            </div>
            <ul className="info">
                <li>국가정보원 보안적합성 검증필(NSPL-2010-018)</li>
                <li>0으로 삭제 (1Pass), 국정원 권고방식 (3Pass), US DoD 권고방식 (7Pass)의 완전삭제 알고리즘</li>
                <li>히든영역 (HPA, DCO) 검출 및 삭제</li>
                <li>단기 노트북 반·출입관리 솔루션 DPT 연계</li>
                <li>장·단기 출입자의 노트북 보안의 중점관리 가능</li>
                <li>노트북 반입시 PC 방역 자동 처리</li>
                <li>운영 체제 구분 없이 데이터 완전삭제 가능</li>
                <li>다수의 Disk 및 저장매체 멀티 삭제 가능</li>
                <li>개별 DISK, USB 메모리 등  다양한 매체 지원</li>
                <li>OS Boot Manager 관계 없이 One-Click 실행</li>
                <li>하나의 어플라이언스로 네트워크 연동 삭제, USB 부팅 삭제, 디바이스 삭제 방식 지원</li>
                <li>네트워크 삭제 시 Windows OS 부팅 상태에서 프로그램 다운로드 방식으로 원클릭 삭제 가능</li>
                <li>관리자, 사용자 모든 삭제 내역을 통합 관리</li>
            </ul>
            <div className="bg_img" data-reveal data-delay="200">
              <img src={productCon2} alt="" />
            </div>
        </div>

        <div className="responsive section_con">
            <h3>
              <span data-reveal />
              <div data-reveal data-delay="200">기대효과</div>
            </h3>
            <div className='work' data-reveal>
                <h4 data-reveal data-delay="200">데이터 영구삭제의 새로운 기준 - Digital Eraser</h4>
                <p data-reveal data-delay="300">
                    도입 이후 보안의 중요성에 비해 관리의 어려움과 추가 관리 인원 부담, 관계사의 불편함이 가중되는 어려움은 없으셨나요?<br />
                    디지털이레이저는 기존의 완전삭제 솔루션과 달리 하나의 어플라이언스로 다양한 삭제 기능을 지원합니다. 반출입 솔루션 DPT와 연동한다면,<span className="br"></span>
                    사업장 전체의 반입출 인원 및 저장매체 보안을 통합관리할 수 있고 다수의 노트북을 정기적으로 완전 삭제해야 하는 업무의 효율성을 높일 수 있습니다.
                </p>
                <div className='img2 bg'>
                    <ul>
                        <li data-reveal>
                            <div><img src={imgDpt8_1} alt="" /></div>
                            <p>탈부착 과정 없는 효율</p>
                        </li>
                        <li data-reveal data-delay="100"><img src={imgDpt8Plus} alt="" /></li>
                        <li data-reveal data-delay="150">
                            <div><img src={imgDpt8_2} alt="" /></div>
                            <p>다수 노트북 멀티 삭제</p>
                        </li>
                        <li data-reveal data-delay="200"><img src={imgDpt8Plus} alt="" /></li>
                        <li data-reveal data-delay="250">
                            <div><img src={imgDpt8_3} alt="" /></div>
                            <p>복구 불가능 완전삭제</p>
                        </li>
                        <li data-reveal data-delay="300"><img src={imgDpt8Plus} alt="" /></li>
                        <li data-reveal data-delay="350">
                            <div><img src={imgDpt8_4} alt="" /></div>
                            <p>반출입 연동 통합관리</p>
                        </li>
                    </ul>
                </div>
                <div className='tbl-scroll'>
                    <table className="pyo3">
                        <tbody>
                        <tr>
                            <th>구분</th>
                            <th>디지털이레이저</th>
                            <th>A사 삭제솔루션</th>
                            <th>B사 삭제기기</th>
                            <th>C사 삭제기기</th>
                        </tr>
                        <tr>
                            <td>노트북(PC) HDD 분리</td>
                            <td>필요없음</td>
                            <td>필요없음</td>
                            <td>필수</td>
                            <td>필수</td>
                        </tr>
                        <tr>
                            <td>노트북(PC) BIOS 설정변경</td>
                            <td>필요없음</td>
                            <td>필수</td>
                            <td>필수</td>
                            <td>필수</td>
                        </tr>
                        <tr>
                            <td>HDD(저장매체) 멀티삭제</td>
                            <td>가능</td>
                            <td>가능</td>
                            <td>불가</td>
                            <td>불가</td>
                        </tr>
                        <tr>
                            <td>HDD(저장매체) 재활용</td>
                            <td>가능</td>
                            <td>가능</td>
                            <td>가능</td>
                            <td>가능</td>
                        </tr>
                        <tr>
                            <td>사용자 인터페이스 디자인</td>
                            <td>매우높음</td>
                            <td>보통</td>
                            <td>낮음</td>
                            <td>보통</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div className="responsive section_con">
            <h3>
              <span data-reveal />
              <div data-reveal data-delay="200">주요화면 및 규격</div>
            </h3>
            <div className='work' data-reveal>
                <h4 data-reveal data-delay="200">사내(지급/대여) 노트북 관리와 보안 유출 대비를 통합 솔루션으로 하나로</h4>
                <p data-reveal data-delay="300">
                    디지털이레이저는 다수의 디스크를 동시에 완전삭제가 가능하며 진행상황을 쉽게 확인할 수 있는 인터페이스 구성으로 작업 효율과 관리의 편리함을<span className="br"></span>
                    동시에 추가된 어플라이언스입니다.
                </p>
                <div className="img3">
                <ul>
                <li>
                    <div><img src={product3Con4_1} alt="" /></div>
                    <p>메인</p>
                </li>
                <li>
                    <div><img src={product3Con4_2} alt="" /></div>
                    <p>사용자 신청번호 입력</p>
                </li>
                <li>
                    <div><img src={product3Con4_3} alt="" /></div>
                    <p>디지털 이레이저 진행</p>
                </li>
                <li>
                    <div><img src={product3Con4_4} alt="" /></div>
                    <p>디스크 정보 새로읽기</p>
                </li>
                </ul>
            </div>
            <table className="pyo4">
                <tbody>
                <tr>
                    <th>하드웨어 Spec.</th>
                    <th>지원장치</th>
                </tr>
                <tr>
                    <td>CPU: intel i5 2.8GHz/8M</td>
                    <td>3.5" SAS/SATA HDD</td>
                </tr>
                <tr>
                    <td>RAM : DDR4 4G PC4-19200</td>
                    <td>2.5" SAS/SATA HDD</td>
                </tr>
                <tr>
                    <td>
                    HDD : M.2 Nvme 120G<span className="br"></span>
                    HBA : Adaptec 12G SAS Controller
                    </td>
                    <td>
                    M.2 Nvme SSD / M.2 SATA SSD support<span className="br"></span>
                    (2242,2260, 2280 Guide include )
                    </td>
                </tr>
                <tr>
                    <td>3.5" HotSwap SAS/SATA 4BAY</td>
                    <td>USB-C 1port, USB 3.1 1port, USB 3.0 4Port, USB 2.0 4port</td>
                </tr>
                <tr>
                    <td>
                    2.5" HotSwap SAS/SATA 4BAY<span className="br"></span>
                    All in One Media BAY
                    </td>
                    <td>
                    MS/MSPRO/MSDUO, SD/MMC/RS-MMC, CFI/CFII,<span className="br"></span>
                    T-Flash, MicroSD, XD type Flash Memory<span className="br"></span>
                    support (about 117 type memory)
                    </td>
                </tr>
                </tbody>
            </table>
            <p className="notice">※ 사양은 납품사의 사정에 따라 협의 없이 변경 될 수 있습니다.</p>
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
