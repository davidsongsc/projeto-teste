import { notification } from '@/src/components/Notification/notification';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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

        console.log(`[API ERROR] Status: ${response.status}`, errorData);

        if (response.status === 401) {
            notification.error('Acesso Negado', 'Sua sessão expirou.');
        } else if (response.status === 403) {
            notification.error('Acesso Negado', 'Permissão insuficiente.');
        } else {
            notification.error('Erro', errorData.message || 'Erro inesperado.');
        }

        throw new Error(errorData.message || 'Erro na API');
    }

    if (response.status === 204) return {} as T;

    return response.json();
}