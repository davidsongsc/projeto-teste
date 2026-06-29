import { ColumnsType } from 'antd/es/table';
import { User } from '@/src/interfaces/user';
import { Tag, Space } from 'antd';
import { DeleteButton } from '@/src/components/Buttons/DeleteButton';
import { EditUser } from '../Edit'; // Assumindo que você criará este componente
import { UserActions } from '../Actions';

export const getUserColumns = (
    onDelete: (id: string) => Promise<void>,
    onEdit: (id: string) => void
): ColumnsType<User> => [
        /*{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (id) => id.slice(0, 8) + '...',
        },*/
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            minWidth: 200,
            
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
            minWidth: 100,
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
            render: (_, record) => (
                <UserActions
                    record={record}
                    onDelete={onDelete}
                />
            ),
            width: 200,
        },
    ];