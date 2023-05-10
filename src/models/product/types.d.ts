import { IDocument } from '@models/types';
import { TProductReview } from '@models/review/types';
import type { Schema } from 'mongoose';

export type TProductPhoto = {
	url: Schema.Types.UUID;
	thumbUrl?: Schema.Types.UUID;
};
export type TProductSpecification = {
	name: string;
	value: string;
};
export type TProductPrice = {
	current: number;
	old?: number;
};

export interface IProductSchema extends IDocument<IProductSchema> {
	name: string;
	categories: string[]; // ['clothing', 'men's wear', 'summer wear']
	quantity: number;
	mainPhoto: TProductPhoto;
	additionalPhotos: TProductPhoto[];
	price: TProductPrice;
	comments: Schema.Types.ObjectId;
	rating: number;
	soldQuantity: number;
	description: string;
	orders: number;
	specifications: TProductSpecification[];
	params: TProductSpecification[];
	advantages: string[];
	reviewsCount: number;
	reviews: TProductReview[];
	sellerId: Schema.Types.ObjectId;
}

export type TProductMethods = {
	createProduct(
		name: string,
		description: string,
		categories: string[],
		quantity: number,
		photos: string[],
		price: TProductPrice
	): Promise<void>;
};

export type TProductQueries = {
	updateProduct(
		name: string,
		description: string,
		categories: string[],
		quantity: number,
		photos: string[],
		price: TProductPrice
	): Promise<boolean>;
};

export type TProductModel = IProductSchema & TProductMethods & TProductQueries;
