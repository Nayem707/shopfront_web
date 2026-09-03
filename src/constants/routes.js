export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAILS: '/products/:id',
  CATEGORIES: '/categories',
  CART: '/cart',
  WISHLIST: '/wishlist',
  CHECKOUT: '/checkout',

  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  ACCOUNT: '/account',
  ACCOUNT_ORDERS: '/account/orders',
  ACCOUNT_ORDER_DETAILS: '/account/orders/:id',
  ACCOUNT_PROFILE: '/account/profile',
  ACCOUNT_ADDRESSES: '/account/addresses',
  ACCOUNT_SETTINGS: '/account/settings',
  ACCOUNT_WISHLIST: '/account/wishlist',

  ADMIN: '/admin',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_PRODUCT_CREATE: '/admin/products/create',
  ADMIN_PRODUCT_DETAILS: '/admin/products/:id',
  ADMIN_PRODUCT_EDIT: '/admin/products/:id/edit',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_ORDER_DETAILS: '/admin/orders/:id',
  ADMIN_USERS: '/admin/users',
  ADMIN_USER_DETAILS: '/admin/users/:id',
  ADMIN_SETTINGS: '/admin/settings',
};

export const buildRoute = (pattern, params = {}) =>
  Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`:${key}`, value),
    pattern
  );
