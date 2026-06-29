'use client';

import { useState } from 'react';
import { Modal, Button, Spin } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { OrderForm } from '../Form';
import { orderService } from '@/src/services/order.service';
import { useOrders } from '@/src/hooks/useOrders';
import { notification } from '@/src/components/Notification/notification';

interface EditOrderProps {
    id: string;
}

export const EditOrder = ({ id }: EditOrderProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [orderData, setOrderData] = useState(null);
    const { updateOrder, fetchOrders } = useOrders();

    const handleOpen = async () => {
        setIsModalVisible(true);
        setLoadingData(true);
        try {
            const data = await orderService.getById(id);
            setOrderData(data);
        } catch (error) {
            notification.error('Erro', 'Não foi possível carregar os dados do pedido.');
        } finally {
            setLoadingData(false);
        }
    };

    const handleSubmit = async (values: any) => {
        try {
            await updateOrder(id, values);
            notification.success('Sucesso', 'Pedido atualizado com sucesso!');
            setIsModalVisible(false);
            // Opcional: fetchOrders(); // Se necessário para atualizar estado da lista
        } catch (error) {
            notification.error('Erro', 'Ocorreu um erro ao tentar atualizar o pedido.');
        }
    };

    return (
        <>
            <Button type="link" icon={<EditOutlined />} onClick={handleOpen}>
                Editar
            </Button>

            <Modal
                title="Editar Pedido"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                destroyOnClose
            >
                {loadingData ? (
                    <div className="flex justify-center p-10"><Spin /></div>
                ) : (
                    <OrderForm 
                        initialValues={orderData} 
                        onSubmit={handleSubmit} 
                    />
                )}
            </Modal>
        </>
    );
};