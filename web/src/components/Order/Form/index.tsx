'use client';

import { Form, Input, Button, Select, Card, List, Typography, Badge, Space, Divider, InputNumber, Row, Col } from 'antd';
import { useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

interface OrderFormProps {
  initialValues?: any;
  availableItems?: any[];
  loading?: boolean;
  onSubmit: (values: any) => void;
}

export const OrderForm = ({ initialValues, availableItems, loading, onSubmit }: OrderFormProps) => {
  const [form] = Form.useForm();

  const formatCurrency = (val: string | number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(val));

  useEffect(() => {
    if (initialValues) {
      form.resetFields();
      form.setFieldsValue({
        ...initialValues,
        totalPrice: Number(initialValues.totalPrice)
      });
    }
  }, [initialValues, form]);

  return (
    <Card className="shadow-sm">
      <Title level={4}>Edição de Pedido</Title>
      
      <Form 
        form={form} 
        layout="vertical" 
        onFinish={onSubmit}
        initialValues={initialValues}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
      >
        <Form.Item name="id" hidden><Input /></Form.Item>

        <Divider  plain>Dados do Vendedor</Divider>
        <Form.Item label="Nome">
          <Input value={initialValues?.user?.name || '-'} disabled />
        </Form.Item>
        <Form.Item label="E-mail">
          <Input value={initialValues?.user?.email || '-'} disabled />
        </Form.Item>

        <Divider  plain>Dados do Cliente</Divider>
        <Form.Item label="Cliente">
          <Input value={initialValues?.customer?.name || '-'} disabled />
        </Form.Item>
        <Form.Item label="CPF/CNPJ">
          <Input value={initialValues?.customer?.document || '-'} disabled />
        </Form.Item>

        <Divider  plain>Detalhes do Pedido</Divider>
        <Form.Item name="status" label="Status do Pedido" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="DRAFT"><Badge status="default" text="Rascunho" /></Select.Option>
            <Select.Option value="CONFIRMED"><Badge status="success" text="Confirmado" /></Select.Option>
            <Select.Option value="CANCELLED"><Badge status="error" text="Cancelado" /></Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Valor Total">
          <Input 
            value={formatCurrency(initialValues?.totalPrice || 0)} 
            readOnly 
            className="font-bold text-blue-600  cursor-not-allowed" 
          />
        </Form.Item>

        <div className="md:col-span-2">
          <Divider  plain>Gerenciar Itens</Divider>
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex' }} align="start" className=" p-3 rounded-lg">
                    <Form.Item {...restField} name={[name, 'itemId']} rules={[{ required: true }]} style={{ width: 250 }}>
                      <Select placeholder="Produto" options={availableItems?.map(i => ({ label: i.name, value: i.id }))} />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, 'count']} rules={[{ required: true }]} style={{ width: 100 }}>
                      <InputNumber placeholder="Qtd" min={1} className="w-full" />
                    </Form.Item>
                    <Button danger icon={<MinusCircleOutlined />} onClick={() => remove(name)} />
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Adicionar Item
                </Button>
              </div>
            )}
          </Form.List>
        </div>

        <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t">
          <Button onClick={() => form.resetFields()}>Restaurar</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Atualizar Pedido
          </Button>
        </div>
      </Form>
    </Card>
  );
};