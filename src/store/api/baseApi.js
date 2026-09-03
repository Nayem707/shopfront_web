import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Empty RTK Query surface, wired into the store now so future endpoints
// (injectEndpoints per feature) can be added without touching store config.
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || '/api/v1',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Product', 'Category', 'Order', 'User', 'Cart', 'Wishlist'],
  endpoints: () => ({}),
});
