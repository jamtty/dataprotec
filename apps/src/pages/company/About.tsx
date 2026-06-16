import { useEffect } from 'react'
import CompanyLayout from './CompanyLayout'
import imgAboutConBg from '../../assets/images/img_about_con_bg.png'
import imgAboutCon1 from '../../assets/images/img_about_con_1.png'
import imgAboutCon1_2 from '../../assets/images/img_about_con_1_2.png'
import imgAboutCon1_3 from '../../assets/images/img_about_con_1_3.png'
import imgAboutCon2Bg from '../../assets/images/img_about_con_2_bg.png'
import imgAboutCon2_1 from '../../assets/images/img_about_con_2_1.png'
import imgAboutCon2_2 from '../../assets/images/img_about_con_2_2.png'
import imgAboutCon2_3 from '../../assets/images/img_about_con_2_3.png'
import imgAboutCon2_4 from '../../assets/images/img_about_con_2_4.png'
import imgAboutCon2_5 from '../../assets/images/img_about_con_2_5.png'
import imgAboutCon2_etc1 from '../../assets/images/img_about_con_2_etc1.png'
import imgAboutCon2_etc2 from '../../assets/images/img_about_con_2_etc2.png'
import imgAboutCon2_etc3 from '../../assets/images/img_about_con_2_etc3.png'
import imgAboutCon3Bg from '../../assets/images/img_about_con_3_bg.png'
import imgAboutCon3_1 from '../../assets/images/img_about_con_3_1.png'
import imgAboutCon3_2 from '../../assets/images/img_about_con_3_2.png'
import imgAboutCon3_3 from '../../assets/images/img_about_con_3_3.png'
import imgAboutCon3_4 from '../../assets/images/img_about_con_3_4.png'
import mainMapTitleImg from '../../assets/images/main_map_title@2x.png'
import mainClImg1 from '../../assets/images/main_cl_img_1.png'
import mainClImg2 from '../../assets/images/main_cl_img_2.png'
import mainClImg3 from '../../assets/images/main_cl_img_3.png'
import mainClImg4 from '../../assets/images/main_cl_img_4.png'
import mainClImg5 from '../../assets/images/main_cl_img_5.png'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function CompanyAbout() {
  useEffect(() => {
    // section_map 카운트업 애니메이션
    const countEls = document.querySelectorAll<HTMLElement>('.section_map .count ul li .num strong')
    if (countEls.length) {
      const targets = Array.from(countEls).map(el => parseInt(el.dataset.count || '0', 10))
      countEls.forEach((el) => {
        el.style.minWidth = el.offsetWidth + 'px'
        el.textContent = '0'
      })
      const countTweens: gsap.core.Tween[] = []
      ScrollTrigger.create({
        trigger: '.section_map .count',
        start: 'top 80%',
        onEnter: () => {
          countTweens.forEach(t => t.kill())
          countTweens.length = 0
          countEls.forEach((el, i) => {
            const target = targets[i]
            const obj = { val: 0 }
            const tween = gsap.to(obj, {
              val: target,
              duration: 0.7,
              ease: 'power2.out',
              onUpdate() {
                const v = Math.round(obj.val)
                el.textContent = target >= 1000
                  ? v.toLocaleString('ko-KR')
                  : String(v)
              },
            })
            countTweens.push(tween)
          })
        },
        onLeaveBack: () => {
          countTweens.forEach(t => t.kill())
          countTweens.length = 0
          countEls.forEach((el) => { el.textContent = '0' })
        },
      })
    }

    // con-interaction-1 순차 등장 인터랙션
    const ci1 = document.querySelector('.con-interaction-1')
    if (ci1) {
      gsap.set('.ci1-item-1', { autoAlpha: 0, x: -50 })
      gsap.set('.ci1-item-2', { autoAlpha: 0, x: 50, y: -30 })
      gsap.set('.ci1-item-3', { autoAlpha: 0, x: 50, y: 30 })
      ScrollTrigger.create({
        trigger: '.con-interaction-1',
        start: 'top 75%',
        onEnter: () => {
          gsap.to('.ci1-item-1', { autoAlpha: 1, x: 0, duration: 0.7, ease: 'power2.out' })
          gsap.to('.ci1-item-2', { autoAlpha: 1, x: 0, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.2 })
          gsap.to('.ci1-item-3', { autoAlpha: 1, x: 0, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.4 })
        },
        onLeaveBack: () => {
          gsap.set('.ci1-item-1', { autoAlpha: 0, x: -50 })
          gsap.set('.ci1-item-2', { autoAlpha: 0, x: 50, y: -30 })
          gsap.set('.ci1-item-3', { autoAlpha: 0, x: 50, y: 30 })
        },
      })
    }

    // con-interaction-2 순차 등장 인터랙션
    const ci2 = document.querySelector('.con-interaction-2')
    if (ci2) {
      gsap.set(['.ci2-item-1', '.ci2-item-2', '.ci2-item-3', '.ci2-item-4', '.ci2-item-5'], { autoAlpha: 0, y: 40 })
      gsap.set('.ci2-bg', { autoAlpha: 0 })

      // 1, 2번: 영역 진입 시
      let ci2Tl1: gsap.core.Timeline | null = null
      ScrollTrigger.create({
        trigger: '.con-interaction-2',
        start: 'top 75%',
        onEnter: () => {
          if (ci2Tl1) ci2Tl1.kill()
          ci2Tl1 = gsap.timeline()
          ci2Tl1
            .to('.ci2-item-1', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' })
            .to('.ci2-item-2', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' })
        },
        onLeaveBack: () => {
          if (ci2Tl1) { ci2Tl1.kill(); ci2Tl1 = null }
          gsap.set(['.ci2-item-1', '.ci2-item-2'], { autoAlpha: 0, y: 40 })
        },
      })

      // 3, 4, 5번: 영역 중간 지점 이후
      let ci2Tl2: gsap.core.Timeline | null = null
      ScrollTrigger.create({
        trigger: '.con-interaction-2',
        start: 'center 80%',
        onEnter: () => {
          if (ci2Tl2) ci2Tl2.kill()
          ci2Tl2 = gsap.timeline()
          ci2Tl2
            .to('.ci2-item-3', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' })
            .to('.ci2-item-4', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' })
            .to('.ci2-item-5', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' })
            .to('.ci2-bg', { autoAlpha: 1, duration: 0.6, ease: 'power2.out' })
        },
        onLeaveBack: () => {
          if (ci2Tl2) { ci2Tl2.kill(); ci2Tl2 = null }
          gsap.set(['.ci2-item-3', '.ci2-item-4', '.ci2-item-5'], { autoAlpha: 0, y: 40 })
          gsap.set('.ci2-bg', { autoAlpha: 0 })
        },
      })
    }

    // con-interaction-3 순차 등장 인터랙션
    const ci3 = document.querySelector('.con-interaction-3')
    if (ci3) {
      gsap.set(['.ci3-item-1', '.ci3-item-2', '.ci3-item-3', '.ci3-item-4'], { autoAlpha: 0, y: 40 })

      // 1, 2번: 상단 진입 시
      let ci3Tl1: gsap.core.Timeline | null = null
      ScrollTrigger.create({
        trigger: '.con-interaction-3',
        start: 'top 75%',
        onEnter: () => {
          if (ci3Tl1) ci3Tl1.kill()
          ci3Tl1 = gsap.timeline()
          ci3Tl1
            .to('.ci3-item-1', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' })
            .to('.ci3-item-2', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' })
        },
        onLeaveBack: () => {
          if (ci3Tl1) { ci3Tl1.kill(); ci3Tl1 = null }
          gsap.set(['.ci3-item-1', '.ci3-item-2'], { autoAlpha: 0, y: 40 })
        },
      })

      // 3, 4번: 중간 이후
      let ci3Tl2: gsap.core.Timeline | null = null
      ScrollTrigger.create({
        trigger: '.con-interaction-3',
        start: 'center 65%',
        onEnter: () => {
          if (ci3Tl2) ci3Tl2.kill()
          ci3Tl2 = gsap.timeline()
          ci3Tl2
            .to('.ci3-item-3', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' })
            .to('.ci3-item-4', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' })
        },
        onLeaveBack: () => {
          if (ci3Tl2) { ci3Tl2.kill(); ci3Tl2 = null }
          gsap.set(['.ci3-item-3', '.ci3-item-4'], { autoAlpha: 0, y: 40 })
        },
      })
    }

    // section_client 스크롤 인터랙션
    if (document.querySelector('.section_client .cl-list')) {
      gsap.fromTo('.section_client .cl-list li',
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1, y: 0, duration: 0.8, ease: 'expo.out',
          stagger: { each: 0.15 },
          scrollTrigger: { trigger: '.section_client .cl-list', start: 'top 82%', toggleActions: 'play none none reverse' },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (

    <CompanyLayout>
      <div className="contetns company_about">

        <div className="responsive title_area">
          <h2 data-aos="fade-left">
            DATAPROTEC
            <span>Data protection Technology</span>
          </h2>
          <p data-aos="fade-up" data-aos-delay="200">
            데이타프로텍은 저장매체 반출입 통합 보안 분야의 국내 선두 기업입니다. 보안의 처음과 끝을 책임진다는 기업 철학으로<span className="br"></span>
            약 17년 동안 끊임없이 달려왔습니다. 첨단 산업 기술 유출 방지를 위한 핵심기술은 국내외 글로벌 고객사에 도입 후 운영되고 있고,<span className="br"></span>
            데이타프로텍은 오늘도 그 역할을 다하기 위해 먼저 고민하고 처음과 끝까지 책임지는 기술개발에 최선을 다하고 있습니다. 
          </p>
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">제로 트러스트 물리 엔드포인트 통제 기술 개요</div></h3>
          <div className='con-interaction-1'>
            <img src={imgAboutConBg} alt="" className='ci1-bg' />
            <div className='ci1-item ci1-item-1'>
              <img src={imgAboutCon1} alt="" />
              <div className='ci1-txt'>
                <strong>지능형 통합 보안 (AI 엔진)</strong>
                <p>기업 보안 유출을 완벽하게 통제하는<br />통합 보안 시스템과 AI로 이상 탐지 고도화</p>
              </div>
            </div>
            <div className='ci1-item ci1-item-2'>
              <img src={imgAboutCon1_2} alt="" />
              <div className='ci1-txt'>
                <strong>무결점 통합 클린 아키텍처</strong>
                <p>기업 내부로 유입될 수 있는<br />위협 요소를 사전 차단 분석 예방</p>
              </div>
            </div>
            <div className='ci1-item ci1-item-3'>
              <img src={imgAboutCon1_3} alt="" />
              <div className='ci1-txt'>
                <strong>제로 트러스트 엔드포인트 제어</strong>
                <p>외부 저장 매체로 인한 위협 요소를<br />원천 차단하는 완벽한 물리 보안 시스템</p>
              </div>
            </div>
          </div>
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">외부 방문객 반출입 통합 보안 프로세스</div></h3>
          <p data-aos="fade-up">
            외부 방문객의 반출입으로 인한 보안유출을 대비하는 통합 보안 프로세스를 제안합니다.<br />
            방문예약시스템부터 무인출입증 발급, 저장매체로 인한 악성코드 유입 방지와 노트북 정보보안, 무인대여노트북 관리,<span className="br"></span>
            복구불가 완전삭제까지 앤드포인트 물리보안의 AtoZ까지 데이타프로텍의 기술력으로 보안 위협으로부터 안전을 약속드립니다.
          </p>
          <div className="con-interaction-2">
            <img src={imgAboutCon2Bg} alt="" className='ci2-bg' />
            <div className='ci2-item ci2-item-1'>
              <img src={imgAboutCon2_1} alt="" />
              <div className='ci2-txt'>
                <strong>01. 방문예약(DVMS)</strong>
                <p>웹기반 사전 등록 및 반입 신청</p>
              </div>
            </div>
            <div className='ci2-item ci2-item-2'>
              <img src={imgAboutCon2_2} alt="" />
              <div className='ci2-txt'>
                <strong>02. 출입(DPT-ID)</strong>
                <p>신분인식 및 무인출입증 발급</p>
              </div>
            </div>
            <div className='ci2-item ci2-item-3'>
              <img src={imgAboutCon2_3} alt="" />
              <div className='ci2-txt'>
                <strong>03. 검사(VCS)</strong>
                <p>저장매체 악성코드 검사 및<br />치료, 미검사 매체 원천 차단</p>
              </div>
            </div>
            <div className='ci2-item ci2-item-4'>
              <img src={imgAboutCon2_4} alt="" />
              <div className='ci2-txt'>
                <strong>04. 통제(DPT) <img src={imgAboutCon2_etc2} alt="" /><img src={imgAboutCon2_etc3} alt="" /></strong>
                <p>노트북 반입 전 파일 스캔 후<br />반출 시 비교 분석 후 원본/삭제</p>
              </div>
            </div>
            <div className='ci2-item ci2-item-5'>
              <img src={imgAboutCon2_5} alt="" />
              <div className='ci2-txt'>
                <strong>05. 삭제(Digital Eraser) <img src={imgAboutCon2_etc1} alt="" /></strong>
                <p>복구 불가 데이터 영구 삭제</p>
              </div>
            </div>
          </div>
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">내부 임직원 노트북 통합 보안 프로세스</div></h3>
          <p data-aos="fade-up">
            노트북의 무단 반출을 통제하고 승인된 반출절차를 통해 사내 노트북의 보안 통제 관리에 필요한 솔루션을 제안합니다.<br />
            사내 공용 노트북, 업무용 노트북 출장의 통합 보안 관리와 주변장치 제어 및 통제, 파일 분석 등을 통해 정보 유출을 대비할 수 있고,<span className="br"></span>
            시점 복원 및 변화된 파일 분석과 초기화 등의 절차가 무인보관함에서 자동으로 진행되어 보안과 운용의 편리성을 동시에 추구하는 시스템입니다.
          </p>
          <div className="con-interaction-3">
            <img src={imgAboutCon3Bg} alt="" className='ci3-bg' />
            <div className='ci3-item ci3-item-1'>
              <img src={imgAboutCon3_1} alt="" />
              <div className='ci3-txt'>
                <strong>01. 신청/승인</strong>
                <p>관리자 승인 후 무인보관함에서<br />운영자 개입 없이 대여 진행</p>
              </div>
            </div>
            <div className='ci3-item ci3-item-2'>
              <img src={imgAboutCon3_2} alt="" />
              <div className='ci3-txt'>
                <strong>02. 사외반출</strong>
                <p>무단반출 차단릿 사외정솵<br />실시간 적용(화면잠금, 매체제어)</p>
              </div>
            </div>
            <div className='ci3-item ci3-item-3'>
              <img src={imgAboutCon3_3} alt="" />
              <div className='ci3-txt'>
                <strong>03. 반낙/분석 <img src={imgAboutCon2_etc2} alt="" /><img src={imgAboutCon2_etc3} alt="" /></strong>
                <p>보관함 복군 시 변화된 파일 검충 및<br />외부매체 연결 기록 전송</p>
              </div>
            </div>
            <div className='ci3-item ci3-item-4'>
              <img src={imgAboutCon3_4} alt="" />
              <div className='ci3-txt'>
                <strong>04. 초기화 <img src={imgAboutCon2_etc1} alt="" /></strong>
                <p>Digital Eraser 연동으로 디스크 완전삭제,<br />백업 이미지로 자동 초기화 진행</p>
              </div>
            </div>
          </div>
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">끊임없는 기술 혁신을 위한 보안 기업</div></h3>
          <p data-aos="fade-up">
            처음부터 끝까지 책임진다는 보안의식과 사명감은 SW기술 뿐만 아니라 현장과 고객사와 소통에 있습니다.<br />
            시스템 도입 이후 다년간 쌓인 신뢰를 바탕으로 글로벌 기업으로 성장하는 고객사의 완벽한 보안을 위해 오늘도 미리 고민하고<span className="br"></span>
            끊임없는 기술 혁신을 위해 노력하고 있습니다. 
          </p>
          <div className="section_map">
                <div className='inner'>
                    <div className='tit'>
                        <img src={mainMapTitleImg} alt="" />
                    </div>
                    <div className='bg'></div>
                    <div className='count'>
                        <ul>
                            <li>
                                <p className='num'><strong data-count="10">10</strong><span>+개국</span></p>
                                <p className='des'>미국, 중국, 유럽, 동남아<br />해외법인 운영 중(국내 유일)</p>
                            </li>
                            <li>
                                <p className='num'><strong data-count="2000000">2,000,000</strong><span>+건</span></p>
                                <p className='des'>첨단 대기업 및 공공기관 현장에서<br />안정적으로 처리된 누적 레퍼런스</p>
                            </li>
                            <li>
                                <p className='num'><strong data-count="17">17</strong><span>+년</span></p>
                                <p className='des'>2009-2026년<br />시스템 보안 전문성</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">고객사</div></h3>
          <div className="section_client">
			<div className='inner'>
                <div className='con'>
                    <ul className='cl-list'>
                        <li><img src={mainClImg1} alt="고객사" /></li>
                        <li><img src={mainClImg2} alt="고객사" /></li>
                        <li><img src={mainClImg3} alt="고객사" /></li>
                        <li><img src={mainClImg4} alt="고객사" /></li>
                        <li><img src={mainClImg5} alt="고객사" /></li>
                    </ul>
                </div>
            </div>
          </div>
        </div>


      </div>
    </CompanyLayout>
  )
}

export default CompanyAbout
