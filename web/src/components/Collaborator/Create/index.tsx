'use client';

import { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CollaboratorForm } from '../Form';
import { useCollaborators } from '@/src/hooks/useCollaborator';
import { userService } from '@/src/services/users.service';
import { profileService } from '@/src/services/profiles.service';
import { User } from '@/src/interfaces/user';
import { Profile } from '@/src/interfaces/profile';
import { CreateCollaboratorDTO } from '@/src/interfaces/collaborator';

export const CreateCollaborator = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [profiles, setProfiles] = useState<Profile[]>([]);

    const { createCollaborator, isLoading } = useCollaborators();

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
        } catch {
            message.error('Erro ao carregar dados necessários.');
        } finally {
            setLoadingData(false);
        }
    };

    const handleSubmit = async (values: CreateCollaboratorDTO) => {
        try {
            await createCollaborator(values);
            message.success('Colaborador criado com sucesso!');
            setIsModalVisible(false);
        } catch {}
    };

    return (
        <>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleOpenModal}
                loading={loadingData}
            >
                Novo Colaborador
            </Button>

            <Modal
                title="Criar Novo Colaborador"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                destroyOnClose
            >
                <CollaboratorForm
                    onSubmit={handleSubmit}
                    loading={isLoading}
                    users={users}
                    profiles={profiles}
                />
            </Modal>
        </>
    );
};