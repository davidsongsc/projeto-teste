'use client';

import { useState } from 'react';
import { Modal, Button, Spin, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { CollaboratorForm } from '../Form';
import { collaboratorService } from '@/src/services/collaborator.service';
import { userService } from '@/src/services/users.service';
import { profileService } from '@/src/services/profiles.service';
import { useCollaborators } from '@/src/hooks/useCollaborator';
import { User } from '@/src/interfaces/user';
import { Profile } from '@/src/interfaces/profile';
import { Collaborator } from '@/src/interfaces/collaborator';

interface EditCollaboratorProps {
    id: string;
}

export const EditCollaborator = ({ id }: EditCollaboratorProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [collaboratorData, setCollaboratorData] = useState<Collaborator | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [profiles, setProfiles] = useState<Profile[]>([]);

    const { updateCollaborator } = useCollaborators();

    const handleOpen = async () => {
        setIsModalVisible(true);
        setLoadingData(true);

        try {
            const [collaborator, usersData, profilesData] = await Promise.all([
                collaboratorService.getById(id),
                userService.list({ limit: 100 }),
                profileService.list({ limit: 100 })
            ]);

            setCollaboratorData(collaborator);
            setUsers(usersData.results);
            setProfiles(profilesData.results);
        } catch {
            message.error('Erro ao carregar dados do colaborador.');
            setIsModalVisible(false);
        } finally {
            setLoadingData(false);
        }
    };

    const handleSubmit = async (values: any) => {
        try {
            await updateCollaborator(id, values);
            message.success('Colaborador atualizado com sucesso!');
            setIsModalVisible(false);
        } catch {}
    };

    return (
        <>
            <Button type="link" icon={<EditOutlined />} onClick={handleOpen}>
                Editar
            </Button>

            <Modal
                title="Editar Colaborador"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                destroyOnClose
            >
                {loadingData ? (
                    <div className="flex justify-center p-10">
                        <Spin size="large" />
                    </div>
                ) : (
                    <CollaboratorForm
                        initialValues={collaboratorData}
                        onSubmit={handleSubmit}
                        users={users}
                        profiles={profiles}
                    />
                )}
            </Modal>
        </>
    );
};