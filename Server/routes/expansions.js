import express from 'express';

import { addExpansion, getExpansions } from '../controllers/expansions.js';

const router = express.Router();

router.get('/', getExpansions);
router.post('/', addExpansion);

export default router;
