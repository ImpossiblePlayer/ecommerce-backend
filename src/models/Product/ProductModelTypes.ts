import { UserType } from '../User/UserTypes';

export type ProductPhotoType = {
	url: string;
	thumbUrl?: string;
};

export type ProductSpecificationType = {
	name: string;
	value: string;
};

export type ProductPriceType = {
	current: number;
	old?: number;
};

export type ProductType = {
	id: number;
	name: string;
	category: string[]; // ['clothing', 'men's wear', 'summer wear']
	quantity: number;
	mainPhoto: ProductPhotoType;
	price: ProductPriceType;
	rating: number;
	sold: number;
	description: string;
	orders: number;
	additionalPhotos: ProductPhotoType[];
	specifications: ProductSpecificationType[];
	params: ProductSpecificationType[];
	advantages: string[];
	reviewsCount: number;
	reviews: ProductReviewType[];
	sellerId: string;
};

type ReviewType = {
	author: UserType;
	rating: number;
	likes: number;
	dislikes: number;
	date: Date;
};

type ProductReviewTextType = {
	advantages?: string;
	disadvantages?: string;
	comment: string;
};

export type ProductReviewType = ReviewType & {
	text: ProductReviewTextType;
};

export type SellerReviewType = ReviewType & {
	text: string;
};
