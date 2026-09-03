import { categories } from './categories';

const productImages = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
  'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80',
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&q=80',
  'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&q=80',
  'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80',
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
];

const names = [
  'Field Wool Overcoat', 'Cinder Leather Boots', 'Ridgeline Canvas Tote',
  'Aviator Sun Glasses', 'Meridian Chrono Watch', 'Harbor Knit Sweater',
  'Ashfall Denim Jacket', 'Talus Trail Sneakers', 'Union Card Wallet',
  'Solstice Silk Scarf', 'Cobble Leather Belt', 'Northline Backpack',
  'Ember Suede Loafers', 'Drift Cotton Shirt', 'Quarry Wool Beanie',
  'Lumen Reading Glasses', 'Anchor Steel Watch', 'Cascade Rain Jacket',
  'Pinehurst Chino Pants', 'Basalt Crossbody Bag', 'Voyage Duffel Bag',
  'Marlow Cashmere Scarf', 'Redwood Flannel Shirt', 'Copper Aviators',
];

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr, seed) => arr[seed % arr.length];

export const products = names.map((name, i) => {
  const category = pick(categories, i);
  const price = rand(45, 480);
  const hasDiscount = i % 3 === 0;
  const discountPrice = hasDiscount ? Math.round(price * 0.78) : null;
  const stock = i % 7 === 0 ? 0 : rand(1, 60);

  return {
    id: `prod-${String(i + 1).padStart(3, '0')}`,
    sku: `SKU-${1000 + i}`,
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    categoryId: category.id,
    categoryName: category.name,
    price,
    discountPrice,
    rating: (rand(35, 50) / 10).toFixed(1),
    reviewCount: rand(4, 320),
    stock,
    status: stock === 0 ? 'OUT_OF_STOCK' : 'ACTIVE',
    isNew: i % 5 === 0,
    isFeatured: i % 4 === 0,
    isPopular: i % 3 === 1,
    createdAt: new Date(Date.now() - rand(1, 200) * 86400000).toISOString(),
    description:
      'Cut from a heavyweight cloth and finished with corozo buttons, this piece is built for daily wear and made to be repaired, not replaced. Designed in-house and produced in small batches.',
    images: [
      pick(productImages, i),
      pick(productImages, i + 3),
      pick(productImages, i + 6),
      pick(productImages, i + 9),
    ],
    colors: ['Ink', 'Sand', 'Olive'].slice(0, rand(1, 3)),
    sizes: ['XS', 'S', 'M', 'L', 'XL'].slice(0, rand(3, 5)),
    specs: [
      { label: 'Material', value: 'Wool blend, 62% recycled' },
      { label: 'Fit', value: 'Regular' },
      { label: 'Care', value: 'Dry clean only' },
      { label: 'Origin', value: 'Made in Portugal' },
    ],
  };
});

export const getProductById = (id) => products.find((p) => p.id === id);
export const getRelatedProducts = (product, limit = 4) =>
  products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, limit);
