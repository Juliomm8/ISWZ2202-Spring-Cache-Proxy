const navItems = [
  { id: 'inicio', label: 'Inicio', icon: '⌂' },
  { id: 'catalogo', label: 'Catálogo', icon: '▦' },
  { id: 'rendimiento', label: 'Rendimiento', icon: '↗' },
  { id: 'panel', label: 'Panel', icon: '◫' },
]

function MobileNav({ activeSection, onNavigate }) {
  return (
    <nav className="mobile-bottom-nav" aria-label="Navegación móvil">
      {navItems.map((item) => (
        <button className={activeSection === item.id ? 'is-active' : ''} type="button" key={item.id} onClick={() => onNavigate(item.id)}>
          <span aria-hidden="true">{item.icon}</span>
          <small>{item.label}</small>
        </button>
      ))}
    </nav>
  )
}

export default MobileNav
