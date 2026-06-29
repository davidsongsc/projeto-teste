import { Router } from 'express'
import { PermissionController } from '@/controllers/permission.controller'
import { cacheMiddleware } from '@/middlewares/cacheMiddleware'

const router = Router()
const controller = new PermissionController()

/**
 * @openapi
 * /permissions:
 *   get:
 *     tags:
 *       - Permissions
 *     summary: Lista permissões
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
 *         name: module
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de permissões
 */
router.get('/',cacheMiddleware('permissions', 60), controller.index)

/**
 * @openapi
 * /permissions/{id}:
 *   get:
 *     tags:
 *       - Permissions
 *     summary: Busca permissão por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Permissão encontrada
 *       '404':
 *         description: Permissão não encontrada
 */
router.get('/:id', cacheMiddleware('permissions', 60), controller.show)

/**
 * @openapi
 * /permissions:
 *   post:
 *     tags:
 *       - Permissions
 *     summary: Cria uma permissão
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - key
 *               - module
 *               - action
 *             properties:
 *               key:
 *                 type: string
 *               module:
 *                 type: string
 *               action:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Permissão criada
 */
router.post('/', controller.store)

/**
 * @openapi
 * /permissions/{id}:
 *   put:
 *     tags:
 *       - Permissions
 *     summary: Atualiza uma permissão
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
 *               key:
 *                 type: string
 *               module:
 *                 type: string
 *               action:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Permissão atualizada
 *       '404':
 *         description: Permissão não encontrada
 */
router.put('/:id', controller.update)

/**
 * @openapi
 * /permissions/{id}:
 *   delete:
 *     tags:
 *       - Permissions
 *     summary: Remove uma permissão
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Permissão removida
 *       '404':
 *         description: Permissão não encontrada
 */
router.delete('/:id', controller.delete)

export default router