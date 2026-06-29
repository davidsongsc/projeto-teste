'use client';

import { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { OrderForm } from '../Form';
import { useOrders } from '@/src/hooks/useOrders';

export const CreateOrder = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { createOrder, isLoading } = useOrders();

    const handleSubmit = async (values: any) => {
        try {
            await createOrder(values);
            message.success('Pedido criado com sucesso!');
            setIsModalVisible(false); // Fecha o modal após sucesso
        } catch (error) {
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
                 
            >
                <OrderForm
                    onSubmit={handleSubmit}
                    loading={isLoading}
                />
            </Modal>
        </>
    );
};