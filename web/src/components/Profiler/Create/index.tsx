'use client';

import { useState, useEffect } from 'react';
import { Modal, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProfileForm } from '../Form';
import { useProfilers } from '@/src/hooks/useProfilers';
import { CreateProfileDTO } from '@/src/interfaces/profile';
import { notification } from '@/src/components/Notification/notification';

export const CreateProfile = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { createProfile, isLoading } = useProfilers();
    const [isMounted, setIsMounted] = useState(false);

    const handleSubmit = async (values: CreateProfileDTO) => {
        try {
            await createProfile(values);

            setIsModalVisible(false);
        } catch (error) {
            notification.error(error);
        }
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
            >
                Novo Perfil
            </Button>

            <Modal
                title="Criar Novo Perfil"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                destroyOnClose
            >
                <ProfileForm
                    onSubmit={handleSubmit}
                    loading={isLoading}
                />
            </Modal>
        </>
    );
};