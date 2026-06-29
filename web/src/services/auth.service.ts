import { api } from '@/src/services/api';

export const authService = {
  async login(credentials: { email: string; password: string }) {
    const response = await api('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    return response;
  },

  async logout() {
    await api('/auth/logout', {
      method: 'POST',
    });
  }
};