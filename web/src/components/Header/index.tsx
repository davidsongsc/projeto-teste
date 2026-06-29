'use client';

import { Layout, Button, Menu, Typography, Flex, theme, Avatar, Dropdown } from 'antd';
import { LoginOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/src/store/useAuthStore';

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

export default function Header() {
    const router = useRouter();
    const { token } = theme.useToken();
    
    // Acessa o estado de autenticação
    const { user, logout, setLoginModalOpen } = useAuthStore();

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
                    // Estado Logado: Exibe Dropdown com dados do usuário
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: 'info',
                                    label: (
                                        <div style={{ padding: '4px 0' }}>
                                            <Text strong style={{ display: 'block' }}>{user.name}</Text>
                                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                                {user.profile?.name || 'Cliente'}
                                            </Text>
                                        </div>
                                    ),
                                    disabled: true,
                                },
                                { type: 'divider' },
                                {
                                    key: 'logout',
                                    label: 'Sair',
                                    icon: <LogoutOutlined />,
                                    onClick: logout,
                                    danger: true,
                                },
                            ],
                        }}
                    >
                        <Flex align="center" gap={8} style={{ cursor: 'pointer' }}>
                            <Avatar size="small" icon={<UserOutlined />} />
                            <Text>{user.name}</Text>
                        </Flex>
                    </Dropdown>
                ) : (
                    // Estado Deslogado: Exibe botão de login
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