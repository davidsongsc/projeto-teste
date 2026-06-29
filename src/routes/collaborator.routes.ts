import { Router } from 'express'
import { CollaboratorController } from '@/controllers/collaborator.controller'
import { cacheMiddleware } from '@/middlewares/cacheMiddleware'
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
router.get('/', cacheMiddleware('collaborators', 60), controller.index)

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
router.get('/:id', cacheMiddleware('collaborators', 60), controller.show)

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
router.post('/', controller.store)

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
router.patch('/:id/status', controller.updateStatus)

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
router.put('/:id', controller.update)

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
router.delete('/:id', controller.delete)

export default router