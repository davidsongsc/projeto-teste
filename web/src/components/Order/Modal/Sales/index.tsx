import { Button, Modal } from 'antd';
import { useState } from 'react';
import { OrderCreateForm } from '../../FormSimple';
import { useOrders } from '@/src/hooks/useOrders';
export const CreateOrderForUser = ({ userId }: { userId: string }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { createOrder, isLoading } = useOrders();

  const handleCreate = async (values: any) => {
    await createOrder(values);
    setIsModalVisible(false);
  };

  return (
    <>
      <Button onClick={() => setIsModalVisible(true)}>Novo Pedido</Button>
      <Modal open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <OrderCreateForm userId={userId} onSubmit={handleCreate} loading={isLoading} />
      </Modal>
    </>
  );
};