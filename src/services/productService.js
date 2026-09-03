import { products as mockProducts } from '@/data/products';

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Product service. Every function returns a Promise so slices/components
 * never need to change when this is swapped for real `apiClient` calls.
 */
export const productService = {
  async list(filters = {}) {
    await delay();
    let result = [...mockProducts];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (filters.categoryId) {
      result = result.filter((p) => p.categoryId === filters.categoryId);
    }
    if (filters.minPrice != null) {
      result = result.filter((p) => (p.discountPrice || p.price) >= filters.minPrice);
    }
    if (filters.maxPrice != null) {
      result = result.filter((p) => (p.discountPrice || p.price) <= filters.maxPrice);
    }
    if (filters.sort === 'price-asc') {
      result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (filters.sort === 'price-desc') {
      result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (filters.sort === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filters.sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return { items: result, total: result.length };
  },

  async getById(id) {
    await delay(250);
    const product = mockProducts.find((p) => p.id === id);
    if (!product) throw new Error('Product not found');
    return product;
  },
};
