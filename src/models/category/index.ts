import { Schema, model } from 'mongoose';

import { Product } from '../product';

import type { ICategorySchema, TCategoryQueries } from './types';

const CategorySchema = new Schema<ICategorySchema, {}, {}, TCategoryQueries>({
	name: { type: String, required: true, trim: true },
	photo: { type: String, required: false},
	parentId: { type: Schema.Types.ObjectId, ref: 'Category', default: null},
	products: { type: [Schema.Types.ObjectId], ref: Product, required: true },
	featured: {type: Boolean, required: false},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: null },
	deletedAt: { type: Date, default: null },
});

CategorySchema.query.getCategories = async function () {
	return this.products;
};

// авто-удаление из бд через месяц после того как появилось поле deletedAt с временем удаления
CategorySchema.index({ "deletedAt": 1 }, { expireAfterSeconds: 60 });

export const Category = model<ICategorySchema>('Category', CategorySchema);
