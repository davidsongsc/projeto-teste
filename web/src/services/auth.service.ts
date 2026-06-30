import { api } from '@/src/services/api';
interface LoginCredentials {
  email: string;
  password: string;
}
export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthenticatorResponse> {
    return await api<AuthenticatorResponse>('/auth/login', {
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