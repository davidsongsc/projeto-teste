import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ProfileService } from '@/services/profile.service'
import { prisma } from '@/lib/prisma'

vi.mock('@/lib/prisma', () => ({
  prisma: {
    profile: {
      create: vi.fn(),
    },
  },
}))

describe('ProfileService - create', () => {
  let service: ProfileService

  beforeEach(() => {
    service = new ProfileService()
    vi.clearAllMocks()
  })

  it('deve bloquear criação sem nome', async () => {
    await expect(
      service.create({
        name: '' as any,
        role: 'admin',
      })
    ).rejects.toThrow('Nome é obrigatório.')
  })

  it('deve bloquear criação sem role', async () => {
    await expect(
      service.create({
        name: 'Admin',
        role: '' as any,
      })
    ).rejects.toThrow('Função é obrigatória.')
  })

  it('deve criar profile com sucesso', async () => {
    vi.mocked(prisma.profile.create).mockResolvedValue({
      id: 'profile-1',
    } as any)

    const result = await service.create({
      name: 'Admin',
      role: 'admin',
      description: 'full access',
    })

    expect(prisma.profile.create).toHaveBeenCalledWith({
      data: {
        name: 'Admin',
        role: 'admin',
        description: 'full access',
      },
    })

    expect(result.id).toBe('profile-1')
  })

  it('deve criar profile sem description quando não informado', async () => {
    vi.mocked(prisma.profile.create).mockResolvedValue({
      id: 'profile-2',
    } as any)

    await service.create({
      name: 'User',
      role: 'user',
    })

    expect(prisma.profile.create).toHaveBeenCalledWith({
      data: {
        name: 'User',
        role: 'user',
        description: undefined,
      },
    })
  })
})