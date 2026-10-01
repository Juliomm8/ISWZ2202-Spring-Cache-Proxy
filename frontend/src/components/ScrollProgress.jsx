import { useEffect, useRef } from 'react'

function ScrollProgress() {
  const progressRef = useRef(null)

  useEffect(() => {
    let frameId = 0
    const updateProgress = () => {
      frameId = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      progressRef.current?.style.setProperty('transform', `scaleX(${Math.min(1, Math.max(0, progress))})`)
    }
    const handleScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (frameId) window.cancelAnimationFrame(frameId)
    }
  }, [])

  return <span ref={progressRef} className="scroll-progress" aria-hidden="true" />
}

export default ScrollProgress
