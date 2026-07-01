import { Router } from 'express'
import { ProfileController } from '@/controllers/profile.controller'
import { cacheMiddleware } from '@/middlewares/cacheMiddleware'
import { checkPermission } from '@/middlewares/checkPermissionMiddleware'
import { ensureAuthenticated } from '@/middlewares/auth'

const router = Router()
const controller = new ProfileController()

/**
 * @openapi
 * /profiles:
 *   get:
 *     tags:
 *       - Profiles
 *     summary: Lista perfis
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: boolean
 *     responses:
 *       '200':
 *         description: Lista de perfis
 */
router.get(
    '/',
    ensureAuthenticated,
    checkPermission('profile:read'),
    cacheMiddleware('profilers', 60),
    controller.index)

/**
 * @openapi
 * /profiles/{id}:
 *   get:
 *     tags:
 *       - Profiles
 *     summary: Busca perfil por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Perfil encontrado
 *       '404':
 *         description: Perfil não encontrado
 */
router.get(
    '/:id',
    ensureAuthenticated,
    checkPermission('profile:read'),
    cacheMiddleware('profilers', 60),
    controller.show)

/**
 * @openapi
 * /profiles:
 *   post:
 *     tags:
 *       - Profiles
 *     summary: Cria um perfil
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Perfil criado
 */
router.post(
    '/',
    ensureAuthenticated,
    checkPermission('profile:create'),
    controller.store)

/**
 * @openapi
 * /profiles/{id}:
 *   put:
 *     tags:
 *       - Profiles
 *     summary: Atualiza um perfil
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Perfil atualizado
 *       '404':
 *         description: Perfil não encontrado
 */
router.put(
    '/:id',
    ensureAuthenticated,
    checkPermission('profile:update'),
    controller.update)

/**
 * @openapi
 * /profiles/{id}:
 *   delete:
 *     tags:
 *       - Profiles
 *     summary: Remove um perfil
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Perfil removido
 *       '404':
 *         description: Perfil não encontrado
 */
router.delete(
    '/:id',
    ensureAuthenticated,
    checkPermission('profile:delete'),
    controller.delete)

export default router