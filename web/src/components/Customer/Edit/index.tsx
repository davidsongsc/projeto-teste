'use client';

import { useState } from 'react';
import { Modal, Button, Spin } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { CustomerForm } from '../Form'; // Ajuste o caminho
import { customerService } from '@/src/services/customers.serivce';
import { useCustomers } from '@/src/hooks/useCustomers'; // Ajuste conforme seu hook
import { notification } from '@/src/components/Notification/notification';
import { CustomerDetails } from '@/src/interfaces/customer';

interface EditCustomerProps {
    id: string;
}

export const EditCustomer = ({ id }: EditCustomerProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerDetails>();
    const { updateCustomer } = useCustomers();

    const handleOpen = async () => {
        setIsModalVisible(true);
        setLoadingData(true);
        try {
            // Buscando os dados atuais do cliente para preencher o formulário
            const data = await customerService.getById(id); 
            setCustomerData(data);
        } catch (error) {
            notification.error('Não foi possível carregar os dados do cliente.');
        } finally {
            setLoadingData(false);
        }
    };

    const handleSubmit = async (values: any) => {
        try {
            await updateCustomer(id, values);
            notification.success('Cliente atualizado com sucesso!');
            setIsModalVisible(false);
        } catch (error) {
            notification.error('Ocorreu um erro ao tentar atualizar o cliente.');
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
                    <div className="flex justify-center p-10"><Spin /></div>
                ) : (
                    <CustomerForm 
                        initialValues={customerData} 
                        onSubmit={handleSubmit} 
                    />
                )}
            </Modal>
        </>
    );
};