import { Schema, model } from 'mongoose';

import { Product } from '../product';

import type { ICategorySchema, TCategoryQueries } from './types';

const CategorySchema = new Schema<ICategorySchema, {}, {}, TCategoryQueries>({
	name: { type: String, required: true, trim: true },
	subCategories: { type: [Schema.Types.ObjectId], ref: 'Category' },
	products: { type: [Schema.Types.ObjectId], ref: Product, required: true },
});

CategorySchema.query.getProducts = async function () {
	return this.products;
};

export const Category = model<ICategorySchema>('Category', CategorySchema);