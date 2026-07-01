import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AuthService } from '@/services/auth.service'
import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AppError } from '@/errors/AppError'

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}))

vi.mock('bcryptjs', () => ({
  compare: vi.fn(),
}))

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn(),
  },
}))

describe('AuthService - login', () => {
  let service: AuthService

  beforeEach(() => {
    process.env.JWT_SECRET = 'test-secret';
    service = new AuthService()
    vi.clearAllMocks()
  })

  it('deve falhar quando usuário não existe', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null)

    await expect(
      service.login('test@mail.com', '123')
    ).rejects.toThrow('Usuário ou senha incorretos.')
  })

  it('deve falhar quando senha não existe no banco', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: '1',
      password: null,
    } as any)

    await expect(
      service.login('test@mail.com', '123')
    ).rejects.toThrow('Usuário ou senha incorretos.')
  })

  it('deve falhar quando senha não confere', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: '1',
      password: 'hashed',
      profile: {
        role: 'admin',
        permissions: [],
      },
    } as any)

    vi.mocked(compare).mockResolvedValue(false as any)

    await expect(
      service.login('test@mail.com', '123')
    ).rejects.toThrow('Usuário ou senha incorretos.')
  })

  it('deve retornar token e usuário quando login for válido', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: 'user-1',
      name: 'John',
      email: 'TEST@mail.com',
      password: 'hashed',
      profile: {
        id: 'profile-1',
        name: 'Admin',
        role: 'admin',
        permissions: [
          { key: 'user:read' },
          { key: 'user:create' },
        ],
      },
    } as any)

    vi.mocked(compare).mockResolvedValue(true as any)

    vi.mocked(jwt.sign).mockReturnValue('fake-token' as any)

    const result = await service.login('test@mail.com', '123')

    expect(jwt.sign).toHaveBeenCalledWith(
      {
        id: 'user-1',
        role: 'admin',
      },
      expect.any(String),
      { expiresIn: '1d' }
    )

    expect(result).toEqual({
      token: 'fake-token',
      user: {
        id: 'user-1',
        name: 'John',
        email: 'TEST@mail.com',
        profile: {
          id: 'profile-1',
          name: 'Admin',
          role: 'admin',
          permissions: ['user:read', 'user:create'],
        },
      },
    })
  })
})