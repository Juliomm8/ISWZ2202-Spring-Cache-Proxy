import { useCallback, useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import SearchFilters from './components/SearchFilters.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import ProductModal from './components/ProductModal.jsx'
import Footer from './components/Footer.jsx'
import { obtenerProductoPorId, obtenerProductos } from './services/productoService.js'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [apiConnected, setApiConnected] = useState(false)
  const [lastFetchDuration, setLastFetchDuration] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState('')
  const [queryHistory, setQueryHistory] = useState([])

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

  const loadProductDetails = useCallback(async (id) => {
    const productInCatalog = products.find((product) => product.id === id)
    setSelectedProduct(productInCatalog ?? { id, nombre: 'Producto', categoria: '—', precio: 0 })
    setDetailLoading(true)
    setDetailError('')

    try {
      const result = await obtenerProductoPorId(id)
      const duration = Math.round(result.duration)
      setSelectedProduct(result.data)
      setQueryHistory((currentHistory) => [
        { id, nombre: result.data.nombre, duration },
        ...currentHistory,
      ].slice(0, 5))
    } catch {
      setDetailError('No se pudo consultar el detalle del producto.')
    } finally {
      setDetailLoading(false)
    }
  }, [products])

  useEffect(() => {
    if (!selectedProduct) {
      return undefined
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedProduct(null)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [selectedProduct])

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
            <ProductGrid products={filteredProducts} loading={loading} onViewDetails={loadProductDetails} />
          </>
        )}
      </main>
      <Footer />
      <ProductModal
        product={selectedProduct}
        loading={detailLoading}
        error={detailError}
        duration={queryHistory[0]?.duration}
        history={queryHistory}
        onClose={() => setSelectedProduct(null)}
        onRefresh={() => loadProductDetails(selectedProduct.id)}
      />
    </div>
  )
}

export default App
