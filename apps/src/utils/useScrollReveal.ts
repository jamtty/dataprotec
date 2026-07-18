import { useEffect, useRef, type MutableRefObject } from 'react'

type RevealOptions = {
  threshold?: number
  rootMargin?: string
}

/** 스크롤 시 요소가 나타나고 위로 올릴 때 사라지는 효과 */
export function useScrollReveal<T extends HTMLElement>(options?: RevealOptions): MutableRefObject<T | null> {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        } else {
          el.style.opacity = '0'
          el.style.transform = 'translateY(5rem)'
          el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        }
      },
      { threshold: options?.threshold ?? 0.1, rootMargin: options?.rootMargin ?? '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options?.threshold, options?.rootMargin])

  return ref
}

/** 컨테이너 내부의 [data-reveal] 요소들에 한 번에 스크롤 리빌 적용 */
export function useBatchReveal(containerRef: MutableRefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = container.querySelectorAll<HTMLElement>('[data-reveal]')
    if (items.length === 0) return

    const observers: IntersectionObserver[] = []

    items.forEach((el, i) => {
      const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0
      const once = el.dataset.reveal === 'once'

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'
              el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }, delay)
            if (once) observer.unobserve(el)
          } else if (!once) {
            el.style.opacity = '0'
            el.style.transform = 'translateY(5rem)'
            el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [containerRef])
}
