'use client';

import { useEffect, useState } from 'react';
import { Table, Card, Input, Select, Space } from 'antd';
import { useCollaborators } from '@/src/hooks/useCollaborator';
import { useDebounce } from '@/src/hooks/useDebounce';
import { getCollaboratorColumns } from './columns';
import { CreateCollaborator } from '../Create';
import { useAuthStore } from '@/src/store/useAuthStore';
import { UnauthorizedAccess } from '@/src/components/Auth/UnauthorizedAccess';

export const CollaboratorList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);

    const debouncedSearch = useDebounce(searchTerm, 500);
    const { user, isLoadingAuth } = useAuthStore();

    const {
        collaborators,
        isLoading,
        pagination,
        fetchCollaborators,
        deleteCollaborator
    } = useCollaborators();

    useEffect(() => {
        if (!isLoadingAuth || !user) return;

        fetchCollaborators({
            page: currentPage,
            limit: 10,
            search: debouncedSearch,
            status: statusFilter === undefined ? undefined : statusFilter === 'true'
        });
    }, [currentPage, debouncedSearch, statusFilter, user, isLoadingAuth]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, statusFilter]);

    if (!user || !isLoadingAuth) {
        return <UnauthorizedAccess />;
    }

    return (
        <Card
            title="Listagem de Colaboradores"
            extra={
                <Space size="middle">
                    <CreateCollaborator />
                    <Input
                        placeholder="Buscar por nome..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        allowClear
                    />
                    <Select
                        placeholder="Status"
                        allowClear
                        style={{ width: 150 }}
                        onChange={(value) => setStatusFilter(value)}
                        options={[
                            { value: 'true', label: 'Ativo' },
                            { value: 'false', label: 'Inativo' }
                        ]}
                    />
                </Space>
            }
        >
            <Table
                columns={getCollaboratorColumns(deleteCollaborator)}
                dataSource={collaborators}
                rowKey="id"
                scroll={{ x: 900 }}
                loading={isLoading}
                pagination={{
                    current: pagination.page,
                    pageSize: 10,
                    total: pagination.total_items,
                    onChange: (page) => setCurrentPage(page)
                }}
            />
        </Card>
    );
};