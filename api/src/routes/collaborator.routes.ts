import { Router } from 'express'
import { CollaboratorController } from '@/controllers/collaborator.controller'
import { cacheMiddleware } from '@/middlewares/cacheMiddleware'
import { checkPermission } from '@/middlewares/checkPermissionMiddleware'
import { ensureAuthenticated } from '@/middlewares/auth'
const router = Router()
const controller = new CollaboratorController()

/**
 * @openapi
 * /collaborators:
 *   get:
 *     tags:
 *       - Collaborators
 *     summary: Lista colaboradores
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
 *     responses:
 *       '200':
 *         description: Lista de colaboradores
 */
router.get(
    '/',
    ensureAuthenticated,
    checkPermission('collaborator:read'),
    cacheMiddleware('collaborators', 60),
    controller.index)

/**
 * @openapi
 * /collaborators/{id}:
 *   get:
 *     tags:
 *       - Collaborators
 *     summary: Busca colaborador por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Colaborador encontrado
 *       '404':
 *         description: Colaborador não encontrado
 */
router.get(
    '/:id',
    ensureAuthenticated,
    checkPermission('collaborator:read'),
    cacheMiddleware('collaborators', 60),
    controller.show)

/**
 * @openapi
 * /api/collaborators:
 *   post:
 *     tags:
 *       - Collaborators
 *     summary: Cria um colaborador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - profileId
 *               - userId
 *             properties:
 *               name:
 *                 type: string
 *               profileId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Colaborador criado
 */
router.post(
    '/',
    ensureAuthenticated,
    checkPermission('collaborator:create'),
    controller.store)

/**
 * @openapi
 * /collaborators/{id}/status:
 *   patch:
 *     tags:
 *       - Collaborators
 *     summary: Atualiza o status do colaborador
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
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Status atualizado
 */
router.patch(
    '/:id/status',
    ensureAuthenticated,
    checkPermission('collaborator:update'),
    controller.updateStatus)

/**
 * @openapi
 * /collaborators/{id}:
 *   put:
 *     tags:
 *       - Collaborators
 *     summary: Atualiza um colaborador
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
 *               profileId:
 *                 type: string
 *               userId:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Colaborador atualizado
 */
router.put(
    '/:id',
    ensureAuthenticated,
    checkPermission('collaborator:update'),
    controller.update)

/**
 * @openapi
 * /collaborators/{id}:
 *   delete:
 *     tags:
 *       - Collaborators
 *     summary: Remove um colaborador
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Colaborador removido
 */
router.delete(
    '/:id',
    ensureAuthenticated,
    checkPermission('collaborator:delete'),
    controller.delete)

export default router