function ThemeToggle({ isDark, onToggle }) {
  return (
    <button className="theme-toggle" type="button" onClick={onToggle} aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'} title={isDark ? 'Modo claro' : 'Modo oscuro'}>
      <span aria-hidden="true">{isDark ? '☼' : '☾'}</span>
      <span className="theme-toggle-label">{isDark ? 'Claro' : 'Oscuro'}</span>
    </button>
  )
}

export default ThemeToggle
