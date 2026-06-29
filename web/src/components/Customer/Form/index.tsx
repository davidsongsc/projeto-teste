'use client';

import { Form, Input, Button, Card, Switch } from 'antd';
import { useEffect } from 'react';

interface CustomerFormProps {
  initialValues?: any;
  loading?: boolean;
  onSubmit: (values: any) => void;
}

export const CustomerForm = ({ initialValues, loading, onSubmit }: CustomerFormProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <Card title="Dados do Cliente" className="shadow-md rounded-lg p-4">
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
          <Input placeholder="Insira o nome do cliente" className="w-full" />
        </Form.Item>

        <Form.Item 
          name="document" 
          label="CPF / CNPJ" 
          rules={[{ required: true, message: 'O documento é obrigatório' }]}
        >
          <Input placeholder="000.000.000-00" className="w-full" />
        </Form.Item>

        <Form.Item 
          name="email" 
          label="E-mail" 
          rules={[
            { required: true, message: 'O e-mail é obrigatório' },
            { type: 'email', message: 'E-mail inválido' }
          ]}
        >
          <Input placeholder="cliente@exemplo.com" className="w-full" />
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
            {initialValues ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
          </Button>
        </div>
      </Form>
    </Card>
  );
};