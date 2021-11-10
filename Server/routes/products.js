import express from 'express';

import {
	addProduct,
	getAllProducts,
	deleteProduct,
} from '../controllers/products.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', addProduct);
router.delete('/:id', deleteProduct);

export default router;
