import { model, Schema } from 'mongoose';
import {
	TProductReviewText,
	TProductReview,
	TSellerReview,
} from './ReviewTypes';
import { User } from '../UserModel';

const ProductReviewTextSchema = new Schema<TProductReviewText>({
	advantages: { type: String, default: '', trim: true },
	disadvantages: { type: String, default: '', trim: true },
	comment: { type: String, default: '', trim: true },
});

const ReviewSchema = new Schema<TProductReview>({
	author: { type: Schema.Types.ObjectId, ref: User },
	rating: Number,
	likes: Number,
	dislikes: Number,
	date: { type: Date, default: Date.now, required: true },
});

export const ProductReviewSchema = new Schema<TProductReview>({
	...ReviewSchema.obj,
	text: { type: ProductReviewTextSchema, required: true },
	image: [Schema.Types.UUID],
});

export const SellerReviewSchema = new Schema<TSellerReview>({
	...ReviewSchema.obj,
	text: { type: String, required: true },
});

export const ProductReview = model<TProductReview>(
	'ProductReview',
	ProductReviewSchema
);
export const SellerReview = model<TSellerReview>(
	'SellerReview',
	SellerReviewSchema
);
