import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
	category: { type: String },
	image: { type: String },
});

export default mongoose.model('Categories', categorySchema);
