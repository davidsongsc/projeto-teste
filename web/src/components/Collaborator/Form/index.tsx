'use client';

import { Form, Input, Button, Select, Card, Switch } from 'antd';
import { useEffect } from 'react';

interface CollaboratorFormProps {
    initialValues?: any;
    loading?: boolean;
    onSubmit: (values: any) => void;
    users: { id: string; name: string }[];
    profiles: { id: string; name: string }[];
}

export const CollaboratorForm = ({
    initialValues,
    loading,
    onSubmit,
    users,
    profiles
}: CollaboratorFormProps) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [initialValues, form]);

    return (
        <Card>
            <Form
                form={form}
                layout="vertical"
                onFinish={onSubmit}
            >
                <Form.Item
                    name="name"
                    label="Nome do Colaborador"
                    rules={[{ required: true, message: 'O nome é obrigatório' }]}
                >
                    <Input placeholder="Digite o nome do colaborador" />
                </Form.Item>

                <Form.Item
                    name="userId"
                    label="Usuário"
                    rules={[{ required: true, message: 'Selecione um usuário' }]}
                >
                    <Select
                        placeholder="Selecione um usuário"
                        options={users.map((u) => ({
                            label: u.name,
                            value: u.id
                        }))}
                    />
                </Form.Item>

                <Form.Item
                    name="profileId"
                    label="Perfil"
                    rules={[{ required: true, message: 'Selecione um perfil' }]}
                >
                    <Select
                        placeholder="Selecione um perfil"
                        options={profiles.map((p) => ({
                            label: p.name,
                            value: p.id
                        }))}
                    />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Status"
                    valuePropName="checked"
                    initialValue={true}
                >
                    <Switch
                        checkedChildren="Ativo"
                        unCheckedChildren="Inativo"
                    />
                </Form.Item>

                <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                    <Button onClick={() => form.resetFields()}>
                        Limpar
                    </Button>

                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                    >
                        {initialValues
                            ? 'Atualizar Colaborador'
                            : 'Criar Colaborador'}
                    </Button>
                </div>
            </Form>
        </Card>
    );
};