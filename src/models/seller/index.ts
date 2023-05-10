import { Schema } from 'mongoose';
import { SellerReview, SellerReviewSchema } from '@models/review';
import { Customer } from '@models/customer';

import type { ISellerSchema, TSellerModel, TSellerDelivery } from './types';

const SellerDeliverySchema = new Schema<TSellerDelivery>({
	cost: Number,
	regions: [String], // Массив регионов, в которые осуществляется доставка
});

export const SellerSchema = new Schema<ISellerSchema>({
	supplierCompany: { type: String, trim: true },
	isVerified: Boolean,
	isWorldwideShipping: Boolean,
	description: String,
	delivery: SellerDeliverySchema,
	paymentMethods: { type: [String], trim: true },
	returnPolicy: { type: String, trim: true },
	categories: { type: [String], trim: true },
	brands: { type: [String], trim: true },
	rating: Number,
	reviews: { type: [SellerReviewSchema], ref: SellerReview },
});

export const Seller = Customer.discriminator<TSellerModel>(
	'Seller',
	SellerSchema
);
