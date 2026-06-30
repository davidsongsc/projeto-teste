import { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { cacheMiddleware } from '@/middlewares/cacheMiddleware'
import { checkPermission } from '@/middlewares/checkPermissionMiddleware'
import { ensureAuthenticated } from '@/middlewares/auth'
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
router.get(
    '/',
    ensureAuthenticated,
    checkPermission('user:read'),
    cacheMiddleware('users', 60),
    controller.index)

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
router.get(
    '/:id',
    ensureAuthenticated,
    checkPermission('user:read'),
    cacheMiddleware('users', 60),
    controller.show)

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
router.post(
    '/',
    ensureAuthenticated,
    checkPermission('user:create'),
    controller.store)

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Atualiza um usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Usuário atualizado
 *       '400':
 *         description: Requisição inválida
 *       '404':
 *         description: Usuário não encontrado
 */
router.put(
    '/:id',
    ensureAuthenticated,
    checkPermission('user:update'),
    controller.update)

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Remove um usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Usuário removido com sucesso
 *       '400':
 *         description: Requisição inválida
 *       '404':
 *         description: Usuário não encontrado
 */
router.delete(
    '/:id',
    ensureAuthenticated,
    checkPermission('user:delete'),
    controller.delete)

export default router