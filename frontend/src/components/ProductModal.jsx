import ProductImage from './ProductImage.jsx'

function ProductModal({ product, loading, error, duration, history, onClose, onRefresh }) {
  if (!product) {
    return null
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" autoFocus type="button" aria-label="Cerrar detalles" onClick={onClose}>
          ×
        </button>
        <div className="modal-accent" aria-hidden="true">◆</div>
        <span className="eyebrow">Detalle del producto</span>
        <h2 id="product-modal-title">{product.nombre}</h2>
        <ProductImage product={product} className="modal-product-image" eager />
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
              <div className="history-row" key={`${query.id}-${query.duration}-${index}`}>
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
