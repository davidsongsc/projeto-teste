'use client';

import { Form, Input, Button, Select, InputNumber, Card, Spin } from 'antd';
import { useOrders } from '@/src/hooks/useOrders';
import { useEffect } from 'react';

interface OrderFormProps {
  initialValues?: any;
  loading?: boolean;
  onSubmit: (values: any) => void;
}

export const OrderForm = ({ initialValues, loading, onSubmit }: OrderFormProps) => {
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
          name="userId" 
          label="ID do Usuário" 
          rules={[{ required: true, message: 'Campo obrigatório' }]}
        >
          <Input placeholder="Insira o ID do usuário" className="w-full" />
        </Form.Item>

        <Form.Item 
          name="totalPrice" 
          label="Valor Total (R$)" 
          rules={[{ required: true, message: 'Campo obrigatório' }]}
        >
          <InputNumber 
            prefix="R$" 
            className="w-full" 
            min={0} 
            step={0.01} 
          />
        </Form.Item>

        <Form.Item 
          name="status" 
          label="Status" 
          rules={[{ required: true, message: 'Selecione um status' }]}
        >
          <Select placeholder="Selecione">
            <Select.Option value="DRAFT">Rascunho</Select.Option>
            <Select.Option value="CONFIRMED">Confirmado</Select.Option>
            <Select.Option value="CANCELLED">Cancelado</Select.Option>
          </Select>
        </Form.Item>

        <div className="md:col-span-2 flex justify-end gap-2 mt-4">
          <Button onClick={() => form.resetFields()}>Limpar</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {initialValues ? 'Atualizar Pedido' : 'Criar Pedido'}
          </Button>
        </div>
      </Form>
    </Card>
  );
};