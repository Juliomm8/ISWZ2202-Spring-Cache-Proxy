const categoryIcons = {
  Perifericos: '⌨',
  Pantallas: '▣',
  Computadores: '▱',
  Audio: '◉',
}

function ProductCard({ product, onViewDetails }) {
  return (
    <article className="product-card">
      <div className="product-icon" aria-hidden="true">
        {categoryIcons[product.categoria] || '◆'}
      </div>
      <div className="product-content">
        <div className="product-heading">
          <span className="category-label">{product.categoria}</span>
          <span className="product-id">#{product.id}</span>
        </div>
        <h3>{product.nombre}</h3>
        <div className="product-footer">
          <strong>${product.precio.toFixed(2)}</strong>
          <button className="button button-secondary" type="button" onClick={() => onViewDetails(product.id)}>
            Ver detalles
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
