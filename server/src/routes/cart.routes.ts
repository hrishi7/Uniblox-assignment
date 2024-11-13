import { Router } from 'express';
import { addToCart, getCart, updateCartItem, removeFromCart } from '../controllers/cart.controller';
import { validateCartItem } from '../middleware/validation';

const router = Router();

/**
 * @route POST /api/cart
 * @description Add a new item to user's cart
 * @access Public
 * @body {string} userId - User's unique identifier
 * @body {string} productId - Product's unique identifier
 * @body {number} quantity - Quantity of the product
 */
router.post('/', validateCartItem, addToCart);

/**
 * @route GET /api/cart/:userId
 * @description Get user's cart details
 * @access Public
 * @param {string} userId - User's unique identifier
 */
router.get('/:userId', getCart);

/**
 * @route PUT /api/cart/:itemId
 * @description Update quantity of an item in the cart
 * @access Public
 * @param {string} itemId - Cart item's unique identifier
 * @body {string} userId - User's unique identifier
 * @body {number} quantity - New quantity of the product
 */
router.put('/:itemId', updateCartItem);

/**
 * @route DELETE /api/cart/:itemId
 * @description Remove an item from the cart
 * @access Public
 * @param {string} itemId - Cart item's unique identifier
 * @body {string} userId - User's unique identifier
 */
router.delete('/:itemId', removeFromCart);

export default router;