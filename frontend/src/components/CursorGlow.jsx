import { useEffect, useRef } from 'react'

function CursorGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (!glow || reducedMotion || coarsePointer) return undefined

    let frameId = 0
    let nextPoint = null

    const render = () => {
      frameId = 0
      if (!nextPoint) return
      glow.style.transform = `translate3d(${nextPoint.x}px, ${nextPoint.y}px, 0) translate(-50%, -50%)`
      glow.classList.add('is-visible')
      nextPoint = null
    }

    const handlePointerMove = (event) => {
      nextPoint = { x: event.clientX, y: event.clientY }
      if (!frameId) frameId = window.requestAnimationFrame(render)
    }

    const handlePointerLeave = () => glow.classList.remove('is-visible')

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', handlePointerLeave)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave)
      if (frameId) window.cancelAnimationFrame(frameId)
    }
  }, [])

  return <span ref={glowRef} className="cursor-glow" aria-hidden="true" />
}

export default CursorGlow
