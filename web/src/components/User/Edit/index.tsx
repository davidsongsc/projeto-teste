'use client';

import { useState } from 'react';
import { Modal, Button, Spin } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { UserForm } from '../Form'; // Certifique-se de ter este componente
import { userService } from '@/src/services/users.service';
import { useUsers } from '@/src/hooks/useUsers';
import { notification } from '@/src/components/Notification/notification';

interface EditUserProps {
    id: string;
}
interface UserData {
    id: string;
    name: string;
    email: string;
    profileId?: string; // Opcional se for uma transformação
    [key: string]: any; // Permite outras propriedades dinâmicas
}

export const EditUser = ({ id }: EditUserProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const { updateUser } = useUsers();

    const handleOpen = async () => {
        setIsModalVisible(true);
        setLoadingData(true);
        try {
            const data = await userService.getById(id);

            // Achata o objeto para o formato que o formulário espera
            const formattedData = {
                ...data,
                profileId: data.profile?.id // Pega o ID de dentro do perfil e coloca na raiz
            };

            setUserData(formattedData);
        } catch (error) {
            notification.error('Erro', 'Não foi possível carregar os dados.');
        } finally {
            setLoadingData(false);
        }
    };

    const handleSubmit = async (values: any) => {
        try {
            await updateUser(id, values);
            notification.success('Sucesso', 'Usuário atualizado com sucesso!');
            setIsModalVisible(false);
        } catch (error) {
            notification.error('Erro', 'Ocorreu um erro ao tentar atualizar o usuário.');
        }
    };

    return (
        <>
            <Button type="link" icon={<EditOutlined />} onClick={handleOpen}>
                Editar
            </Button>

            <Modal
                title="Editar Usuário"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                destroyOnClose
            >
                {loadingData ? (
                    <div className="flex justify-center p-10"><Spin /></div>
                ) : (
                    <UserForm
                        initialValues={userData}
                        onSubmit={handleSubmit}
                    />
                )}
            </Modal>
        </>
    );
};