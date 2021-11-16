import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
	category: { type: String, required: true },
	image: { type: String },
	slug: { type: String, required: true },
});

export default mongoose.model('Categories', categorySchema);
