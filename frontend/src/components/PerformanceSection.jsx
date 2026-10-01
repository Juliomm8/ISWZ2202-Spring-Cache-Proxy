import { useMemo, useState } from 'react'

function speedLabel(duration) {
  if (duration > 500) return { label: 'Consulta lenta', className: 'is-slow' }
  if (duration < 100) return { label: 'Consulta rápida', className: 'is-fast' }
  return { label: 'Consulta estable', className: 'is-steady' }
}

function PerformanceSection({ products, history, onRunQuery }) {
  const [selectedId, setSelectedId] = useState(products[0]?.id ?? '')
  const [running, setRunning] = useState(false)

  const selectedProduct = products.find((product) => product.id === Number(selectedId))
  const productHistory = useMemo(
    () => history.filter((query) => query.id === Number(selectedId)),
    [history, selectedId],
  )
  const durations = productHistory.map((query) => query.duration)
  const latest = durations[0]
  const best = durations.length ? Math.min(...durations) : null
  const average = durations.length ? Math.round(durations.reduce((total, value) => total + value, 0) / durations.length) : null
  const chartItems = history.slice(0, 5)
  const chartMax = Math.max(...chartItems.map((query) => query.duration), 1)

  const executeTest = async () => {
    if (!selectedId) return
    setRunning(true)
    try {
      await onRunQuery(Number(selectedId))
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="performance-layout">
      <section className="performance-card performance-explainer">
        <div className="performance-section-heading">
          <div>
            <span className="eyebrow eyebrow-dark">Observabilidad del sistema</span>
            <h3>Rendimiento de la consulta</h3>
          </div>
          <span className="performance-live-badge"><i /> Sesión activa</span>
        </div>
        <p className="performance-intro">Observa cómo una primera consulta atraviesa las capas del backend y cómo una repetida puede aprovechar el caché.</p>
        <div className="architecture-flow">
          <div className="architecture-step"><span>01</span><strong>Primera petición</strong><small>GET /productos/:id</small></div>
          <span className="flow-arrow">↓</span>
          <div className="architecture-step accent"><span>02</span><strong>Proxy</strong><small>Intermedia el acceso</small></div>
          <span className="flow-arrow">↓</span>
          <div className="architecture-step"><span>03</span><strong>Repositorio</strong><small>~1500 ms simulados</small></div>
        </div>
        <div className="architecture-result"><span>Consultas repetidas</span><strong>Cache → respuesta rápida</strong><span className="result-arrow">↗</span></div>
      </section>

      <section className="performance-card performance-tool">
        <div className="performance-section-heading">
          <div>
            <span className="eyebrow eyebrow-dark">Laboratorio de consulta</span>
            <h3>Ejecuta una prueba</h3>
          </div>
          <span className="tool-symbol" aria-hidden="true">⌁</span>
        </div>
        <label className="performance-select">
          <span>Seleccionar producto</span>
          <select value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>
            {products.map((product) => <option key={product.id} value={product.id}>{product.nombre}</option>)}
          </select>
        </label>
        <button className="button button-primary performance-button" type="button" onClick={executeTest} disabled={running || !selectedProduct}>
          {running ? 'Ejecutando...' : 'Ejecutar prueba'} <span aria-hidden="true">→</span>
        </button>
        <div className="performance-metrics">
          <div><span>Tiempo actual</span><strong>{latest ? `${latest} ms` : '—'}</strong></div>
          <div><span>Mejor tiempo</span><strong>{best ? `${best} ms` : '—'}</strong></div>
          <div><span>Promedio sesión</span><strong>{average ? `${average} ms` : '—'}</strong></div>
        </div>
      </section>

      <section className="performance-card performance-history-card">
        <div className="performance-section-heading">
          <div><span className="eyebrow eyebrow-dark">Datos de la sesión</span><h3>Historial de consultas</h3></div>
          <span className="history-count">{history.length}/5</span>
        </div>
        {chartItems.length === 0 ? (
          <p className="history-empty">Ejecuta una prueba para ver aquí el comportamiento de la respuesta.</p>
        ) : (
          <div className="performance-chart" aria-label="Gráfico de tiempos de respuesta">
            {chartItems.map((query, index) => {
              const speed = speedLabel(query.duration)
              return (
                <div className="chart-row" key={`${query.id}-${query.duration}-${index}`}>
                  <span className="chart-label">Consulta {index + 1}</span>
                  <div className="chart-track"><span className={`chart-bar ${speed.className}`} style={{ width: `${Math.max(3, (query.duration / chartMax) * 100)}%` }} /></div>
                  <strong>{query.duration} ms</strong>
                  <span className={`speed-label ${speed.className}`}>{speed.label}</span>
                </div>
              )
            })}
          </div>
        )}
        <p className="performance-note">Las consultas repetidas pueden responder más rápido gracias al caché implementado en el backend.</p>
      </section>
    </div>
  )
}

export default PerformanceSection
