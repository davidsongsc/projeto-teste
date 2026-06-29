import { useEffect, useState } from 'react';
import { Table, Card, Input, Select, Space } from 'antd';
import { useRouter } from 'next/navigation';

import { useCustomers } from '@/src/hooks/useCustomers';
import { useDebounce } from '@/src/hooks/useDebounce';
import { getCustomerColumns } from './columns';
import { CreateCustomer } from '../Create';

import { useAuthStore } from '@/src/store/useAuthStore';
import { UnauthorizedAccess } from '@/src/components/Auth/UnauthorizedAccess';

export const CustomerList = () => {
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<boolean | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);

    const debouncedSearch = useDebounce(searchTerm, 500);

    const { user, isLoadingAuth } = useAuthStore();
    const {
        customers,
        isLoading,
        pagination,
        fetchCustomers,
        deleteCustomer,
    } = useCustomers();

    useEffect(() => {
        if (!isLoadingAuth) return;

        if (!user) {
            return;
        }

        fetchCustomers({
            page: currentPage,
            limit: 10,
            search: debouncedSearch,
            status: statusFilter,
        });
    }, [
        currentPage,
        debouncedSearch,
        statusFilter,
        user,
        isLoadingAuth,
    ]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, statusFilter]);

    const handleEdit = (id: string) => {
        router.push(`/customers/edit/${id}`);
    };

    const handleDelete = (id: string) => {
        deleteCustomer(id);
    };

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
                        placeholder="Buscar por nome ou e-mail..."
                        allowClear
                        onChange={(e) => setSearchTerm(e.target.value)}
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
                rowKey="id"
                columns={getCustomerColumns(handleDelete, handleEdit)}
                dataSource={customers}
                scroll={{ x: 1000 }}
                loading={{
                    spinning: isLoading,
                    tip: 'Carregando clientes...',
                }}
                locale={{
                    emptyText: isLoading
                        ? ' '
                        : 'Nenhum cliente encontrado',
                }}
                pagination={{
                    current: pagination.page,
                    pageSize: 10,
                    total: pagination.total_items,
                    onChange: (page) => setCurrentPage(page),
                    showSizeChanger: false,
                    showTotal: (total, range) =>
                        `Mostrando ${range[0]}-${range[1]} de ${total} clientes`,
                }}
            />
        </Card>
    );
};