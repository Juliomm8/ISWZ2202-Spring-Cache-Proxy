import { useState } from 'react'
import { categoryIcons, getProductMedia } from '../services/productMedia.js'

function ProductImage({ product, className = '', eager = false }) {
  const [imageError, setImageError] = useState(false)
  const media = getProductMedia(product)

  return (
    <div className={`product-image ${imageError ? 'is-fallback' : ''} ${className}`} data-category={product.categoria}>
      {!imageError && media.image ? (
        <img
          src={media.image}
          alt={media.alt}
          loading={eager ? 'eager' : 'lazy'}
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="fallback-icon" aria-hidden="true">
          {categoryIcons[product.categoria] || '◆'}
        </span>
      )}
      <span className="product-image-badge" aria-hidden="true">{product.categoria}</span>
      <span className="image-shine" aria-hidden="true" />
    </div>
  )
}

export default ProductImage
