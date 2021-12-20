import express from 'express';

import {
	addCategory,
	getCategory,
	updateCategory,
	deleteCategory,
} from '../controllers/category.js';

const router = express.Router();

router.get('/', getCategory);
router.post('/', addCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
