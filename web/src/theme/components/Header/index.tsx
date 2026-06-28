'use client';

import { Layout, Button, Menu, Typography, Flex, theme } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

export default function Header() {
    const router = useRouter();
    const { token } = theme.useToken();

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
                    {
                        key: 'orders',
                        label: 'Pedidos',
                        onClick: () => router.push('/orders'),
                    },
                    {
                        key: 'customers',
                        label: 'Clientes',
                        onClick: () => router.push('/customers'),
                    },
                ]}
            />

            <Flex gap={12}>
                <Button
                    type="primary"
                    icon={<LoginOutlined />}
                    onClick={() => router.push('/login')}
                >
                    Entrar
                </Button>
            </Flex>
        </AntHeader>
    );
}