const productMedia = {
  1: {
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85',
    alt: 'Teclado mecánico sobre un escritorio',
  },
  2: {
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=85',
    alt: 'Monitor de escritorio con pantalla iluminada',
  },
  3: {
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=85',
    alt: 'Mouse inalámbrico sobre una superficie clara',
  },
  4: {
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85',
    alt: 'Laptop abierta sobre una mesa',
  },
  5: {
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
    alt: 'Audífonos sobre una superficie oscura',
  },
}

export const categoryIcons = {
  Perifericos: '⌨',
  Pantallas: '▣',
  Computadores: '▱',
  Audio: '◉',
}

export function getProductMedia(product) {
  return productMedia[product.id] ?? {
    image: '',
    alt: product.nombre,
  }
}
