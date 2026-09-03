import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoryService } from '@/services/categoryService';

export const fetchCategories = createAsyncThunk('categories/fetchAll', async () => {
  return categoryService.list();
});

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectCategories = (state) => state.categories.items;
export const selectCategoriesStatus = (state) => state.categories.status;

export default categorySlice.reducer;
