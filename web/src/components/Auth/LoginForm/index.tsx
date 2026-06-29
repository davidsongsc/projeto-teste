'use client';

import { Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '@/src/hooks/useAuth';
import { useState } from 'react';

export const LoginForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const onFinish = async (values: any) => {
    setLoading(true);
    const success = await login(values);
    setLoading(false);
    if (success && onSuccess) onSuccess();
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
        <Input prefix={<UserOutlined />} placeholder="E-mail" size="large" />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password prefix={<LockOutlined />} placeholder="Senha" size="large" />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={loading} block size="large">
        Entrar
      </Button>
    </Form>
  );
};