'use client';

import { Form, Input, Button, Select, Card, Switch } from 'antd';
import { useEffect } from 'react';

interface CustomerFormProps {
  initialValues?: any;
  loading?: boolean;
  onSubmit: (values: any) => void;
  users: { id: string; name: string }[];
  profiles: { id: string; name: string }[];
}

export const CustomerForm = ({ initialValues, loading, onSubmit, users, profiles }: CustomerFormProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <Card className="shadow-md rounded-lg p-4">
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Form.Item 
          name="name" 
          label="Nome do Cliente" 
          rules={[{ required: true, message: 'O nome é obrigatório' }]}
        >
          <Input placeholder="Ex: Logística Rápida Ltda" className="w-full" />
        </Form.Item>

        <Form.Item 
          name="userId" 
          label="Usuário Responsável" 
          rules={[{ required: true, message: 'Selecione um usuário' }]}
        >
          <Select 
            placeholder="Selecione um usuário" 
            options={users.map(u => ({ label: u.name, value: u.id }))} 
          />
        </Form.Item>

        <Form.Item 
          name="profileId" 
          label="Perfil de Acesso" 
          rules={[{ required: true, message: 'Selecione um perfil' }]}
        >
          <Select 
            placeholder="Selecione um perfil" 
            options={profiles.map(p => ({ label: p.name, value: p.id }))} 
          />
        </Form.Item>

        <Form.Item 
          name="status" 
          label="Status do Cliente" 
          valuePropName="checked"
          initialValue={true}
        >
          <Switch checkedChildren="Ativo" unCheckedChildren="Inativo" />
        </Form.Item>

        <div className="md:col-span-2 flex justify-end gap-2 mt-4">
          <Button onClick={() => form.resetFields()}>Limpar</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {initialValues ? 'Atualizar Cliente' : 'Criar Cliente'}
          </Button>
        </div>
      </Form>
    </Card>
  );
};