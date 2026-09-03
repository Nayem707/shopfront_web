import { products } from './products';
import { ORDER_STATUS, PAYMENT_STATUS, PAYMENT_METHOD } from '@/constants';

const statuses = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.CONFIRMED,
  ORDER_STATUS.PROCESSING,
  ORDER_STATUS.SHIPPED,
  ORDER_STATUS.DELIVERED,
  ORDER_STATUS.CANCELLED,
];

const customers = [
  { name: 'Amara Voss', email: 'amara.voss@example.com' },
  { name: 'Diego Marín', email: 'diego.marin@example.com' },
  { name: 'Priya Shah', email: 'priya.shah@example.com' },
  { name: 'Noah Bergström', email: 'noah.b@example.com' },
  { name: 'Yuki Tanaka', email: 'yuki.tanaka@example.com' },
  { name: 'Layla Haddad', email: 'layla.haddad@example.com' },
];

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const orders = Array.from({ length: 18 }).map((_, i) => {
  const items = Array.from({ length: rand(1, 3) }).map(() => {
    const product = products[rand(0, products.length - 1)];
    const quantity = rand(1, 2);
    const unitPrice = product.discountPrice || product.price;
    return {
      productId: product.id,
      name: product.name,
      image: product.images[0],
      price: unitPrice,
      quantity,
    };
  });
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 12;
  const discount = i % 4 === 0 ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;
  const customer = customers[i % customers.length];
  const status = statuses[i % statuses.length];

  return {
    id: `ORD-${String(7000 + i)}`,
    date: new Date(Date.now() - rand(0, 60) * 86400000).toISOString(),
    customer,
    items,
    subtotal,
    shipping,
    discount,
    total,
    status,
    paymentStatus:
      status === ORDER_STATUS.CANCELLED ? PAYMENT_STATUS.REFUNDED : i % 5 === 0 ? PAYMENT_STATUS.PENDING : PAYMENT_STATUS.PAID,
    paymentMethod: i % 2 === 0 ? PAYMENT_METHOD.ONLINE : PAYMENT_METHOD.COD,
    shippingAddress: {
      fullName: customer.name,
      phone: '+1 (555) 010-0198',
      address: '128 Harbor View Lane',
      city: 'Portland',
      postalCode: '97201',
      country: 'United States',
    },
  };
});

export const getOrderById = (id) => orders.find((o) => o.id === id);
