import { Router } from 'express'
import { OrderItemController } from '@/controllers/orderItems.controller'
import { checkPermission } from '@/middlewares/checkPermissionMiddleware'
import { ensureAuthenticated } from '@/middlewares/auth'

const router = Router()
const controller = new OrderItemController()

/**
 * @openapi
 * /order-items:
 *   post:
 *     tags:
 *       - Order Items
 *     summary: Adiciona um item ao pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - itemId
 *               - count
 *               - total
 *             properties:
 *               orderId:
 *                 type: string
 *               itemId:
 *                 type: string
 *               count:
 *                 type: integer
 *               total:
 *                 type: number
 *                 format: decimal
 *     responses:
 *       '201':
 *         description: Item adicionado ao pedido
 */
router.post(
  '/',
  ensureAuthenticated,
  checkPermission('order:update'),
  controller.store
)

/**
 * @openapi
 * /order-items/{id}:
 *   put:
 *     tags:
 *       - Order Items
 *     summary: Atualiza quantidade ou total de um item no pedido
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
 *               count:
 *                 type: integer
 *               total:
 *                 type: number
 *                 format: decimal
 *     responses:
 *       '200':
 *         description: Item do pedido atualizado
 */
router.put(
  '/:id',
  ensureAuthenticated,
  checkPermission('order:update'),
  controller.update
)

/**
 * @openapi
 * /order-items/{id}:
 *   delete:
 *     tags:
 *       - Order Items
 *     summary: Remove um item do pedido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Item removido do pedido
 */
router.delete(
  '/:id',
  ensureAuthenticated,
  checkPermission('order:update'),
  controller.delete
)

export default router