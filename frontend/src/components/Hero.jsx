function Hero({ onExplore, onPerformance, onRefresh, loading, lastFetchDuration }) {
  return (
    <section className="hero">
      <div className="hero-ambient" aria-hidden="true">
        <span className="hero-orb hero-orb-one" />
        <span className="hero-orb hero-orb-two" />
        <span className="hero-orb hero-orb-three" />
        <span className="hero-particle hero-particle-one" />
        <span className="hero-particle hero-particle-two" />
        <span className="hero-particle hero-particle-three" />
      </div>
      <div className="hero-copy">
        <span className="eyebrow hero-stagger hero-stagger-one">Spring Cache + Proxy Pattern</span>
        <h1 className="hero-stagger hero-stagger-two">Catálogo inteligente de productos</h1>
        <p className="hero-stagger hero-stagger-three">Una interfaz React conectada a una API Spring Boot con caché y patrón Proxy.</p>
        <div className="hero-badges hero-stagger hero-stagger-four" aria-label="Tecnologías utilizadas">
          {['Spring Boot', 'React', 'Cache', 'Proxy'].map((badge) => <span key={badge}>{badge}</span>)}
        </div>
        <div className="hero-actions hero-stagger hero-stagger-five">
          <button className="button button-primary" type="button" onClick={onExplore}>
            Explorar productos <span aria-hidden="true">→</span>
          </button>
          <button className="button button-ghost" type="button" onClick={onPerformance}>
            Probar rendimiento
          </button>
        </div>
        <div className="hero-request hero-stagger hero-stagger-six">
          <span className="live-pulse" />
          <span>Última consulta al catálogo</span>
          <strong>{lastFetchDuration ? `${lastFetchDuration} ms` : 'Esperando conexión'}</strong>
          <button className="text-button" type="button" onClick={onRefresh} disabled={loading}>
            {loading ? 'Actualizando...' : 'Actualizar'}
          </button>
        </div>
      </div>
      <div className="hero-visual hero-stagger hero-stagger-visual" aria-label="Resumen visual del sistema">
        <div className="hero-glow" />
        <div className="floating-card floating-card-main">
          <div className="floating-card-top"><span className="mini-icon">✦</span><span>API response</span><span className="mini-status">200</span></div>
          <strong>{lastFetchDuration ? `${lastFetchDuration} ms` : '1500 ms'}</strong>
          <div className="mini-bars"><i /><i /><i /><i /><i /></div>
          <small>Consulta monitorizada</small>
        </div>
        <div className="floating-card floating-card-small">
          <span className="cache-icon">◌</span>
          <span><strong>Cache ready</strong><small>Proxy activo</small></span>
        </div>
        <div className="hero-system-panel">
          <div className="system-panel-heading"><span className="system-panel-dot" /> <strong>Request pipeline</strong><span>LIVE</span></div>
          <div className="system-panel-flow">
            <span>API</span><i>→</i><span>GET</span><i>→</i><span>Proxy</span><i>→</i><span>Cache</span>
          </div>
          <div className="system-panel-response"><span>response</span><strong>200 OK</strong><small>{lastFetchDuration ? `${lastFetchDuration} ms` : '1500 ms'} · JSON</small></div>
        </div>
        <div className="hero-grid-pattern" />
      </div>
    </section>
  )
}

export default Hero
