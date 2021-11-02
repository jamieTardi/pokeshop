import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import users from '../models/users.js';

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
