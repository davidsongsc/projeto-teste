import { notification } from '@/src/components/Notification/notification';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api';

export async function api<T = any>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = localStorage.getItem('@LogisticOrder:token');

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 401) {
            notification.error('Acesso Negado', 'Sua sessão expirou. Faça login novamente.');
        } else {
            notification.error('Erro na requisição', errorData.message || 'Ocorreu um erro inesperado.');
        }

        throw new Error(errorData.message || 'Erro na API');
    }

    if (response.status === 204) return {} as T;

    return response.json();
}