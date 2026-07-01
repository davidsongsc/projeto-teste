import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ItemService } from '@/services/item.service'
import { prisma } from '@/lib/prisma'

vi.mock('@/lib/prisma', () => ({
  prisma: {
    item: {
      create: vi.fn(),
    },
  },
}))

describe('ItemService - create', () => {
  let service: ItemService

  beforeEach(() => {
    service = new ItemService()
    vi.clearAllMocks()
  })

  it('deve bloquear sem nome', async () => {
    await expect(
      service.create({
        name: '' as any,
        price: 10,
      })
    ).rejects.toThrow('Nome é obrigatório.')
  })

  it('deve bloquear sem preço', async () => {
    await expect(
      service.create({
        name: 'Item',
        price: '' as any,

      })
    ).rejects.toThrow('Preço é obrigatório.')
  })

  it('deve criar item com sucesso', async () => {
    vi.mocked(prisma.item.create).mockResolvedValue({
      id: 'item-1',
    } as any)

    const result = await service.create({
      name: 'Item 1',
      price: 10,
      description: 'desc',
    })

    expect(prisma.item.create).toHaveBeenCalledWith({
      data: {
        name: 'Item 1',
        price: 10,
        description: 'desc',
      },
    })

    expect(result.id).toBe('item-1')
  })

  it('deve criar item sem description quando não informado', async () => {
    vi.mocked(prisma.item.create).mockResolvedValue({
      id: 'item-2',
    } as any)

    await service.create({
      name: 'Item 1',
      price: 10,
     
    })

    expect(prisma.item.create).toHaveBeenCalledWith({
      data: {
        name: 'Item 1',
        price: 10,
        description: undefined,
      },
    })
  })
})