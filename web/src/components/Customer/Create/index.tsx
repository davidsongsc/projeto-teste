'use client';

import { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CustomerForm } from '../Form';
import { useCustomers } from '@/src/hooks/useCustomer';
import { userService } from '@/src/services/users.service';
import { profileService } from '@/src/services/profiles.service';
import { User } from '@/src/interfaces/user';
import { Profile } from '@/src/interfaces/profile';

export const CreateCustomer = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [profiles, setProfiles] = useState<Profile[]>([]); 

    const { createCustomer, isLoading } = useCustomers();

    const handleOpenModal = async () => {
        setLoadingData(true);
        try {
            const [usersData, profilesData] = await Promise.all([
                userService.list({ limit: 100 }), 
                profileService.list({ limit: 100 })
            ]);

            setUsers(usersData.results);
            setProfiles(profilesData.results);
            setIsModalVisible(true);
        } catch (error) {
            message.error('Erro ao carregar dados necessários.');
        } finally {
            setLoadingData(false);
        }
    };

    const handleSubmit = async (values: any) => {
        try {
            await createCustomer(values);
            message.success('Cliente criado com sucesso!');
            setIsModalVisible(false);
        } catch (error) {
            // O tratamento de erro já é feito pelo seu serviço/hook
        }
    };

    return (
        <>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleOpenModal}
                loading={loadingData}
            >
                Novo Cliente
            </Button>

            <Modal
                title="Criar Novo Cliente"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                destroyOnClose
            >
                <CustomerForm
                    onSubmit={handleSubmit}
                    loading={isLoading}
                    users={users}
                    profiles={profiles}
                />
            </Modal>
        </>
    );
};