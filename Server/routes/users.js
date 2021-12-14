import express from 'express';

import {
	signup,
	signin,
	getAllUsers,
	updateCart,
	checkUsers,
	getCurrentUser,
	updateUser,
	getUserOrders,
	getTotalSpend,
} from '../controllers/users.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/total-spend', getTotalSpend);
router.post('/signup', signup);
router.post('/signin', signin);
router.patch('/cart/:id', updateCart);
router.patch('/user/:email');
router.patch('/check-users/:token', checkUsers);
router.get('/current-user', getCurrentUser);
router.get('/user-orders', getUserOrders);
router.patch('/update-user/:id', updateUser);
export default router;
