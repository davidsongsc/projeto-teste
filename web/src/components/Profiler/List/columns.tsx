import { ColumnsType } from 'antd/es/table';
import { Space, Tag } from 'antd';
import { Profile } from '@/src/interfaces/profile';
import { ProfileActions } from '../Actions';
import { EditProfile } from '../Edit';
import { DeleteButton } from '../../Buttons/DeleteButton';

export const getProfileColumns = (
    onDelete: (id: string) => Promise<void>,
    onEdit: (id: string) => void
): ColumnsType<Profile> => [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            minWidth: 200,
        },
        {
            title: 'Função',
            key: 'role',
            minWidth: 160,
            render: (_, record) => {
                const config = {
                    ADMIN: { color: 'red', text: 'Administrador' },
                    OPERATOR: { color: 'blue', text: 'Operador' },
                }[record.role as 'ADMIN' | 'OPERATOR'];

                return (
                    <Tag color={config?.color || 'default'}>
                        {config?.text || record.role}
                    </Tag>
                );
            },
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
            minWidth: 200,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status) => (
                <Tag color={status ? 'green' : 'red'}>
                    {status ? 'ATIVO' : 'INATIVO'}
                </Tag>
            ),
        },
        {
            title: 'Ações',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <Space>

                    <EditProfile id={record.id} />
                    <DeleteButton
                        id={record.id}
                        onConfirm={onDelete}
                    />
                </Space>
            ),
        },
    ];