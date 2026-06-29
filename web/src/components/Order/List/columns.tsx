import { ColumnsType } from 'antd/es/table';
import { Order } from '@/src/interfaces/order';
import { Tag, Space, Button } from 'antd';
import { DeleteButton } from '@/src/components/Buttons/DeleteButton';
import { EditOrder } from '../Edit';
export const getOrderColumns = (
    onEdit: (id: string) => void,
    onDelete: (id: string) => void
): ColumnsType<Order> => [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (id: string) => `${id.slice(0, 8)}`.toUpperCase(),
            width: 80,
        },
        {
            title: 'Cliente',
            dataIndex: ['user', 'name'],
            key: 'userName',
            minWidth: 200,

        },
        {
            title: 'Valor Total',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (price) => `R$ ${Number(price).toFixed(2)}`,
            width: 100,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const colors: Record<string, string> = { DRAFT: 'orange', CONFIRMED: 'green', CANCELLED: 'red' };
                return <Tag color={colors[status] || 'default'}>{status}</Tag>;
            },
            width: 100,
        },
        {
            title: 'Criado em',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date: string) =>
                new Intl.DateTimeFormat('pt-BR', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                }).format(new Date(date)),
            minWidth: 150,
        },
        {
            title: 'Ações',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditOrder id={record.id} />
                    <DeleteButton id={record.id} onConfirm={onDelete} />
                </Space>
            ),
            minWidth: 200,
        },
    ];