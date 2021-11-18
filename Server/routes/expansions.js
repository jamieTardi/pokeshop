import express from 'express';

import {
	addExpansion,
	getExpansions,
	updateExpansion,
} from '../controllers/expansions.js';

const router = express.Router();

router.get('/', getExpansions);
router.post('/', addExpansion);
router.patch('/:id', updateExpansion);
export default router;
