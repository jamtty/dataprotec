import { useEffect, useState } from 'react'
import { toAbsUrl } from '@/utils/uploadUrl'

interface PopupItem {
  id: number
  device: string
  pos_left: number
  pos_top: number
  width: number
  height: number
  subject: string
  content: string
  content_html: number
  disable_hours: number
}

const API_BASE = import.meta.env.PROD ? '/renewal_react_v1/backend' : '/renewal_react_v1/backend'

// disable_hours 동안 다시 보지 않기 - localStorage 기반
function isDismissed(id: number): boolean {
  const key = `popup_dismissed_${id}`
  const val = localStorage.getItem(key)
  if (!val) return false
  return Date.now() < Number(val)
}

function dismiss(id: number, hours: number) {
  const key = `popup_dismissed_${id}`
  const until = Date.now() + hours * 60 * 60 * 1000
  localStorage.setItem(key, String(until))
}

// 현재 기기 타입 판별
function getDevice(): string {
  return window.innerWidth <= 768 ? 'mobile' : 'pc'
}

// 저장된 상대경로 → 절대경로 변환 + 이미지 뒤 불필요한 br 제거
function resolveUrls(html: string): string {
  if (!html) return html
  let result = html.replace(/src="(\/[^"]+)"/g, (_, p) => `src="${toAbsUrl(p)}"`)
  // img 태그 뒤에 오는 <br>, <br/>, <br /> 제거
  result = result.replace(/(<img[^>]*>)\s*(<br\s*\/?>\s*)+/gi, '$1')
  return result
}

export default function LayerPopup() {
  const [popups, setPopups] = useState<PopupItem[]>([])
  const [closed, setClosed] = useState<Set<number>>(new Set())

  useEffect(() => {
    const device = getDevice()
    fetch(`${API_BASE}/api/popup.php?public=1&device=${device}`)
      .then((r) => r.json())
      .then((data: { success: boolean; items?: PopupItem[] }) => {
        if (data.success && data.items) {
          // 이미 dismiss된 팝업 제외
          setPopups(data.items.filter((p) => !isDismissed(p.id)))
        }
      })
      .catch(() => {})
  }, [])

  const handleClose = (id: number) => {
    setClosed((prev) => new Set([...prev, id]))
  }

  const handleDismiss = (id: number, hours: number) => {
    dismiss(id, hours)
    setClosed((prev) => new Set([...prev, id]))
  }

  const visible = popups.filter((p) => !closed.has(p.id))
  if (visible.length === 0) return null

  return (
    <>
      {visible.map((popup) => (
        <div
          key={popup.id}
          className="layer_popup_overlay"
          onClick={() => handleClose(popup.id)}
        >
          <div
            className="layer_popup_box"
            style={{ width: popup.width, left: popup.pos_left, top: popup.pos_top }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 본문 */}
            <div
              className="layer_popup_content"
              dangerouslySetInnerHTML={{ __html: resolveUrls(popup.content) }}
            />

            {/* 하단 바 */}
            <div className="layer_popup_footer">
              {popup.disable_hours > 0 && (
                <button
                  className="layer_popup_dismiss"
                  onClick={() => handleDismiss(popup.id, popup.disable_hours)}
                >
                  {popup.disable_hours}시간 동안 다시 열람하지 않습니다.
                </button>
              )}
              <button
                className="layer_popup_close"
                onClick={() => handleClose(popup.id)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
