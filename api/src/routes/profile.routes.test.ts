import { describe, it, expect, vi, beforeEach } from 'vitest'
import { checkPermission } from '@/middlewares/checkPermissionMiddleware'

describe('checkPermission middleware', () => {
  let req: any
  let res: any
  let next: any

  beforeEach(() => {
    req = {
      user: {
        data: {
          profile: {
            permissions: [],
          },
        },
      },
    }

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    }

    next = vi.fn()

    vi.clearAllMocks()
  })

  it('deve bloquear usuário sem permissão', () => {
    req.user.data.profile.permissions = []

    const middleware = checkPermission('profiler:read')

    middleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(next).not.toHaveBeenCalled()
  })

  it('deve permitir usuário com permissão', () => {
    req.user.data.profile.permissions = ['profiler:read']

    const middleware = checkPermission('profiler:read')

    middleware(req, res, next)

    expect(next).toHaveBeenCalledTimes(1)
  })
})