import { authService } from '@/src/services/auth.service';
import { useAuthStore } from '@/src/store/useAuthStore';
import { notification } from '@/src/components/Notification/notification';

export const useAuth = () => {
  const { login: storeLogin, logout: storeLogout, user, token } = useAuthStore();

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const data = await authService.login(credentials);
      storeLogin(data);
      notification.success('Sucesso', 'Bem-vindo ao sistema!');
      return true;
    } catch (error) {
      notification.error('Erro', 'E-mail ou senha incorretos.');
      return false;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      storeLogout();
      window.location.href = '/login'; 
    }
  };

  return { login, logout, user, isAuthenticated: !!token };
};