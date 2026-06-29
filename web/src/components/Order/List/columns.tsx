import { ColumnsType } from 'antd/es/table';
import { Tag, Space, Tooltip, Button } from 'antd';
import { Order } from '@/src/interfaces/order';
import { DeleteButton } from '@/src/components/Buttons/DeleteButton';
import { EditOrder } from '../Edit';
import Link from 'next/link';

const currency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

const statusMap = {
    DRAFT: {
        color: 'orange',
        label: 'Rascunho',
    },
    CONFIRMED: {
        color: 'green',
        label: 'Confirmado',
    },
    CANCELLED: {
        color: 'red',
        label: 'Cancelado',
    },
};

export const getOrderColumns = (
    onEdit: (id: string) => void,
    onDelete: (id: string) => Promise<void>,
): ColumnsType<Order> => [
        {
            title: 'Pedido',
            dataIndex: 'id',
            key: 'id',
            width: 150,
            render: (id: string) => (
                <Tooltip title={id}>
                    #{id.slice(0, 8).toUpperCase()}
                </Tooltip>
            ),
        },
        {
            title: 'Vendedor',
            dataIndex: ['user', 'name'],
            key: 'userName',
            sorter: (a, b) =>
                (a.user?.name ?? '').localeCompare(b.user?.name ?? ''),
            minWidth: 180,
        },
        {
            title: 'Itens',
            key: 'items',
            width: 90,
            align: 'center',
            render: (_, record) => record.items?.length ?? 0,
        },
        {
            title: 'Valor',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            width: 120,
            align: 'right',
            sorter: (a, b) => Number(a.totalPrice) - Number(b.totalPrice),
            render: (value) => currency.format(Number(value)),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 130,
            align: 'center',
            render: (status: keyof typeof statusMap) => {
                const item = statusMap[status] ?? {
                    color: 'default',
                    label: status,
                };

                return <Tag color={item.color}>{item.label}</Tag>;
            },
        },
        {
            title: 'Criado em',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 170,
            sorter: (a, b) =>
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime(),
            render: (date: string) =>
                new Intl.DateTimeFormat('pt-BR', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                }).format(new Date(date)),
        },
        {
            title: 'Ações',
            key: 'action',
            width: 120,

            render: (_, record) => (
                <Space>

                    <EditOrder id={record.id} />
                    <DeleteButton
                        id={record.id}
                        onConfirm={onDelete}
                    />
                </Space>
            ),
        },
    ];