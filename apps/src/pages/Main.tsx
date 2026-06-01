import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swiper from 'swiper'
import { Pagination, Autoplay, EffectFade, Navigation } from 'swiper/modules'
import 'swiper/css/effect-fade'
import 'swiper/css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
// import mainVis1Mp4 from '../assets/images/main_vis_1.mp4'
// import mainVis2Mp4 from '../assets/images/main_vis_2.mp4'
// import mainVis3Mp4 from '../assets/images/main_vis_3.mp4'
import mainVis1Img from '../assets/images/main_vis_1@2x.png'
import mainVis2Img from '../assets/images/main_vis_2@2x.png'
import mainVis3Img from '../assets/images/main_vis_3@2x.png'
import mainMapTitleImg from '../assets/images/main_map_title@2x.png'
import mainImgKiosk1 from '../assets/images/main_img_kiosk_1@2x.png'
import mainImgKiosk2 from '../assets/images/main_img_kiosk_2@2x.png'
import mainImgKiosk3 from '../assets/images/main_img_kiosk_3@2x.png'
import mainImgKiosk4 from '../assets/images/main_img_kiosk_4@2x.png'
import mainNewsroomSam from '../assets/images/main_newsroom_sam@2x.png'
import mainClImg1 from '../assets/images/main_cl_img_1.png'
import mainClImg2 from '../assets/images/main_cl_img_2.png'
import mainClImg3 from '../assets/images/main_cl_img_3.png'
import mainClImg4 from '../assets/images/main_cl_img_4.png'
import mainClImg5 from '../assets/images/main_cl_img_5.png'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'

