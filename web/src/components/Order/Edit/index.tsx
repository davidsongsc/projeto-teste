'use client';

import { useEffect, useState } from 'react';
import { Modal, Button, Spin } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { OrderForm } from '../Form';
import { orderService } from '@/src/services/order.service';
import { useOrders } from '@/src/hooks/useOrders';
import { Item } from '@/src/interfaces/item';
import { notification } from '@/src/components/Notification/notification';
import { useItems } from '@/src/hooks/useItems';

interface EditOrderProps {
    id: string;
    availableItems?: Item[];
}

export const EditOrder = ({ id }: EditOrderProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [orderData, setOrderData] = useState<any>(null);

    const { updateOrder, } = useOrders();
    const { items: availableItems } = useItems();

    const handleOpen = async () => {
        setIsModalVisible(true);
        setLoadingData(true);
        try {
            const data = await orderService.getById(id);
            setOrderData(data);
        } catch (error) {
            notification.error(error);
            setIsModalVisible(false);
        } finally {
            setLoadingData(false);
        }
    };

    const handleSubmit = async (values: any) => {
        try {
            await updateOrder(id, values);
            setIsModalVisible(false);
        } catch (error) {
            notification.error(error);
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
                width={800}
            >
                {loadingData ? (
                    <div className="flex justify-center p-10"><Spin size="large" /></div>
                ) : orderData ? (
                    <OrderForm
                        initialValues={orderData}
                        availableItems={availableItems}
                        onSubmit={handleSubmit}
                    />
                ) : (
                    <div className="text-center p-10">Dados não encontrados.</div>
                )}
            </Modal>
        </>
    );
};