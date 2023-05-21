import { Schema, model } from 'mongoose';

import type { ICategorySchema, TCategoryQueries } from './types';

const CategorySchema = new Schema<
  ICategorySchema,
  unknown,
  unknown,
  TCategoryQueries
>(
  {
    name: { type: String, required: true, trim: true },
    photo: { type: String, required: false },
    subCategories: {
      type: [Schema.Types.ObjectId],
      ref: 'Category',
      default: null,
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
    products: { type: [Schema.Types.ObjectId], ref: 'Product', required: true },
    featured: { type: Boolean, required: false },
    deletedAt: { type: Date, default: null },
  },
  {
    query: {
      getSubCategories: async function () {
        return this.products;
      },
      addSubCategory: async function (id: string) {
        const isUniqueId = this.subCategories.find((c) => c.id === id);
        if (isUniqueId) return false;

        this.subCategories.push(id);
        // TODO: subCategories
      },
    },
    timestamps: true,
  }
);

// авто-удаление из бд через месяц после того как появилось поле deletedAt с временем удаления
CategorySchema.index({ deletedAt: 1 }, { expireAfterSeconds: 60 * 24 * 30 });

export const Category = model<ICategorySchema>('Category', CategorySchema);
