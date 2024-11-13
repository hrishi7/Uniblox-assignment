import { Router } from 'express';
import { generateDiscountCode, getStats } from '../controllers/admin.controller';
import { validateAdmin } from '../middleware/auth';

const router = Router();

/**
 * @route POST /api/admin/discount
 * @description Generate a discount code
 * @access Admin
 */
router.post('/discount', validateAdmin, generateDiscountCode);

/**
 * @route GET /api/admin/stats
 * @description Get admin statistics
 * @access Admin
 */
router.get('/stats', validateAdmin, getStats);

export default router;