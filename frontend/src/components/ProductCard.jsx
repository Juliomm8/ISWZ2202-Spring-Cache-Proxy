import { useRef } from 'react'
import ProductImage from './ProductImage.jsx'

function ProductCard({ product, onViewDetails, isDemoTarget = false }) {
  const cardRef = useRef(null)

  const handlePointerMove = (event) => {
    if (!cardRef.current || window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const bounds = cardRef.current.getBoundingClientRect()
    const x = event.clientX - bounds.left
    const y = event.clientY - bounds.top
    const tiltY = Math.max(-4.5, Math.min(4.5, ((x / bounds.width) - 0.5) * 9))
    const tiltX = Math.max(-4.5, Math.min(4.5, ((y / bounds.height) - 0.5) * -9))
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
    cardRef.current.style.setProperty('--tilt-x', `${tiltX}deg`)
    cardRef.current.style.setProperty('--tilt-y', `${tiltY}deg`)
  }

  const resetPointer = () => {
    if (!cardRef.current) return
    cardRef.current.style.setProperty('--tilt-x', '0deg')
    cardRef.current.style.setProperty('--tilt-y', '0deg')
    cardRef.current.style.setProperty('--mouse-x', '50%')
    cardRef.current.style.setProperty('--mouse-y', '50%')
  }

  return (
    <article
      ref={cardRef}
      className="product-card"
      data-category={product.categoria}
      data-demo-product={isDemoTarget ? product.id : undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
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
            Ver detalles <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
