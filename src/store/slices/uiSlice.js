import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toasts: [], // { id, type: 'success' | 'error' | 'info', message }
  isMobileNavOpen: false,
  isMobileFilterOpen: false,
};

let toastId = 0;

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showToast: {
      reducer(state, action) {
        state.toasts.push(action.payload);
      },
      prepare(message, type = 'success') {
        toastId += 1;
        return { payload: { id: toastId, message, type } };
      },
    },
    dismissToast(state, action) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    setMobileNavOpen(state, action) {
      state.isMobileNavOpen = action.payload;
    },
    setMobileFilterOpen(state, action) {
      state.isMobileFilterOpen = action.payload;
    },
  },
});

export const { showToast, dismissToast, setMobileNavOpen, setMobileFilterOpen } = uiSlice.actions;

export const selectToasts = (state) => state.ui.toasts;
export const selectIsMobileNavOpen = (state) => state.ui.isMobileNavOpen;
export const selectIsMobileFilterOpen = (state) => state.ui.isMobileFilterOpen;

export default uiSlice.reducer;
