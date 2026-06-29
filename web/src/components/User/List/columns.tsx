import { ColumnsType } from 'antd/es/table';
import { Tag } from 'antd';
import { User } from '@/src/interfaces/user';
import { UserActions } from '../Actions';

export const getUserColumns = (
    onDelete: (id: string) => Promise<void>,
    onEdit: (id: string) => void
): ColumnsType<User> => [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            minWidth: 180,
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
            minWidth: 220,
        },
        {
            title: 'Perfil',
            key: 'profile',
            minWidth: 160,
            render: (_, record) => record.profile?.name ?? '-',
        },
        {
            title: 'Função',
            key: 'role',
            width: 140,
            render: (_, record) => {
                const role = record.profile?.role;

                const config = {
                    ADMIN: { color: 'red', text: 'Administrador' },
                    OPERATOR: { color: 'blue', text: 'Operador' },
                }[role as 'ADMIN' | 'OPERATOR'];

                if (!config) return '-';

                return (
                    <Tag color={config.color}>
                        {config.text}
                    </Tag>
                );
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 110,
            render: (status) => (
                <Tag color={status ? 'green' : 'red'}>
                    {status ? 'ATIVO' : 'INATIVO'}
                </Tag>
            ),
        },
        {
            title: 'Ações',
            key: 'action',
            width: 180,
            render: (_, record) => (
                <UserActions
                    record={record}
                    onDelete={onDelete}
                />
            ),
        },
    ];