import express from 'express';

import {
	signup,
	signin,
	getAllUsers,
	updateCart,
	checkUsers,
} from '../controllers/users.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/signup', signup);
router.post('/signin', signin);
router.patch('/cart/:id', updateCart);
router.patch('/user/:email');
router.patch('/check-users/:token', checkUsers);
export default router;
