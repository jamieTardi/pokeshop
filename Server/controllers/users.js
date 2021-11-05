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

		await users.findByIdAndUpdate(existingUser._id, {
			...body,
			refreshToken: token,
		});

		res.status(200).json({ result: existingUser, token, refresh });
	} catch (err) {
		res.status(500).json({ message: 'Something went wrong.' });
	}
};
