import { useMemo } from 'react'
import ProductImage from './ProductImage.jsx'
import PriceSimulator from './PriceSimulator.jsx'

function PanelSection({ products, onAnalyze }) {
  const inventoryValue = useMemo(
    () => products.reduce((total, product) => total + product.precio, 0),
    [products],
  )
  const categoryCount = useMemo(
    () => new Set(products.map((product) => product.categoria)).size,
    [products],
  )

  return (
    <div className="panel-layout">
      <section className="panel-card panel-overview">
        <div className="panel-card-heading">
          <div>
            <span className="eyebrow eyebrow-dark">Vista moderador</span>
            <h3>Inventario de productos</h3>
          </div>
          <span className="read-only-badge">Solo lectura · GET</span>
        </div>
          <div className="panel-metrics" aria-label="Métricas del inventario">
            <div className="panel-metric"><span>Registros</span><strong>{products.length}</strong><small>productos activos</small></div>
            <div className="panel-metric"><span>Valor inventario</span><strong>${inventoryValue.toFixed(2)}</strong><small>lectura local</small></div>
            <div className="panel-metric panel-metric-chart"><span>Categorías</span><strong>{categoryCount}</strong><div className="panel-sparkline" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div></div>
          </div>
        <div className="panel-table-wrapper">
          <table className="panel-table">
            <thead>
              <tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Estado</th><th>Acción</th></tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td><div className="table-product"><ProductImage product={product} /><strong>{product.nombre}</strong></div></td>
                  <td>{product.categoria}</td>
                  <td><strong>${product.precio.toFixed(2)}</strong></td>
                  <td><span className="inventory-status"><i /> Disponible</span></td>
                  <td><button className="table-action" type="button" onClick={() => onAnalyze(product.id)}>Analizar →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <PriceSimulator products={products} />
    </div>
  )
}

export default PanelSection
