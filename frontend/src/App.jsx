import { useCallback, useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import SearchFilters from './components/SearchFilters.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import ProductModal from './components/ProductModal.jsx'
import Footer from './components/Footer.jsx'
import PanelSection from './components/PanelSection.jsx'
import PerformanceSection from './components/PerformanceSection.jsx'
import Toast from './components/Toast.jsx'
import Reveal from './components/Reveal.jsx'
import CursorGlow from './components/CursorGlow.jsx'
import { obtenerProductoPorId, obtenerProductos } from './services/productoService.js'

function App() {
  const [theme, setTheme] = useState(() => window.localStorage.getItem('product-hub-theme') || 'light')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [apiConnected, setApiConnected] = useState(false)
  const [lastFetchDuration, setLastFetchDuration] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [sortOrder, setSortOrder] = useState('default')
  const [viewMode, setViewMode] = useState('cards')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState('')
  const [queryHistory, setQueryHistory] = useState([])
  const [activeSection, setActiveSection] = useState('inicio')
  const [isScrolled, setIsScrolled] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('product-hub-theme', theme)
  }, [theme])

  useEffect(() => {
    let frameId = 0
    const updateNavbar = () => {
      frameId = 0
      setIsScrolled(window.scrollY > 12)
    }
    const handleScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateNavbar)
    }

    updateNavbar()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frameId) window.cancelAnimationFrame(frameId)
    }
  }, [])

  const showToast = useCallback((message, type = 'success') => {
    setToast({ id: Date.now(), message, type })
  }, [])

  const loadProducts = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const result = await obtenerProductos()
      setProducts(result.data)
      setLastFetchDuration(Math.round(result.duration))
      setApiConnected(true)
      showToast('Catálogo actualizado')
    } catch {
      setApiConnected(false)
      setError('No se pudo conectar con el backend.')
      showToast('No se pudo conectar con el backend', 'error')
    } finally {
      setLoading(false)
    }
  }, [showToast])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const navigateTo = useCallback((sectionId) => {
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const runProductQuery = useCallback(async (id) => {
    const result = await obtenerProductoPorId(id)
    const duration = Math.round(result.duration)
    setQueryHistory((currentHistory) => [
      { id, nombre: result.data.nombre, duration },
      ...currentHistory,
    ].slice(0, 5))
    showToast('Consulta completada')
    return result
  }, [showToast])

  const loadProductDetails = useCallback(async (id) => {
    const productInCatalog = products.find((product) => product.id === id)
    setSelectedProduct(productInCatalog ?? { id, nombre: 'Producto', categoria: '—', precio: 0 })
    setDetailLoading(true)
    setDetailError('')

    try {
      const result = await runProductQuery(id)
      setSelectedProduct(result.data)
    } catch {
      setDetailError('No se pudo consultar el detalle del producto.')
    } finally {
      setDetailLoading(false)
    }
  }, [products, runProductQuery])

  useEffect(() => {
    if (!selectedProduct) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedProduct(null)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = previousOverflow
    }
  }, [selectedProduct])

  useEffect(() => {
    const sections = ['inicio', 'catalogo', 'rendimiento', 'panel']
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]
      if (visibleSection) setActiveSection(visibleSection.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0.15, 0.4, 0.7] })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.categoria))].sort(),
    [products],
  )

  const averagePrice = useMemo(
    () => products.length ? products.reduce((total, product) => total + product.precio, 0) / products.length : 0,
    [products],
  )

  const mostExpensivePrice = useMemo(
    () => products.length ? Math.max(...products.map((product) => product.precio)) : 0,
    [products],
  )

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    const matches = products.filter((product) => {
      const matchesCategory = category === 'Todas' || product.categoria === category
      const matchesSearch = product.nombre.toLowerCase().includes(normalizedSearch)
      return matchesCategory && matchesSearch
    })

    return [...matches].sort((first, second) => {
      if (sortOrder === 'name-asc') return first.nombre.localeCompare(second.nombre)
      if (sortOrder === 'name-desc') return second.nombre.localeCompare(first.nombre)
      if (sortOrder === 'price-asc') return first.precio - second.precio
      if (sortOrder === 'price-desc') return second.precio - first.precio
      return first.id - second.id
    })
  }, [category, products, search, sortOrder])

  const clearFilters = useCallback(() => {
    setSearch('')
    setCategory('Todas')
    setSortOrder('default')
  }, [])

  return (
    <div className="app-shell">
      <CursorGlow />
      <Navbar apiConnected={apiConnected} activeSection={activeSection} onNavigate={navigateTo} isDark={theme === 'dark'} isScrolled={isScrolled} onToggleTheme={() => setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark')} />
      <main className="page-content">
        <section id="inicio" className="page-section hero-section">
          <Reveal className="hero-reveal">
            <Hero
              onExplore={() => navigateTo('catalogo')}
              onPerformance={() => navigateTo('rendimiento')}
              onRefresh={loadProducts}
              loading={loading}
              lastFetchDuration={lastFetchDuration}
            />
          </Reveal>
          <Reveal className="stats-reveal" delay={120}>
            <Stats
              productCount={products.length}
              categoryCount={categories.length}
              averagePrice={averagePrice}
              mostExpensivePrice={mostExpensivePrice}
              apiConnected={apiConnected}
              lastDuration={lastFetchDuration}
            />
          </Reveal>
        </section>
        <section id="catalogo" className="page-section catalog-section">
          <Reveal className="section-reveal">
            <div className="section-heading">
              <div>
                <span className="eyebrow eyebrow-dark">Colección disponible</span>
                <h2>Explora el catálogo</h2>
              </div>
              <span className="section-caption">Datos actualizados desde Spring Boot</span>
            </div>
            {error ? (
              <section className="error-state" role="alert">
                <h2>{error}</h2>
                <p>Verifica que el backend Spring Boot esté ejecutándose en el puerto 8080.</p>
                <button className="button button-primary" type="button" onClick={loadProducts}>Reintentar conexión</button>
              </section>
            ) : (
              <>
                <SearchFilters
                  search={search}
                  category={category}
                  categories={categories}
                  sortOrder={sortOrder}
                  viewMode={viewMode}
                  resultCount={filteredProducts.length}
                  onSearchChange={setSearch}
                  onCategoryChange={setCategory}
                  onSortChange={setSortOrder}
                  onViewChange={setViewMode}
                />
                <ProductGrid products={filteredProducts} loading={loading} viewMode={viewMode} onViewDetails={loadProductDetails} onClearFilters={clearFilters} />
              </>
            )}
          </Reveal>
        </section>
        <section id="rendimiento" className="page-section placeholder-section">
          <Reveal className="section-reveal">
            <PerformanceSection products={products} history={queryHistory} onRunQuery={runProductQuery} />
          </Reveal>
        </section>
        <section id="panel" className="page-section placeholder-section">
          <Reveal className="section-reveal">
            <div className="section-heading panel-section-heading">
              <div>
                <span className="eyebrow eyebrow-dark">Vista general</span>
                <h2>Panel</h2>
              </div>
              <span className="section-caption">Monitorea el catálogo sin modificar la API</span>
            </div>
            <PanelSection products={products} onAnalyze={loadProductDetails} />
          </Reveal>
        </section>
      </main>
      <Reveal className="footer-reveal"><Footer /></Reveal>
      <ProductModal
        product={selectedProduct}
        loading={detailLoading}
        error={detailError}
        duration={queryHistory[0]?.duration}
        history={queryHistory}
        onClose={() => setSelectedProduct(null)}
        onRefresh={() => loadProductDetails(selectedProduct.id)}
      />
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  )
}

export default App
