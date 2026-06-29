'use client';

import { Button, Modal, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

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
          message.success('Pedido excluído com sucesso!');
        } catch (error) {
          message.error('Erro ao excluir o pedido.');
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