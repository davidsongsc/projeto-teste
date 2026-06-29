import { Router } from 'express'
import { CustomerController } from '../controllers/customer.controller'
import { cacheMiddleware } from '@/middlewares/cacheMiddleware'
import { checkPermission } from '@/middlewares/checkPermissionMiddleware'
import { ensureAuthenticated } from '@/middlewares/auth'

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
 *       - in: query
 *         name: status
 *         schema:
 *           type: boolean
 *     responses:
 *       '200':
 *         description: OK
 */
router.get(
    '/',
    ensureAuthenticated,
    checkPermission('customer:read'),
    cacheMiddleware('customers', 60),
    controller.index)

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
 *         description: OK
 */
router.get(
    '/:id',
    ensureAuthenticated,
    checkPermission('customer:read'),
    cacheMiddleware('customers', 60),
    controller.show)

/**
 * @openapi
 * /customers:
 *   post:
 *     tags:
 *       - Customers
 *     summary: Cria cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - document
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               document:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       '201':
 *         description: Criado
 */
router.post(
    '/',
    ensureAuthenticated,
    checkPermission('customer:create'),
    controller.store)

/**
 * @openapi
 * /customers/{id}:
 *   put:
 *     tags:
 *       - Customers
 *     summary: Atualiza cliente
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
 *               document:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: OK
 */
router.put(
    '/:id',
    ensureAuthenticated,
    checkPermission('customer:update'),
    controller.update)

/**
 * @openapi
 * /customers/{id}:
 *   delete:
 *     tags:
 *       - Customers
 *     summary: Deleta cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Sem conteúdo
 */
router.delete(
    '/:id',
    ensureAuthenticated,
    checkPermission('customer:delete'),
    controller.delete)

export default router