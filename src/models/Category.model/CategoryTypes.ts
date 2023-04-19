import { Schema } from 'mongoose';
import { IDocument } from '..';

export interface ICategorySchema extends IDocument<ICategorySchema> {
	name: string;
	photo?: string;
	subCategories?: Schema.Types.ObjectId[];
	products: Schema.Types.ObjectId[];
}
