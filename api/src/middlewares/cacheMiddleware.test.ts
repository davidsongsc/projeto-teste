import { describe, it, expect, vi, beforeEach } from 'vitest'
import { cacheMiddleware } from '@/middlewares/cacheMiddleware'
import { cacheService } from '@/lib/redis/cache'

vi.mock('@/lib/redis/cache', () => ({
  cacheService: {
    get: vi.fn(),
  },
}))

describe('cacheMiddleware - fluxo', () => {
  let req: any
  let res: any
  let next: any

  beforeEach(() => {
    req = {
      method: 'GET',
      originalUrl: '/profiles?page=1',
    }

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    }

    next = vi.fn()

    vi.clearAllMocks()
  })

  it('deve BLOQUEAR cache em métodos diferentes de GET', async () => {
    req.method = 'POST'

    const middleware = cacheMiddleware('profiles', 60)

    await middleware(req, res, next)

    expect(next).toHaveBeenCalledTimes(1)
    expect(cacheService.get).not.toHaveBeenCalled()
  })

  it('deve LIBERAR fluxo quando não existe cache', async () => {
    vi.mocked(cacheService.get).mockResolvedValue(null)

    const middleware = cacheMiddleware('profiles', 60)

    await middleware(req, res, next)

    expect(cacheService.get).toHaveBeenCalled()
    expect(next).toHaveBeenCalledTimes(1)
    expect(res.status).not.toHaveBeenCalled()
  })

  it('deve RETORNAR cache e interromper fluxo', async () => {
    vi.mocked(cacheService.get).mockResolvedValue({ data: 'cached' })

    const middleware = cacheMiddleware('profiles', 60)

    await middleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ data: 'cached' })
    expect(next).not.toHaveBeenCalled()
  })
})