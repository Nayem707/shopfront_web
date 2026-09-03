import { createSlice } from '@reduxjs/toolkit';

const persisted = typeof window !== 'undefined' ? localStorage.getItem('cartItems') : null;

const persist = (items) => localStorage.setItem('cartItems', JSON.stringify(items));

const initialState = {
  items: persisted ? JSON.parse(persisted) : [],
  // items: [{ productId, name, image, price, quantity, size, color, stock }]
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { productId, size, color } = action.payload;
      const existing = state.items.find(
        (it) => it.productId === productId && it.size === size && it.color === color
      );
      if (existing) {
        existing.quantity = Math.min(existing.quantity + action.payload.quantity, existing.stock || 99);
      } else {
        state.items.push(action.payload);
      }
      persist(state.items);
    },
    updateQuantity(state, action) {
      const { lineId, quantity } = action.payload;
      const item = state.items.find((it) => `${it.productId}-${it.size}-${it.color}` === lineId);
      if (item) item.quantity = Math.max(1, Math.min(quantity, item.stock || 99));
      persist(state.items);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(
        (it) => `${it.productId}-${it.size}-${it.color}` !== action.payload
      );
      persist(state.items);
    },
    clearCart(state) {
      state.items = [];
      persist(state.items);
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, it) => sum + it.quantity, 0);
export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((sum, it) => sum + it.price * it.quantity, 0);

export default cartSlice.reducer;
