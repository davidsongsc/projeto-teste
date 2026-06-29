'use client';

import { Grid, Space, Switch, Popconfirm } from 'antd';
import { DeleteButton } from '@/src/components/Buttons/DeleteButton';
import { EditCollaborator } from '../Edit';
import { Collaborator } from '@/src/interfaces/collaborator';
import { useCollaborators } from '@/src/hooks/useCollaborator';

const { useBreakpoint } = Grid;

interface Props {
    record: Collaborator;
    onDelete: (id: string) => Promise<void>;
}

export function CollaboratorActions({ record, onDelete }: Props) {
    const screens = useBreakpoint();
    const { updateCollaboratorStatus } = useCollaborators();

    // Guard clause: if there is no record, return null or an empty fragment
    if (!record) return null;

    const handleStatusChange = async (checked: boolean) => {
        await updateCollaboratorStatus(record.id, checked);
    };

    return (
        <Space size={screens.md ? 'middle' : 'small'}>
            <Popconfirm
                // Using optional chaining and providing a fallback string
                title={`Deseja ${record?.status ? 'desativar' : 'ativar'} este colaborador?`}
                onConfirm={() => handleStatusChange(!record.status)}
                okText="Sim"
                cancelText="Não"
            >
                <Switch
                    size="small"
                    // Force boolean with !! to avoid issues if status is undefined
                    checked={!!record.status}
                    checkedChildren="Ativo"
                    unCheckedChildren="Inativo"
                />
            </Popconfirm>

            <EditCollaborator id={record.id} />
            <DeleteButton id={record.id} onConfirm={onDelete} />
        </Space>
    );
}