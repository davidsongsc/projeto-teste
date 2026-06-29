import { ColumnsType } from 'antd/es/table';
import { Customer } from '@/src/interfaces/customers';
import { Tag } from 'antd';
import { CustomerActions } from '../Actions';

export const getCustomerColumns = (
    onDelete: (id: string) => Promise<void>
): ColumnsType<Customer> => [
    {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        minWidth: 200,
    },
    {
        title: 'Usuário Vinculado',
        key: 'user',
        render: (_, record) => record.user?.name || 'Sem usuário',
    },
    {
        title: 'Perfil',
        key: 'profile',
        render: (_, record) => record.profile?.name || '-',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
            const isActive = status === true;
            return (
                <Tag color={isActive ? 'green' : 'red'}>
                    {isActive ? 'ATIVO' : 'INATIVO'}
                </Tag>
            );
        },
        width: 100,
    },
    {
        title: 'Ações',
        key: 'action',
        fixed: 'right',
        render: (_, record) => (
            <CustomerActions
                record={record}
                onDelete={onDelete}
            />
        ),
        width: 180,
    },
];