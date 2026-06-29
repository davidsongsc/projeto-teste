'use client';

import { UserList } from '@/src/components/User/List';
import { Breadcrumb, Layout } from 'antd';

const { Content } = Layout;

export default function UsersPage() {
  return (
    <Layout style={{ minHeight: '100vh', padding: '24px' }}>
      <Breadcrumb 
        style={{ marginBottom: '16px' }}
        items={[
          {
            title: 'Home',
          },
          {
            title: 'Usuários',
          },
        ]}
      />
      
      <Content>
        <UserList />
      </Content>
    </Layout>
  );
}