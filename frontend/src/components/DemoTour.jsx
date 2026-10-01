import { useEffect, useRef, useState } from 'react'

const stepCopy = [
  {
    eyebrow: 'Paso 1 · origen de los datos',
    title: 'React conectado a Spring Boot',
    text: 'El catálogo obtiene sus productos desde una API desarrollada con Spring Boot.',
  },
  {
    eyebrow: 'Paso 2 · catálogo',
    title: 'Cada producto tiene su propia consulta',
    text: 'Cada producto puede consultarse individualmente mediante GET /api/productos/{id}.',
  },
  {
    eyebrow: 'Paso 3 · primera consulta',
    title: 'Observa el tiempo real de respuesta',
    text: 'La primera consulta puede llegar al repositorio real. Ejecuta la petición para observar su duración.',
  },
  {
    eyebrow: 'Paso 4 · consulta repetida',
    title: 'Compara el comportamiento del caché',
    text: 'Una consulta repetida puede responder mucho más rápido gracias al comportamiento del caché.',
  },
  {
    eyebrow: 'Paso 5 · resumen',
    title: 'La arquitectura en una mirada',
    text: 'La demo conecta la experiencia React con el flujo conceptual de Spring Boot, Proxy, Cache y Repositorio.',
  },
]

const publicStepCopy = [
  {
    eyebrow: 'Paso 1 · presentación',
    title: 'Explora el catálogo sin backend',
    text: 'Esta publicación usa datos locales de presentación para que puedas recorrer la experiencia desde GitHub Pages.',
  },
  {
    eyebrow: 'Paso 2 · catálogo',
    title: 'Cada producto tiene su propia ficha',
    text: 'Explora los productos, sus categorías, precios e imágenes sin depender de una API remota.',
  },
  {
    eyebrow: 'Paso 3 · rendimiento',
    title: 'Las mediciones reales quedan disponibles localmente',
    text: 'Las mediciones reales de caché requieren ejecutar el backend Spring Boot localmente.',
  },
  {
    eyebrow: 'Paso 4 · caché',
    title: 'Compara el comportamiento en ejecución local',
    text: 'El flujo de Spring Boot, Proxy y Cache se puede probar con tiempos reales al ejecutar el proyecto localmente.',
  },
  {
    eyebrow: 'Paso 5 · resumen',
    title: 'La arquitectura en una mirada',
    text: 'La experiencia pública conserva el recorrido visual y deja las pruebas de backend para la ejecución local.',
  },
]

