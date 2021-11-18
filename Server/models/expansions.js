import mongoose from 'mongoose';

const expansionSchema = mongoose.Schema({
	expansion: { type: String, required: true },
	image: { type: String },
	slug: { type: String, required: true },
});

export default mongoose.model('Expansions', expansionSchema);
