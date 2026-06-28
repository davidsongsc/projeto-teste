import { Router } from 'express'
import { ItemController } from '@/controllers/item.controller'
import { cacheMiddleware } from '@/middlewares/cacheMiddleware'

const router = Router()
const controller = new ItemController()

/**
 * @openapi
 * /items:
 *   get:
 *     tags:
 *       - Items
 *     summary: Lista itens
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
 *         name: orderId
 *         schema:
 *           type: string
 *       - in: query
 *         name: productId
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de itens
 */
router.get('/', cacheMiddleware('items', 60), controller.index)

/**
 * @openapi
 * /items/{id}:
 *   get:
 *     tags:
 *       - Items
 *     summary: Busca item por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Item encontrado
 *       '404':
 *         description: Item não encontrado
 */
router.get('/:id', cacheMiddleware('items', 60), controller.show)

/**
 * @openapi
 * /items:
 *   post:
 *     tags:
 *       - Items
 *     summary: Cria um item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - productId
 *               - price
 *               - count
 *             properties:
 *               orderId:
 *                 type: string
 *               productId:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: decimal
 *               count:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Item criado
 */
router.post('/', controller.store)

/**
 * @openapi
 * /items/{id}:
 *   put:
 *     tags:
 *       - Items
 *     summary: Atualiza um item
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
 *               orderId:
 *                 type: string
 *               productId:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: decimal
 *               count:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Item atualizado
 *       '404':
 *         description: Item não encontrado
 */
router.put('/:id', controller.update)

/**
 * @openapi
 * /items/{id}:
 *   delete:
 *     tags:
 *       - Items
 *     summary: Remove um item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Item removido
 *       '404':
 *         description: Item não encontrado
 */
router.delete('/:id', controller.delete)

export default router