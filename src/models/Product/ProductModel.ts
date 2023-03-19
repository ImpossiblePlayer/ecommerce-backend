import { model, Schema } from 'mongoose';
import type { ProductPhotoType, ProductPriceType } from './ProductModelTypes';

const ProductPhotoSchema = new Schema<ProductPhotoType>({
	url: { type: String, required: true },
	thumbUrl: { type: String, required: false },
});
const ProductPriceSchema = new Schema<ProductPriceType>({
	current: { type: Number, required: true },
	old: { type: Number, required: false },
});
const ProductSpecificationSchema = new Schema({
	name: { type: String, required: true },
	value: { type: String, required: true },
});
const ReviewSchema = new Schema({
	author: { type: String, required: true },
	text: { type: String, required: true },
	rating: { type: Number, required: true },
});

const ProductSchema = new Schema({
	name: { type: String, required: true },
	category: { type: [String], required: true },
	quantity: { type: Number, required: true },
	mainPhoto: ProductPhotoSchema,
	additionalPhotos: [{ type: ProductPhotoSchema, required: false }],
	price: ProductPriceSchema,
	rating: { type: Number, required: true },
	sold: { type: Number, required: true },
	description: { type: String, required: true },
	orders: { type: Number, required: true },
	specifications: [ProductSpecificationSchema],
	params: [ProductSpecificationSchema],
	advantages: { type: [String], required: true },
	reviewsCount: { type: Number, required: true },
	reviews: [ReviewSchema],
	sellerId: { type: Schema.Types.ObjectId, required: true },
});

const Product = model('Product', ProductSchema);
