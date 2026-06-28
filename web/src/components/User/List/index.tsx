import { useEffect, useState } from 'react';
import { Table, Card, Input, Select, Space, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useUsers } from '@/src/hooks/useUsers';
import { useDebounce } from '@/src/hooks/useDebounce';
import { getUserColumns } from './columns';
import { useRouter } from 'next/navigation';
import { CreateUser } from '../Create';
export const UserList = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);

    const debouncedSearch = useDebounce(searchTerm, 500);

    const { users, isLoading, pagination, fetchUsers, deleteUser } = useUsers();

    useEffect(() => {
        fetchUsers({
            page: currentPage,
            limit: 10,
            search: debouncedSearch,
            status: statusFilter
        });
    }, [currentPage, debouncedSearch, statusFilter]);
    const handleEdit = (id: string) => {
        router.push(`/users/edit/${id}`);
    };
    const handleDelete = (id: string) => {
        deleteUser(id);
    };
    // Reseta página para 1 quando o filtro muda
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, statusFilter]);

    return (
        <Card
            title="Listagem de Usuários"
            extra={
                <Space size="middle">
                    {/* Botão de Novo Usuário adicionado aqui */}
                    <CreateUser />

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
                columns={getUserColumns(handleEdit, handleDelete)}
                dataSource={users}
                rowKey="id"
                scroll={{ x: 900 }}
                loading={{
                    spinning: isLoading,
                    tip: "Carregando usuários...",
                }}
                locale={{
                    emptyText: isLoading ? ' ' : 'Nenhum usuário encontrado'
                }}
                pagination={{
                    current: pagination.page,
                    pageSize: 10,
                    total: pagination.total_items,
                    onChange: (page) => setCurrentPage(page),
                    showSizeChanger: false,
                    showTotal: (total, range) =>
                        `Mostrando ${range[0]}-${range[1]} de ${total} usuários`,
                }}
            />
        </Card>
    );
};