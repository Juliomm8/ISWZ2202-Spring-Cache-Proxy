function ViewSwitcher({ viewMode, onChange }) {
  return (
    <div className="view-switcher" role="group" aria-label="Cambiar vista del catálogo">
      <button className={viewMode === 'cards' ? 'is-active' : ''} type="button" onClick={() => onChange('cards')}>
        <span aria-hidden="true">▦</span> Tarjetas
      </button>
      <button className={viewMode === 'table' ? 'is-active' : ''} type="button" onClick={() => onChange('table')}>
        <span aria-hidden="true">☷</span> Tabla
      </button>
    </div>
  )
}

export default ViewSwitcher
