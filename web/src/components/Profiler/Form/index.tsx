'use client';

import { Form, Input, Button, Card, Switch, Select } from 'antd';
import { useEffect } from 'react';
import { Role } from '@/src/enum/role.enum';

interface ProfileFormProps {
  initialValues?: any;
  loading?: boolean;
  onSubmit: (values: any) => void;
}

export const ProfileForm = ({ initialValues, loading, onSubmit }: ProfileFormProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return ( 
    <Card className="shadow-md rounded-lg p-0 w-1/2">
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        className="grid grid-cols-1 gap-4"
      >
        <Form.Item
          name="name"
          label="Nome do Perfil"
          rules={[{ required: true, message: 'O nome é obrigatório' }]}
        >
          <Input placeholder="Ex: Administrador" className="w-full" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Nível de Acesso (Role)"
          rules={[{ required: true, message: 'Selecione uma role' }]}
        >
          <Select placeholder="Selecione o nível de acesso">
            {Object.values(Role).map((role) => (
              <Select.Option key={role} value={role}>
                {role}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch checkedChildren="Ativo" unCheckedChildren="Inativo" />
        </Form.Item>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={() => form.resetFields()}>Limpar</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {initialValues ? 'Atualizar Perfil' : 'Criar Perfil'}
          </Button>
        </div>
      </Form>
    </Card>
  );
};