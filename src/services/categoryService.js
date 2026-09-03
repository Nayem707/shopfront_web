import { categories as mockCategories } from '@/data/categories';

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export const categoryService = {
  async list() {
    await delay();
    return mockCategories;
  },
};
