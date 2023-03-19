import { model, Schema } from 'mongoose';

const AddressSchema = new Schema({
	country: { type: String, required: false },
	city: { type: String, required: false },
	street: { type: String, required: false },
	house: { type: String, required: false },
	zipCode: { type: String, required: false },
});
const SocialMediasSchema = new Schema({
	instagram: { type: String, required: false },
	facebook: { type: String, required: false },
	twitter: { type: String, required: false },
});
const UserSchema = new Schema({
	name: { type: String, required: true },
	photo: { type: String, required: false },
	address: { type: AddressSchema, required: false },
	socialMedia: { type: SocialMediasSchema, required: false },
});

const SellerSchema = new Schema({
	supplierCompany: String,
	isVerified: Boolean,
	isWorldwideShipping: Boolean,
	description: String,
	delivery: DeliverySellerSchema,
	paymentMethods: [String],
	returnPolicy: String,
	categories: [String],
	brands: [String],
	rating: Number,
	reviews: [SellerReviewSchema],
	...UserSchema.obj, // включаем остальные поля из UserSchema
});

const User = model('User', UserSchema);
const Seller = User.discriminator('Seller', SellerSchema);
export { User, Seller };
