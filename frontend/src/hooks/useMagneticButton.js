import { useEffect, useRef } from 'react'

function useMagneticButton(strength = 3) {
  const ref = useRef(null)
  const frameRef = useRef(0)
  const pointRef = useRef({ x: 0, y: 0 })

  const render = () => {
    frameRef.current = 0
    if (!ref.current) return
    const { x, y } = pointRef.current
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  const handlePointerMove = (event) => {
    if (!ref.current || window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = ref.current.getBoundingClientRect()
    pointRef.current = {
      x: Math.max(-strength, Math.min(strength, ((event.clientX - bounds.left) / bounds.width - 0.5) * strength * 2)),
      y: Math.max(-strength, Math.min(strength, ((event.clientY - bounds.top) / bounds.height - 0.5) * strength * 2)),
    }
    if (!frameRef.current) frameRef.current = window.requestAnimationFrame(render)
  }

  const reset = () => {
    pointRef.current = { x: 0, y: 0 }
    if (!frameRef.current) frameRef.current = window.requestAnimationFrame(render)
  }

  useEffect(() => () => {
    if (frameRef.current) window.cancelAnimationFrame(frameRef.current)
  }, [])

  return { ref, handlePointerMove, reset }
}

export default useMagneticButton
