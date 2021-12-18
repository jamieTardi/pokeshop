import mongoose from 'mongoose';

const orderTokenSchema = mongoose.Schema({
	token: { type: String, required: true },
	customer: { type: Object, required: true },
	items: { type: [Object], required: true },
	total: { type: String, required: true },
	totalRaw: { type: Number, required: true },
	creationDate: { type: Date, required: true },
});

export default mongoose.model('orderToken', orderTokenSchema);
