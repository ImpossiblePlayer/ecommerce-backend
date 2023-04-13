import { Schema } from 'mongoose';

export type TCategorySchema = {
	name: string;
	photo?: string;
	subCategories?: string[];
	products: Schema.Types.ObjectId[];
};
