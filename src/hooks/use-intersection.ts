import { useEffect, useRef, useState } from 'react'

export function useIntersection<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
) {
  const ref = useRef<T>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true)
        observer.unobserve(element)
      }
    }, options)

    observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
      observer.disconnect()
    }
  }, [options.threshold, options.rootMargin, options.root])

  return { ref, isIntersecting }
}
