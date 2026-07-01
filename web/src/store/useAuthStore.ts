import { create } from 'zustand';

interface AuthState {
  user: any | null;
  token: string | null;
  permissions: string[];
  isLoginModalOpen: boolean;
  isLoadingAuth: boolean;

  login: (data: { token: string; user: any }) => void;
  logout: () => void;
  setLoginModalOpen: (open: boolean) => void;
  hasPermission: (key: string) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('@LogisticOrder:user') || 'null')
      : null,

  token:
    typeof window !== 'undefined'
      ? localStorage.getItem('@LogisticOrder:token')
      : null,

  permissions:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('@LogisticOrder:user') || 'null')
          ?.profile?.permissions || []
      : [],

  isLoginModalOpen: false,
  isLoadingAuth: false,

  login: (data) => {
    localStorage.setItem('@LogisticOrder:token', data.token);
    localStorage.setItem('@LogisticOrder:user', JSON.stringify(data.user));

    set({
      user: data.user,
      token: data.token,
      permissions: data.user?.profile?.permissions || [],
      isLoginModalOpen: false,
    });
  },

  logout: () => {
    localStorage.removeItem('@LogisticOrder:token');
    localStorage.removeItem('@LogisticOrder:user');

    set({
      user: null,
      token: null,
      permissions: [],
    });

    window.location.href = '/';
  },

  setLoginModalOpen: (open) =>
    set({
      isLoginModalOpen: open,
    }),

  hasPermission: (key) =>
    get().permissions.includes(key),
}));