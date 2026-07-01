'use client';

import { useState } from 'react';
import { Modal, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { OrderCreateForm } from '../FormSimple';
import { useOrders } from '@/src/hooks/useOrders';
import { useItems } from '@/src/hooks/useItems';
import { notification } from '../../Notification/notification';
import { useAuth } from '@/src/hooks/useAuth';

export const CreateOrder = ({ customerId }: { customerId?: string }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { createOrder, isLoading } = useOrders();
    const { items, isLoading: itemsLoading } = useItems();
    
     const { user } = useAuth();

    const handleSubmit = async (values: any) => {
        try {
            const payloadFormatado = {
                ...values,
                customerId: customerId || values.customerId,
                userId: user?.id, 
                items: values.items.map((item: any) => ({
                    itemId: item.itemId,
                    count: Number(item.count),
                    total: Number(item.price) 
                }))
            };

            await createOrder(payloadFormatado);

            setIsModalVisible(false);
        } catch (error) {
            notification.error(error);
        }
    };

    return (
        <>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
            >
                Novo Pedido
            </Button>

            <Modal
                title="Criar Novo Pedido"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                destroyOnClose
                width={800}
                confirmLoading={isLoading || itemsLoading}
            >
                <OrderCreateForm
                    // Se o form precisa do customerId, mude o nome da prop no form ou passe assim:
                    // customerId={customerId} 
                    userId={customerId} // Cuidado com isso, está passando o ID do cliente como se fosse do usuário
                    items={items}
                    onSubmit={handleSubmit}
                    loading={isLoading}
                />
            </Modal>
        </>
    );
};