import express from 'express';

import { addProduct } from '../controllers/products.js';

const router = express.Router();

router.post('/', addProduct);

export default router;
