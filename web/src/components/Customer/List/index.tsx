'use client';

import { useEffect, useState } from 'react';
import { Table, Card, Input, Select, Space, Spin } from 'antd';
import { useCustomers } from '@/src/hooks/useCustomer';
import { useDebounce } from '@/src/hooks/useDebounce';
import { getCustomerColumns } from './columns';
import { useRouter } from 'next/navigation';
import { CreateCustomer } from '../Create';
import { useAuthStore } from '@/src/store/useAuthStore';
import { UnauthorizedAccess } from '@/src/components/Auth/UnauthorizedAccess';

export const CustomerList = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);

    const debouncedSearch = useDebounce(searchTerm, 500);
    const { user, isLoadingAuth } = useAuthStore();
    const { customers, isLoading, pagination, fetchCustomers, deleteCustomer } = useCustomers();

    useEffect(() => {
        if (!isLoadingAuth || !user) return;

        fetchCustomers({
            page: currentPage,
            limit: 10,
            search: debouncedSearch,
            status: statusFilter === undefined ? undefined : statusFilter === 'true'
        });
    }, [currentPage, debouncedSearch, statusFilter, user, isLoadingAuth]);

    const handleDelete = (id: string) => deleteCustomer(id);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, statusFilter]);

    if (!user || !isLoadingAuth) {
        return <UnauthorizedAccess />;
    }

    return (
        <Card
            title="Listagem de Clientes"
            extra={
                <Space size="middle">
                    <CreateCustomer />
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
                            { value: 'false', label: 'Inativo' },
                        ]}
                    />
                </Space>
            }
        >
            <Table
                columns={getCustomerColumns(handleDelete)}
                dataSource={customers}
                rowKey="id"
                scroll={{ x: 900 }}
                loading={isLoading}
                pagination={{
                    current: pagination.page,
                    pageSize: 10,
                    total: pagination.total_items,
                    onChange: (page) => setCurrentPage(page),
                }}
            />
        </Card>
    );
};