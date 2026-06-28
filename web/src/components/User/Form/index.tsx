'use client';

import { Form, Input, Button, Select, Card, Switch } from 'antd';
import { useEffect } from 'react';

interface UserFormProps {
  initialValues?: any;
  loading?: boolean;
  onSubmit: (values: any) => void;
}

export const UserForm = ({ initialValues, loading, onSubmit }: UserFormProps) => {
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
          label="Nome Completo" 
          rules={[{ required: true, message: 'O nome é obrigatório' }]}
        >
          <Input placeholder="Insira o nome do usuário" className="w-full" />
        </Form.Item>

        <Form.Item 
          name="email" 
          label="E-mail" 
          rules={[
            { required: true, message: 'O e-mail é obrigatório' },
            { type: 'email', message: 'E-mail inválido' }
          ]}
        >
          <Input placeholder="usuario@exemplo.com" className="w-full" />
        </Form.Item>

        <Form.Item 
          name="status" 
          label="Status da Conta" 
          valuePropName="checked" // Necessário para o Switch funcionar como booleano
          initialValue={true}
        >
          <Switch checkedChildren="Ativo" unCheckedChildren="Inativo" />
        </Form.Item>

        <div className="md:col-span-2 flex justify-end gap-2 mt-4">
          <Button onClick={() => form.resetFields()}>Limpar</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {initialValues ? 'Atualizar Usuário' : 'Criar Usuário'}
          </Button>
        </div>
      </Form>
    </Card>
  );
};