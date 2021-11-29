import express from 'express';

import { getCartTotal } from '../controllers/cart.js';

const router = express.Router();

router.get('/total', getCartTotal);

export default router;
