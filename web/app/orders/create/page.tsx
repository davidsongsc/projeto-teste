'use client';

import { CreateOrder } from '@/src/components/Order/Create';
import { Layout, Breadcrumb } from 'antd';

const { Content } = Layout;

export default function CreateOrderPage() {
  return (
    <Layout style={{ minHeight: '100vh', padding: '24px' }}>
      <Breadcrumb 
        style={{ marginBottom: '16px' }}
        items={[
            { title: 'Home' },
            { title: <a href="/orders">Pedidos</a> },
            { title: 'Criar Pedido' }
        ]}
      />
      <Content>
        <CreateOrder />
      </Content>
    </Layout>
  );
}