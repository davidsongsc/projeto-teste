import { describe, it, expect, vi, beforeEach } from 'vitest';
import { hasPermission } from './hasPermission';
import { useAuthStore } from '@/src/store/useAuthStore';

vi.mock('@/src/store/useAuthStore', () => ({
    useAuthStore: {
        getState: vi.fn(),
    },
}));

describe('hasPermission', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('deve retornar true quando o usuário possui a permissão informada', () => {
        vi.mocked(useAuthStore.getState).mockReturnValue({
            permissions: [
                'user:read',
                'user:create',
                'order:update',

            ],
        } as any);

        expect(hasPermission('user', 'read')).toBe(true);
    });


    it('deve retornar false quando o usuário não possui a permissão informada', () => {
        vi.mocked(useAuthStore.getState).mockReturnValue({
            permissions: [],
        } as any);

        expect(hasPermission('user', 'read')).toBe(false);
    });

    it('deve retornar true quando o usuário possui a permissão em maiúsculas', () => {
        vi.mocked(useAuthStore.getState).mockReturnValue({
            permissions: [
                'user:read',
            ],
        } as any);

        expect(hasPermission('USER', 'READ')).toBe(true);
    });
    it('deve retornar false quando o usuário não tem permissão para deletar o conteúdo', () => {
        vi.mocked(useAuthStore.getState).mockReturnValue({
            permissions: [
                'user:read',
            ],
        } as any);

        expect(hasPermission('user', 'delete')).toBe(false);
    });
    it('deve retornar false quando o usuário não tem permissão e as permissões são undefined', () => {
        vi.mocked(useAuthStore.getState).mockReturnValue({
            permissions: undefined,
        } as any);

        expect(hasPermission('user', 'read')).toBe(false);
    });
});