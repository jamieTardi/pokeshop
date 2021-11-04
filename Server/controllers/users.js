import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import users from '../models/users.js';
import express from 'express';

const app = express();

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
	} = req.body;
	try {
		const existingUser = await users.findOne({ email });
		if (existingUser)
			return res.status(400).json({ message: 'User already exist' });
		if (password !== confirmPassword)
			return res.status(400).json({ message: 'Passwords do not match.' });
		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await users.create({
			firstName,
			lastName,
			email,
			createdOn,
			isPromtions,
			password: hashedPassword,
			name: `${firstName} ${lastName}`,
			phoneNo,
		});

		// test arg is client secret
		const token = jwt.sign({ email: result.email, id: result._id }, 'new', {
			expiresIn: '1h',
		});

		res.status(200).json({ result: result, token });
	} catch (err) {
		// res.status(500).json({ message: 'Something went wrong.' });
		console.log(err);
	}
};

export const signin = async (req, res) => {
	const { email, password, isStayLogged } = req.body;

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
			'test',
			{ expiresIn: '1h' },
		);

		res.status(200).json({ result: existingUser, token });
	} catch (err) {
		res.status(500).json({ message: 'Something went wrong.' });
	}
};
