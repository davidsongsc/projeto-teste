'use client';

import { Form, Input, Button, Select, InputNumber, Card, List, Typography, Badge, Space } from 'antd';

const { Text, Title } = Typography;

interface OrderItem {
  id: string;
  name: string;
  price: string;
  total: string;
  count: number;
}

interface Order {
  id: string;
  userId: string;
  customerId: string;
  totalPrice: string;
  status: 'DRAFT' | 'CONFIRMED' | 'CANCELLED';
  user: { name: string; email: string };
  items: OrderItem[];
}

interface OrderFormProps {
  initialValues?: Order;
  loading?: boolean;
  onSubmit: (values: any) => void;
}

export const OrderForm = ({ initialValues, loading, onSubmit }: OrderFormProps) => {
  const [form] = Form.useForm();

  const formatCurrency = (val: string | number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(val));

  return (
    <Card className="shadow-sm">
      <Title level={4}>Resumo do Pedido</Title>
      
      <Form 
        form={form} 
        layout="vertical" 
        onFinish={onSubmit} 
        initialValues={{
          ...initialValues,
          totalPrice: initialValues ? Number(initialValues.totalPrice) : 0
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Campos ocultos para manter IDs no submit */}
        <Form.Item name="id" hidden><Input /></Form.Item>
        <Form.Item name="customerId" hidden><Input /></Form.Item>
        <Form.Item name="userId" hidden><Input /></Form.Item>

        <Form.Item label="Responsável">
          <Input value={initialValues?.user?.name || '-'} disabled className="bg-gray-50" />
        </Form.Item>

        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="DRAFT"><Badge status="default" text="Rascunho" /></Select.Option>
            <Select.Option value="CONFIRMED"><Badge status="success" text="Confirmado" /></Select.Option>
            <Select.Option value="CANCELLED"><Badge status="error" text="Cancelado" /></Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="totalPrice" label="Valor Total" rules={[{ required: true }]}>
          <InputNumber 
            prefix="R$" 
            className="w-full" 
            step={0.01} 
            precision={2} 
          />
        </Form.Item>

        <div className="md:col-span-2">
          <Text strong>Itens do Pedido ({initialValues?.items?.length || 0})</Text>
          <List
            className="mt-2 bg-white rounded-lg border border-gray-200"
            dataSource={initialValues?.items || []}
            renderItem={(item) => (
              <List.Item className="px-4 hover:bg-gray-50">
                <div className="flex justify-between w-full">
                  <Space direction="vertical" size={0}>
                    <Text strong>{item.name}</Text>
                    <Text type="secondary">Qtd: {item.count} | Un: {formatCurrency(item.price)}</Text>
                  </Space>
                  <Text strong className="text-blue-600">{formatCurrency(item.total)}</Text>
                </div>
              </List.Item>
            )}
          />
        </div>

        <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t">
          <Button onClick={() => form.resetFields()}>Restaurar</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {initialValues ? 'Atualizar Pedido' : 'Criar Pedido'}
          </Button>
        </div>
      </Form>
    </Card>
  );
};