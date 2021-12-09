import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import productsRoutes from './routes/products.js';
import cookieParser from 'cookie-parser';
import expansionRoutes from './routes/expansions.js';
import categoryRoutes from './routes/category.js';
import cartRoutes from './routes/cart.js';
import stripeRoutes from './routes/stripe.js';
import orderRoutes from './routes/orders.js';

import { generateUploadURL } from './middleware/imageHandler.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(cookieParser());
app.use('/users', userRoutes);
app.use('/products', productsRoutes);
app.use('/expansion', expansionRoutes);
app.use('/category', categoryRoutes);
app.use('/cart', cartRoutes);
app.use('/create-payment-intent', stripeRoutes);
app.use('/orders', orderRoutes);
app.get('/s3URL', async (req, res) => {
	const url = await generateUploadURL();
	res.send({ url });
});
app.get('/', (req, res) => {
	res.send('Poke Decks Api Home');
});

const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT;

mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => app.listen(PORT, () => console.log(`server running on ${PORT}`)))
	.catch((e) => console.log(e));
