import { useEffect, useRef } from 'react'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import ProductLayout from './ProductLayout'
import { useBatchReveal } from '../../utils/useScrollReveal'
import prdVcsImg1 from '../../assets/images/prd_vcs_img_1@2x.png'
import prdVcsImg2 from '../../assets/images/prd_vcs_img_2.png'
import prdVcsImg5_1 from '../../assets/images/prd_vcs_img_5.png'
import prdVcsImg5_2 from '../../assets/images/prd_vcs_img_5_2.png'
import prdVcsImg5_3 from '../../assets/images/prd_vcs_img_5_3.png'
import prdVcsImg5_4 from '../../assets/images/prd_vcs_img_5_4.png'
import mainImgKiosk1 from '../../assets/images/img_dpt_Kiosk.png'
import mainImgKiosk2 from '../../assets/images/img_dpt_Kiosk2.png'
import mainImgKiosk3 from '../../assets/images/img_dpt_Kiosk3.png'
import mainImgKiosk4 from '../../assets/images/img_dpt_Kiosk4.png'
import mainClImg1 from '../../assets/images/main_cl_img_1.png'
import mainClImg2 from '../../assets/images/main_cl_img_2.png'
import mainClImg3 from '../../assets/images/main_cl_img_3.png'
import mainClImg4 from '../../assets/images/main_cl_img_4.png'
import mainClImg5 from '../../assets/images/main_cl_img_5.png'
import imgDpt8_1 from '../../assets/images/img_dpt_8_1.png'
import imgDpt8_2 from '../../assets/images/img_dpt_8_2.png'
import imgDpt8_3 from '../../assets/images/img_dpt_8_3.png'
import imgDpt8_4 from '../../assets/images/img_dpt_8_4.png'
import imgDpt8_5 from '../../assets/images/img_dpt_8_5.png'
import imgDpt8Plus from '../../assets/images/img_dpt_8_plus.png'

