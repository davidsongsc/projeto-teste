'use client';

import { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CustomerForm } from '../Form'; 
import { useCustomers } from '@/src/hooks/useCustomers';

export const CreateCustomer = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { createCustomer, isLoading } = useCustomers();

    const handleSubmit = async (values: any) => {
        try {
            await createCustomer(values);
            message.success('Cliente cadastrado com sucesso!');
            setIsModalVisible(false);
        } catch (error) {
            // O tratamento de erro geralmente fica no hook ou é capturado aqui
            message.error('Erro ao cadastrar cliente.');
        }
    };

    return (
        <>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
            >
                Novo Cliente
            </Button>

            <Modal
                title="Cadastrar Novo Cliente"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                destroyOnClose
            >
                <CustomerForm
                    onSubmit={handleSubmit}
                    loading={isLoading}
                />
            </Modal>
        </>
    );
};