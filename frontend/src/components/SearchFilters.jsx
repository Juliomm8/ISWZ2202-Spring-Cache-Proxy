function SearchFilters({ search, category, categories, onSearchChange, onCategoryChange }) {
  return (
    <section className="filters" aria-label="Filtros de productos">
      <label className="search-field">
        <span className="sr-only">Buscar producto</span>
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          placeholder="Buscar producto..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>
      <label className="select-field">
        <span className="sr-only">Filtrar por categoría</span>
        <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="Todas">Todas las categorías</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </section>
  )
}

export default SearchFilters
