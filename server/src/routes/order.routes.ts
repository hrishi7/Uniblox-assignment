import { Router } from 'express';
import { createOrder, getOrders } from '../controllers/order.controller';
import { validateOrder } from '../middleware/validation';

const router = Router();

/**
 * @route POST /api/orders/checkout
 * @description Create a new order
 * @access Public
 * @param {string} userId - User's unique identifier
 */
router.post('/checkout', validateOrder, createOrder);

/**
 * @route GET /api/orders/:userId
 * @description Get all orders for a specific user
 * @access Public
 * @param {string} userId - User's unique identifier
 */
router.get('/:userId', getOrders);

export default router;