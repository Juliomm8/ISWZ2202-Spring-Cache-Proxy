import ProductCard from './ProductCard.jsx'
import ProductTable from './ProductTable.jsx'
import SkeletonCard from './SkeletonCard.jsx'

function ProductGrid({ products, loading, viewMode, onViewDetails, onClearFilters, highlightedId }) {
  if (loading) {
    return (
      <div className="product-grid" aria-label="Cargando productos">
        {[1, 2, 3, 4, 5].map((item) => <SkeletonCard key={item} />)}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state-icon" aria-hidden="true"><svg viewBox="0 0 64 64" role="presentation"><circle cx="28" cy="28" r="16" /><path d="m40 40 13 13" /><path d="M20 28h16M28 20v16" /></svg></span>
        <h3>No encontramos productos</h3>
        <p>Prueba con otra búsqueda o selecciona una categoría diferente.</p>
        <button className="button button-secondary" type="button" onClick={onClearFilters}>Limpiar filtros</button>
      </div>
    )
  }

  if (viewMode === 'table') {
    return <div className="catalog-view table-view"><ProductTable products={products} onViewDetails={onViewDetails} /></div>
  }

  return (
    <div className="catalog-view cards-view">
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onViewDetails={onViewDetails} isDemoTarget={product.id === highlightedId} />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid
