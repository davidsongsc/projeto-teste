'use client';

import { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UserForm } from '../Form'; 
import { useUsers } from '@/src/hooks/useUsers';

export const CreateUser = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { createUser, isLoading } = useUsers();

    const handleSubmit = async (values: any) => {
        try {
            await createUser(values);
            message.success('Usuário criado com sucesso!');
            setIsModalVisible(false);
        } catch (error) {
            // O tratamento de erro centralizado pelo api.ts já notificará o usuário
        }
    };

    return (
        <>
            <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={() => setIsModalVisible(true)}
            >
                Novo Usuário
            </Button>

            <Modal
                title="Criar Novo Usuário"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null} 
                destroyOnClose 
            >
                <UserForm 
                    onSubmit={handleSubmit} 
                    loading={isLoading} 
                />
            </Modal>
        </>
    );
};