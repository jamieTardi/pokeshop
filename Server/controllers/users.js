import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import users from '../models/users.js';
import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const key = process.env.JWT_SECRET;
const refresh = process.env.JWT_REFRESH;

export const signup = async (req, res) => {
	const {
		email,
		password,
		firstName,
		lastName,
		phoneNo,
		confirmPassword,
		createdOn,
		isPromtions,
		refreshToken,
	} = req.body;

	try {
		const existingUser = await users.findOne({ email });
		if (existingUser)
			return res.status(400).json({ message: 'User already exist' });
		if (password !== confirmPassword)
			return res.status(400).json({ message: 'Passwords do not match.' });
		const hashedPassword = await bcrypt.hash(password, 12);

		// test arg is client secret

		const result = await users.create({
			firstName,
			lastName,
			email,
			createdOn,
			isPromtions,
			password: hashedPassword,
			name: `${firstName} ${lastName}`,
			phoneNo,
			refreshToken,
		});
		const token = jwt.sign({ email: result.email, id: result._id }, key);
		res.status(200).json({ result: result, token });
	} catch (err) {
		console.log(err);
	}
};

export const signin = async (req, res) => {
	const { email, password, isStayLogged, _id } = req.body;
	const body = req.body;

	try {
		const existingUser = await users.findOne({ email });
		if (!existingUser)
			return res.status(404).json({ message: "User dosen't exist" });

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password,
		);

		if (!isPasswordCorrect)
			return res.status(400).json({ message: 'Invalid Details.' });

		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			key,
		);

		res.status(200).json({ result: existingUser, token, refresh });
	} catch (err) {
		// const refreshToken = jwt.sign(
		// 	{ email: existingUser.email, id: existingUser._id },
		// 	refresh,
		// 	{
		// 		expiresIn: '1h',
		// 	},
		// );

		res.status(500).json({ message: 'Something went wrong.' });
	}
};
export const tokenReq = async (req, res) => {
	// const refreshTokens = req.body.refresh;
	// const { email, _id, refreshToken } = req.body.result;
	// const body = req.body.result;
	// if (refreshTokens === null || undefined) {
	// 	return res.status(401);
	// }
	// if (refreshTokens === !refreshToken) {
	// 	return res.status(403);
	// }
	// try {
	// 	jwt.verify(refreshTokens, process.env.JWT_REFRESH, (err, user) => {
	// 		if (err) return res.status(403);
	// 		const accessToken = generateAccessToken(user);
	// 		res.json({ accessToken: accessToken });
	// 	});
	// 	const existingUser = await users.findOne({ email });
	// 	if (existingUser) {
	// 		const updateUser = await users.findByIdAndUpdate(_id, {
	// 			...body,
	// 			refreshToken: refreshTokens,
	// 		});
	// 		res.status(200).json(updateUser);
	// 	}
	// } catch (err) {}
};

function generateAccessToken(user) {
	return jwt.sign(user, key, { expiresIn: '15s' });
}
