'use client';

import { useState } from 'react';
import { Modal, Button, Spin } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { ProfileForm } from '../Form';
import { profileService } from '@/src/services/profiles.service';
import { useProfilers } from '@/src/hooks/useProfilers';
import { notification } from '@/src/components/Notification/notification';
import { ProfileDetails } from '../Details';

interface EditProfileProps {
    id: string;
}

export const EditProfile = ({ id }: EditProfileProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [profileData, setProfileData] = useState<any | null>(null);
    const { updateProfiler } = useProfilers();

    const handleOpen = async () => {
        setIsModalVisible(true);
        setLoadingData(true);
        try {
            const data = await profileService.getById(id);
            setProfileData(data);
        } catch (error) {
            notification.error('Erro', 'Não foi possível carregar os dados do perfil.');
        } finally {
            setLoadingData(false);
        }
    };

    const handleSubmit = async (values: any) => {
        try {
            await updateProfiler(id, values);
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
                title="Editar Perfil"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={1000}
                destroyOnClose
            >
                {loadingData ? (
                    <div className="flex justify-center p-10"><Spin /></div>
                ) : (
                    <div className="space-y-4 flex flex-row">

                        <ProfileForm
                            initialValues={profileData}
                            onSubmit={handleSubmit}
                        />
                        <ProfileDetails profileId={id} />
                    </div>
                )}
            </Modal>
        </>
    );
};