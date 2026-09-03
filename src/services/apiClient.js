import axios from 'axios';

// Single axios instance for the whole app. Nothing calls a real backend yet -
// this is intentionally prepared so real endpoints can be wired in later
// without touching any component or Redux slice.
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Placeholder hook for future refresh-token / logout flow.
    }
    return Promise.reject(error);
  }
);

export default apiClient;
