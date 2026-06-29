'use client';

import {
    Layout,
    Typography,
    Row,
    Col,
    Card,
    Breadcrumb,
    theme,
} from 'antd';

import {
    ShoppingCartOutlined,
    TeamOutlined,
    UserOutlined,
    AppstoreOutlined,
    SettingOutlined,
    RightOutlined,
} from '@ant-design/icons';

import { useRouter } from 'next/navigation';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function DashboardPage() {
    const router = useRouter();
    const { token } = theme.useToken();

    const menuItems = [
        {
            title: 'Pedidos',
            description: 'Gerencie pedidos e comandas.',
            icon: <ShoppingCartOutlined style={{ fontSize: 36 }} />,
            path: '/orders',
        },
        {
            title: 'Colaboradores',
            description: 'Gerencie colaboradores do sistema.',
            icon: <TeamOutlined style={{ fontSize: 36 }} />,
            path: '/collaborators',
        },
        {
            title: 'Produtos',
            description: 'Cadastre e organize produtos.',
            icon: <AppstoreOutlined style={{ fontSize: 36 }} />,
            path: '/products',
        },
        {
            title: 'Usuários',
            description: 'Controle acessos e autenticação.',
            icon: <UserOutlined style={{ fontSize: 36 }} />,
            path: '/users',
        },
        {
            title: 'Configurações',
            description: 'Preferências do sistema.',
            icon: <SettingOutlined style={{ fontSize: 36 }} />,
            path: '/settings',
        },
    ];

    return (
        <Layout
            style={{
                background: token.colorBgLayout,
                minHeight: '100vh',
            }}
        >
            <Content
                style={{
                    padding: 32,
                }}
            >
                <Breadcrumb
                    items={[
                        {
                            title: 'Dashboard',
                        },
                    ]}
                    style={{
                        marginBottom: 24,
                    }}
                />

                <Title level={2} style={{ marginBottom: 4 }}>
                    Bem-vindo ao ERP
                </Title>

                <Paragraph
                    type="secondary"
                    style={{
                        marginBottom: 40,
                    }}
                >
                    Selecione um módulo para começar.
                </Paragraph>

                <Row gutter={[24, 24]}>
                    {menuItems.map((item) => (
                        <Col
                            xs={24}
                            sm={12}
                            md={8}
                            xl={6}
                            key={item.title}
                        >
                            <Card
                                hoverable
                                onClick={() => router.push(item.path)}
                                style={{
                                    height: 220,
                                    borderRadius: token.borderRadiusLG,
                                    cursor: 'pointer',
                                }}
                                styles={{
                                    body: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        height: '100%',
                                    },
                                }}
                            >
                                <div
                                    style={{
                                        textAlign: 'center',
                                        color: token.colorPrimary,
                                    }}
                                >
                                    {item.icon}
                                </div>

                                <div>
                                    <Title
                                        level={4}
                                        style={{
                                            textAlign: 'center',
                                            marginBottom: 8,
                                        }}
                                    >
                                        {item.title}
                                    </Title>

                                    <Paragraph
                                        type="secondary"
                                        style={{
                                            textAlign: 'center',
                                            marginBottom: 0,
                                        }}
                                    >
                                        {item.description}
                                    </Paragraph>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        color: token.colorPrimary,
                                    }}
                                >
                                    <RightOutlined />
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Content>
        </Layout>
    );
}