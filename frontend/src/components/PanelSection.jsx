import ProductImage from './ProductImage.jsx'
import PriceSimulator from './PriceSimulator.jsx'

function PanelSection({ products, onAnalyze }) {
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
