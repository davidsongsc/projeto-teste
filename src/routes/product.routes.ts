import { Router } from 'express'
import { ProductController } from '@/controllers/product.controller'
import { cacheMiddleware } from '@/middlewares/cacheMiddleware';

const router = Router()
const controller = new ProductController()

/**
 * @openapi
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Lista produtos
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
 *         description: Lista de produtos
 */
router.get('/', cacheMiddleware('products', 60), controller.index)

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Busca produto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Produto encontrado
 *       '404':
 *         description: Produto não encontrado
 */
router.get('/:id', cacheMiddleware('products', 60), controller.show)

/**
 * @openapi
 * /products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Cria um produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: decimal
 *     responses:
 *       '201':
 *         description: Produto criado
 */
router.post('/', controller.store)

/**
 * @openapi
 * /products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Atualiza um produto
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
 *               price:
 *                 type: number
 *                 format: decimal
 *               status:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Produto atualizado
 *       '404':
 *         description: Produto não encontrado
 */
router.put('/:id', controller.update)

/**
 * @openapi
 * /products/{id}/status:
 *   patch:
 *     tags:
 *       - Products
 *     summary: Atualiza o status do produto
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
 *       '404':
 *         description: Produto não encontrado
 */
router.patch('/:id/status', controller.updateStatus)

/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Remove um produto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Produto removido
 *       '404':
 *         description: Produto não encontrado
 */
router.delete('/:id', controller.delete)

export default router