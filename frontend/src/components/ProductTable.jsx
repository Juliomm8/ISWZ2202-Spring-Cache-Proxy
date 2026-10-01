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
            <td data-label="Producto">
                <div className="table-product">
                  <ProductImage product={product} />
                  <strong>{product.nombre}</strong>
                </div>
              </td>
            <td data-label="Categoría"><span className="table-category">{product.categoria}</span></td>
            <td data-label="Precio"><strong>${product.precio.toFixed(2)}</strong></td>
            <td data-label="ID"><span className="product-id">#{product.id}</span></td>
            <td data-label=""><button className="table-action" type="button" onClick={() => onViewDetails(product.id)}>Ver detalles →</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable
