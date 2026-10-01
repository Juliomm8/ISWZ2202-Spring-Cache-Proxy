import { useEffect, useRef, useState } from 'react'
import ProductImage from './ProductImage.jsx'

function ProductModal({ product, loading, error, duration, history, onClose, onRefresh }) {
  const [isClosing, setIsClosing] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!product) return undefined
    setIsClosing(false)
    setShowImage(false)
    const imageTimer = window.setTimeout(() => setShowImage(true), 120)
    const focusInitialControl = window.requestAnimationFrame(() => closeButtonRef.current?.focus())
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') requestClose()
      if (event.key !== 'Tab') return
      const modal = document.querySelector('.product-modal')
      if (!modal) return
      const focusable = [...modal.querySelectorAll('button:not(:disabled), input, select, [href]')]
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.clearTimeout(imageTimer)
      window.cancelAnimationFrame(focusInitialControl)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [product])

  const requestClose = () => {
    if (isClosing) return
    setIsClosing(true)
    window.setTimeout(onClose, 220)
  }

  if (!product) {
    return null
  }

  return (
    <div className={`modal-backdrop ${isClosing ? 'is-closing' : ''}`} role="presentation" onMouseDown={requestClose}>
      <section
        className={`product-modal ${isClosing ? 'is-closing' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button ref={closeButtonRef} className="modal-close" type="button" aria-label="Cerrar detalles" onClick={requestClose}>
          ×
        </button>
        <div className="modal-accent" aria-hidden="true">◆</div>
        <span className="eyebrow">Detalle del producto</span>
        <h2 id="product-modal-title">{product.nombre}</h2>
        <div className={`modal-image-shell ${showImage ? 'is-visible' : ''}`}>
          <ProductImage product={product} className="modal-product-image" eager />
        </div>
        <div className="detail-list">
          <div>
            <span>Categoría</span>
            <strong>{product.categoria}</strong>
          </div>
          <div>
            <span>Precio</span>
            <strong>${product.precio.toFixed(2)}</strong>
          </div>
          <div>
            <span>ID de producto</span>
            <strong>#{product.id}</strong>
          </div>
        </div>

        <div className="modal-divider" />
        <div className="modal-section-label">Información técnica</div>
        <div className="technical-details">
          <div><span>Endpoint</span><code>GET /api/productos/{product.id}</code></div>
          <div><span>Origen</span><strong>API Spring Boot</strong></div>
        </div>

        <div className="performance-panel">
          <div className="performance-heading">
            <div>
              <span>Rendimiento de consulta</span>
              <strong>{loading ? 'Consultando...' : `${duration ?? '—'} ms`}</strong>
            </div>
            <span className="performance-icon" aria-hidden="true">↗</span>
          </div>
          <p>Las consultas posteriores pueden responder más rápido gracias al caché del backend.</p>
          {error && <p className="modal-error">{error}</p>}
          <button className="button button-primary modal-refresh" type="button" onClick={onRefresh} disabled={loading}>
            {loading ? 'Consultando...' : 'Consultar nuevamente'}
          </button>
        </div>

        <div className="query-history">
          <div className="history-heading">
            <span>Últimas consultas</span>
            <small>{history.length}/5</small>
          </div>
          {history.length === 0 ? (
            <p className="history-empty">Aún no hay consultas registradas.</p>
          ) : (
            history.map((query, index) => (
              <div className="history-row" style={{ '--history-delay': `${index * 65}ms` }} key={`${query.id}-${query.duration}-${index}`}>
                <span>Consulta {index + 1}</span>
                <strong>{query.duration} ms</strong>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default ProductModal
