import { Schema, model } from 'mongoose';

import { Product } from '../Product.model';

import type { ICategorySchema } from './CategoryTypes';

const CategorySchema = new Schema<ICategorySchema>({
	name: { type: String, required: true, trim: true },
	subCategories: { type: [Schema.Types.ObjectId], ref: 'Category' },
	products: { type: [Schema.Types.ObjectId], ref: Product, required: true },
});

// CategorySchema.static.getProducts = async function () {
// 	return this.products;
// };

export const Category = model<ICategorySchema>('Category', CategorySchema);
