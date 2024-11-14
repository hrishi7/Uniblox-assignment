import { Router } from 'express';
import { getProducts} from '../controllers/product.controller';
import { validateOrder } from '../middleware/validation';

const router = Router();

/**
 * @route GET /api/products/
 * @description Get all products for a specific user
 * @access Public
 */
router.get('/', getProducts);

export default router;