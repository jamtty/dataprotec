import { useEffect } from 'react'
import CompanyLayout from './CompanyLayout'
import imgAbout1 from '../../assets/images/img_about_1.png'
import imgAbout2 from '../../assets/images/img_about_2.png'
import imgAbout3 from '../../assets/images/img_about_3.png'
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
          <div className="img" data-aos="fade-up" data-aos-delay="100">
            <img src={imgAbout1} alt="" />
          </div>
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">외부 방문객 반출입 통합 보안 프로세스</div></h3>
          <p data-aos="fade-up">
            외부 방문객의 반출입으로 인한 보안유출을 대비하는 통합 보안 프로세스를 제안합니다.<br />
            방문예약시스템부터 무인출입증 발급, 저장매체로 인한 악성코드 유입 방지와 노트북 정보보안, 무인대여노트북 관리,<span className="br"></span>
            복구불가 완전삭제까지 앤드포인트 물리보안의 AtoZ까지 데이타프로텍의 기술력으로 보안 위협으로부터 안전을 약속드립니다.
          </p>
          <div className="img" data-aos="fade-up" data-aos-delay="100">
            <img src={imgAbout2} alt="" />
          </div>
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">내부 임직원 노트북 통합 보안 프로세스</div></h3>
          <p data-aos="fade-up">
            노트북의 무단 반출을 통제하고 승인된 반출절차를 통해 사내 노트북의 보안 통제 관리에 필요한 솔루션을 제안합니다.<br />
            사내 공용 노트북, 업무용 노트북 출장의 통합 보안 관리와 주변장치 제어 및 통제, 파일 분석 등을 통해 정보 유출을 대비할 수 있고,<span className="br"></span>
            시점 복원 및 변화된 파일 분석과 초기화 등의 절차가 무인보관함에서 자동으로 진행되어 보안과 운용의 편리성을 동시에 추구하는 시스템입니다.
          </p>
          <div className="img" data-aos="fade-up" data-aos-delay="100">
            <img src={imgAbout3} alt="" />
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
