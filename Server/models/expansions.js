import mongoose from 'mongoose';

const expansionSchema = mongoose.Schema({
	expansion: { type: String },
	image: { type: String },
});

export default mongoose.model('Expansions', expansionSchema);
