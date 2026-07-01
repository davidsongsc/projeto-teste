'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/src/store/useAuthStore';
import {
    Layout,
    Button,
    Menu,
    Typography,
    Flex,
    theme,
    Avatar,
    Dropdown,
    Divider
} from 'antd';

import {
    LoginOutlined,
    UserOutlined,
    LogoutOutlined,
    SafetyCertificateOutlined,
    QuestionCircleOutlined,
    DollarOutlined,
    ShopOutlined,
    SettingOutlined,
    CoffeeOutlined
} from '@ant-design/icons';

export default function Header() {
    const { Header: AntHeader } = Layout;
    const { Title, Text } = Typography;
    const router = useRouter();
    const { token } = theme.useToken();
    const [mounted, setMounted] = useState(false);
    const { user, logout, setLoginModalOpen } = useAuthStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <AntHeader
            style={{
                display: 'flex',
                alignItems: 'center',
                paddingInline: 32,
                background: token.colorBgContainer,
                borderBottom: `1px solid ${token.colorBorder}`,
                height: 64,
            }}
        >
            <Title
                level={4}
                style={{
                    margin: 0,
                    cursor: 'pointer',
                    color: token.colorText,
                    userSelect: 'none',
                }}
                onClick={() => router.push('/')}
            >
                Logistic Order
            </Title>

            <Menu
                mode="horizontal"
                selectable={false}
                style={{
                    flex: 1,
                    minWidth: 0,
                    marginLeft: 32,
                    background: 'transparent',
                    borderBottom: 'none',
                    color: token.colorText,
                }}
                items={[
                    { key: 'orders', label: 'Pedidos', onClick: () => router.push('/orders') },
                    { key: 'customers', label: 'Clientes', onClick: () => router.push('/customers') },
                ]}
            />

            <Flex align="center" gap={12}>
                {user ? (
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: 'info',
                                    label: (
                                        <div style={{ padding: '4px 0' }}>
                                            <Text strong style={{ display: 'block' }}>{user.name}</Text>
                                            <Text type="secondary" style={{ fontSize: 12 }}>
                                                {user.profile?.name}
                                            </Text>
                                        </div>
                                    ),
                                    disabled: true,
                                },
                                { type: 'divider' },

                                {
                                    key: 'profile',
                                    label: 'Meu Perfil',
                                    icon: <UserOutlined />,
                                },
                                {
                                    key: 'company',
                                    label: 'Minha Empresa',
                                    icon: <ShopOutlined />,
                                },
                                {
                                    key: 'settings',
                                    label: 'Configurações',
                                    icon: <SettingOutlined />,
                                },

                                { type: 'divider' },

                                {
                                    key: 'operator',
                                    label: 'Área do Operador',
                                    icon: <CoffeeOutlined />,
                                },
                                {
                                    key: 'financial',
                                    label: 'Financeiro',
                                    icon: <DollarOutlined />,
                                },
                                {
                                    key: 'admin',
                                    label: 'Administração',
                                    icon: <SafetyCertificateOutlined />,
                                },

                                { type: 'divider' },

                                {
                                    key: 'help',
                                    label: 'Ajuda',
                                    icon: <QuestionCircleOutlined />,
                                },
                                {
                                    key: 'logout',
                                    label: 'Sair',
                                    icon: <LogoutOutlined />,
                                    danger: true,
                                    onClick: logout,
                                },
                            ],
                        }}
                    >
                        <Flex align="center" gap={8} style={{ cursor: 'pointer' }}>
                            <Avatar size="small" icon={<UserOutlined />} />
                            <Divider type="vertical" />
                            <div className="flex flex-col">
                                <Text>{user.name}</Text>
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                    {user.profile?.name || 'Cliente'}
                                </Text>
                            </div>
                        </Flex>
                    </Dropdown>
                ) : (
                    <Button
                        type="primary"
                        icon={<LoginOutlined />}
                        onClick={() => setLoginModalOpen(true)}
                    >
                        Entrar
                    </Button>
                )}
            </Flex>
        </AntHeader>
    );
}