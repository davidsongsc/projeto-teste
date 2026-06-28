'use client';

import { OrderList } from '@/src/components/Order/List';
import { Breadcrumb, Layout } from 'antd';

const { Content } = Layout;

export default function OrdersPage() {
  return (
    <Layout style={{ minHeight: '100vh', padding: '24px' }}>
      <Breadcrumb 
        style={{ marginBottom: '16px' }}
        items={[
          {
            title: 'Home',
          },
          {
            title: 'Pedidos',
          },
        ]}
      />
      
      <Content>
        <OrderList />
      </Content>
    </Layout>
  );
}