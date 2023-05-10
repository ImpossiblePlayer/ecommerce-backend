import { Schema } from 'mongoose';
import { IDocument } from '@models/types';

export interface ICategorySchema extends IDocument<ICategorySchema> {
	name: string;
	photo?: string;
	subCategories?: Schema.Types.ObjectId[];
	products: Schema.Types.ObjectId[];
}

export type TCategoryQueries = {
	getProducts(): Promise<any>;
};

export type TCategoryModel = ICategorySchema & TCategoryQueries;
