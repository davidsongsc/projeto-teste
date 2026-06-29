'use client';

import { Result, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/src/store/useAuthStore';

export const UnauthorizedAccess = () => {
  const { setLoginModalOpen } = useAuthStore();

  return (
    <div className="flex justify-center items-center h-[50vh]">
      <Result
        icon={<LockOutlined style={{ color: '#ff0000' }} />}
        title="Acesso Restrito"
        subTitle="Você precisa estar autenticado para visualizar esta área do sistema."
        extra={
          <Button 
            type="primary" 
            size="large" 
            onClick={() => setLoginModalOpen(true)}
          >
            Fazer Login
          </Button>
        }
      />
    </div>
  );
};