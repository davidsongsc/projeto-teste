'use client';

import { CollaboratorList } from '@/src/components/Collaborator/List';
import { Breadcrumb, Layout } from 'antd';

const { Content } = Layout;

export default function CollaboratorsPage() {
    return (
        <Layout style={{ minHeight: '100vh', padding: '24px' }}>
            <Breadcrumb
                style={{ marginBottom: '16px' }}
                items={[
                    {
                        title: 'Home',
                    },
                    {
                        title: 'Colaboradores',
                    },
                ]}
            />

            <Content>
                <CollaboratorList />
            </Content>
        </Layout>
    );
}