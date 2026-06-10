export const productTypes = [
  {
    id: 'stickers',
    name: 'Custom Stickers',
    basePrice: 2.50,
    sizes: [
      { id: '2x2', name: '2" x 2"', multiplier: 1 },
      { id: '3x3', name: '3" x 3"', multiplier: 1.5 },
      { id: '4x4', name: '4" x 4"', multiplier: 2.2 }
    ],
    finishes: [
      { id: 'matte', name: 'Matte Finish', price: 0 },
      { id: 'glossy', name: 'Glossy Finish', price: 0.25 },
      { id: 'holographic', name: 'Holographic', price: 1.50 }
    ]
  },
  {
    id: 'art-prints',
    name: 'Fine Art Prints',
    basePrice: 15.00,
    sizes: [
      { id: '8x10', name: '8" x 10"', multiplier: 1 },
      { id: '11x14', name: '11" x 14"', multiplier: 1.6 },
      { id: '16x20', name: '16" x 20"', multiplier: 2.5 }
    ],
    finishes: [
      { id: 'enhanced-matte', name: 'Enhanced Matte', price: 0 },
      { id: 'semigloss', name: 'Premium Semigloss', price: 3.00 },
      { id: 'velvet', name: 'Somerset Velvet', price: 8.00 }
    ]
  },
  {
    id: 'posters',
    name: 'Wall Posters',
    basePrice: 25.00,
    sizes: [
      { id: '18x24', name: '18" x 24"', multiplier: 1 },
      { id: '24x36', name: '24" x 36"', multiplier: 1.8 }
    ],
    finishes: [
      { id: 'standard', name: 'Standard Poster Paper', price: 0 },
      { id: 'heavyweight', name: 'Heavyweight Satin', price: 5.00 }
    ]
  }
];
