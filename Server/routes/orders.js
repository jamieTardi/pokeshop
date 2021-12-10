import express from 'express';

import {
	addOrder,
	getAllOrders,
	getTotals,
	getDailyTotals,
} from '../controllers/orders.js';

const router = express.Router();

router.post('/', addOrder);
router.get('/', getAllOrders);
router.get('/totals', getTotals);
router.get('/weekly', getDailyTotals);

export default router;
