import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PermissionService } from '@/services/permission.service'
import { prisma } from '@/lib/prisma'

vi.mock('@/lib/prisma', () => ({
  prisma: {
    permission: {
      create: vi.fn(),
    },
  },
}))

describe('PermissionService - create', () => {
  let service: PermissionService

  beforeEach(() => {
    service = new PermissionService()
    vi.clearAllMocks()
  })

  it('deve bloquear criação sem key', async () => {
    await expect(
      service.create({
        key: '' as any,
        module: 'customer',
        action: 'read',
      })
    ).rejects.toThrow('Chave é obrigatória.')
  })

  it('deve bloquear criação sem module', async () => {
    await expect(
      service.create({
        key: 'customer:read',
        module: '' as any,
        action: 'read',
      })
    ).rejects.toThrow('Módulo é obrigatório.')
  })

  it('deve bloquear criação sem action', async () => {
    await expect(
      service.create({
        key: 'customer:read',
        module: 'customer',
        action: '' as any,
      })
    ).rejects.toThrow('Ação é obrigatória.')
  })

  it('deve criar permissão com sucesso', async () => {
    vi.mocked(prisma.permission.create).mockResolvedValue({
      id: 'perm-1',
      key: 'customer:read',
      module: 'customer',
      action: 'read',
      description: 'read customers',
    } as any)

    const result = await service.create({
      key: 'customer:read',
      module: 'customer',
      action: 'read',
      description: 'read customers',
    })

    expect(prisma.permission.create).toHaveBeenCalledWith({
      data: {
        key: 'customer:read',
        module: 'customer',
        action: 'read',
        description: 'read customers',
      },
    })

    expect(result.id).toBe('perm-1')
  })

  it('deve criar permissão sem description quando não informado', async () => {
    vi.mocked(prisma.permission.create).mockResolvedValue({
      id: 'perm-2',
    } as any)

    await service.create({
      key: 'order:read',
      module: 'order',
      action: 'read',
    })

    expect(prisma.permission.create).toHaveBeenCalledWith({
      data: {
        key: 'order:read',
        module: 'order',
        action: 'read',
        description: undefined,
      },
    })
  })
})