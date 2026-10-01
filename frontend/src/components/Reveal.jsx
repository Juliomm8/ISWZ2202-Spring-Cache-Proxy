import useReveal from '../hooks/useReveal.js'

function Reveal({ children, className = '', delay = 0, ...options }) {
  const { ref, isVisible } = useReveal(options)

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default Reveal
