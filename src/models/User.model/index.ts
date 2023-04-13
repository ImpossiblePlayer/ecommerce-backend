import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

import type {
	TUserAddress,
	TUserQueries,
	TUserMethods,
	TUserSocialMedia,
	TUserModel,
	TUserSchema,
} from './UserTypes';

const AddressSchema = new Schema<TUserAddress>({
	country: String,
	city: String,
	street: String,
	house: String,
	postalCode: String,
});
const SocialMediasSchema = new Schema<TUserSocialMedia>({
	instagram: String,
	facebook: String,
	twitter: String,
});

export const UserSchema = new Schema<
	TUserSchema,
	{},
	TUserMethods,
	TUserQueries
>(
	{
		name: {
			type: String,
			required: true,
			match: [/^[a-zA-Z0-9]+$/, 'name is invalid'],
			trim: true,
		},
		profilePic: {
			type: String,
			default: '/src/shared/assets/userPics/default.png',
		},
		address: { type: AddressSchema, required: false },
		socialMedia: { type: SocialMediasSchema, required: false },
		email: {
			type: String,
			lowercase: true,
			unique: true,
			required: [true, "can't be blank"],
			match: [/\S+@\S+\.\S+/, 'is invalid'],
			trim: true,
		},
		hash: { type: String, required: true },
		refreshToken: { type: [String], unique: true, required: false },
	},
	{ timestamps: true }
);

UserSchema.methods.setPassword = async function (
	password: string
): Promise<void> {
	this.hash = await bcrypt.hash(password, 10);
};
UserSchema.query.comparePassword = async function (
	password: string
): Promise<boolean> {
	const hash = await bcrypt.hash(password, 10);
	return bcrypt.compare(password, hash);
};

UserSchema.query.compareRefreshToken = function (
	token: string
): Promise<boolean> {
	return this.refreshToken.filter((refreshToken) => refreshToken == token);
};

export const User = model<TUserModel>('User', UserSchema);
