'use client';

import { CustomerList } from '@/src/components/Customer/List';
import { Breadcrumb, Layout } from 'antd';

const { Content } = Layout;

export default function CustomersPage() {
  return (
    <Layout style={{ minHeight: '100vh', padding: '24px' }}>
      <Breadcrumb 
        style={{ marginBottom: '16px' }}
        items={[
          {
            title: 'Home',
          },
          {
            title: 'Clientes',
          },
        ]}
      />
      
      <Content>
        <CustomerList />
      </Content>
    </Layout>
  );
}