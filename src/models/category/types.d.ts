import { Schema } from 'mongoose';

import type { IDocument } from '@models/types';

export interface ICategorySchema extends IDocument<ICategorySchema> {
  name: string;
  photo?: string;
  subCategories: Schema.Types.ObjectId | null;
  parentCategory: Schema.Types.ObjectId | null;
  products: Schema.Types.ObjectId[];
  featured?: boolean;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type TCategoryQueries = {
  getSubCategories(): Promise<ICategorySchema[]>;
  addSubCategory(
    id: string,
    text: string,
    subCategories: string
  ): Promise<boolean>;
};

export type TCategoryModel = ICategorySchema & TCategoryQueries;
