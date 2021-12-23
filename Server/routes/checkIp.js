import express from 'express';

import { checkIp } from '../middleware/checkIp.js';

const router = express.Router();

router.post('/', checkIp);

export default router;
