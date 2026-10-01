function Stats({ productCount, categoryCount, apiConnected, lastDuration }) {
  const stats = [
    { label: 'Productos', value: productCount },
    { label: 'Categorías', value: categoryCount },
    { label: 'Estado API', value: apiConnected ? 'Conectada' : 'Pendiente' },
    { label: 'Última respuesta', value: lastDuration ? `${lastDuration} ms` : '—' },
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
