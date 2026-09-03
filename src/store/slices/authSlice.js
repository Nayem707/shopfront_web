import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/services/authService';

const persistedToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
const persistedUser = typeof window !== 'undefined' ? localStorage.getItem('authUser') : null;

export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
  const data = await authService.login(credentials);
  return data;
});

export const registerUser = createAsyncThunk('auth/register', async (payload) => {
  const data = await authService.register(payload);
  return data;
});

const initialState = {
  user: persistedUser ? JSON.parse(persistedUser) : null,
  token: persistedToken || null,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      localStorage.removeItem('accessToken');
      localStorage.removeItem('authUser');
    },
    updateProfile(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('authUser', JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('accessToken', action.payload.token);
        localStorage.setItem('authUser', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('accessToken', action.payload.token);
        localStorage.setItem('authUser', JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout, updateProfile } = authSlice.actions;

export const selectAuthUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
