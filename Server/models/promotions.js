import mongoose from 'mongoose';

const promotionSchema = mongoose.Schema({
	title: { type: String, required: true },
	discount: { type: Number, required: true },
	isActive: { type: Boolean, required: true },
});

export default mongoose.model('Promotions', promotionSchema);
