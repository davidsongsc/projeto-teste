'use client';

import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

interface EditButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const EditButton = ({ onClick, disabled }: EditButtonProps) => {
  return (
    <Button 
      type="link" 
      icon={<EditOutlined />} 
      onClick={onClick}
      disabled={disabled}
    >
      Editar
    </Button>
  );
};