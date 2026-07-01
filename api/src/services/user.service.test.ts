import { describe, it, expect, vi, beforeEach } from 'vitest'
import { UserService } from '@/services/user.service'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      create: vi.fn(),
    },
  },
}))

vi.mock('bcryptjs', () => ({
  hash: vi.fn(),
}))

describe('UserService - create', () => {
  let service: UserService

  beforeEach(() => {
    service = new UserService()
    vi.clearAllMocks()
  })

  it('deve bloquear criação sem nome', async () => {
    await expect(
      service.create({
        name: '' as any,
        email: 'test@mail.com',
        password: '123',
      })
    ).rejects.toThrow('Nome é obrigatório.')
  })

  it('deve bloquear criação sem email', async () => {
    await expect(
      service.create({
        name: 'John',
        email: '' as any,
        password: '123',
      })
    ).rejects.toThrow('Email é obrigatório.')
  })

  it('deve bloquear criação sem senha', async () => {
    await expect(
      service.create({
        name: 'John',
        email: 'test@mail.com',
        password: '' as any,
      })
    ).rejects.toThrow('Senha é obrigatória.')
  })

  it('deve criar usuário com sucesso e hash de senha', async () => {
    vi.mocked(hash).mockResolvedValue('hashed-password' as any)

    vi.mocked(prisma.user.create).mockResolvedValue({
      id: 'user-1',
    } as any)

    const result = await service.create({
      name: 'John',
      email: 'test@mail.com',
      password: '123',
      profileId: 'profile-1',
    })

    expect(hash).toHaveBeenCalledWith('123', 8)

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: 'John',
        email: 'test@mail.com',
        password: 'hashed-password',
        profile: {
          connect: {
            id: 'profile-1',
          },
        },
      },
    })

    expect(result.id).toBe('user-1')
  })

  it('deve criar usuário sem profile quando não informado', async () => {
    vi.mocked(hash).mockResolvedValue('hashed-password' as any)

    vi.mocked(prisma.user.create).mockResolvedValue({
      id: 'user-2',
    } as any)

    await service.create({
      name: 'John',
      email: 'test@mail.com',
      password: '123',
    })

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: 'John',
        email: 'test@mail.com',
        password: 'hashed-password',
        profile: undefined,
      },
    })
  })
})