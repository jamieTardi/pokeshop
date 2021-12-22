import express from 'express';

import {
	createPromotion,
	getPromotions,
	updatePromotions,
	checkPromo,
} from '../controllers/promotions.js';

const router = express.Router();

router.post('/', createPromotion);
router.get('/', getPromotions);
router.patch('/:id', updatePromotions);
router.get('/check', checkPromo);

export default router;
