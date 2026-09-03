import { createSlice } from '@reduxjs/toolkit';

const persisted = typeof window !== 'undefined' ? localStorage.getItem('wishlistItems') : null;
const persist = (items) => localStorage.setItem('wishlistItems', JSON.stringify(items));

const initialState = {
  items: persisted ? JSON.parse(persisted) : [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist(state, action) {
      const product = action.payload;
      const exists = state.items.find((it) => it.productId === product.productId);
      if (exists) {
        state.items = state.items.filter((it) => it.productId !== product.productId);
      } else {
        state.items.push(product);
      }
      persist(state.items);
    },
    removeFromWishlist(state, action) {
      state.items = state.items.filter((it) => it.productId !== action.payload);
      persist(state.items);
    },
    clearWishlist(state) {
      state.items = [];
      persist(state.items);
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items;
export const selectIsWishlisted = (productId) => (state) =>
  state.wishlist.items.some((it) => it.productId === productId);
export const selectWishlistCount = (state) => state.wishlist.items.length;

export default wishlistSlice.reducer;
