'use client';

import {
  Card,
  Row,
  Col,
  Typography,
  theme,
} from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { notification } from '@/src/components/Notification/notification';
const { Title, Text } = Typography;

export default function DashboardPage() {
  const router = useRouter();
  const { token } = theme.useToken();

  const menuItems = [
    {
      title: 'Pedidos',
      icon: <ShoppingCartOutlined style={{ fontSize: 28 }} />,
      path: '/orders',
    },
    {
      title: 'Clientes',
      icon: <TeamOutlined style={{ fontSize: 28 }} />,
      path: '/customers',
    },
    {
      title: 'Produtos',
      icon: <AppstoreOutlined style={{ fontSize: 28 }} />,
      path: '/products',
    },
    {
      title: 'Usuários',
      icon: <UserOutlined style={{ fontSize: 28 }} />,
      path: '/users',
    },
    {
      title: 'Configurações',
      icon: <SettingOutlined style={{ fontSize: 28 }} />,
      path: '/settings',
    },
  ];

  return (
    <div
      style={{
        padding: token.paddingLG,
        background: token.colorBgLayout,
        minHeight: '100vh',
      }}
    >
      <Title
        level={2}
        style={{
          color: token.colorText,
          marginBottom: token.marginXL,
        }}
      >
        Bem-vindo, Admin
      </Title>

      <Row gutter={[24, 24]}>
        {menuItems.map((item) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item.title}>
            <Card
              hoverable
              onClick={() => router.push(item.path)}
              styles={{
                body: {
                  textAlign: 'center',
                  padding: token.paddingLG,
                },
              }}
              style={{
                background: token.colorBgContainer,
                borderColor: token.colorBorder,
                borderRadius: token.borderRadiusLG,
                transition: 'all .25s ease',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  color: token.colorPrimary,
                  marginBottom: token.margin,
                }}
              >
                {item.icon}
              </div>

              <Text
                strong
                style={{
                  color: token.colorText,
                  fontSize: token.fontSizeLG,
                }}
              >
                {item.title}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}