import { ROLES } from '@/constants';

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Frontend-only auth stub. Real implementation will call apiClient.post('/auth/login', ...)
// and persist the returned JWT — no other code in the app needs to change when that happens.
export const authService = {
  async login({ email }) {
    await delay();
    const isAdmin = email?.toLowerCase().includes('admin');
    return {
      user: {
        id: 'usr-current',
        name: isAdmin ? 'Admin User' : 'Jordan Blake',
        email,
        avatar: 'https://i.pravatar.cc/150?img=12',
        role: isAdmin ? ROLES.ADMIN : ROLES.USER,
      },
      token: 'mock-jwt-token',
    };
  },
  async register({ name, email }) {
    await delay();
    return {
      user: { id: 'usr-current', name, email, avatar: null, role: ROLES.USER },
      token: 'mock-jwt-token',
    };
  },
  async requestPasswordReset() {
    await delay();
    return { success: true };
  },
};
