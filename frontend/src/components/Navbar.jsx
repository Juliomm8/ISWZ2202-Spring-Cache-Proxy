import ThemeToggle from './ThemeToggle.jsx'

const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'catalogo', label: 'Catálogo' },
  { id: 'rendimiento', label: 'Rendimiento' },
  { id: 'panel', label: 'Panel' },
]

function Navbar({ isPublicDemo, apiConnected, apiLoading, activeSection, onNavigate, isDark, onToggleTheme, isScrolled }) {
  return (
    <nav className={`navbar ${isScrolled ? 'is-scrolled' : ''}`} aria-label="Navegación principal">
      <div className="brand">
        <button className="brand-button" type="button" onClick={() => onNavigate('inicio')} aria-label="Ir al inicio">
          <span className="brand-mark">P</span>
        </button>
        <span>
          <strong>Product Hub</strong>
          <small>Spring Boot + React</small>
        </span>
      </div>
      <div className="navbar-right">
        <div className="nav-links">
          {navItems.map((item) => (
            <button
              className={`nav-link ${activeSection === item.id ? 'is-active' : ''}`}
              type="button"
              key={item.id}
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className={`api-status ${isPublicDemo ? 'is-demo' : ''} ${apiConnected ? 'is-connected' : ''} ${apiLoading ? 'is-loading' : ''}`}>
          <span className="status-dot" />
          {isPublicDemo ? 'Demo visual' : apiLoading ? 'Consultando API' : apiConnected ? 'Backend conectado' : 'Backend sin conexión'}
        </div>
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      </div>
    </nav>
  )
}

export default Navbar
