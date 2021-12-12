import express from 'express';

import {
	addOrder,
	getAllOrders,
	getTotals,
	getDailyTotals,
	deleteOrder,
	updateShipping,
} from '../controllers/orders.js';

const router = express.Router();

router.post('/', addOrder);
router.get('/', getAllOrders);
router.get('/totals', getTotals);
router.get('/weekly', getDailyTotals);
router.delete('/delete/:id', deleteOrder);
router.patch('/shipping/:id', updateShipping);

export default router;
