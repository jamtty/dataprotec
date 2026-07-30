import { useEffect, useRef } from 'react'
import ProductLayout from './ProductLayout'
import { useBatchReveal } from '../../utils/useScrollReveal'
import prdDptiImg1 from '../../assets/images/img_dpti_1.png'



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
import mainClImg1 from '../../assets/images/main_cl_img_1.png'
import mainClImg2 from '../../assets/images/main_cl_img_2.png'
import mainClImg3 from '../../assets/images/main_cl_img_3.png'
import mainClImg4 from '../../assets/images/main_cl_img_4.png'
import mainClImg5 from '../../assets/images/main_cl_img_5.png'
import product4Bg3Img from '../../assets/images/product4_bg3_img.png'

function ProductDptI() {
  const containerRef = useRef<HTMLDivElement>(null)
  useBatchReveal(containerRef)

  return (
    <ProductLayout>
      <div className="contetns prd NewDpt-i" ref={containerRef}>

        <div className="responsive title_area">
          <h2 data-reveal>DPT-i <span>Intelligent Notebook Security</span></h2>
          <p data-reveal data-delay="200">
            DPT-i (Intelligent Notebook Security Solution)는 노트북의 무단 반출을 통제하고 승인된 반출절차를 통해 사내 노트북의 보안 통제 관리<span className="br"></span>
            솔루션입니다.  사내 공용 노트북, 업무용 노트북 출장의 통합 보안 관리와 주변장치 제어 및 통제, 파일 분석 및 백업 등을 통해 사내<span className="br"></span>
            기밀자료 정보 유출을 대비할 수 있고, 복귀 시점 복원 및 변화된 파일 분석과 초기화 등의 절차로 운용의 편리성을 동시에 추구합니다.
          </p>
        </div>

        <div className='responsive section_con'>
            <h3>
              <span data-reveal />
              <div data-reveal data-delay="200">도입 필요성</div>
            </h3>
            <div className='txt-box' data-reveal>
                <h4 data-reveal data-delay="200">사내(지급/대여) 노트북 통합 관리를 위한 지능형 보안 운영 사이클</h4>
                <p>
                    DPT-i는 기존의 수기 기반 노트북 대여 관리를, 자동화된 지능형 보안 허브로 전환합니다. 스마트 하드웨어와 강력한 소프트웨어를 결합하여<span className="br"></span>
                    기업 노트북의 대여, 사용, 반납, 초기화 및 완전삭제 등의 전 과정을 안전하고 체계적으로 관리합니다.  
                </p>
            </div>
            <div className='max-width' data-reveal>
                <img src={prdDptiImg1} alt="" />
            </div>
            <div className='imgCon' data-reveal>
                <ul>
                    <li>
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
                    <li>
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


        {/* 
        <div className="responsive section_con four">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">DPT-i 도입 목적</div></h3>
          <p>
            DPT-i (Intelligent Notebook Security Solution)는 노트북의 무단 반출을 통제하고 승인된 반출절차를 통해 사내 노트북의 보안 통제 관리 솔루션입니다. 사내 공용 노트북, 업무용 노트북 출장의 통합 보안 관리와 주변장치 제어 및 통제, 파일 분석 및 백업 등을 통해 사내 기밀자료 정보 유출을 대비할 수 있고, 복귀 시점 복원 및 변화된 파일 분석과 초기화 등의 절차로 운용의 편리성을 동시에 추구합니다.
          </p>
          <div className="img">
            <ul>
              <li data-aos="fade-up"><img src={product4Con1_1} alt="" /></li>
              <li data-aos="fade-up" data-aos-delay="100"><img src={product4Con1_2} alt="" /></li>
              <li data-aos="fade-up" data-aos-delay="200"><img src={product4Con1_3} alt="" /></li>
              <li data-aos="fade-up" data-aos-delay="300"><img src={product4Con1_4} alt="" /></li>
              <li data-aos="fade-up" data-aos-delay="400"><img src={product4Con1_5} alt="" /></li>
            </ul>
          </div>
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">DPT-i 도입의 필요성</div></h3>
          <p>
            DPT-i는 공용대여 노트북의 관리와 사내 인원의 출장으로 인한 보안 유출 대비를 목적으로 하는 노트북 보안 관리 솔루션입니다.
            업무용 노트북의 무단 반출을 통제하고 승인된 반출절차를 거친 노트북만 사외로 반출 할 수 있도록 통합 관리할 수 있습니다.
            사외 사용 시에도 장치디바이스를 정책으로 통제 및 관리할 수 있고 사내로 복귀 시에 사용된 파일 이력을 분석할 수 있어 보안 유출을
            방지할 수 있습니다. 대여·반납 과정을 전면 전산화하여 실시간 이력 추적과 보안 관리가 가능하며, 최근 특허 등록된 보관함과 무인
            키오스크를 연계하여 대여부터 보관·반납까지의 모든 절차를 빠르고 안전하게 자동화함으로써 업무 효율을 극대화할 수 있습니다.
          </p>
          <ul className="info">
            <li>사내 대여 노트북 현황 관리 및 이력추적</li>
            <li>사내 직원 노트북 통합관리</li>
            <li>사외 출장 시 매체제어(LAN, Wi-Fi , Bluetooth, USB, SD Card 등)</li>
            <li>노트북 반출 시 파일 분석 및 백업</li>
            <li>출장 후 사내 복귀 시 파일 시그니처 분석으로 변화된 파일 분석 및 관리</li>
          </ul>
        </div>

        <div className="responsive section_con bg">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">DPT-i 주요기능</div></h3>
          <p>
            DPT-i는 공용대여 노트북의 관리와 사내 인원의 출장으로 인한 보안 유출을 대비한 솔루션으로 대여 기간 중이나 출장지에서 유출될 수 있는 보안 유출을 대비하기 위해 시점분석 및 시점복원, 주변 장치 제어, 복귀 후 노트북 복원과 초기화 등의 관리의 효율성을 모두 충족할 수 있습니다.
          </p>
          <ul className="info">
            <li>노트북 파일 보안 관리 : 대여 시점과 비교하여 파일 변경정보 저장 및 삭제와 시점 복원</li>
            <li>장치 제어 기능: 주변 장치 사용 권한 전체 정책 적용 및 개인 정책 적용 가능</li>
            <li>사내 사용자정보 기본정보 연동 가능</li>
            <li>반출 요청 시 e-Mail을 이용한 승인 요청 가능</li>
            <li>관리자 웹으로 실시간 대여 노트북 이력관리</li>
            <li>웹 기반 반출 신청 (사내, 사외용)</li>
            <li>반출 신청 시 반출기간 및 매체 허용 요청</li>
            <li>무단 반출 시 사용제한(일회성 키를 통하여 사용 허가가능)</li>
          </ul>
          <div className="bg_img" data-aos="fade-left">
            <img src={productCon2} alt="" />
          </div>
        </div>

        <div style={{ margin: '5rem 0', padding: '0 2rem', textAlign: 'center' }}>
          <img src={product4Con2} alt="" />
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">DPT-i 시스템 구성도</div></h3>
          <p>
            DPT-i는 공용대여 노트북의 관리와 사내 인원의 출장으로 인한 보안 유출을 대비한 솔루션의 기본 시스템 구성도입니다.
            고객사의 현장 상황과 요구 조건에 따라 구성도는 다를 수 있으며, 절차와 연동방식 또한 고객의 요구에 따라 변경 적용 가능합니다.
          </p>
        </div>

        <div style={{ margin: '5rem 0', padding: '0 2rem', textAlign: 'center' }}>
          <img src={product4Con3} alt="" />
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">DPT-i 기대효과</div></h3>
        </div>
        <div className="section2">
          <div className="responsive">
            <div className="txt">
              <div data-aos="fade-left"><img src={product4Bg2Logo} alt="" /></div>
              <p data-aos="fade-up">
                사내 지급(대여, 출장)노트북을 위한 통합 관리 솔루션<span className="br"></span>
                이력관리, 매체제어, 보안, 관리 효율성까지 한번에 가능한 통합 솔루션<span className="br"></span>
                DPT-i(Intelligent Notebook Security)
              </p>
            </div>
          </div>
        </div>

        <div className="responsive section_con sm">
          <p>
            사내 지급 노트북 관리와 출장 노트북에 대한 정보 유출 및 분실에 대한 대비는 어떻게 하시나요?
            DPT-i는 공용대여 노트북의 관리와 사내 인원의 출장으로 인한 보안 유출을 대비한 솔루션으로 대여 기간 중이나 출장지에서
            유출될 수 있는 보안 유출을 대비하기 위해 시점분석 및 시점복원, 주변 장치 제어, 복귀 후 노트북 복원과 초기화 등의 관리의
            효율성을 모두 충족할 수 있습니다.
          </p>
          <div className="img2">
            <ul>
              <li data-aos="fade-up">
                <div><img src={productCon3_1} alt="" /></div>
                <p>핵심정보 유출대비</p>
              </li>
              <li data-aos="fade-up" data-aos-delay="100"><img src={productCon3Plus} alt="" /></li>
              <li data-aos="fade-up" data-aos-delay="150">
                <div><img src={productCon3_2} alt="" /></div>
                <p>바이러스 사전 차단</p>
              </li>
              <li data-aos="fade-up" data-aos-delay="200"><img src={productCon3Plus} alt="" /></li>
              <li data-aos="fade-up" data-aos-delay="250">
                <div><img src={productCon3_3} alt="" /></div>
                <p>노트북 통제관리</p>
              </li>
              <li data-aos="fade-up" data-aos-delay="300"><img src={productCon3Plus} alt="" /></li>
              <li data-aos="fade-up" data-aos-delay="350">
                <div><img src={productCon3_4} alt="" /></div>
                <p>노트북 매체제어</p>
              </li>
              <li data-aos="fade-up" data-aos-delay="400"><img src={productCon3Plus} alt="" /></li>
              <li data-aos="fade-up" data-aos-delay="450">
                <div><img src={productCon3_5} alt="" /></div>
                <p>출장자 보안</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">DPT-i 주요화면 및 규격</div></h3>
          <p>
            DPT-i는 간결한 인터페이스와 보안 기능으로 보안담당자의 개입 없이 출장(대여)자가 스스로 반입과 반출을 진행하고 관리자는
            별도의 웹매니저로 현황 리포트, 정책 관리, 반출입 통제, 매체제어, 보안 이슈 관리 등을 할 수 있습니다.
          </p>
          <div className="img3">
            <ul>
              <li>
                <div><img src={product4Con4_1} alt="" /></div>
                <p>노트북 등록</p>
              </li>
              <li>
                <div><img src={product4Con4_2} alt="" /></div>
                <p>노트북 정보수집</p>
              </li>
              <li>
                <div><img src={product4Con4_3} alt="" /></div>
                <p>노트북 대여 중 화면</p>
              </li>
              <li>
                <div><img src={product4Con4_4} alt="" /></div>
                <p>노트북대여 만료 화면</p>
              </li>
            </ul>
          </div>
          <table className="pyo">
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
          <p className="notice">※ Kiosk와 사양은 납품사의 사정에 따라 협의 없이 변경 될 수 있습니다.</p>
          <div className="img3">
            <ul>
              <li>
                <div><img src={product4Con4_2_1} alt="" /></div>
                <p>모니터 보관함 일체형(12대 보관)</p>
              </li>
              <li>
                <div><img src={product4Con4_2_2} alt="" /></div>
                <p>콘트롤 타워+보관함 확장형(16대 이상 확장 가능)</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">주요 고객사</div></h3>
          <div className="img4">
            <ul>
              <li data-aos="fade-up"><img src={mainClImg1} alt="고객사" /></li>
              <li data-aos="fade-up" data-aos-delay="100"><img src={mainClImg2} alt="고객사" /></li>
              <li data-aos="fade-up" data-aos-delay="150"><img src={mainClImg3} alt="고객사" /></li>
              <li data-aos="fade-up" data-aos-delay="200"><img src={mainClImg4} alt="고객사" /></li>
              <li data-aos="fade-up" data-aos-delay="250"><img src={mainClImg5} alt="고객사" /></li>
            </ul>
          </div>
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">제품문의</div></h3>
        </div>
        <div className="section3">
          <div className="responsive">
            <div className="img" data-aos="fade-right">
              <img src={product4Bg3Img} alt="" />
            </div>
          </div>
        </div>
        <div className="responsive section_con cs">
          <div className="cs_txt">
            <div className="line">
              <p className="green">솔루션 AS 및 기술문의</p>
              <p>
                <strong>T.</strong> 1660-1614<br />
                <strong>E.</strong> support@dataprotec.co.kr
              </p>
            </div>
            <div className="line none">
              <p className="blue">보안솔루션 도입문의</p>
              <p>
                <strong>T.</strong> 031-701-0712<br />
                <strong>E.</strong> sales@dataprotec.co.kr
              </p>
            </div>
          </div>
        </div>
        */}

      </div>
    </ProductLayout>
  )
}

export default ProductDptI
