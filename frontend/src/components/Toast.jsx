import { useEffect } from 'react'

function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(onDismiss, 3600)
    return () => window.clearTimeout(timer)
  }, [onDismiss, toast])

  if (!toast) return null

  return (
    <div className={`toast toast-${toast.type}`} role={toast.type === 'error' ? 'alert' : 'status'}>
      <span className="toast-icon" aria-hidden="true">{toast.type === 'error' ? '!' : '✓'}</span>
      <span>{toast.message}</span>
      <button type="button" aria-label="Cerrar notificación" onClick={onDismiss}>×</button>
    </div>
  )
}

export default Toast
