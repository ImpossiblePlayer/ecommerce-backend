import { Schema } from 'mongoose';

import { IDocument } from '@models/types';

export interface ICategorySchema extends IDocument<ICategorySchema> {
	name: string;
	photo?: string;
	parentId: Schema.Types.ObjectId | null;
	products: Schema.Types.ObjectId[];
	featured?: boolean;
	createdAt: Date
	updatedAt?: Date
	deletedAt?: Date
}

export type TCategoryQueries = {
	getCategories(): Promise<ICategorySchema[]>;
	CreateCategory(id: string, text: string, parentId: string): Promise<ICategorySchema>;
};

export type TCategoryModel = ICategorySchema & TCategoryQueries;
