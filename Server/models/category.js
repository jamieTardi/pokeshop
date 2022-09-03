import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
	created: { type: Date, required: true },
	category: { type: String, required: true },
	image: { type: String },
	slug: { type: String, required: true },
});

export default mongoose.model("Categories", categorySchema);
