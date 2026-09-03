import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '@/services/productService';

export const fetchProducts = createAsyncThunk('products/fetchAll', async (filters) => {
  return productService.list(filters);
});

const initialState = {
  items: [],
  total: 0,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  filters: {
    search: '',
    categoryId: null,
    minPrice: null,
    maxPrice: null,
    sort: 'newest',
    page: 1,
    pageSize: 12,
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setFilters, resetFilters } = productSlice.actions;

export const selectProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductFilters = (state) => state.products.filters;
export const selectProductsTotal = (state) => state.products.total;

export default productSlice.reducer;
