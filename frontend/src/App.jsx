import { useCallback, useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import SearchFilters from './components/SearchFilters.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import { obtenerProductos } from './services/productoService.js'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [apiConnected, setApiConnected] = useState(false)
  const [lastFetchDuration, setLastFetchDuration] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')

  const loadProducts = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const result = await obtenerProductos()
      setProducts(result.data)
      setLastFetchDuration(Math.round(result.duration))
      setApiConnected(true)
    } catch {
      setApiConnected(false)
      setError('No se pudo conectar con el backend.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.categoria))].sort(),
    [products],
  )

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory = category === 'Todas' || product.categoria === category
      const matchesSearch = product.nombre.toLowerCase().includes(normalizedSearch)
      return matchesCategory && matchesSearch
    })
  }, [category, products, search])

  return (
    <div className="app-shell">
      <Navbar apiConnected={apiConnected} />
      <main className="page-content">
        <Hero onRefresh={loadProducts} loading={loading} lastFetchDuration={lastFetchDuration} />
        <Stats
          productCount={products.length}
          categoryCount={categories.length}
          apiConnected={apiConnected}
          lastDuration={lastFetchDuration}
        />
        {error ? (
          <section className="error-state" role="alert">
            <h2>{error}</h2>
            <p>Verifica que el backend Spring Boot esté ejecutándose en el puerto 8080.</p>
            <button className="button button-primary" type="button" onClick={loadProducts}>
              Reintentar
            </button>
          </section>
        ) : (
          <>
            <SearchFilters
              search={search}
              category={category}
              categories={categories}
              onSearchChange={setSearch}
              onCategoryChange={setCategory}
            />
            <ProductGrid products={filteredProducts} loading={loading} onViewDetails={() => {}} />
          </>
        )}
      </main>
    </div>
  )
}

export default App