function DptVcs() {
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
      <div className="contetns prd vcs" ref={containerRef}>

        <div className="responsive title_area">
          <h2 data-reveal>VCS <span>Virus Clean System</span></h2>
          <p data-reveal data-delay="200">
            VCS는 완벽한 엔드포인트 보안을 추구하는 통합 반출입 보안 시스템입니다.<span className="br"></span>
            바이러스 검사, 반입된 저장매체의 통제, 반출 시 보안 유출을 대비하는 보안 삭제까지 수행합니다.<span className="br"></span>
            VCS는 휴대용 저장매체의 이력을 전산화하고 추적 및 통제하는 유일한 물리 보안 시스템입니다.
          </p>
        </div>

        <div className='responsive section_con'>
            <h3>
              <span data-reveal />
              <div data-reveal data-delay="200">도입 필요성</div>
            </h3>
            <div className='txt-box' data-reveal>
                <h4 data-reveal data-delay="200">가장 취약할 수 있는 물리적 보안 출입구, 제로 트러스트의 완성은 물리 엔드포인트의 완벽한 통제로 가능합니다.</h4>
                <p>
                    클라우드와 네트워크 보안에는 많은 예산을 투입하지만 매일 반입되는 휴대용 저장매체(USB, 외장하드)는 여전히 통제 범위 밖에 있습니다.<br />
                    아날로그 방식의 반입 관리는 제로 트러스트 환경의 가장 큰 보안 공백입니다 
                </p>
            </div>
            <div data-reveal>
                <img src={prdVcsImg1} alt="" />
            </div>

            <div className='con-box'>
                <h4 data-reveal data-delay="200">기존 통제 방식이 지능형 위협을 막을 수 없는 3가지 이유</h4>
                <ul className='ul-con-list' data-reveal data-delay="100">
                    <li>
                        <strong>01. 수기작성 및 인적 오류</strong>
                        수기 및 육안 확인에 의존하여 생길 수 있는 오류입니다.<br />
                        인원이 많아지는 러시아워 시간에 보안요원 업무 과중으로 인한 검사 누락 및 오기입이 발생합니다.<br />
                        보안프로세스의 시스템적 강제성이 없다면 빈번하게 발생할 수 있습니다.  
                    </li>
                    <li>
                        <strong>02. 비인가 저장장치 연결</strong>
                        비인가 및 검증되지 않은 저장매체(USB, 외장하드)가 내부로 유입되서 내부망에 연결될 가능성입니다.<br />
                        수 초 내에 네크워크 전체로 악성코드가 유입될 수 있는 최악의 경우도 배제할 수 없습니다. 
                    </li>
                    <li>
                        <strong>03. 사후 이력 추적 불가</strong>
                        저장매체로 인한 내부 기밀의 외부 유출 또한 심각한 피해를 양산할 수 있습니다.<br />
                        반입 후 생성, 수정된 파일 등의 이력을 파악할 수 없습니다. 단순 삭제된 파일은 외부 포렌식 도구로<span className="br"></span>
                        쉽게 복구되어 정보 유출을 위한 지능화에 대응하기 어렵습니다.
                    </li>
                </ul>
            </div>
        </div>

        <div className='responsive section_con'>
            <h3>
              <span data-reveal />
              <div data-reveal data-delay="200">제품 특장점</div>
            </h3>
            <div className='con-box'>
                <h4 data-reveal data-delay="200">지능형 위협을 완벽하게 통제하는 VCS 단계별 통제 방식과 로컬 AI 통합</h4>
                <p>
                    VCS는 사업장 내부로 반입되는 모든 IT 저장장치(USB, SD Card, HDD) 및 노트북의 바이러스와 악성코드를 사전에 점검하고 치료하여 사업장 내부로의<span className="br"></span> 유입을 원천 차단하는 통합 보안 솔루션입니다.   
                </p>
                <div className='cp-tit' data-reveal>
                    <div>STEP 01</div>
                    <div>반입 단계, 다중 백신 기반의 무결성 검증</div>
                </div>
                <div data-reveal className='pad'>
                    <img src={prdVcsImg2} alt="" />
                </div>
            </div>
            <div className='con-box'>
                <div className='cp-tit' data-reveal>
                    <div>STEP 02</div>
                    <div>반입 중, DPT 연동을 통한 강력한 노트북 주변장치 통제</div>
                </div>
                <div className='cp-con' data-reveal>
                    <p className='t-1'>
                        VCS는 DPT 연동 시, 반입 후 노트북을 완벽하고 유연하게 통제 가능합니다.<br />
                        정밀한 매체 통제, 실시간 감시로 임의적 무력화 방지, 유연한 예외 처리가 가능합니다. 
                    </p>
                    <div className='t-2'>
                        <p>
                            <strong>정밀한 매체 통제</strong>
                            USB, Wi-Fi, Bluetooth, CD-ROM<span className="br"></span>
                            Webcam, Serial Port, Disk Mount 등<span className="br"></span>
                            비인가 장치 연결의 원천 차단 기술
                        </p>
                        <p>
                            <strong>실시간 상호 감시 메커니즘</strong>
                            매체 차단 프로세스 상호 감시로<span className="br"></span>
                            사용자의 임의적 보안 프로그램 무력화 방지
                        </p>
                        <p>
                            <strong>유연한 예외 처리</strong>
                            현장 업무 연속성을 위한 관리자가 1회성<span className="br"></span>
                            해제키 발급 및 임시 허용 적용으로 대처 가능
                        </p>
                    </div>
                </div>
            </div>
            <div className='con-box'>
                <div className='cp-tit' data-reveal>
                    <div>STEP 03</div>
                    <div>반출 단계, 복구 불가능한 데이터 완전 삭제</div>
                </div>
                <div className='cp-con two' data-reveal>
                    <div className='t-2'>
                        <p>
                            <strong>반입시점과 반출시점 비교 분석 후<span className="br"></span>완벽하게 식별하여 삭제 가능</strong>
                            반입시점과 반출시점의 매체 상태를 비교 분석하여 새롭게 생성되거나 <span className="br"></span>
                            수정된 파일, 삭제된 파일까지 완벽하게 식별하여 삭제 가능합니다.<br />
                            기관의 보안 정책에 따라 단순 삭제가 아닌 보안 삭제 또는 전체<span className="br"></span>
                            영구삭제를 수행하여 중요 자료의 유출을 원천 차단합니다.
                        </p>
                    </div>
                </div>
            </div>
            <div className='con-box'>
                <div className='cp-tit' data-reveal>
                    <div className='dark'>로컬 AI 통합</div>
                    <div className='dark'>단순 통제를 넘어선 예측, ‘로컬 AI 엔진’ 탑재</div>
                </div>
                <div className='cp-con three1' data-reveal>
                    <p className='t-1'>
                        외부 연계 없는 로컬 AI 엔진 탑재로 안전하고 이상 징후를 사전에 차단할 수 있는 지능화된 핵심 AI 기술 
                    </p>
                    <div className='t-2'>
                        <p>
                            <strong>안전한 폐쇄망 AI 엔진 탑재</strong>
                            외부 클라우드 정송 없이, 내부 서버에서만 동작하는 로컬 AI 분석 엔진을<span className="br"></span>
                            탑재 후 연동하여 보다 안전하고 지능적인 보안 분석 가능
                        </p>
                        <p>
                            <strong>이상 징후 사전 예측</strong>
                            반복적인 위험 매체 사용 패턴, 비정상적인 대용량 파일 수정, 특정 시간대<span className="br"></span>
                            집중 반출 시도 등을 머신러닝 분석하여 관리자에게 실시간 통보
                        </p>
                        <p>
                            <strong>사전 예측 의사결정 지원</strong>
                            단순 로그 조회가 아닌 위험 예측 인원의 위험도 자동 평가 및 보안 사고를<span className="br"></span>
                            사전에 예방할 수 있는 실시간 가이드 제공 
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div className='responsive section_con'>
            <h3>
              <span data-reveal />
              <div data-reveal data-delay="200">기대효과</div>
            </h3>
            <div className='con-box'>
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
                <h4 data-reveal data-delay="200">VCS 도입 전후 패러다임의 변화 비교</h4>
                <div className='compare-table-wrap' data-reveal data-delay="100">
                    <table className='compare-table'>
                        <thead>
                            <tr>
                                <th>구분</th>
                                <th>기존 아날로그방식</th>
                                <th className='th-after'>VCS 도입 이후</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>반입 관리</td>
                                <td>수기 확인 및 검사 누락 발생</td>
                                <td className='td-after'>시스템 기반 검사 강제화<br/>(미 완료 반입 불가)</td>
                            </tr>
                            <tr>
                                <td>위협 대응</td>
                                <td>사후 감염 대응 중심</td>
                                <td className='td-after'>반입 전 3종 백신 검사로<br/>바이러스, 악성코드 선제적 차단</td>
                            </tr>
                            <tr>
                                <td>유출 방지</td>
                                <td>반출 파일 확인 불가, 단순 삭제</td>
                                <td className='td-after'>변경 파일 식별 및<br/>보안삭제 / 영구삭제 적용</td>
                            </tr>
                            <tr>
                                <td>이력 검사</td>
                                <td>종이 대장, 추적 및 검색 불가</td>
                                <td className='td-after'>100% 디지털 전산 이력 관리</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div className='responsive section_con'>
            <h3>
              <span data-reveal />
              <div data-reveal data-delay="200">주요화면 및 규격</div>
            </h3>
            <ul className='ul-con-list3' data-reveal data-delay="100">
                <li>
                    <div><img src={prdVcsImg5_1} alt="시작화면" /></div>
                    <p>시작화면</p>
                </li>
                <li>
                    <div><img src={prdVcsImg5_2} alt="저장매체 연결" /></div>
                    <p>저장매체 연결</p>
                </li>
                <li>
                    <div><img src={prdVcsImg5_3} alt="바이러스 검사" /></div>
                    <p>바이러스 검사</p>
                </li>
                <li>
                    <div><img src={prdVcsImg5_4} alt="검사 완료" /></div>
                    <p>검사 완료</p>
                </li>
            </ul>
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
                            <div className='swiper-slide'>
                                <img src={mainImgKiosk3} alt="" />
                            </div>
                            <div className='swiper-slide'>
                                <img src={mainImgKiosk4} alt="" />
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

export default DptVcs
