import { useEffect, useRef, useState } from 'react'

function useAnimatedCounter(target, duration = 850) {
  const [value, setValue] = useState(0)
  const previousValue = useRef(0)

  useEffect(() => {
    const nextValue = Number.isFinite(target) ? target : 0
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      previousValue.current = nextValue
      setValue(nextValue)
      return undefined
    }

    const startValue = previousValue.current
    const startedAt = performance.now()
    let frameId = 0

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - ((1 - progress) ** 3)
      const currentValue = startValue + ((nextValue - startValue) * eased)
      setValue(currentValue)

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick)
      } else {
        previousValue.current = nextValue
      }
    }

    frameId = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frameId)
  }, [duration, target])

  return value
}

export default useAnimatedCounter
