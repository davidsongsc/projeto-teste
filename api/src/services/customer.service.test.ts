import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CustomerService } from '@/services/customer.service'
import { prisma } from '@/lib/prisma'

vi.mock('@/lib/prisma', () => ({
  prisma: {
    customer: {
      create: vi.fn(),
    },
  },
}))

describe('CustomerService - create validations', () => {
  let service: CustomerService

  beforeEach(() => {
    service = new CustomerService()
    vi.clearAllMocks()
  })

  it('deve bloquear criação sem email', async () => {
    await expect(
      service.create({
        name: 'John',
        document: '123',
        email: '' as any,
      })
    ).rejects.toThrow('Email é obrigatório.')
  })

  it('deve bloquear criação sem nome', async () => {
    await expect(
      service.create({
        name: '' as any,
        document: '123',
        email: 'test@mail.com',
      })
    ).rejects.toThrow('Nome é obrigatório.')
  })

  it('deve bloquear criação sem documento', async () => {
    await expect(
      service.create({
        name: 'John',
        document: '' as any,
        email: 'test@mail.com',
      })
    ).rejects.toThrow('Documento é obrigatório.')
  })

  it('deve criar customer com sucesso', async () => {
    vi.mocked(prisma.customer.create).mockResolvedValue({
      id: '1',
    } as any)

    const result = await service.create({
      name: 'John',
      document: '123',
      email: 'test@mail.com',
    })

    expect(result.id).toBe('1')
    expect(prisma.customer.create).toHaveBeenCalledTimes(1)
  })
})