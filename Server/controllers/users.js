import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
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
		address,
	} = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res.status(400).json({ message: 'User already exist' });
		if (password !== confirmPassword)
			return res.status(400).json({ message: 'Passwords do not match.' });
		const hashedPassword = await bcrypt.hash(password, 12);

		// test arg is client secret

		const result = await User.create({
			firstName,
			lastName,
			email,
			createdOn,
			isPromtions,
			address: {
				firstName: firstName,
				lastName: lastName,
				addressLineOne: '',
				email: email,
				city: '',
				county: '',
				postCode: '',
				country: '',
			},
			password: hashedPassword,
			fullName: `${firstName} ${lastName}`,
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
		const existingUser = await User.findOne({ email });

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

		await User.findByIdAndUpdate(existingUser._id, {
			...body,
			password: existingUser.password,
			refreshToken: token,
		});

		res.status(200).json({ result: existingUser, token, refresh });
	} catch (err) {
		res.status(500).json({ message: 'Something went wrong.' });
	}
};

export const getAllUsers = async (req, res) => {
	try {
		const userConfig = await User.find();
		res.status(200).json(userConfig);
	} catch (e) {
		res.status(404).json({ message: 'Error fetching User.' });
	}
};

export const updateCart = async (req, res) => {
	const { id } = req.params;
	const cartItem = req.body;

	const existingUser = await User.findById(id);

	if (!existingUser) {
		res.status(404).json({ message: 'No user found by that id.' });
	}
	try {
		const updateUser = await User.findByIdAndUpdate(id, {
			...existingUser,
			cart: [...existingUser, cartItem],
		});
		res.status(202).json({
			cart: updateUser.cart,
			message: 'Item has been added to cart 🎊',
		});
	} catch (err) {
		res.status(500).json({
			message:
				'An issue has occured, please login or refresh the page and try again.',
		});
	}
};

export const checkUsers = async (req, res) => {
	const address = req.body;
	const { token } = req.params;

	const existingUser = await User.findOne({ refreshToken: token });

	try {
		const checkIfVerifiedAddress = () => {
			return existingUser &&
				existingUser.address &&
				Object.keys(existingUser.address).length
				? true
				: false;
		};

		if (checkIfVerifiedAddress()) {
			res.status(200).json({ user: existingUser });
		} else if (checkIfVerifiedAddress() === false) {
			const update = await User.findByIdAndUpdate(existingUser._id, {
				...existingUser,
				address,
			});
			res.status(201).json({ user: update });
		} else {
			res.status(500).json({ message: 'Something gone wrong....' });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

export const getCurrentUser = async (req, res) => {
	const { token } = req.query;

	const existingUser = await User.findOne({ refreshToken: token });

	try {
		res.status(200).json(existingUser);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

export const updateUser = async (req, res) => {
	const { _id } = req.body;
	const user = req.body;

	const existingUser = await User.findById(_id);

	if (!existingUser) {
		res.status(404).json({ message: 'User not found!' });
	}
	try {
		await User.findByIdAndUpdate(_id, {
			...user,
		});
		res.status(204).json({ message: 'Details have been sucessfully updated!' });
	} catch (err) {
		res.status(500).json({ message: 'Something has gone wrong' });
	}
};
