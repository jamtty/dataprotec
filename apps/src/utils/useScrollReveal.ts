import { useEffect, useRef, type MutableRefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type RevealOptions = {
  threshold?: number
  rootMargin?: string
}

/** 스크롤 시 요소가 나타나고 위로 올릴 때 사라지는 효과 (GSAP ScrollTrigger) */
export function useScrollReveal<T extends HTMLElement>(options?: RevealOptions): MutableRefObject<T | null> {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: options?.rootMargin ? `top ${options.rootMargin}` : 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [options?.rootMargin])

  return ref
}

/** 컨테이너 내부의 [data-reveal] 요소들에 GSAP ScrollTrigger 기반 스크롤 리빌 적용 */
export function useBatchReveal(containerRef: MutableRefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = container.querySelectorAll<HTMLElement>('[data-reveal]')
    if (items.length === 0) return

    // gsap.context 로 모든 트윈/ScrollTrigger 일괄 관리 → 언마운트 시 revert 로 완전 정리
    const ctx = gsap.context(() => {
      items.forEach((el) => {
        const delaySec = el.dataset.delay ? parseInt(el.dataset.delay) / 1000 : 0
        const once = el.dataset.reveal === 'once'

        gsap.fromTo(el,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            delay: delaySec,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              toggleActions: once ? 'play none none none' : 'play none none reverse',
            },
          }
        )
      })
    }, container)

    return () => ctx.revert()
  }, [containerRef])
}
