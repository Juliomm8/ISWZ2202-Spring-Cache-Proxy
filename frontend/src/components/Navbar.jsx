function Navbar({ apiConnected }) {
  return (
    <nav className="navbar" aria-label="Navegación principal">
      <div className="brand">
        <span className="brand-mark">P</span>
        <span>
          <strong>Product Hub</strong>
          <small>Spring Boot + React</small>
        </span>
      </div>
      <div className={`api-status ${apiConnected ? 'is-connected' : ''}`}>
        <span className="status-dot" />
        {apiConnected ? 'Backend conectado' : 'Backend pendiente'}
      </div>
    </nav>
  )
}

export default Navbar
