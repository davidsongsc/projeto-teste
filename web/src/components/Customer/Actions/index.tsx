'use client';

import { Grid, Space } from 'antd';
import { DeleteButton } from '@/src/components/Buttons/DeleteButton';
import { Customer } from '@/src/interfaces/customer';
import { EditCustomer } from '../Edit';

const { useBreakpoint } = Grid;

interface Props {
  record: Customer;
  onDelete: (id: string) => Promise<void>;
}

export function CustomerActions({ record, onDelete }: Props) {
  const screens = useBreakpoint();

  return (
    <Space size={screens.md ? 'middle' : 'small'}>
      <EditCustomer id={record.id} />
      <DeleteButton
        id={record.id}
        onConfirm={onDelete}
      />
    </Space>
  );
}