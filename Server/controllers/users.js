import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import orders from '../models/orders.js';
import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const key = process.env.JWT_SECRET;
const refresh = process.env.JWT_REFRESH;

export const signup = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
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
				totalSpend: 0,
			});
			const token = jwt.sign({ email: result.email, id: result._id }, key);
			res.status(200).json({ result: result, token });
		} catch (err) {
			console.log(err);
		}
	} else {
		res.status(404).json({ message: 'Wrong Key' });
	}
};

export const signin = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
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
	} else {
		res.status(404).json({ message: 'Wrong Key' });
	}
};

export const getAllUsers = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		try {
			const userConfig = await User.find();
			res.status(200).json(userConfig);
		} catch (e) {
			res.status(404).json({ message: 'Error fetching User.' });
		}
	} else {
		res.status(404).json({ message: 'Wrong Key' });
	}
};

export const updateCart = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
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
	} else {
		res.status(404).json({ message: 'Wrong Key' });
	}
};

export const checkUsers = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
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
	} else {
		res.status(404).json({ message: 'Wrong Key' });
	}
};

export const getCurrentUser = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		const { token } = req.query;

		const existingUser = await User.findOne({ refreshToken: token });

		try {
			res.status(200).json(existingUser);
		} catch (err) {
			res.status(500).json({ message: err });
		}
	} else {
		res.status(404).json({ message: 'Wrong Key' });
	}
};

export const updateUser = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		const { _id } = req.body;
		const user = req.body;

		const existingUser = await User.findById(_id);

		if (!existingUser) {
			res.status(404).json({ message: 'User not found!' });
		}
		try {
			await User.findByIdAndUpdate(_id, {
				...user,
				address: {
					...user.address,
					firstName: user.firstName,
					lastName: user.lastName,
				},
			});
			res
				.status(204)
				.json({ message: 'Details have been sucessfully updated!' });
		} catch (err) {
			res.status(500).json({ message: 'Something has gone wrong' });
		}
	} else {
		res.status(404).json({ message: 'Wrong Key' });
	}
};

export const getUserOrders = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		const { token } = req.query;

		const findUser = await User.findOne({ refreshToken: token });

		try {
			const userEmail = findUser.email;

			if (userEmail) {
				const userOrders = await orders.find({ 'customer.email': userEmail });
				res.status(203).json(userOrders);
			}
		} catch (err) {
			res
				.status(500)
				.json({ message: 'Something went wrong find the user...' });
		}
	} else {
		res.status(404).json({ message: 'Wrong Key' });
	}
};

export const getTotalSpend = async (req, res) => {
	if (req.headers.apikey === process.env.API_KEY) {
		const { email } = req.query;

		let findPurchases = await orders.find({ 'customer.email': email });

		if (!findPurchases) {
			res.status(200).json(0);
		}

		try {
			let total = 0;

			findPurchases.forEach((item) => (total += item.totalRaw));

			const user = await User.findOne({ email });

			const { _id } = user;

			const updateUser = await User.findByIdAndUpdate(_id, {
				firstName: user.firstName,
				lastName: user.lastName,
				fullName: user.fullName,
				email: user.email,
				address: user.address,
				password: user.password,
				phoneNo: user.phoneNo,
				createdOn: user.createdOn,
				lastLogin: '',
				role: user.role,
				dob: '',
				isPromtions: user.isPromtions,
				refreshToken: user.refreshToken,
				totalSpend: total,
			});

			res.status(200).json({ updateUser });
		} catch (err) {
			res.status(500).json({ message: 'Something weont wrong...' });
		}
	} else {
		res.status(404).json({ message: 'Wrong Key' });
	}
};
