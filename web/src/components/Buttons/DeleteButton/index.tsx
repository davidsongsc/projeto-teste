'use client';

import { Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { notification } from '@/src/components/Notification/notification';
interface DeleteButtonProps {
  id: string;
  onConfirm: (id: string) => Promise<void>;
}

export const DeleteButton = ({ id, onConfirm }: DeleteButtonProps) => {
  const [modal, contextHolder] = Modal.useModal();

  const showDeleteConfirm = () => {
    modal.confirm({
      title: 'Você tem certeza que deseja excluir este pedido?',
      content: 'Esta ação não poderá ser desfeita.',
      okText: 'Sim, excluir',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await onConfirm(id);
          
        } catch (error) {
          notification.error('Erro ao excluir o pedido.');
        }
      },
    });
  };

  return (
    <>
      {contextHolder}
      <Button 
        danger 
        type="link" 
        icon={<DeleteOutlined />} 
        onClick={showDeleteConfirm}
      >
        Deletar
      </Button>
    </>
  );
};