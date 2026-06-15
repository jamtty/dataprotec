import React, { useState, useEffect, useRef, useCallback } from 'react'
import CompanyLayout from './CompanyLayout'
import hisImg from '../../assets/images/his_img.png'

interface HistoryEvent {
  month: string
  text: string
}

interface YearData {
  year: number
  events: HistoryEvent[]
}

interface Period {
  label: string
  title: string
  desc: string
  years: YearData[]
}

const PERIODS: Period[] = [
  {
    label: '현재~2022',
    title: '현재 ~ 2022',
    desc: '통합보안의 기틀을 마련하고, 새로운 도약을 준비하다.',
    years: [
      { year: 2026, events: [{ month: '04', text: '무인 스마트기기 대여 및 반납기 특허' }] },
      { year: 2024, events: [{ month: '10', text: 'DPT-i ver.2.0 출시' }] },
      { year: 2023, events: [{ month: '03', text: 'DPT-ID 출시(출입증 발급)' }] },
      {
        year: 2022,
        events: [
          { month: '09', text: '디스크 관리 시스템 특허' },
          { month: '07', text: 'DigitalEraser GS 1등급' },
        ],
      },
    ],
  },
  {
    label: '2021~2017',
    title: '2021 ~ 2017',
    desc: '국내외 첨단 기업의 물리보안을 책임지다.',
    years: [
      { year: 2021, events: [{ month: '10', text: 'Passport Application Kiosk Device 특허' }] },
      {
        year: 2020,
        events: [
          { month: '12', text: '디자인특허 2건 출원' },
          { month: '08', text: '키오스크 시스템 특허' },
          { month: '03', text: 'DPT-PRO 개발' },
          { month: '02', text: '우수기술기업 인증(보안솔루션 개발 기술)' },
        ],
      },
      {
        year: 2019,
        events: [
          { month: '12', text: '벤처기업 인증(기술보증기금)' },
          { month: '09', text: '병역특례업체 지정' },
          { month: '04', text: 'VCS(Virus Check System) 개발' },
        ],
      },
      { year: 2018, events: [{ month: '08', text: '키오스크 시스템 특허' }] },
      {
        year: 2017,
        events: [
          { month: '09', text: '군포IT밸리 사무실 개설' },
          { month: '07', text: '본사 사무실 이전' },
        ],
      },
    ],
  },
  {
    label: '2016~2012',
    title: '2016 ~ 2012',
    desc: '핵심 기술 고도화 사업으로 새로운 길을 개척하다.',
    years: [
      { year: 2016, events: [{ month: '03', text: 'DPT Kiosk System 개발' }] },
      { year: 2015, events: [{ month: '08', text: 'Digital Eraser Appliance 개발' }] },
      {
        year: 2014,
        events: [
          { month: '07', text: '기업부설연구소 인정' },
          { month: '03', text: 'DPT ver 3.0 개발' },
        ],
      },
      { year: 2013, events: [{ month: '02', text: '휴대용 컴퓨터 정보변경에 관련된 특허' }] },
      { year: 2012, events: [{ month: '06', text: 'DPT ver2.0 개발' }] },
    ],
  },
  {
    label: '2011~2009',
    title: '2011 ~ 2009',
    desc: '특허 기술로 데이타프로텍 출범하다.',
    years: [
      { year: 2010, events: [{ month: '04', text: 'Digital Eraser 개발' }] },
      {
        year: 2009,
        events: [
          { month: '07', text: 'DPT ver.1.2 개발' },
          { month: '04', text: '데이타프로텍 법인 설립' },
        ],
      },
    ],
  },
]

