import ViewSwitcher from './ViewSwitcher.jsx'

function SearchFilters({ search, category, categories, sortOrder, viewMode, resultCount, onSearchChange, onCategoryChange, onSortChange, onViewChange }) {
  return (
    <section className="filters" aria-label="Filtros de productos">
      <div className="filter-fields">
        <label className="search-field">
          <span className="sr-only">Buscar producto</span>
          <span aria-hidden="true">⌕</span>
          <input type="search" placeholder="Buscar producto..." value={search} onChange={(event) => onSearchChange(event.target.value)} />
        </label>
        <label className="select-field">
          <span className="sr-only">Filtrar por categoría</span>
          <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
            <option value="Todas">Todas las categorías</option>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <div className="category-chips" aria-label="Categorías rápidas">
          {['Todas', ...categories].map((item) => (
            <button className={category === item ? 'is-active' : ''} type="button" key={item} onClick={() => onCategoryChange(item)}>
              {item === 'Todas' ? 'Todos' : item}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-tools">
        <span className="results-count"><strong>{resultCount}</strong> {resultCount === 1 ? 'producto' : 'productos'} encontrados</span>
        <label className="sort-field">
          <span className="sr-only">Ordenar productos</span>
          <select title="Ordenar resultados" value={sortOrder} onChange={(event) => onSortChange(event.target.value)}>
            <option value="default">Ordenar por</option>
            <option value="name-asc">Nombre A-Z</option>
            <option value="name-desc">Nombre Z-A</option>
            <option value="price-asc">Precio menor a mayor</option>
            <option value="price-desc">Precio mayor a menor</option>
          </select>
        </label>
        <ViewSwitcher viewMode={viewMode} onChange={onViewChange} />
      </div>
    </section>
  )
}

export default SearchFilters
