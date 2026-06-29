import { Router } from 'express'
import { AuthController } from '@/controllers/auth.controller'

const router = Router()
const controller = new AuthController()

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login realizado com sucesso
 *       '401':
 *         description: Credenciais inválidas
 */
router.post('/login', controller.login)

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout do usuário
 *     responses:
 *       '200':
 *         description: Logout realizado com sucesso
 */
router.post('/logout', controller.logout)

export default router