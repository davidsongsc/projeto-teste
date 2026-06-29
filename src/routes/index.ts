import { Router } from 'express'
import { ensureAuthenticated } from '@/middlewares/auth'

import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import profileRoutes from './profile.routes'
import customerRoutes from './customer.routes'
import orderRoutes from './order.routes'
import productRoutes from './product.routes'
import itemRoutes from './item.routes'
import permissionRoutes from './permission.routes'


const router = Router()

// Rotas de autenticação Publicas
router.use('/auth', authRoutes)

// Middleware de autenticação para todas as rotas abaixo
router.use(ensureAuthenticated)

// Rotas de autenticação Privadas
router.use('/users', userRoutes)
router.use('/profiles', profileRoutes)
router.use('/customers', customerRoutes)
router.use('/orders', orderRoutes)
router.use('/products', productRoutes)
router.use('/items', itemRoutes)
router.use('/permissions', permissionRoutes)

export default router