import ProductImage from './ProductImage.jsx'

function ProductTable({ products, onViewDetails }) {
  return (
    <div className="product-table-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>ID</th>
            <th><span className="sr-only">Acción</span></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div className="table-product">
                  <ProductImage product={product} />
                  <strong>{product.nombre}</strong>
                </div>
              </td>
              <td><span className="table-category">{product.categoria}</span></td>
              <td><strong>${product.precio.toFixed(2)}</strong></td>
              <td><span className="product-id">#{product.id}</span></td>
              <td><button className="table-action" type="button" onClick={() => onViewDetails(product.id)}>Ver detalles →</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable
