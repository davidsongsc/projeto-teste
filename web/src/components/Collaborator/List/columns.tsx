import { ColumnsType } from 'antd/es/table';
import { Tag } from 'antd';
import { Collaborator } from '@/src/interfaces/collaborator';
import { CollaboratorActions } from '../Actions';

export const getCollaboratorColumns = (
    onDelete: (id: string) => Promise<void>
): ColumnsType<Collaborator> => [
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
            <CollaboratorActions
                collaborator={record}
                onDelete={onDelete}
            />
        ),
        width: 180,
    },
];