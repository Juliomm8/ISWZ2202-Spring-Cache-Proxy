function Hero({ onRefresh, loading, lastFetchDuration }) {
  return (
    <section className="hero">
      <div>
        <span className="eyebrow">Spring Cache + Proxy Pattern</span>
        <h1>Catálogo de Productos</h1>
        <p>Explora los productos disponibles mediante una API desarrollada con Spring Boot.</p>
      </div>
      <div className="hero-actions">
        <span className="request-time">
          Última consulta: <strong>{lastFetchDuration ? `${lastFetchDuration} ms` : '—'}</strong>
        </span>
        <button className="button button-primary" type="button" onClick={onRefresh} disabled={loading}>
          {loading ? 'Actualizando...' : 'Actualizar catálogo'}
        </button>
      </div>
    </section>
  )
}

export default Hero
