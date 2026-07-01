'use client';

import { Grid, Space } from 'antd';
import { DeleteButton } from '@/src/components/Buttons/DeleteButton';
import { EditButton } from '@/src/components/Buttons/EditButton';
import { Profile } from '@/src/interfaces/profile';

const { useBreakpoint } = Grid;

interface Props {
  record: Profile;
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string) => void;
}

export function ProfileActions({ record, onDelete, onEdit }: Props) {
  const screens = useBreakpoint();

  return (
    // Adicione o onClick com stopPropagation aqui
    <Space 
      size={screens.md ? 'middle' : 'small'} 
      onClick={(e) => e.stopPropagation()}
    >
      <EditButton onClick={() => onEdit(record.id)} />
      <DeleteButton id={record.id} onConfirm={onDelete} />
    </Space>
  );
}