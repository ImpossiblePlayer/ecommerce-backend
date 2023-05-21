import { model, Schema } from 'mongoose';

import type { TProductReview, TSellerReview } from './types';

const ReviewSchema = new Schema<TProductReview>({
  author: { type: Schema.Types.ObjectId, ref: 'Customer' },
  rating: Number,
  likes: Number,
  dislikes: Number,
  date: { type: Date, default: Date.now, required: true },
});

export const ProductReviewSchema = new Schema<TProductReview>({
  ...ReviewSchema.obj,
  text: {
    type: {
      advantages: { type: String, default: '', trim: true },
      disadvantages: { type: String, default: '', trim: true },
      comment: { type: String, default: '', trim: true },
    },
    required: true,
  },
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