function Main() {
  useEffect(() => {
    let swiperInstance: Swiper | null = null
    let kioskSwiperInstance: Swiper | null = null

    const staggerTxtMotion = () => {
      gsap.fromTo(
        '.visual .swiper-slide-active .slide_up',
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, ease: 'power4.out', duration: 1, stagger: 0.075 }
      )
    }

    swiperInstance = new Swiper('.visual_slide', {
      modules: [Pagination, Autoplay, EffectFade],
      effect: 'fade',
      loop: true,
      speed: 500,
      grabCursor: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: {
        el: '.visual_slide .pagination',
        clickable: true,
      },
      on: {
        init() { staggerTxtMotion() },
        slideChangeTransitionStart() {
          document.querySelectorAll('.swiper-slide-active .slide_up').forEach(el => {
            (el as HTMLElement).style.visibility = 'hidden'
          })
        },
        slideChangeTransitionEnd() { staggerTxtMotion() },
      },
    })

    // ── 스크롤 인터랙션 (GSAP ScrollTrigger) ──────────────────────────────

    // 요소 페이드인: expo.out + stagger ease:'power2.in' 으로 가속감
    const st = (trigger: string, targets: string, to: gsap.TweenVars, from: gsap.TweenVars = { autoAlpha: 0, y: 50 }) => {
      if (!document.querySelector(targets)) return
      gsap.fromTo(targets, from, {
        ...to,
        scrollTrigger: { trigger, start: 'top 82%', toggleActions: 'play none none reverse' },
      })
    }

    st('.section_visitor .tit-area',
      '.section_visitor h2 span, .section_visitor h2 strong, .section_visitor .t-des',
      { autoAlpha: 1, y: 0, duration: 0.75, ease: 'expo.out', stagger: 0.2 },
      { autoAlpha: 0, y: 25 }
    )
    st('.section_visitor .card', '.section_visitor .card ul li',
      { autoAlpha: 1, y: 0, duration: 0.75, ease: 'expo.out', stagger: { each: 0.1, ease: 'power2.in' } }
    )
    // mark-1/mark-2: 카드 등장 완료 후 좌우 슬라이드인 + 2회 깜빡임
    gsap.set('.section_visitor .card .mark-1, .section_visitor .card .mark-2', { autoAlpha: 0 })
    gsap.timeline({
      scrollTrigger: { trigger: '.section_visitor .card', start: 'top 82%', toggleActions: 'play none none reverse' },
      onReverseComplete: () => document.querySelector('.section_visitor .card ul')?.classList.remove('line-visible')
    })
    .fromTo('.section_visitor .card .mark-1',
      { x: -50, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.out' },
      1.3
    )
    .fromTo('.section_visitor .card .mark-2',
      { x: 50, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.out' },
      1.3
    )
    .call(() => document.querySelector('.section_visitor .card ul')?.classList.add('line-visible'), [], 1.3)
    // card-2 카드: 올라오기 + bg 줌아웃 + txtBox 왼→오른 슬라이드인
    document.querySelectorAll('.section_visitor .card-2 > ul > li').forEach(li => {
      gsap.timeline({
        scrollTrigger: { trigger: li, start: 'top 60%', toggleActions: 'play none none reverse' }
      })
      .fromTo(li, { y: 150, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: 'power2.inOut' })
      .fromTo(li.querySelector('.bg .bg-img'), { scale: 1.2 }, { scale: 1, duration: 1.2, ease: 'power2.inOut' }, '<')
      .fromTo(li.querySelector('.txtBox'), { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power2.inOut' }, '<')
    })
    // card-2 카드: 스크롤 parallax (홀수 위로 / 짝수 아래로) — 데스크톱만 (모바일 겹침 방지)
    if (window.innerWidth > 768) {
      document.querySelectorAll('.section_visitor .card-2 > ul > li').forEach((li, i) => {
        gsap.to(li.querySelector('.bg'), {
          y: i % 2 === 0 ? -80 : 50,
          ease: 'none',
          scrollTrigger: {
            trigger: '.section_visitor .card-2',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      })
    }
    // card-2 ::after 배경: 스크롤 위치에 따라 위→아래 리빌
    {
      const el = document.querySelector('.section_visitor .card-2') as HTMLElement | null
      if (el) {
        el.style.setProperty('--after-clip', '100%')
        const proxy = { v: 100 }
        gsap.to(proxy, {
          v: 0, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 80%', scrub: 1 },
          onUpdate() { el.style.setProperty('--after-clip', `${proxy.v}%`) },
        })
      }
    }

    st('.section_Employee .tit-area',
      '.section_Employee h2 span, .section_Employee h2 strong, .section_Employee .t-des',
      { autoAlpha: 1, y: 0, duration: 0.75, ease: 'expo.out', stagger: 0.2 },
      { autoAlpha: 0, y: 25 }
    )
    st('.section_Employee .slogan', '.section_Employee .slogan',
      { autoAlpha: 1, y: 0, duration: 0.9, ease: 'expo.out' },
      { autoAlpha: 0, y: 25 }
    )
    // 지급/대여 노트북 카드: 각 .card 별 trigger + 내부 li stagger 순차 등장
    document.querySelectorAll('.section_Employee .card').forEach(card => {
      gsap.fromTo(card.querySelectorAll('li'),
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0, duration: 0.75, ease: 'expo.out',
          stagger: { each: 0.1, ease: 'power2.in' },
          scrollTrigger: { trigger: card, start: 'top 82%', toggleActions: 'play none none reverse' },
        }
      )
    })
    // card-2 카드: 올라오기 + bg 줌아웃 + txtBox 왼→오른 슬라이드인
    document.querySelectorAll('.section_Employee .card-2 > ul > li').forEach(li => {
      gsap.timeline({
        scrollTrigger: { trigger: li, start: 'top 60%', toggleActions: 'play none none reverse' }
      })
      .fromTo(li, { y: 150, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: 'power2.inOut' })
      .fromTo(li.querySelector('.bg .bg-img'), { scale: 1.2 }, { scale: 1, duration: 1.2, ease: 'power2.inOut' }, '<')
      .fromTo(li.querySelector('.txtBox'), { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power2.inOut' }, '<')
    })
    // card-2 카드: 스크롤 parallax (홀수 위로 / 짝수 아래로) — 데스크톱만 (모바일 겹침 방지)
    if (window.innerWidth > 768) {
      document.querySelectorAll('.section_Employee .card-2 > ul > li').forEach((li, i) => {
        gsap.to(li.querySelector('.bg'), {
          y: i % 2 === 0 ? -80 : 50,
          ease: 'none',
          scrollTrigger: {
            trigger: '.section_Employee .card-2',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      })
    }
    // card-2 ::after 배경: 스크롤 위치에 따라 위→아래 리빌
    {
      const el = document.querySelector('.section_Employee .card-2') as HTMLElement | null
      if (el) {
        el.style.setProperty('--after-clip', '100%')
        const proxy = { v: 100 }
        gsap.to(proxy, {
          v: 0, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 100%', scrub: 1 },
          onUpdate() { el.style.setProperty('--after-clip', `${proxy.v}%`) },
        })
      }
    }
    // section_storage 타이틀 인터랙션
    st('.section_storage .tit-area',
      '.section_storage h2 span, .section_storage h2 strong',
      { autoAlpha: 1, y: 0, duration: 0.75, ease: 'expo.out', stagger: 0.2 },
      { autoAlpha: 0, y: 25 }
    )

    // con-banner: bg scale-down + txtBox 순차 등장
    if (document.querySelector('.section_storage .con-banner')) {
      gsap.set('.section_storage .con-banner .txtBox > *', { autoAlpha: 0, y: 40 })

      // bg scale: 뷰포트 진입 시 scale-down
      gsap.fromTo('.section_storage .con-banner .bg',
        { scale: 1.2 },
        {
          scale: 1, duration: 1.4, ease: 'power2.out',
          scrollTrigger: { trigger: '.section_storage .con-banner', start: 'top 82%', toggleActions: 'play none none reverse' },
        }
      )

      // txtBox: 순차 등장
      gsap.timeline({
        scrollTrigger: {
          trigger: '.section_storage .con-banner',
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        }
      })
      .fromTo('.section_storage .con-banner .txtBox h3',
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power2.out' }
      )
      .fromTo('.section_storage .con-banner .txtBox p',
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo('.section_storage .con-banner .txtBox a',
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power2.out' },
        '-=0.5'
      )
    }

    // section_storage year 카운트업 애니메이션
    const yearEl = document.querySelector<HTMLElement>('.section_storage .year strong')
    if (yearEl) {
      const yearTarget = parseInt(yearEl.dataset.count || '0', 10)
      yearEl.style.minWidth = yearEl.offsetWidth + 'px'
      yearEl.textContent = '0'
      let yearTween: gsap.core.Tween | null = null
      ScrollTrigger.create({
        trigger: '.section_storage .year',
        start: 'top 85%',
        onEnter: () => {
          if (yearTween) yearTween.kill()
          const obj = { val: 0 }
          yearTween = gsap.to(obj, {
            val: yearTarget,
            duration: 0.7,
            ease: 'power2.out',
            onUpdate() { yearEl.textContent = String(Math.round(obj.val)) },
          })
        },
        onLeaveBack: () => {
          if (yearTween) yearTween.kill()
          yearEl.textContent = '0'
        },
      })
    }

    // section_map count 카운트업 애니메이션
    const countEls = document.querySelectorAll<HTMLElement>('.section_map .count ul li .num strong')
    if (countEls.length) {
      const targets = Array.from(countEls).map(el => parseInt(el.dataset.count || '0', 10))
      countEls.forEach((el, i) => {
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
          countEls.forEach((el, i) => {
            el.textContent = '0'
          })
        },
      })
    }
    // section_kiosk 스크롤 인터랙션
    st('.section_kiosk .tit-area',
      '.section_kiosk h2 span, .section_kiosk h2 strong',
      { autoAlpha: 1, y: 0, duration: 0.75, ease: 'expo.out', stagger: 0.2 },
      { autoAlpha: 0, y: 25 }
    )
    if (document.querySelector('.section_kiosk .con-banner')) {
      gsap.timeline({
        scrollTrigger: { trigger: '.section_kiosk .con-banner', start: 'top 82%', toggleActions: 'play none none reverse' }
      })
      .fromTo('.section_kiosk .con-banner .txtBox h3',
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power2.out' }
      )
      .fromTo('.section_kiosk .con-banner .txtBox p',
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.section_kiosk .con-banner .txtBox .btn-area',
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.section_kiosk .con-banner .img_kiosk',
        { autoAlpha: 0, x: 60 },
        { autoAlpha: 1, x: 0, duration: 0.9, ease: 'power2.out' },
        '-=0.6'
      )
    }

    // section_kiosk 슬라이드
    if (document.querySelector('.kiosk_slide')) {
      const numEl = document.querySelector<HTMLElement>('.section_kiosk .slide-nav .num')
      const totalSlides = document.querySelectorAll('.kiosk_slide .swiper-slide').length
      kioskSwiperInstance = new Swiper('.kiosk_slide', {
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
    // section_newsroom 스크롤 인터랙션
    st('.section_newsroom .tit-area',
      '.section_newsroom h2 span, .section_newsroom h2 strong',
      { autoAlpha: 1, y: 0, duration: 0.75, ease: 'expo.out', stagger: 0.2 },
      { autoAlpha: 0, y: 25 }
    )
    if (document.querySelector('.section_newsroom .ul-list')) {
      gsap.fromTo('.section_newsroom .ul-list li',
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1, y: 0, duration: 0.75, ease: 'expo.out',
          stagger: { each: 0.1, ease: 'power2.in' },
          scrollTrigger: { trigger: '.section_newsroom .ul-list', start: 'top 82%', toggleActions: 'play none none reverse' },
        }
      )
    }
    // section_prroom 스크롤 인터랙션
    st('.section_prroom .tit-area',
      '.section_prroom h2 span, .section_prroom h2 strong',
      { autoAlpha: 1, y: 0, duration: 0.75, ease: 'expo.out', stagger: 0.2 },
      { autoAlpha: 0, y: 25 }
    )
    if (document.querySelector('.section_prroom .ul-list')) {
      gsap.fromTo('.section_prroom .ul-list li',
        { autoAlpha: 0, y: 60, scale: 0.95 },
        {
          autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: 'expo.out',
          stagger: { each: 0.12, ease: 'power2.in' },
          scrollTrigger: { trigger: '.section_prroom .ul-list', start: 'top 82%', toggleActions: 'play none none reverse' },
        }
      )
    }
    // section_client 스크롤 인터랙션
    st('.section_client .tit-area',
      '.section_client h2 span, .section_client h2 strong',
      { autoAlpha: 1, y: 0, duration: 0.75, ease: 'expo.out', stagger: 0.2 },
      { autoAlpha: 0, y: 25 }
    )
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
    // ─────────────────────────────────────────────────────────────────────

    return () => {
      if (swiperInstance) swiperInstance.destroy()
      if (kioskSwiperInstance) kioskSwiperInstance.destroy()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <>
      <Header />
      <div id="index">

        {/* 비주얼 슬라이드 */}
        <div className="visual">
          <div className="visual_slide swiper-container">
            <div className="swiper-wrapper">
              <div className="slide slide_1 swiper-slide">
                <div className="inner">
                  <div className="txt_box">
                    <p className="eng slide_up"><span>지능형 통합 보안<br />핵심엔진 DPT <span style={{ fontWeight: 100, fontSize: '0.5em', verticalAlign: 'middle' }}>X</span> AI</span></p>
                    <p className="kor slide_up">
                        기업 보안 유출을 완벽하게 통제하는<span className="br" />
                        엔드포인트 통합 보안 시스템 DPT와<span className="br" />
                        AI 이상 탐지와 분석 기술의 고도화
                    </p>
                  </div>
                </div>
                <img src={mainVis1Img} className="bg" alt="" />
              </div>
              <div className="slide slide_2 swiper-slide">
                <div className="inner">
                  <div className="txt_box">
                    <p className="eng slide_up"><span>무결점 통합 클린<br />물리 보안 아키텍처</span></p>
                    <p className="kor slide_up">
						기업으로 내부로 유입될 수 있는<span className="br" />
						위협 요소를 사전 분석 예방하는<span className="br" />
						무결점 통합 클린 보안 아키텍처
                    </p>
                  </div>
                </div>
                <img src={mainVis2Img} className="bg" alt="" />
              </div>
              <div className="slide slide_3 swiper-slide">
                <div className="inner">
                  <div className="txt_box">
                    <p className="eng slide_up"><span>제로 트러스트<br />물리 엔드포인트 통제</span></p>
                    <p className="kor slide_up">
                      	외부 저장 매체로 인한 위협요소를<span className="br" />
						사전 차단하고 보안 유출을 대비한<span className="br" />
						모든 물리 앤드포인트 보안의 해법
                    </p>
                  </div>
                </div>
                <img src={mainVis3Img} className="bg" alt="" />
              </div>
            </div>
            <div className="swiper-controller">
              <div className="pagination" />
            </div>
          </div>
        </div>

        {/* 외부 방문객 반출입 통합 보안 프로세스 */}
        <div className="section_visitor">
			<div className='inner'>
				<div className='tit-area'>
					<h2>
						<span>Visitor Flow</span>
						<strong>외부 방문객 반출입<br />통합 보안 프로세스</strong>
					</h2>
					<p className='t-des'>
						외부 방문객의 반출입으로 인한 보안유출을 대비하는 통합 보안 프로세스를 제안합니다.<br />
						방문예약시스템부터 무인출입증 발급, 저장매체로 인한 악성코드 유입 방지와 노트북 정보보안, 무인대여노트북 관리, <br />
						복구불가 완전삭제까지  앤드포인트 물리보안의 AtoZ까지 데이타프로텍의 기술력으로 보안 위협으로부터 안전을 약속 드립니다.
					</p>
				</div>
				<div className='card'>
					<div className='mark-1'></div>
					<div className='mark-2'></div>
					<ul>
						<li>
							<p className='num'>01</p>
							<p className='prd'>DVMS</p>
							<div className='des'>
								방문예약<br />시스템
							</div>
						</li>
						<li>
							<p className='num'>02</p>
							<p className='prd'>DPT-ID</p>
							<div className='des'>
								지능형 무인<br />출입증 발급기
							</div>
						</li>
						<li>
							<p className='num'>03</p>
							<p className='prd'>VCS</p>
							<div className='des'>
								저장매체<br />악성코드검사
							</div>
						</li>
						<li>
							<p className='num'>04</p>
							<p className='prd'>DPT</p>
							<div className='des'>
								방문노트북<br />정보보안
							</div>
						</li>
						<li>
							<p className='num'>05</p>
							<p className='prd'>DPT-i</p>
							<div className='des'>
								공용 및 대여<br />무인노트북관리
							</div>
						</li>
						<li>
							<p className='num'>06</p>
							<p className='prd'>Digital<br />Eraser</p>
							<div className='des'>
								복구불가<br />완전삭제
							</div>
						</li>
					</ul>
				</div>
				<div className='card-2'>
                    <ul>
                        <li>
                            <div className='bg'>
                                <div className='bg-img-wrap'><div className='bg-img'></div></div>
                                <div className='txtBox'>
                                    <p className='num'>01</p>
                                    <p className='prd'>DVMS<br /><span>Dataprotec Visitor Management System</span></p>
                                    <div className='des'>
                                        고객사 방문을 위한 방문예약시스템으로 노트북, 저장매체(USB, HDD, SSD 등) 반입을 포함한 사전 등록 신청/관리 목적으로 구성된 웹기반 시스템
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className='bg'>
                                <div className='bg-img-wrap'><div className='bg-img'></div></div>
                                <div className='txtBox'>
                                    <p className='num'>02</p>
                                    <p className='prd'>DPT-ID KIOSK<br /><span>DPT-IDentification Kiosk</span></p>
                                    <div className='des'>
                                        기업의 출입 보안 이슈와 방문객 혼잡으로 인한 대기를 신분 인식, 출입증 발급 및 회수 절차를 자동화하여, 운영의 효율성을 높이는 키오스크로 1,000여장의 대용량 디스펜서로 구성된 시스템
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className='bg'>
                                <div className='bg-img-wrap'><div className='bg-img'></div></div>
                                <div className='txtBox'>
                                    <p className='num'>03</p>
                                    <p className='prd'>VCS<br /><span>Virus Clean System</span></p>
                                    <div className='des'>
                                        바이러스 및 악성코드 유입을 사전 방지, 보안성 확보를 위해 다양한 저장매체(USB, SSD 등) 백신 검사 및 치료, 이력관리, 미검사 매체 반입 차단을 할 수 있는 반입 전 필수 보안성 시스템
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className='bg'>
                                <div className='bg-img-wrap'><div className='bg-img'></div></div>
                                <div className='txtBox'>
                                    <p className='num'>04</p>
                                    <p className='prd'>DPT<br /><span>Data Protection Technology</span></p>
                                    <div className='des'>
                                        내부로 반입되는 노트북이나 저장매체로 인한 정보유출을 방지 하기 위한 시스템으로, 사업장 내부로 반입 전 노트북 파일을 스캔하여 반출 시 비교분석 후 원복 또는 삭제하는 시스템
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className='bg'>
                                <div className='bg-img-wrap'><div className='bg-img'></div></div>
                                <div className='txtBox'>
                                    <p className='num'>05</p>
                                    <p className='prd'>DPT-i<br /><span>DPT-i(Intelligent Notebook Security)</span></p>
                                    <div className='des'>
                                        사내 공용 노트북, 대여용 노트북의 통합 보안 관리와 주변장치 제어 및 통제, 자동 백업 및 복원까지 무인 보관함에서 자동으로 진행되는 인텔리전트 노트북 보안 및 통합 관리 시스템
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className='bg'>
                                <div className='bg-img-wrap'><div className='bg-img'></div></div>
                                <div className='txtBox'>
                                    <p className='num'>06</p>
                                    <p className='prd'>DIGITAL ERASER<br /><span>DIGITAL ERASER</span></p>
                                    <div className='des'>
                                        하나의 어플라이언스로 네트워크 연동 삭제, USB 부팅 삭제, 디바이스 삭제 방식 등의 세 가지 방식을 통합지원 및 관리 가능하여 경쟁력과 업무 효율성을 갖춘 올인원 어플라이언스
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
				</div>
			</div>
        </div>

		{/* 외부 방문객 반출입 통합 보안 프로세스 */}
        <div className="section_Employee">
			<div className='inner'>
				<div className='tit-area'>
					<h2>
						<span>Employee Flow</span>
						<strong>내부 임직원 노트북<br />통합 보안 프로세스</strong>
					</h2>
					<p className='t-des'>
						노트북의 무단 반출을 통제하고 승인된 반출절차를 통해 사내 노트북의 보안 통제 관리에 필요한 솔루션을 제안합니다.<br />
						사내 공용 노트북, 업무용 노트북 출장의 통합 보안 관리와 주변장치 제어 및 통제, 파일 분석 등을 통해 정보 유출을 대비할 수 있고, <br />
						시점 복원 및 변화된 파일 분석과 초기화 등의 절차가 무인보관함에서 자동으로 진행되어 보안과 운용의 편리성을 동시에 추구하는 시스템입니다.
					</p>
				</div>
				<p className='slogan mt-9'>
					지급 노트북 보안 프로세스
				</p>
				<div className='card'>
					<ul>
						<li>
							<p className='prd'>노트북<br />지급</p>
							<div className='des'>
								임직원용<br />노트북 지급
							</div>
						</li>
						<li>
							<p className='prd'>노트북 반출<br />신청/승인</p>
							<div className='des'>
								승인된 노트북<br />반출가능<br />무단반출차단
							</div>
						</li>
						<li>
							<p className='prd'>노트북<br />반출</p>
							<div className='des'>
								사외 정책<br />실시간 적용
							</div>
						</li>
						<li>
							<p className='prd'>노트북<br />반입</p>
							<div className='des'>
								변화된 파일 검출<br />전송 및 외부저장<br />매체 연결 기록 전송
							</div>
						</li>
						<li>
							<p className='prd'>반납<br />디스크 완전삭제</p>
							<div className='des'>
								반납 후<br />디스크 완전삭제
							</div>
						</li>
						<li>
							<p className='prd'>노트북<br />초기화</p>
							<div className='des'>
								백업된 이미지<br />자동 초기화
							</div>
						</li>
					</ul>
					<ul>
						<li>
							<p className='prd'>노트북<br />분실</p>
							<div className='des'>
								화면잠금<br />사용불가
							</div>
						</li>
						<li>
							<p className='prd'>디스크<br />완전삭제</p>
							<div className='des'>
								복구불가<br />완전삭제
							</div>
						</li>
					</ul>
				</div>
				<div className='card-2'>
                    <p className='slogan'>
                        대여 노트북 보안 프로세스
                    </p>
                    <div className='card'>
                        <ul>
                            <li>
                                <p className='prd'>노트북 대여<br />신청 및 승인</p>
                                <div className='des'>
                                    관리자 승인
                                </div>
                            </li>
                            <li>
                                <p className='prd'>보관함<br />방문</p>
                                <div className='des'>
                                    무인보관함에서<br />승인 시., 운영자<br />개입없이 대여
                                </div>
                            </li>
                            <li>
                                <p className='prd'>노트북<br />대여</p>
                                <div className='des'>
                                    무인보관함에서<br />사용자 직접 대여
                                </div>
                            </li>
                            <li>
                                <p className='prd'>노트북<br />반납</p>
                                <div className='des'>
                                    변화된 파일 검출<br />전송 및 외부저장<br />매체 연결 기록 전송
                                </div>
                            </li>
                            <li>
                                <p className='prd'>디스크<br />완전삭제</p>
                                <div className='des'>
                                    무인보관함에서<br />디스크 완전삭제<br />자동진행
                                </div>
                            </li>
                            <li>
                                <p className='prd'>노트북<br />초기화</p>
                                <div className='des'>
                                    무인보관함에서<br />자동진행
                                </div>
                            </li>
                        </ul>
                    </div>
					<ul>
						<li>
							<div className='bg'>
								<div className='bg-img-wrap'><div className='bg-img'></div></div>
								<div className='txtBox'>
									<p className='num'>01</p>
									<p className='prd'>DPT-i<br /><span>DPT-i(Intelligent Notebook Security)</span></p>
									<div className='des'>
										사내 공용 노트북, 대여용 노트북의 통합 보안 관리와 주변장치 제어 및 통제, 자동 백업 및 복원까지 무인 보관함에서 자동으로 진행되는 인텔리전트 노트북 보안 및 통합 관리 시스템
									</div>
								</div>
							</div>
						</li>
						<li>
							<div className='bg'>
								<div className='bg-img-wrap'><div className='bg-img'></div></div>
								<div className='txtBox'>
									<p className='num'>02</p>
									<p className='prd'>DIGITAL ERASER<br /><span>DIGITAL ERASER</span></p>
									<div className='des'>
										하나의 어플라이언스로 네트워크 연동 삭제, USB 부팅 삭제, 디바이스 삭제 방식 등의 세 가지 방식을 통합지원 및 관리 가능하여 경쟁력과 업무 효율성을 갖춘 올인원 어플라이언스
									</div>
								</div>
							</div>
						</li>
						<li>
							<div className='bg'>
								<div className='bg-img-wrap'><div className='bg-img'></div></div>
								<div className='txtBox'>
									<p className='num'>03</p>
									<p className='prd'>VCS<br /><span>Virus Clean System</span></p>
									<div className='des'>
										바이러스 및 악성코드 유입을 사전 방지, 보안성 확보를 위해 다양한 저장매체(USB, SSD 등) 백신 검사 및 치료, 이력관리, 미검사 매체 반입 차단을 할 수 있는 반입 전 필수 보안성 시스템
									</div>
								</div>
							</div>
						</li>
                        <li></li>
					</ul>
				</div>
			</div>
		</div>

        {/* 저장매체 반출입 보안 국내 시장 선도 기업 */}
        <div className="section_storage">
			<div className='inner'>
				<div className='tit-area'>
					<h2>
						<span>A Trusted Partner in CyberSecurity</span>
						<strong>저장매체 반출입 보안<br />국내 시장 선도 기업</strong>
					</h2>
				</div>
                <div className='con-banner'>
                    <div className='bg-wrap'><div className='bg'></div></div>
                    <div className='txtBox'>
                        <h3>저장매체 반출입 통합 보안 국내 선두 기업 보안의 ‘처음과 끝을 책임지는’ 데이타프로텍</h3>
                        <p>
                            데이타프로텍은 2006년 설립 이후, 사이버 보안 분야에서
                            혁신적인 특허 기술로 국내 최고 보안 수준의 기업과 기관,
                            해외 법인에서 기업 가치를 지키는 일에 먼저 고민하고,
                            끝까지 책임을 지겠다는 신념으로 최선을 다하고 있습니다.
                        </p>
                        <Link to='#'>더보기</Link>
                    </div>
                    <div className='year'>
                        <p className='big'><strong data-count="17">17</strong>years</p>
                        <p>A Trusted Partner in CyberSecurity</p>
                    </div>
                </div>
            </div>
        </div>

        {/* 데이타프로텍 맵 */}
        <div className="section_map">
			<div className='inner'>
				<div className='tit'>
                    <img src={mainMapTitleImg} alt="" />
                </div>
                <div className='bg'></div>
                <div className='count'>
                    <ul>
                        <li>
                            <p className='num'><strong data-count="6">6</strong><span>+개국</span></p>
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

        {/* 현장 상황에 유연하게 적용 가능한 키오스크 */}
        <div className="section_kiosk">
			<div className='inner'>
				<div className='tit-area'>
					<h2>
						<span>Adaptable Kiosk for Any Environment</span>
						<strong>현장 상황에 유연하게<br />적용 가능한 키오스크</strong>
					</h2>
				</div>
                <div className='con-banner'>
                    <div className='txtBox'>
                        <h3>다양한 형태의 키오스크는<br />현장 상황에 유연하게 대응합니다</h3>
                        <p>
                            첨단 대기업 및 공공기관 현장에서 외부 저장<span className='br'></span>
                            매체로 인한 보안 유출을 통제하는 시스템으로<span className='br'></span>
                            핵심 솔루션에 맞춰 키오스크를 선택하실 수 있습니다
                        </p>
                        <div className='btn-area'>
                            <Link to='#'>더 보기</Link>
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
                            {/* <div className='swiper-slide'>
                                <img src={mainImgKiosk3} alt="" />
                            </div>
                            <div className='swiper-slide'>
                                <img src={mainImgKiosk4} alt="" />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 뉴스룸 */}
        <div className="section_newsroom">
			<div className='inner'>
				<div className='tit-area'>
					<h2>
						<span>News Room</span>
						<strong>뉴스룸</strong>
					</h2>
                    <Link to='#'>더 보기</Link>
				</div>
                <ul className='ul-list'>
                    <li>
                        <Link to='#' className='news-card'>
                            <div className='thumbnail'>
                                <img src={mainNewsroomSam} alt="" />
                            </div>
                            <div className='card-body'>
                                <p className='subject'>SECON 2026 보안엑스포 부스 방문 고객분들께 감사드립니다.</p>
                                <div className='card-footer'>
                                    <span className='tag'>News</span>
                                    <span className='arrow'></span>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to='#' className='news-card'>
                            <div className='thumbnail'>
                                <img src={mainNewsroomSam} alt="" />
                            </div>
                            <div className='card-body'>
                                <p className='subject'>SECON 2026 보안엑스포 부스 방문 고객분들께 감사드립니다.</p>
                                <div className='card-footer'>
                                    <span className='tag'>News</span>
                                    <span className='arrow'></span>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to='#' className='news-card'>
                            <div className='thumbnail'>
                                <img src={mainNewsroomSam} alt="" />
                            </div>
                            <div className='card-body'>
                                <p className='subject'>SECON 2026 보안엑스포 부스 방문 고객분들께 감사드립니다.</p>
                                <div className='card-footer'>
                                    <span className='tag'>News</span>
                                    <span className='arrow'></span>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to='#' className='news-card'>
                            <div className='thumbnail'>
                                <img src={mainNewsroomSam} alt="" />
                            </div>
                            <div className='card-body'>
                                <p className='subject'>SECON 2026 보안엑스포 부스 방문 고객분들께 감사드립니다.</p>
                                <div className='card-footer'>
                                    <span className='tag'>News</span>
                                    <span className='arrow'></span>
                                </div>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>

        {/* 홍보자료 */}
        <div className="section_prroom">
			<div className='inner'>
				<div className='tit-area'>
					<h2>
						<span>PR Room</span>
						<strong>홍보자료</strong>
					</h2>
                    <Link to='#'>더 보기</Link>
				</div>
                <ul className='ul-list'>
                    <li>
                        <Link to='#' className='subject'>데이타프로텍<br />통합브로슈어</Link>
                    </li>
                    <li>
                        <Link to='#' className='subject'>DPT 엔터프라이즈<br />제품소개서</Link>
                    </li>
                    <li>
                        <Link to='#' className='subject'>VCS<br />제품소개서</Link>
                    </li>
                    <li>
                        <Link to='#' className='subject'>Digital Eraser<br />제품소개서</Link>
                    </li>
                </ul>
            </div>
        </div>

        {/* 고객사 */}
        <div className="section_client">
			<div className='inner'>
				<div className='tit-area'>
					<h2>
						<span>Client List</span>
						<strong>고객사</strong>
					</h2>
				</div>
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
      <Footer />
    </>
  )
}

export default Main
