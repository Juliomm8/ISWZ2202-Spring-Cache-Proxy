import { Fragment, useEffect, useMemo, useState } from 'react'
import useMagneticButton from '../hooks/useMagneticButton.js'

function speedLabel(duration) {
  if (duration > 500) return { label: 'LENTA', className: 'is-slow' }
  if (duration < 100) return { label: 'RÁPIDA', className: 'is-fast' }
  return { label: 'ESTABLE', className: 'is-steady' }
}

function relativeTime(timestamp) {
  if (!timestamp) return 'ahora'
  const seconds = Math.max(0, Math.round((Date.now() - timestamp) / 1000))
  if (seconds < 5) return 'ahora'
  if (seconds < 60) return `hace ${seconds} s`
  return `hace ${Math.round(seconds / 60)} min`
}

const flowNodes = [
  { label: 'Cliente', detail: 'React / fetch' },
  { label: 'Controller', detail: 'Expone GET' },
  { label: 'Service', detail: 'Coordina acceso' },
  { label: 'Proxy', detail: 'Decide estrategia' },
  { label: 'Cache', detail: 'Respuesta previa' },
  { label: 'Repositorio', detail: 'Fuente de datos' },
]

function PerformanceSection({ isPublicDemo, products, history, onRunQuery }) {
  const [selectedId, setSelectedId] = useState(products[0]?.id ?? '')
  const [running, setRunning] = useState(false)
  const [runState, setRunState] = useState('idle')
  const queryButton = useMagneticButton(2)

  useEffect(() => {
    if (!products.some((product) => product.id === Number(selectedId))) {
      setSelectedId(products[0]?.id ?? '')
    }
  }, [products, selectedId])

  const selectedProduct = products.find((product) => product.id === Number(selectedId))
  const productHistory = useMemo(
    () => history.filter((query) => query.id === Number(selectedId)),
    [history, selectedId],
  )
  const durations = productHistory.map((query) => query.duration)
  const latest = durations[0] ?? null
  const best = durations.length ? Math.min(...durations) : null
  const worst = durations.length ? Math.max(...durations) : null
  const average = durations.length ? Math.round(durations.reduce((total, value) => total + value, 0) / durations.length) : null
  const firstDuration = durations.length > 1 ? durations[durations.length - 1] : null
  const repeatedDuration = durations.length > 1 ? durations[0] : null
  const comparisonDifference = firstDuration != null && repeatedDuration != null ? repeatedDuration - firstDuration : null
  const comparisonPercent = firstDuration ? Math.abs((comparisonDifference / firstDuration) * 100) : null
  const comparisonMax = Math.max(firstDuration ?? 1, repeatedDuration ?? 1)
  const chartItems = history.slice(0, 5)
  const chartMax = Math.max(...chartItems.map((query) => query.duration), 1)

  const executeTest = async () => {
    if (!selectedId || isPublicDemo) return
    setRunning(true)
    setRunState('running')
    try {
      await onRunQuery(Number(selectedId))
      setRunState('success')
    } catch {
      setRunState('error')
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="performance-lab">
      <div className="performance-lab-heading">
        <div>
          <span className="eyebrow eyebrow-dark">Observabilidad del sistema</span>
          <h2>Laboratorio de rendimiento</h2>
          <p>{isPublicDemo ? 'Las mediciones reales de caché requieren ejecutar el backend Spring Boot localmente.' : 'Ejecuta una consulta real y observa el tiempo medido en esta sesión.'}</p>
        </div>
        <span className={`performance-live-badge ${isPublicDemo ? 'is-demo' : ''}`}><i /> {isPublicDemo ? 'Disponible en ejecución local' : 'Sesión local'}</span>
      </div>

      <div className="performance-layout">
        <section className="performance-card performance-tool">
          <div className="performance-section-heading">
            <div>
              <span className="eyebrow eyebrow-dark">Consulta GET</span>
              <h3>Ejecutar consulta</h3>
            </div>
            <span className="tool-symbol" aria-hidden="true">⌁</span>
          </div>
          <label className="performance-select">
            <span>Producto</span>
            <select value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>
              {products.map((product) => <option key={product.id} value={product.id}>{product.nombre}</option>)}
            </select>
          </label>
          <code className="performance-endpoint">GET /api/productos/{selectedId || ':id'}</code>
          <button ref={queryButton.ref} className="button button-primary performance-button" type="button" onClick={executeTest} onPointerMove={queryButton.handlePointerMove} onPointerLeave={queryButton.reset} disabled={isPublicDemo || running || !selectedProduct}>
            {isPublicDemo ? 'Disponible solo en local' : running ? <><span className="button-spinner" aria-hidden="true" /> Consultando...</> : 'Ejecutar consulta'} {!isPublicDemo && <span aria-hidden="true">→</span>}
          </button>
          <div className="performance-last-result">
            <span>Última respuesta</span>
            <strong>{isPublicDemo ? 'Disponible en ejecución local' : running ? 'Consultando...' : latest != null ? `${latest} ms` : '—'}</strong>
          </div>
          <div className="performance-metrics performance-session-metrics">
            <div><span>Mejor</span><strong>{isPublicDemo ? '—' : best != null ? `${best} ms` : '—'}</strong></div>
            <div><span>Peor</span><strong>{isPublicDemo ? '—' : worst != null ? `${worst} ms` : '—'}</strong></div>
            <div><span>Promedio</span><strong>{isPublicDemo ? '—' : average != null ? `${average} ms` : '—'}</strong></div>
            <div><span>Consultas</span><strong>{history.length}</strong></div>
          </div>
        </section>

        <section className="performance-card performance-explainer">
          <div className="performance-section-heading">
            <div>
              <span className="eyebrow eyebrow-dark">Flujo conceptual</span>
              <h3>De React al dato</h3>
            </div>
            <span className={`flow-state-badge ${runState === 'running' ? 'is-running' : ''}`}>{isPublicDemo ? 'Solo local' : runState === 'running' ? 'Recorriendo' : 'Listo'}</span>
          </div>
          <p className="performance-intro">{isPublicDemo ? 'La arquitectura se representa como una guía visual. Ejecuta el backend Spring Boot localmente para observar tiempos reales y comportamiento del caché.' : 'La arquitectura se representa como una guía visual. El tiempo observado se obtiene de la petición real y no determina por sí solo qué capa respondió.'}</p>
          <div className={`architecture-flow architecture-flow-wide ${running ? 'is-running' : ''} ${runState === 'success' ? 'has-result' : ''}`}>
            {flowNodes.map((node, index) => (
              <Fragment key={node.label}>
                <div className="architecture-step" style={{ '--node-delay': `${index * 100}ms` }}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{node.label}</strong>
                  <small>{node.detail}</small>
                </div>
                {index < flowNodes.length - 1 && <span className="flow-arrow" aria-hidden="true"><i>→</i></span>}
              </Fragment>
            ))}
          </div>
          <div className={`architecture-result ${runState === 'error' ? 'is-error' : ''}`}>
            <span>Tiempo observado</span>
            <strong>{isPublicDemo ? 'Disponible en ejecución local' : running ? 'Consultando...' : latest != null ? `${latest} ms` : '—'}</strong>
            <span className="result-arrow">{runState === 'success' ? '✓' : '↗'}</span>
          </div>
        </section>

        <section className="performance-card performance-comparison-card">
          <div className="performance-section-heading">
            <div><span className="eyebrow eyebrow-dark">Comparación de sesión</span><h3>Primera vs. repetida</h3></div>
            <span className="comparison-badge">{productHistory.length}/2+</span>
          </div>
          {isPublicDemo || firstDuration == null || repeatedDuration == null ? (
            <div className="comparison-empty"><span aria-hidden="true">↗</span><p>{isPublicDemo ? 'Disponible en ejecución local para comparar los tiempos observados.' : 'Ejecuta al menos dos consultas del mismo producto para comparar los tiempos observados.'}</p></div>
          ) : (
            <div className="comparison-content">
              <div className="comparison-row"><div><span>Primera consulta</span><strong>{firstDuration} ms</strong></div><div className="comparison-track"><i className="is-first" style={{ '--comparison-width': `${(firstDuration / comparisonMax) * 100}%` }} /></div></div>
              <div className="comparison-row"><div><span>Consulta repetida</span><strong>{repeatedDuration} ms</strong></div><div className="comparison-track"><i className="is-repeated" style={{ '--comparison-width': `${(repeatedDuration / comparisonMax) * 100}%` }} /></div></div>
              <div className="comparison-delta"><span>Diferencia observada</span><strong className={comparisonDifference < 0 ? 'is-positive' : 'is-negative'}>{comparisonDifference > 0 ? '+' : ''}{comparisonDifference} ms</strong><small>{comparisonPercent.toFixed(1)}% {comparisonDifference < 0 ? 'menor' : 'mayor'}</small></div>
            </div>
          )}
        </section>

        <section className="performance-card performance-history-card">
          <div className="performance-section-heading">
            <div><span className="eyebrow eyebrow-dark">Historial local</span><h3>Últimas consultas</h3></div>
            <span className="history-count">{history.length}/5</span>
          </div>
          {chartItems.length === 0 ? (
            <p className="history-empty">{isPublicDemo ? 'Disponible en ejecución local para observar el comportamiento de la respuesta.' : 'Ejecuta una consulta para ver aquí el comportamiento de la respuesta.'}</p>
          ) : (
            <div className="performance-chart history-timeline" aria-label="Historial de tiempos de respuesta">
              {chartItems.map((query, index) => {
                const speed = speedLabel(query.duration)
                return (
                  <div className="chart-row" key={`${query.id}-${query.duration}-${index}`}>
                    <span className="chart-label">{String(index + 1).padStart(2, '0')}</span>
                    <div className="chart-track"><span className={`chart-bar ${speed.className}`} style={{ '--bar-width': `${Math.max(3, (query.duration / chartMax) * 100)}%`, animationDelay: `${index * 90}ms` }} /></div>
                    <strong>{query.duration} ms</strong>
                    <span className={`speed-label ${speed.className}`}>{speed.label}</span>
                    <small>{relativeTime(query.timestamp)}</small>
                  </div>
                )
              })}
            </div>
          )}
          <p className="performance-note">{isPublicDemo ? 'Modo público: no se ejecutan consultas contra localhost ni se muestran tiempos simulados.' : 'Los datos se mantienen solamente en el estado del frontend durante esta sesión.'}</p>
        </section>
      </div>
    </div>
  )
}

export default PerformanceSection
