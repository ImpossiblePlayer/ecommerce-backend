import { model, Schema } from 'mongoose';

import type {
	TProductPhoto,
	TProductPrice,
	TProductSpecification,
	IProductSchema,
	TProductMethods,
} from './ProductTypes';
import { ProductReview, ProductReviewSchema } from '../Review';
import { Seller } from '../Seller';

const ProductPhotoSchema = new Schema<TProductPhoto>({
	url: { type: Schema.Types.UUID, required: true },
	thumbUrl: { type: Schema.Types.UUID, required: false },
});
const ProductPriceSchema = new Schema<TProductPrice>({
	current: { type: Number, required: true },
	old: { type: Number, required: false },
});
const ProductSpecificationSchema = new Schema<TProductSpecification>({
	name: { type: String, required: true },
	value: { type: String, required: true },
});

export const ProductSchema = new Schema<
	IProductSchema,
	{},
	{},
	TProductMethods
>({
	name: { type: String, required: true, trim: true },
	categories: { type: [String], required: true, trim: true },
	quantity: { type: Number, required: true },
	mainPhoto: { type: ProductPhotoSchema, required: true },
	additionalPhotos: [ProductPhotoSchema],
	price: { type: ProductPriceSchema, required: true },
	comments: {
		type: Schema.Types.ObjectId,
		ref: 'ProductReview',
		required: true,
	},
	rating: { type: Number, required: true },
	soldQuantity: { type: Number, required: true },
	description: { type: String, required: true },
	orders: { type: Number, required: true },
	specifications: [ProductSpecificationSchema],
	params: [ProductSpecificationSchema],
	advantages: { type: [String], required: true },
	reviewsCount: { type: Number, required: true },
	reviews: { type: [ProductReviewSchema], ref: ProductReview },
	sellerId: { type: Schema.Types.ObjectId, ref: Seller, required: true },
});

ProductSchema.methods.createProduct = async function (
	name: string,
	categories: string,
	quantity: number,
	photos: string[],
	price: TProductPrice
): Promise<void> {
	this.name = name;
	this.categorise = categories;
	this.quantity = quantity;
	this.photos = photos;
	this.price = price;
};

export const Product = model<IProductSchema>('Product', ProductSchema);
