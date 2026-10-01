export const DEMO_PRODUCTS = [
  { id: 1, nombre: 'Teclado mecanico', categoria: 'Perifericos', precio: 45.90 },
  { id: 2, nombre: 'Monitor 27"', categoria: 'Pantallas', precio: 189.00 },
  { id: 3, nombre: 'Mouse inalambrico', categoria: 'Perifericos', precio: 19.50 },
  { id: 4, nombre: 'Laptop 14"', categoria: 'Computadores', precio: 780.00 },
  { id: 5, nombre: 'Audifonos USB-C', categoria: 'Audio', precio: 32.75 },
]

export const isPublicDemo = import.meta.env.VITE_PUBLIC_DEMO === 'true'
