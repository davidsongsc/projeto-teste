'use client';
import { Modal } from 'antd';
import { OrderCreateForm } from '@/src/components/Order/FormSimple';

export const CreateOrderModal = ({ open, onCancel, userId, onSubmit, loading }: any) => {
    return (
        <Modal
            title="Novo Pedido"
            open={open}
            onCancel={onCancel}
            footer={null}
            destroyOnClose
            width={700}
        >
            <OrderCreateForm 
                userId={userId} 
                onSubmit={onSubmit} 
                loading={loading} 
            />
        </Modal>
    );
};