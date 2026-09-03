import { orders as mockOrders } from '@/data/orders';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const orderService = {
  async list() {
    await delay();
    return mockOrders;
  },
  async getById(id) {
    await delay(200);
    const order = mockOrders.find((o) => o.id === id);
    if (!order) throw new Error('Order not found');
    return order;
  },
};
