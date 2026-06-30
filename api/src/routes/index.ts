import { Router } from 'express'
import { ensureAuthenticated } from '@/middlewares/auth'

import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import profileRoutes from './profile.routes'
import collaboratorRoutes from './collaborator.routes'
import orderRoutes from './order.routes'
import itemRoutes from './item.routes'
import permissionRoutes from './permission.routes'
import customerRoutes from './customer.routes'

const router = Router()

// Rotas de autenticação Publicas
router.use('/auth', authRoutes)

// Middleware de autenticação para todas as rotas abaixo
//router.use(ensureAuthenticated)

// Rotas de autenticação Privadas
router.use('/users', userRoutes)
router.use('/profiles', profileRoutes)
router.use('/collaborators', collaboratorRoutes)
router.use('/orders', orderRoutes)
router.use('/items', itemRoutes)
router.use('/permissions', permissionRoutes)
router.use('/customers', customerRoutes)

export default router