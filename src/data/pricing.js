export const pricing = {
  stickers: {
    name: 'Custom Sticker',
    sizes: [
      { id: '2x2', name: 'Small (2x2")', price: 3.00 },
      { id: '4x4', name: 'Medium (4x4")', price: 5.00 },
      { id: '6x6', name: 'Large (6x6")', price: 8.00 }
    ],
    finishes: [
      { id: 'glossy', name: 'Glossy', price: 0 },
      { id: 'matte', name: 'Matte', price: 0 },
      { id: 'transparent', name: 'Transparent', price: 1.00 }
    ]
  },
  artPrints: {
    name: 'Fine Art Print',
    sizes: [
      { id: '5x7', name: '5x7"', price: 15.00 },
      { id: '8x10', name: '8x10"', price: 24.00 },
      { id: '11x14', name: '11x14"', price: 35.00 },
      { id: '16x20', name: '16x20"', price: 50.00 }
    ],
    finishes: [
      { id: 'premium-matte', name: 'Premium Matte', price: 0 },
      { id: 'glossy', name: 'Glossy', price: 0 },
      { id: 'fine-art', name: 'Fine Art (Archival)', price: 10.00 }
    ]
  },
  posters: {
    name: 'Wall Poster',
    sizes: [
      { id: '12x18', name: '12x18"', price: 20.00 },
      { id: '18x24', name: '18x24"', price: 30.00 },
      { id: '24x36', name: '24x36"', price: 45.00 }
    ],
    finishes: [
      { id: 'standard', name: 'Standard Poster Paper', price: 0 },
      { id: 'semi-gloss', name: 'Premium Semi-Gloss', price: 5.00 }
    ]
  }
};

export const getBulkDiscount = (quantity) => {
  if (quantity >= 100) return 0.30; // 30% off
  if (quantity >= 50) return 0.20;  // 20% off
  if (quantity >= 20) return 0.15;  // 15% off
  if (quantity >= 10) return 0.10;  // 10% off
  return 0;
};
