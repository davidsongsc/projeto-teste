import { notification } from '@/src/components/Notification/notification';

export async function api<T = any>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api';
    // Se a base estiver indefinida, interrompemos imediatamente para não gerar URL errada
    if (!BASE_URL) {
        console.error("ERRO CRÍTICO: NEXT_PUBLIC_API_URL não está definida!");
        throw new Error("Configuração de API ausente");
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem('@LogisticOrder:token') : null;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    try {
        // Concatenação direta e clara
        const url = `${BASE_URL}${endpoint}`;
        const response = await fetch(url, { ...options, headers });

        if (!response.ok) {
            // Tentamos ler o JSON, mas se falhar, não colocamos 'undefined' na notificação
            const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido' }));

            console.error(`[API ERROR] Status: ${response.status}`, errorData);

            notification.error(
                'Erro na API',
                errorData.message || `Status: ${response.status}`
            );

            throw new Error(errorData.message || 'Erro na API');
        }

        // Se o status for 204, retornamos objeto vazio sem tentar ler JSON
        if (response.status === 204) return {} as T;

        // Tenta converter para JSON, se falhar, garante que não retorna undefined
        const data = await response.json();
        return data as T;

    } catch (error) {
        console.error("Erro na requisição fetch:", error);
        throw error;
    }
}