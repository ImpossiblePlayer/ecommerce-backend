import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

import type {
	TUserAddress,
	TUserSocialMedia,
	TUserQueries,
	TUserMethods,
	TUserModel,
	IUserSchema,
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
	IUserSchema,
	{},
	TUserMethods,
	TUserQueries
>({
	name: {
		type: String,
		required: true,

		trim: true,
	},
	profilePic: {
		type: String,
		default: '/src/shared/assets/userPics/default.png',
	},
	address: AddressSchema,
	socialMedia: SocialMediasSchema,
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: true,
		trim: true,
	},
	hash: { type: String, required: true },
	refreshToken: [String],
});

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
	return this.refreshToken.filter(
		(refreshToken: string) => refreshToken == token
	);
};

UserSchema.query.getData = async function () {
	return {
		name: this.name,
		profilePic: this.profilePics,
		socialMedia: this.socialMedia,
	};
};

export const User = model<TUserModel>('User', UserSchema);