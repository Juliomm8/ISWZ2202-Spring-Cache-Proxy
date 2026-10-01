import { useEffect, useRef, useState } from 'react'

function useReveal(options = {}) {
  const { threshold = 0.14, rootMargin = '0px 0px -8% 0px', once = true } = options
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        if (once) observer.unobserve(entry.target)
      } else if (!once) {
        setIsVisible(false)
      }
    }, { threshold, rootMargin })

    observer.observe(element)
    return () => observer.disconnect()
  }, [once, rootMargin, threshold])

  return { ref, isVisible }
}

export default useReveal
