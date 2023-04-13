import { Schema, model } from 'mongoose';
import { TCategorySchema } from './CategoryTypes';

const CategorySchema = new Schema<TCategorySchema>({
	name: { type: String, required: true, trim: true },
	subCategories: { type: [String], trim: true },
	products: { type: [Schema.Types.ObjectId], ref: 'Product', required: true },
});

// CategorySchema.static.getProducts = async function () {
// 	return this.products;
// };

export const Category = model<TCategorySchema>('Category', CategorySchema);
