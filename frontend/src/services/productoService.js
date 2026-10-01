const API_URL = 'http://localhost:8080/api/productos'

async function solicitarJson(url) {
  const inicio = performance.now()
  const respuesta = await fetch(url)

  if (!respuesta.ok) {
    throw new Error(`La API respondió con ${respuesta.status}`)
  }

  const data = await respuesta.json()
  return {
    data,
    duration: performance.now() - inicio,
  }
}

export function obtenerProductos() {
  return solicitarJson(API_URL)
}

export function obtenerProductoPorId(id) {
  return solicitarJson(`${API_URL}/${id}`)
}