function DemoTour({ isOpen, step, product, firstDuration, secondDuration, loading, error, onNext, onPrevious, onExit, onQuery, onReturnHome, isPublicDemo }) {
  const [spotlight, setSpotlight] = useState(null)
  const cardRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined
    const focusFrame = window.requestAnimationFrame(() => cardRef.current?.querySelector('.demo-primary-action, .demo-exit')?.focus())
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onExit()
        return
      }
      if (event.key !== 'Tab' || !cardRef.current) return
      const focusable = [...cardRef.current.querySelectorAll('button:not(:disabled)')]
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.cancelAnimationFrame(focusFrame)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onExit, step])

  useEffect(() => {
    if (!isOpen) return undefined
    const selector = step === 1 && product ? `[data-demo-product="${product.id}"]` : !isPublicDemo && step >= 2 && step <= 3 ? '.product-modal' : null
    if (!selector) {
      setSpotlight(null)
      return undefined
    }

    let frameId = 0
    const updateSpotlight = () => {
      frameId = 0
      const element = document.querySelector(selector)
      if (!element) return
      const bounds = element.getBoundingClientRect()
      setSpotlight({ top: bounds.top - 10, left: bounds.left - 10, width: bounds.width + 20, height: bounds.height + 20 })
    }
    const scheduleUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateSpotlight)
    }

    scheduleUpdate()
    window.addEventListener('resize', scheduleUpdate)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    return () => {
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('scroll', scheduleUpdate)
      if (frameId) window.cancelAnimationFrame(frameId)
    }
  }, [isOpen, product, step, firstDuration, secondDuration, isPublicDemo])

  if (!isOpen) return null

  const copy = isPublicDemo ? publicStepCopy[step] : stepCopy[step]
  const isFirstQuery = step === 2
  const isSecondQuery = step === 3
  const hasCurrentResult = isPublicDemo ? true : isFirstQuery ? firstDuration != null : isSecondQuery ? secondDuration != null : true
  const canContinue = !loading && !error && hasCurrentResult
  const actionLabel = step < 2 ? 'Continuar' : isPublicDemo && step < 4 ? 'Continuar' : step === 2 && !firstDuration ? 'Consultar primera vez' : step === 3 && !secondDuration ? 'Consultar nuevamente' : step === 4 ? 'Volver al inicio' : 'Continuar'

  return (
    <div className="demo-layer" role="dialog" aria-modal="true" aria-labelledby="demo-title">
      {!spotlight && <div className="demo-backdrop" aria-hidden="true" />}
      {spotlight && <div className="demo-spotlight" style={spotlight} aria-hidden="true" />}
      <section ref={cardRef} className={`demo-card demo-step-${step}`}>
        <div className="demo-card-top">
          <span className="eyebrow">Modo demostración</span>
          <button className="demo-exit" type="button" onClick={onExit}>Salir</button>
        </div>
        <div className="demo-progress" aria-label={`Paso ${step + 1} de 5`}>
          <span>Paso {step + 1} de 5</span>
          <div><i style={{ width: `${((step + 1) / 5) * 100}%` }} /></div>
        </div>
        <span className="demo-eyebrow">{copy.eyebrow}</span>
        <h2 id="demo-title">{copy.title}</h2>
        <p>{copy.text}</p>

        {step === 1 && product && <div className="demo-product-note"><span>Producto destacado</span><strong>{product.nombre}</strong><small>Precio ${product.precio.toFixed(2)}</small></div>}
        {step === 2 && <div className="demo-timing"><span>Primera consulta</span><strong>{isPublicDemo ? 'Disponible en ejecución local' : loading ? 'Consultando...' : firstDuration != null ? `${firstDuration} ms` : '—'}</strong></div>}
        {step === 3 && <div className="demo-timing"><span>{isPublicDemo ? 'Medición de caché' : `Primera · ${firstDuration ?? '—'} ms`}</span><strong>{isPublicDemo ? 'Disponible en ejecución local' : loading ? 'Consultando...' : secondDuration != null ? `Segunda · ${secondDuration} ms` : '—'}</strong></div>}
        {isPublicDemo && step >= 2 && step <= 3 && <div className="demo-public-note">Las mediciones reales de caché requieren ejecutar el backend Spring Boot localmente.</div>}
        {step === 4 && <div className="demo-architecture"><span>Cliente</span><i>↓</i><span>Spring Controller</span><i>↓</i><span>Service</span><i>↓</i><span>Proxy</span><i>↓</i><span>Cache / Repositorio</span></div>}
        {error && <div className="demo-error" role="alert">{error}</div>}

        <div className="demo-actions">
          {step > 0 && <button className="button button-ghost-dark" type="button" onClick={onPrevious} disabled={loading}>Anterior</button>}
          {step === 4 ? (
            <button className="button button-primary demo-primary-action" type="button" onClick={onReturnHome}>Volver al inicio <span aria-hidden="true">→</span></button>
          ) : !isPublicDemo && isFirstQuery && !firstDuration ? (
            <button className="button button-primary demo-primary-action" type="button" onClick={onQuery} disabled={loading}>{actionLabel} <span aria-hidden="true">→</span></button>
          ) : !isPublicDemo && isSecondQuery && !secondDuration ? (
            <button className="button button-primary demo-primary-action" type="button" onClick={onQuery} disabled={loading}>{actionLabel} <span aria-hidden="true">→</span></button>
          ) : (
            <button className="button button-primary demo-primary-action" type="button" onClick={onNext} disabled={!canContinue}>{actionLabel} <span aria-hidden="true">→</span></button>
          )}
        </div>
      </section>
    </div>
  )
}

export default DemoTour
