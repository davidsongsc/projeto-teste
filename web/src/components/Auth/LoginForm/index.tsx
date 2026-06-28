// src/components/Auth/LoginForm.tsx
import { Form, Input, Button, message, Card } from 'antd';
import { useAuthStore } from '@/src/store/useAuthStore';
import { api } from '@/src/services/api'; 

export const LoginForm = () => {
  const login = useAuthStore((state) => state.login);

  const onFinish = async (values: any) => {
    try {
      // Chamada direta para não depender de um service apenas para o auth
      const response = await fetch('http://localhost:3333/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Credenciais inválidas');
      
      const data = await response.json();
      login(data);
      message.success('Bem-vindo de volta!');
    } catch (error) {
      message.error('Erro ao realizar login.');
    }
  };

  return (
    <Card title="Login - Freela Fácil" style={{ width: 300, margin: '100px auto' }}>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Senha" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>Entrar</Button>
      </Form>
    </Card>
  );
};