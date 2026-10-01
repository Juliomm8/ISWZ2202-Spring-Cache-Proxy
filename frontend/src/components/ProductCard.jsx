import ProductImage from './ProductImage.jsx'

function ProductCard({ product, onViewDetails }) {
  return (
    <article className="product-card">
      <div className="product-content">
        <ProductImage product={product} />
        <div className="product-card-body">
          <div className="product-heading">
            <span className="category-label">{product.categoria}</span>
            <span className="product-id">ID #{product.id}</span>
          </div>
          <h3>{product.nombre}</h3>
        </div>
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
