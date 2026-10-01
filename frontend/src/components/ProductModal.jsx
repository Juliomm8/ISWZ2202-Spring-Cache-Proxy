import { useEffect, useState } from 'react'
import ProductImage from './ProductImage.jsx'

function ProductModal({ product, loading, error, duration, history, onClose, onRefresh }) {
  const [isClosing, setIsClosing] = useState(false)
  const [showImage, setShowImage] = useState(false)

  useEffect(() => {
    if (!product) return undefined
    setIsClosing(false)
    setShowImage(false)
    const imageTimer = window.setTimeout(() => setShowImage(true), 120)
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') requestClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      window.clearTimeout(imageTimer)
      window.removeEventListener('keydown', closeOnEscape)
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
        <button className="modal-close" type="button" aria-label="Cerrar detalles" onClick={requestClose}>
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
