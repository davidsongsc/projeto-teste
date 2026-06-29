import { Router } from 'express'
import { OrderController } from '@/controllers/order.controller'
import { cacheMiddleware } from '@/middlewares/cacheMiddleware'
import { checkPermission } from '@/middlewares/checkPermissionMiddleware'
import { ensureAuthenticated } from '@/middlewares/auth'
const router = Router()
const controller = new OrderController()

/**
 * @openapi
 * /orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Lista pedidos
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
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de pedidos
 */
router.get(
    '/',
    ensureAuthenticated,
    checkPermission('order:read'),
    cacheMiddleware('orders', 60),
    controller.index)

/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Busca pedido por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Pedido encontrado
 *       '404':
 *         description: Pedido não encontrado
 */
router.get(
    '/:id',
    ensureAuthenticated,
    checkPermission('order:read'),
    cacheMiddleware('orders', 60),
    controller.show)

/**
 * @openapi
 * /orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Cria um pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - totalPrice
 *               - status
 *             properties:
 *               userId:
 *                 type: string
 *               totalPrice:
 *                 type: number
 *                 format: decimal
 *               status:
 *                 type: string
 *                 enum:
 *                   - DRAFT
 *                   - CONFIRMED
 *                   - CANCELLED
 *     responses:
 *       '201':
 *         description: Pedido criado
 */
router.post(
    '/',
    ensureAuthenticated,
    checkPermission('order:create'),
    controller.store)

/**
 * @openapi
 * /orders/{id}:
 *   put:
 *     tags:
 *       - Orders
 *     summary: Atualiza um pedido
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
 *               userId:
 *                 type: string
 *               totalPrice:
 *                 type: number
 *                 format: decimal
 *               status:
 *                 type: string
 *                 enum:
 *                   - DRAFT
 *                   - CONFIRMED
 *                   - CANCELLED
 *     responses:
 *       '200':
 *         description: Pedido atualizado
 *       '404':
 *         description: Pedido não encontrado
 */
router.put(
    '/:id',
    ensureAuthenticated,
    checkPermission('order:update'),
    controller.update)

/**
 * @openapi
 * /orders/{id}:
 *   delete:
 *     tags:
 *       - Orders
 *     summary: Remove um pedido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Pedido removido
 *       '404':
 *         description: Pedido não encontrado
 */
router.delete(
    '/:id',
    ensureAuthenticated,
    checkPermission('order:delete'),
    controller.delete)

export default router