'use client';

import { useState } from 'react';
import { Modal, Button, Spin, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { CustomerForm } from '../Form';
import { customerService } from '@/src/services/customers.service';
import { userService } from '@/src/services/users.service';
import { profileService } from '@/src/services/profiles.service';
import { useCustomers } from '@/src/hooks/useCustomer';
import { User } from '@/src/interfaces/user';
import { Profile } from '@/src/interfaces/profile';

interface EditCustomerProps {
    id: string;
}

export const EditCustomer = ({ id }: EditCustomerProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [customerData, setCustomerData] = useState(null);
    const [users, setUsers] = useState<User[]>([]);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    
    const { updateCustomer } = useCustomers();

    const handleOpen = async () => {
        setIsModalVisible(true);
        setLoadingData(true);
        try {
            // Buscamos o cliente E os dados auxiliares em paralelo
            const [customer, usersData, profilesData] = await Promise.all([
                customerService.getById(id),
                userService.list({ limit: 100 }),
                profileService.list({ limit: 100 })
            ]);
            
            setCustomerData(customer);
            setUsers(usersData.results);
            setProfiles(profilesData.results);
        } catch (error) {
            message.error('Erro ao carregar dados do cliente.');
            setIsModalVisible(false);
        } finally {
            setLoadingData(false);
        }
    };

    const handleSubmit = async (values: any) => {
        try {
            await updateCustomer(id, values);
            message.success('Cliente atualizado com sucesso!');
            setIsModalVisible(false);
        } catch (error) {
            // O erro já é tratado no seu serviço/hook
        }
    };

    return (
        <>
            <Button type="link" icon={<EditOutlined />} onClick={handleOpen}>
                Editar
            </Button>

            <Modal
                title="Editar Cliente"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                destroyOnClose
            >
                {loadingData ? (
                    <div className="flex justify-center p-10"><Spin size="large" /></div>
                ) : (
                    <CustomerForm 
                        initialValues={customerData} 
                        onSubmit={handleSubmit}
                        users={users}
                        profiles={profiles}
                    />
                )}
            </Modal>
        </>
    );
};