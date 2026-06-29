'use client';

import { Grid, Space } from 'antd';
import { DeleteButton } from '@/src/components/Buttons/DeleteButton';
import { EditUser } from '../Edit';
import { User } from '@/src/interfaces/user';

const { useBreakpoint } = Grid;

interface Props {
  record: User;
  onDelete: (id: string) => Promise<void>;
}

export function UserActions({ record, onDelete }: Props) {
  const screens = useBreakpoint();

  return (
    <Space size={screens.md ? 'middle' : 'small'}>
      <EditUser id={record.id} />
      <DeleteButton id={record.id} onConfirm={onDelete} />
    </Space>
  );
}