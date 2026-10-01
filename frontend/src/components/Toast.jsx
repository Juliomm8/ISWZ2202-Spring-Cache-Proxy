import { useCallback, useEffect, useState } from 'react'

function Toast({ toast, onDismiss }) {
  const [isClosing, setIsClosing] = useState(false)
  const dismiss = useCallback(() => {
    setIsClosing(true)
    window.setTimeout(onDismiss, 220)
  }, [onDismiss])

  useEffect(() => {
    if (!toast) return undefined
    setIsClosing(false)
    const timer = window.setTimeout(dismiss, 3600)
    return () => window.clearTimeout(timer)
  }, [dismiss, toast])

  if (!toast) return null

  return (
    <div className={`toast toast-${toast.type} ${isClosing ? 'is-closing' : ''}`} role={toast.type === 'error' ? 'alert' : 'status'}>
      <span className="toast-icon" aria-hidden="true">{toast.type === 'error' ? '!' : '✓'}</span>
      <span>{toast.message}</span>
      <button type="button" aria-label="Cerrar notificación" onClick={dismiss}>×</button>
      <span className="toast-progress" aria-hidden="true" />
    </div>
  )
}

export default Toast
