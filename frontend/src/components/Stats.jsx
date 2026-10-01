import useAnimatedCounter from '../hooks/useAnimatedCounter.js'

function Stats({ productCount, categoryCount, averagePrice, mostExpensivePrice, apiConnected, lastDuration, isPublicDemo }) {
  const animatedProducts = useAnimatedCounter(productCount)
  const animatedCategories = useAnimatedCounter(categoryCount)
  const animatedAverage = useAnimatedCounter(averagePrice)
  const animatedHighest = useAnimatedCounter(mostExpensivePrice)
  const animatedDuration = useAnimatedCounter(lastDuration ?? 0)
  const stats = [
    { label: 'Productos', value: Math.round(animatedProducts) },
    { label: 'Categorías', value: Math.round(animatedCategories) },
    { label: 'Precio promedio', value: `$${animatedAverage.toFixed(2)}` },
    { label: 'Más caro', value: `$${animatedHighest.toFixed(2)}` },
    { label: 'Estado API', value: isPublicDemo ? 'Demo visual' : apiConnected ? 'Conectada' : 'Pendiente' },
    { label: 'Última respuesta', value: isPublicDemo ? 'Local' : lastDuration ? `${Math.round(animatedDuration)} ms` : '—' },
  ]

  return (
    <section className="stats" aria-label="Estadísticas del catálogo">
      {stats.map((stat) => (
        <article className="stat-card" key={stat.label}>
          <span>{stat.label}</span>
          <strong>{stat.value}</strong>
        </article>
      ))}
    </section>
  )
}

export default Stats
