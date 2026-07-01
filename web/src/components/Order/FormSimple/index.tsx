'use client';

import { useState } from 'react';
import { Form, Input, Button, Select, InputNumber, Space, Card, Divider, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { CustomerAutoComplete } from '@/src/components/Customer/AutoComplete';

const { Text } = Typography;

export const OrderCreateForm = ({ userId, onSubmit, loading, items: availableItems }: any) => {
    const [form] = Form.useForm();
    const [total, setTotal] = useState(0);

    const calculateTotal = (items: any[]) => {
        const sum = items?.reduce((acc, item) => {
            const count = Number(item?.count) || 0;
            const price = Number(item?.price) || 0;
            return acc + (count * price);
        }, 0) || 0;
        setTotal(sum);
    };

    const handleProductChange = (name: number, itemId: string) => {
        const selectedItem = availableItems?.find((i: any) => i.id === itemId);
        if (selectedItem) {
            const items = form.getFieldValue('items');
            items[name].price = Number(selectedItem.price);
            items[name].count = items[name].count || 1;
            form.setFieldsValue({ items });
            calculateTotal(items);
        }
    };

    return (
        <Card title={<Space><ShoppingCartOutlined /><Text strong>Novo Pedido</Text></Space>} className="shadow-sm">
            <Form
                form={form}
                onFinish={(values) => onSubmit({ ...values, totalPrice: total })}
                layout="vertical"
                onValuesChange={(_, all) => calculateTotal(all.items)}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Substituímos o Input do Cliente pelo seu AutoComplete */}
                    <Form.Item name="customerId" label="Cliente" rules={[{ required: true, message: 'Selecione um cliente' }]}>
                        <CustomerAutoComplete
                            onSelect={(id) => form.setFieldsValue({ customerId: id })}
                        />
                    </Form.Item>

                    <Form.Item name="status" label="Status" initialValue="DRAFT">
                        <Select options={[{ label: 'Rascunho', value: 'DRAFT' }, { label: 'Confirmado', value: 'CONFIRMED' }]} />
                    </Form.Item>
                </div>

                <Divider><Text type="secondary">Itens do Pedido</Text></Divider>

                <Form.List name="items">
                    {(fields, { add, remove }) => (
                        <div className="space-y-4">
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key} className="p-4 border rounded-lg">
                                    <Space style={{ display: 'flex' }} align="end">
                                        <Form.Item {...restField} name={[name, 'itemId']} label="Produto" rules={[{ required: true }]} className="flex-1 m-0">
                                            <Select
                                                placeholder="Selecione"
                                                options={availableItems?.map((i: any) => ({ label: i.name, value: i.id }))}
                                                onChange={(val) => handleProductChange(name, val)}
                                            />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'count']} label="Qtd" initialValue={1} rules={[{ required: true }]} className="w-20 m-0">
                                            <InputNumber min={1} className="w-full" />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'price']} label="Preço Unit." rules={[{ required: true }]} className="w-32 m-0">
                                            <InputNumber prefix="R$" precision={2} className="w-full" />
                                        </Form.Item>
                                        <Button type="text" danger icon={<MinusCircleOutlined />} onClick={() => { remove(name); calculateTotal(form.getFieldValue('items')); }} />
                                    </Space>
                                </div>
                            ))}
                            <Button type="dashed" onClick={() => add({ count: 1 })} block icon={<PlusOutlined />}>Adicionar Item</Button>
                        </div>
                    )}
                </Form.List>

                <div className="mt-6 p-4 rounded-lg flex justify-between items-center ">
                    <Text strong style={{ fontSize: '18px' }}>Total do Pedido:</Text>
                    <Text strong style={{ fontSize: '20px', color: '#1677ff' }}>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
                    </Text>
                </div>

                <div className="flex justify-end pt-6">
                    <Button type="primary" htmlType="submit" loading={loading} size="large" icon={<ShoppingCartOutlined />}>
                        Finalizar Pedido
                    </Button>
                </div>
            </Form>
        </Card>
    );
};