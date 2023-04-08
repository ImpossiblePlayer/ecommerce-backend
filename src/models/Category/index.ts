import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
	name: { type: String, required: true, trim: true },
	subCategories: { type: [String], trim: true },
	products: { type: [Schema.Types.ObjectId], ref: 'Product', required: true },
});

// CategorySchema.static.getProducts = async function () {
// 	return this.products;
// };

export const Category = model('Category', CategorySchema);
