import { useState } from 'react'
import { categoryIcons, getProductMedia } from '../services/productMedia.js'

function ProductImage({ product, className = '', eager = false }) {
  const [imageError, setImageError] = useState(false)
  const media = getProductMedia(product)

  return (
    <div className={`product-image ${imageError ? 'is-fallback' : ''} ${className}`}>
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
      <span className="image-shine" aria-hidden="true" />
    </div>
  )
}

export default ProductImage
