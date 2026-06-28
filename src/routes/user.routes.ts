import { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { cacheMiddleware } from '@/middlewares/cacheMiddleware'

const router = Router()
const controller = new UserController()

/**
 * @openapi
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Lista usuários
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/', cacheMiddleware('users', 60), controller.index)

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Busca usuário por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/:id', cacheMiddleware('users', 60), controller.show)

/**
 * @openapi
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Cria usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Criado
 */
router.post('/', controller.store)

export default router