import ProductCard from './ProductCard.jsx'
import ProductTable from './ProductTable.jsx'

function ProductGrid({ products, loading, viewMode, onViewDetails, onClearFilters }) {
  if (loading) {
    return (
      <div className="product-grid" aria-label="Cargando productos">
        {[1, 2, 3, 4, 5].map((item) => (
          <div className="skeleton-card" key={item}>
            <div className="skeleton skeleton-icon" />
            <div className="skeleton skeleton-line short" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line price" />
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <span aria-hidden="true">⌕</span>
        <h3>No encontramos productos</h3>
        <p>Prueba con otra búsqueda o selecciona una categoría diferente.</p>
        <button className="button button-secondary" type="button" onClick={onClearFilters}>Limpiar filtros</button>
      </div>
    )
  }

  if (viewMode === 'table') {
    return <ProductTable products={products} onViewDetails={onViewDetails} />
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onViewDetails={onViewDetails} />
      ))}
    </div>
  )
}

export default ProductGrid
