'use client';

import { Grid, Space, Switch, Popconfirm } from 'antd';
import { DeleteButton } from '@/src/components/Buttons/DeleteButton';
import { EditCustomer } from '../Edit';
import { Customer } from '@/src/interfaces/customers';
import { useCustomers } from '@/src/hooks/useCustomer';

const { useBreakpoint } = Grid;

interface Props {
    record: Customer;
    onDelete: (id: string) => Promise<void>;
}

export function CustomerActions({ record, onDelete }: Props) {
    const screens = useBreakpoint();
    const { updateCustomerStatus } = useCustomers();

    const handleStatusChange = async (checked: boolean) => {
        await updateCustomerStatus(record.id, checked);
    };

    return (
        <Space size={screens.md ? 'middle' : 'small'}>
            {/* Botão de Status */}
            <Popconfirm
                title={`Deseja ${record.status ? 'desativar' : 'ativar'} este cliente?`}
                onConfirm={() => handleStatusChange(!record.status)}
                okText="Sim"
                cancelText="Não"
            >
                <Switch
                    size="small"
                    checked={record.status}
                    checkedChildren="Ativo"
                    unCheckedChildren="Inativo"
                />
            </Popconfirm>

            {/* Edição e Deleção */}
            <EditCustomer id={record.id} />
            <DeleteButton id={record.id} onConfirm={onDelete} />
        </Space>
    );
}