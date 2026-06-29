'use client';

import { useEffect, useState } from 'react';
import { Table, Card, Input, Select, Space } from 'antd';
import { useOrders } from '@/src/hooks/useOrders';
import { useAuthStore } from '@/src/store/useAuthStore'; 
import { useDebounce } from '@/src/hooks/useDebounce';
import { UnauthorizedAccess } from '@/src/components/Auth/UnauthorizedAccess';
import { getOrderColumns } from './columns';
import { useRouter } from 'next/navigation';
import { CreateOrder } from '../Create';

export const OrderList = () => {
    const router = useRouter();
    const { user, isLoadingAuth } = useAuthStore(); // Adicionado estado de autenticação
    
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);

    const debouncedSearch = useDebounce(searchTerm, 500);
    const { orders, isLoading, pagination, fetchOrders, deleteOrder } = useOrders();

    useEffect(() => {
        if (isLoadingAuth || !user) return;

        fetchOrders({
            page: currentPage,
            limit: 10,
            search: debouncedSearch,
            status: statusFilter
        });
    }, [currentPage, debouncedSearch, statusFilter, user, isLoadingAuth]);

    const handleEdit = (id: string) => router.push(`/orders/edit/${id}`);
    const handleDelete = (id: string) => deleteOrder(id);

    // Reseta página para 1 quando o filtro muda
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, statusFilter]);


    if (!user || !isLoadingAuth) return <UnauthorizedAccess />;

    return (
        <Card
            title="Listagem de Pedidos"
            extra={
                <Space size="middle">
                    <CreateOrder />
                    <Input
                        placeholder="Buscar por nome ou email..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        allowClear
                    />
                    <Select
                        placeholder="Status"
                        allowClear
                        style={{ width: 150 }}
                        onChange={(value) => setStatusFilter(value)}
                        options={[
                            { value: 'DRAFT', label: 'Rascunho' },
                            { value: 'CONFIRMED', label: 'Confirmado' },
                            { value: 'CANCELLED', label: 'Cancelado' },
                        ]}
                    />
                </Space>
            }
        >
            <Table
                columns={getOrderColumns(handleEdit, handleDelete)}
                dataSource={orders}
                rowKey="id"
                scroll={{ x: 900 }}
                loading={{ spinning: isLoading, tip: "Carregando pedidos..." }}
                pagination={{
                    current: pagination.page,
                    pageSize: 10,
                    total: pagination.total_items,
                    onChange: (page) => setCurrentPage(page),
                    showTotal: (total, range) => `Mostrando ${range[0]}-${range[1]} de ${total} pedidos`,
                }}
            />
        </Card>
    );
};