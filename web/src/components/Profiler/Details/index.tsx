import { useEffect, useMemo } from 'react';
import { Space, Tag, Spin, Card } from 'antd';
import { usePermissions } from '@/src/hooks/usePermissions';

interface ProfileDetailsProps {
    profileId?: string;
}

export const ProfileDetails = ({ profileId }: ProfileDetailsProps) => {
    const { profilePermissions, isLoading, fetchByProfileId } = usePermissions();

    const permissions = profileId ? (profilePermissions[profileId] || []) : [];

    useEffect(() => {
        if (profileId && !profilePermissions[profileId]) {
            fetchByProfileId(profileId);
        }
    }, [profileId, fetchByProfileId, profilePermissions]);

    const groupedPermissions = useMemo(() => {
        return permissions.reduce((acc, perm) => {
            const mod = perm.module || 'Outros';
            if (!acc[mod]) acc[mod] = [];
            acc[mod].push(perm.action);
            return acc;
        }, {} as Record<string, string[]>);
    }, [permissions]);

    if (isLoading && !permissions.length) {
        return <div style={{ padding: '16px' }}><Spin size="small" /></div>;
    }

    if (!permissions || permissions.length === 0) {
        return <div style={{ padding: '16px' }}>Nenhuma permissão encontrada.</div>;
    }

    return (
        <Card className="shadow-md rounded-lg p-0 w-full">
            <div style={{ marginBottom: '16px', fontWeight: 'bold', fontSize: '16px' }}>
                Permissões por Módulo:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                {Object.entries(groupedPermissions).map(([module, actions]) => (
                    <Card size="small" title={module} key={module} bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <Space wrap>
                            {actions.map((action) => (
                                <Tag color="blue" key={action}>
                                    {action}
                                </Tag>
                            ))}
                        </Space>
                    </Card>
                ))}
            </div>
        </Card>
    );
};