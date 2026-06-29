import { Router } from 'express'
import { CustomerController } from '@/controllers/customer.controller'
import { cacheMiddleware } from '@/middlewares/cacheMiddleware'
const router = Router()
const controller = new CustomerController()

/**
 * @openapi
 * /customers:
 *   get:
 *     tags:
 *       - Customers
 *     summary: Lista clientes
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
 *         description: Lista de clientes
 */
router.get('/', cacheMiddleware('customers', 60), controller.index)

/**
 * @openapi
 * /customers/{id}:
 *   get:
 *     tags:
 *       - Customers
 *     summary: Busca cliente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Cliente encontrado
 *       '404':
 *         description: Cliente não encontrado
 */
router.get('/:id', cacheMiddleware('customers', 60), controller.show)

/**
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     summary: Cria um cliente
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
 *         description: Cliente criado
 */
router.post('/', controller.store)

/**
 * @openapi
 * /customers/{id}/status:
 *   patch:
 *     tags:
 *       - Customers
 *     summary: Atualiza o status do cliente
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
 * /customers/{id}:
 *   put:
 *     tags:
 *       - Customers
 *     summary: Atualiza um cliente
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
 *         description: Cliente atualizado
 */
router.put('/:id', controller.update)

/**
 * @openapi
 * /customers/{id}:
 *   delete:
 *     tags:
 *       - Customers
 *     summary: Remove um cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Cliente removido
 */
router.delete('/:id', controller.delete)

export default router