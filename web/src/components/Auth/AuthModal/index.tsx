'use client';

import { Modal } from 'antd';
import { LoginForm } from '../LoginForm';
import { useAuthStore } from '@/src/store/useAuthStore';

export const AuthModal = () => {
  const { isLoginModalOpen, setLoginModalOpen } = useAuthStore();

  return (
    <Modal
      title="Sua sessão expirou"
      open={isLoginModalOpen}
      footer={null}
      closable={false}
      centered
      maskStyle={{
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}
    >
      <div className="p-2">
        <p className="mb-2 text-gray-600">
          Por favor, faça o login novamente para continuar sua operação.
        </p>
        <LoginForm onSuccess={() => setLoginModalOpen(false)} />
      </div>
    </Modal>
  );
};