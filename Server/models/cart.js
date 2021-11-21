import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
	userRef: { type: String },
	items: { type: [Object], required: true },
	isExistingUser: { type: Boolean, required: true },
});

export default mongoose.model('Carts', cartSchema);
