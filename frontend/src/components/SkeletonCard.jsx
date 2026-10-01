function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton-photo" />
      <div className="skeleton skeleton-line short skeleton-category" />
      <div className="skeleton skeleton-line skeleton-title" />
      <div className="skeleton skeleton-line price" />
      <div className="skeleton skeleton-line skeleton-button" />
    </div>
  )
}

export default SkeletonCard
