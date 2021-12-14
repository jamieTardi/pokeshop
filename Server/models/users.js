import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	fullName: { type: String },
	email: { type: String, required: true },
	address: { type: Object, required: true },
	password: { type: String, required: true },
	phoneNo: { type: String, required: true },
	createdOn: { type: String, required: true },
	lastLogin: { type: String },
	role: {
		type: String,
		default: 'member',
		enum: ['member', 'admin', 'subscriber', 'premiumMember'],
	},
	dob: { type: String },

	isPromtions: { type: Boolean, required: true },
	refreshToken: { type: String },
	totalSpend: { type: Number },
});

export default mongoose.model('User', userSchema);
