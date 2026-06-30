import { api } from '@/src/services/api';
interface LoginCredentials {
  email: string;
  password: string;
}
interface AuthResponse {
  token: string;
  user: any;
}
export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return await api<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  async logout() {
    await api('/auth/logout', {
      method: 'POST',
    });
  }
};