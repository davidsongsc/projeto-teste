'use client';
import { useEffect } from 'react';
import { Form, Input, Button, Select, InputNumber, Space, Card, Divider, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Text } = Typography;

export const OrderCreateForm = ({ userId, onSubmit, loading }: any) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (userId) {
            form.setFieldsValue({ customerId: userId });
        }
    }, [userId, form]);
    console.log(userId);
    return (
        <Card
            title={
                <Space>
                    <ShoppingCartOutlined />
                    <Text strong>Novo Pedido</Text>
                </Space>
            }
            className="shadow-sm"
            styles={{ body: { padding: '24px' } }}
        >
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Aqui estamos fixando o ID que vem dos params como o CustomerId */}
                    <Form.Item
                        name="customerId"
                        label="ID do Cliente"
                        initialValue={userId}
                        rules={[{ required: true }]}
                    >
                        <Input disabled className="bg-gray-50" />
                    </Form.Item>

                    <Form.Item name="status" label="Status" initialValue="DRAFT">
                        <Select
                            options={[
                                { label: 'Rascunho', value: 'DRAFT' },
                                { label: 'Confirmado', value: 'CONFIRMED' }
                            ]}
                        />
                    </Form.Item>
                </div>

                <Divider >
                    <Text type="secondary">Itens do Pedido</Text>
                </Divider>

                <Form.List name="items">
                    {(fields, { add, remove }) => (
                        <div className="space-y-4">
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key} className="p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                                    <Space style={{ display: 'flex' }} align="start">
                                        <Form.Item {...restField} name={[name, 'productId']} label="ID Produto" rules={[{ required: true }]} className="flex-1">
                                            <Input placeholder="ID" />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'count']} label="Qtd" rules={[{ required: true }]} className="w-24">
                                            <InputNumber min={1} className="w-full" />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'price']} label="Preço" rules={[{ required: true }]} className="w-32">
                                            <InputNumber prefix="R$" precision={2} className="w-full" />
                                        </Form.Item>
                                        <Button
                                            type="text"
                                            danger
                                            icon={<MinusCircleOutlined />}
                                            onClick={() => remove(name)}
                                            style={{ marginTop: 28 }}
                                        />
                                    </Space>
                                </div>
                            ))}
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Adicionar Item
                            </Button>
                        </div>
                    )}
                </Form.List>

                <Divider />

                <div className="flex justify-end pt-4">
                    <Button type="primary" htmlType="submit" loading={loading} size="large" icon={<ShoppingCartOutlined />}>
                        Finalizar Pedido
                    </Button>
                </div>
            </Form>
        </Card>
    );
};