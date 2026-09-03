import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderService } from '@/services/orderService';

export const fetchOrders = createAsyncThunk('orders/fetchAll', async () => {
  return orderService.list();
});

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    updateOrderStatus(state, action) {
      const { orderId, status } = action.payload;
      const order = state.items.find((o) => o.id === orderId);
      if (order) order.status = status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { updateOrderStatus } = orderSlice.actions;
export const selectOrders = (state) => state.orders.items;
export const selectOrdersStatus = (state) => state.orders.status;

export default orderSlice.reducer;
