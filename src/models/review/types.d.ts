import { Schema } from 'mongoose';

type TReview = {
	author: Schema.Types.ObjectId;
	rating: number;
	likes: number;
	dislikes: number;
	date: Date;
};

export type TProductReviewText = {
	advantages?: string;
	disadvantages?: string;
	comment?: string;
};

export type TProductReview = TReview & {
	text: TProductReviewText;
	image: Schema.Types.UUID[];
};
export type TSellerReview = TReview & {
	text: string;
};
