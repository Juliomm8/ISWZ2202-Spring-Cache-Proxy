import { useEffect, useMemo, useState } from 'react'

function PriceSimulator({ products }) {
  const [selectedId, setSelectedId] = useState(products[0]?.id ?? '')
  const [simulatedPrice, setSimulatedPrice] = useState('')

  useEffect(() => {
    if (!products.some((product) => product.id === selectedId)) {
      setSelectedId(products[0]?.id ?? '')
    }
  }, [products, selectedId])

  useEffect(() => {
    setSimulatedPrice('')
  }, [selectedId])

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === Number(selectedId)),
    [products, selectedId],
  )
  const currentPrice = selectedProduct?.precio ?? 0
  const numericSimulatedPrice = Number(simulatedPrice)
  const difference = simulatedPrice === '' ? 0 : numericSimulatedPrice - currentPrice
  const percentage = currentPrice && simulatedPrice !== '' ? (difference / currentPrice) * 100 : 0
  const trendClass = difference > 0 ? 'positive' : difference < 0 ? 'negative' : ''
  const trendIcon = difference > 0 ? '↑' : difference < 0 ? '↓' : '→'
  const visualMax = Math.max(currentPrice, simulatedPrice === '' ? currentPrice : numericSimulatedPrice, 1)

  return (
    <section className="simulator-card">
      <div className="panel-card-heading">
        <div>
          <span className="eyebrow eyebrow-dark">Laboratorio local</span>
          <h3>Simulador de precio</h3>
        </div>
        <span className="local-badge">Simulación local</span>
      </div>
      <p className="simulator-description">Explora escenarios de precio sin enviar cambios a la API.</p>
      <div className="simulator-fields">
        <label>
          <span>Seleccionar producto</span>
          <select value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>
            {products.map((product) => <option key={product.id} value={product.id}>{product.nombre}</option>)}
          </select>
        </label>
        <label>
          <span>Nuevo precio simulado</span>
          <div className="price-input"><span>$</span><input type="number" min="0" step="0.01" placeholder={currentPrice.toFixed(2)} value={simulatedPrice} onChange={(event) => setSimulatedPrice(event.target.value)} /></div>
        </label>
      </div>
      <div className="simulation-results">
        <div><span>Actual</span><strong>${currentPrice.toFixed(2)}</strong></div>
        <div><span>Simulado</span><strong>{simulatedPrice === '' ? '—' : `$${numericSimulatedPrice.toFixed(2)}`}</strong></div>
        <div><span>Diferencia</span><strong key={`difference-${simulatedPrice}`} className={trendClass}>{simulatedPrice === '' ? '—' : <>{`${difference >= 0 ? '+' : '-'}$${Math.abs(difference).toFixed(2)}`} <span className="simulation-arrow" aria-hidden="true">{trendIcon}</span></>}</strong></div>
        <div><span>Cambio</span><strong key={`percentage-${simulatedPrice}`} className={trendClass}>{simulatedPrice === '' ? '—' : <>{`${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`} <span className="simulation-arrow" aria-hidden="true">{trendIcon}</span></>}</strong></div>
      </div>
      <div className="simulation-bars" aria-label="Comparación visual de precios">
        <div className="simulation-bar-row"><span>Actual</span><div><i style={{ '--simulation-width': `${(currentPrice / visualMax) * 100}%` }} /></div><strong>${currentPrice.toFixed(2)}</strong></div>
        <div className="simulation-bar-row"><span>Simulado</span><div><i className={trendClass} style={{ '--simulation-width': `${(simulatedPrice === '' ? currentPrice : numericSimulatedPrice) / visualMax * 100}%` }} /></div><strong>{simulatedPrice === '' ? '—' : `$${numericSimulatedPrice.toFixed(2)}`}</strong></div>
      </div>
      <p className="simulator-note">Esta simulación solo afecta la interfaz y no modifica la API.</p>
    </section>
  )
}

export default PriceSimulator