function CompanyHistory() {
  const [activeTab, setActiveTab] = useState(0)
  const [displayedPeriodIdx, setDisplayedPeriodIdx] = useState(0)
  const [leftFading, setLeftFading] = useState(false)
  const [visibleYears, setVisibleYears] = useState<Set<number>>(new Set())

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const tabNavRef = useRef<HTMLDivElement>(null)
  const tabSentinelRef = useRef<HTMLDivElement>(null)
  const timelineWrapRef = useRef<HTMLDivElement>(null)
  const displayedPeriodIdxRef = useRef(0)

  // 스크롤 시 세로 라인 fill + 연도 컬러 + 활성 탭 / 왼쪽 패널 업데이트
  useEffect(() => {
    const wrap = timelineWrapRef.current
    if (!wrap) return

    const onScroll = () => {
      // ── 세로 라인 fill ──
      const rect = wrap.getBoundingClientRect()
      if (rect.top >= window.innerHeight) {
        wrap.style.setProperty('--fill-h', '0px')
        setVisibleYears(new Set())
      } else {
        const fillPx = Math.max(0, Math.min(rect.height, window.innerHeight * 0.6 - rect.top))
        wrap.style.setProperty('--fill-h', `${fillPx}px`)

        const newVisible = new Set<number>()
        wrap.querySelectorAll<HTMLElement>('.htl-year-group').forEach((group) => {
          const dot = group.querySelector<HTMLElement>('.htl-dot')
          if (!dot) return
          const dotTop = dot.getBoundingClientRect().top - rect.top
          if (fillPx >= dotTop + dot.offsetHeight / 2) {
            newVisible.add(parseInt(group.dataset.year ?? '0', 10))
          }
        })
        setVisibleYears(newVisible)
      }

      // ── 활성 탭 / 왼쪽 패널 ──
      // 뷰포트 40% 지점을 기준으로 어느 섹션이 활성인지 판단 (위/아래 스크롤 모두 정확)
      const trigger = window.innerHeight * 0.4
      let activeIdx = 0
      sectionRefs.current.forEach((el, idx) => {
        if (!el) return
        if (el.getBoundingClientRect().top <= trigger) activeIdx = idx
      })

      setActiveTab(activeIdx)
      if (activeIdx !== displayedPeriodIdxRef.current) {
        displayedPeriodIdxRef.current = activeIdx
        setLeftFading(true)
        setTimeout(() => {
          setDisplayedPeriodIdx(activeIdx)
          setLeftFading(false)
        }, 250)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 탭이 sticky 상태가 되면 라인 표시
  useEffect(() => {
    const sentinel = tabSentinelRef.current
    const nav = tabNavRef.current
    if (!sentinel || !nav) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        nav.classList.toggle('is-sticky', !entry.isIntersecting)
      },
      { threshold: 0 },
    )
    obs.observe(sentinel)
    return () => obs.disconnect()
  }, [])

  // 탭 클릭 시 해당 섹션으로 스크롤
  const scrollToSection = useCallback((index: number) => {
    const el = sectionRefs.current[index]
    if (!el) return
    const tabH = tabNavRef.current ? tabNavRef.current.offsetHeight : 60
    const headerH = 100 // 10rem = 100px
    const top = el.getBoundingClientRect().top + window.scrollY - headerH - tabH - 20
    window.scrollTo({ top, behavior: 'smooth' })
    setActiveTab(index)
  }, [])

  const currentPeriod = PERIODS[displayedPeriodIdx]

  return (
    <CompanyLayout>
      <div className="contetns company2">

        <div className="responsive title_area">
          <h2 data-aos="fade-left">연혁</h2>
          <p data-aos="fade-up" data-aos-delay="200">
            설립 초기부터 지금까지, 고객과 약속한 정보보안 분야의 신뢰는 계속되고 있습니다.
            <span className="br"></span>고객의 신뢰에 보답하는 기업, 데이타프로텍
          </p>
        </div>

        <div className="section1"></div>
        <div ref={tabSentinelRef} style={{ height: 0 }} />

        {/* 탭 내비게이션 */}
        <div className="htl-tab-nav" ref={tabNavRef}>
          <div className="htl-tab-inner">
            {PERIODS.map((p, i) => (
              <React.Fragment key={i}>
                <button
                  className={`htl-tab-btn${activeTab === i ? ' active' : ''}`}
                  onClick={() => scrollToSection(i)}
                >
                  {p.label}
                </button>
                {i < PERIODS.length - 1 && <span className="htl-tab-divider">|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 메인 레이아웃 */}
        <div className="htl-outer">
          <div className="htl-main-wrap">

            {/* 왼쪽 sticky 패널 */}
            <div className="htl-left-panel">
              <div className={`htl-left-inner${leftFading ? ' fading' : ''}`}>
                <h3 className="htl-period-title">{currentPeriod.title}</h3>
                <p className="htl-period-desc">{currentPeriod.desc}</p>
                <div className="htl-left-img">
                  <img src={hisImg} alt="데이타프로텍" />
                </div>
              </div>
            </div>

            {/* 오른쪽 타임라인 */}
            <div className="htl-timeline-wrap" ref={timelineWrapRef}>
              {PERIODS.map((period, pi) => (
                <div
                  key={pi}
                  ref={(el) => { sectionRefs.current[pi] = el }}
                  className="htl-period-section"
                >
                  {period.years.map((yearData) => (
                    <div
                      key={yearData.year}
                      className={`htl-year-group${visibleYears.has(yearData.year) ? ' visible' : ''}`}
                      data-year={yearData.year}
                    >
                      <div className="htl-marker">
                        <div className="htl-dot" />
                      </div>
                      <div className="htl-year-content">
                        <div className="htl-year-num">{yearData.year}</div>
                        <div className="htl-events">
                          {yearData.events.map((ev, ei) => (
                            <div key={ei} className="htl-event-item">
                              <span className="htl-event-month">{ev.month}</span>
                              <span className="htl-event-text">{ev.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </CompanyLayout>
  )
}

export default CompanyHistory
