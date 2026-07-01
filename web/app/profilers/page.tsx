'use client';

import { ProfilerList } from '@/src/components/Profiler/List';
import { Breadcrumb, Layout } from 'antd';

const { Content } = Layout;

export default function ProfilersPage() {
  return (
    <Layout style={{ minHeight: '100vh', padding: '24px' }}>
      <Breadcrumb 
        style={{ marginBottom: '16px' }}
        items={[
          {
            title: 'Home',
          },
          {
            title: 'Perfis',
          },
        ]}
      />
      
      <Content>
        <ProfilerList />
      </Content>
    </Layout>
  );
}