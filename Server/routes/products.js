import express from 'express';

import { addProduct, getAllProducts } from '../controllers/products.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', addProduct);

export default router;
