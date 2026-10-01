import { useCallback, useState } from 'react'

function useDemoTour() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(0)

  const start = useCallback(() => {
    setStep(0)
    setIsOpen(true)
  }, [])

  const next = useCallback(() => setStep((currentStep) => Math.min(currentStep + 1, 4)), [])
  const previous = useCallback(() => setStep((currentStep) => Math.max(currentStep - 1, 0)), [])
  const exit = useCallback(() => setIsOpen(false), [])

  return { isOpen, step, start, next, previous, exit }
}

export default useDemoTour
