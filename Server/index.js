import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import productsRoutes from './routes/products.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(cookieParser());
app.use('/users', userRoutes);
app.use('/products', productsRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT;

mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => app.listen(PORT, () => console.log(`server running on ${PORT}`)))
	.catch((e) => console.log(e));
