import mongoose from 'mongoose';

const ordersSchema = mongoose.Schema({
	orderNo: { type: String, required: true },
	customer: { type: Object, required: true },
	items: { type: [Object], required: true },
	total: { type: String, required: true },
	orderDate: { type: Date, required: true },
	totalRaw: { type: Number, required: true },
});

export default mongoose.model('Orders', ordersSchema);
