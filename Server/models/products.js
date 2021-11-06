import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
	title: { type: String, required: true },
	price: { type: Number, required: true },
	image: { type: String },
	description: { type: String, required: true },
	expansion: { type: String, required: true },
	category: { type: String, required: true },
	SKU: { type: String },
	releaseDate: { type: Date },
	stockAmount: { type: Number },
	preOrder: { type: Boolean },
});

export default mongoose.model('Products', productSchema);
