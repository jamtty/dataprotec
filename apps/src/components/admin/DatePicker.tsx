import { useState, useRef, useEffect } from 'react'

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']

interface Props {
  value: string         // 'YYYY-MM-DD' 또는 ''
  onChange: (v: string) => void
  minDate?: string      // 선택 가능한 최소 날짜 'YYYY-MM-DD'
  maxDate?: string      // 선택 가능한 최대 날짜 'YYYY-MM-DD'
}

export default function DatePicker({ value, onChange, minDate, maxDate }: Props) {
  const [open, setOpen]   = useState(false)
  const [year, setYear]   = useState(() => value ? +value.slice(0, 4) : new Date().getFullYear())
  const [month, setMonth] = useState(() => value ? +value.slice(5, 7) - 1 : new Date().getMonth())

  const wrapRef = useRef<HTMLDivElement>(null)

  const todayStr = (() => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  })()

  // 외부 클릭 시 달력 닫기
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  // 외부 value 변경(초기화 등) 시 뷰 동기화
  useEffect(() => {
    if (value) {
      setYear(+value.slice(0, 4))
      setMonth(+value.slice(5, 7) - 1)
    } else {
      const d = new Date()
      setYear(d.getFullYear())
      setMonth(d.getMonth())
    }
  }, [value])

  const goPrev = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  const goNext = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  const selectDay = (day: number) => {
    onChange(`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)
    setOpen(false)
  }

  // 달력 셀 배열
  const firstDow = new Date(year, month, 1).getDay()  // 0=일
  const lastDay  = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = []
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= lastDay; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const display = value ?? ''

  return (
    <div className="adm_datepicker" ref={wrapRef}>
      <input
        type="text"
        className="adm_search_date"
        value={display}
        readOnly
        onClick={() => setOpen(o => !o)}
      />
      {open && (
        <div className="adm_calendar">
          <div className="adm_cal_header">
            <button type="button" className="adm_cal_nav" onClick={goPrev}>&#8249;</button>
            <span className="adm_cal_title">{year}년 {month + 1}월</span>
            <button type="button" className="adm_cal_nav" onClick={goNext}>&#8250;</button>
          </div>
          <div className="adm_cal_grid">
            {DAY_LABELS.map((lbl, i) => (
              <span key={lbl} className={`adm_cal_label${i === 0 ? ' is_sun' : ''}`}>{lbl}</span>
            ))}
            {cells.map((day, i) => {
              if (day === null) return <span key={`e-${i}`} />
              const mm  = String(month + 1).padStart(2, '0')
              const dd  = String(day).padStart(2, '0')
              const ds  = `${year}-${mm}-${dd}`
              const dow = i % 7
              const disabled = (!!minDate && ds < minDate) || (!!maxDate && ds > maxDate)
              return (
                <button
                  key={i}
                  type="button"
                  className={[
                    'adm_cal_cell',
                    ds === todayStr ? 'is_today'    : '',
                    ds === value    ? 'is_selected' : '',
                    dow === 0       ? 'is_sun'      : '',
                    dow === 6       ? 'is_sat'      : '',
                    disabled        ? 'is_disabled' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => !disabled && selectDay(day)}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
