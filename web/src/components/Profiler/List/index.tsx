import { useState, useEffect } from 'react';
import { Table, Card, Input, Select, Space, Tag } from 'antd';
import { useProfilers } from '@/src/hooks/useProfilers';
import { useDebounce } from '@/src/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/src/store/useAuthStore';
import { UnauthorizedAccess } from '../../Auth/UnauthorizedAccess';
import { hasPermission } from '@/src/utils/hasPermission';
import { getProfileColumns } from './columns';
import { CreateProfile } from '../Create';
import { ProfileDetails } from '../Details';
import { Profile } from '@/src/interfaces/profile';

const RESTRICTION_DEFAULT = { module: 'profile', action: 'read' };

export const ProfilerList = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<boolean | undefined>(true);
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedSearch = useDebounce(searchTerm, 500);
    const { user, isLoadingAuth } = useAuthStore();
    const { profilers, isLoading, pagination, fetchProfilers, removeProfile } = useProfilers();

    useEffect(() => {
        if (!hasPermission(RESTRICTION_DEFAULT)) return;
        fetchProfilers({
            page: currentPage,
            limit: 10,
            search: debouncedSearch,
            status: statusFilter
        });
    }, [currentPage, debouncedSearch, statusFilter, user, isLoadingAuth]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, statusFilter]);

    const handleEdit = (id: string) => {
        router.push(`/users/edit/${id}`);
    };
    const handleDelete = async (id: string) => await removeProfile(id);

    if (!hasPermission(RESTRICTION_DEFAULT)) return <UnauthorizedAccess />;

    const expandedRowRender = (record: Profile) => (
        <ProfileDetails profileId={record.id} />
    );

    return (
        <Card
            title="Listagem de Perfis"
            extra={
                <Space size="middle">
                    <CreateProfile />
                    <Input
                        placeholder="Buscar perfil"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        allowClear
                    />
                    <Select
                        placeholder="Status"
                        allowClear
                        style={{ width: 150 }}
                        onChange={(value) => setStatusFilter(value)}
                        options={[
                            { value: true, label: 'Ativo' },
                            { value: false, label: 'Inativo' },
  
                        ]}
                    />
                </Space>
            }
        >
            <Table
                columns={getProfileColumns(handleDelete, handleEdit)}
                dataSource={profilers}
                rowKey="id"
                scroll={{ x: 900 }}
                loading={isLoading}
                expandable={{
                    expandedRowRender,
                    expandRowByClick: true
                }}
                pagination={{
                    current: pagination.page,
                    pageSize: 10,
                    total: pagination.total_items,
                    onChange: (page) => setCurrentPage(page),
                    showSizeChanger: false,
                    showTotal: (total, range) =>
                        `Mostrando ${range[0]}-${range[1]} de ${total} perfis`,
                }}
            />
        </Card>
        
    );
};