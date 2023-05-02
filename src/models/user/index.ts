import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
	JWT_ACCESS_SECRET_KEY,
	JWT_ACCESS_TOKEN_LIFETIME,
	JWT_REFRESH_SECRET_KEY,
	JWT_REFRESH_TOKEN_LIFETIME,
} from '../../constants';

import type {
	TUserAddress,
	TUserSocialMedia,
	TUserQueries,
	TUserMethods,
	TUserModel,
	IUserSchema,
} from './types';

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
	refreshTokens: [String],
	isActivated: Boolean,
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
	return await bcrypt.compare(password, hash);
};

UserSchema.query.compareRefreshToken = async function (
	token: string
): Promise<boolean> {
	const validTokens: Array<string[]> = this.refreshTokens.filter(
		(refreshToken: string) => refreshToken === token
	);
	return validTokens.length > 0;
};

UserSchema.query.generateTokens = async function (): Promise<string[]> {
	const payload = {
		_id: this._id,
		email: this.email,
		isActivated: this.isActivated,
	};

	const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET_KEY, {
		expiresIn: JWT_ACCESS_TOKEN_LIFETIME,
	});
	const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, {
		expiresIn: JWT_REFRESH_TOKEN_LIFETIME,
	});

	this.refreshTokens.push(refreshToken);

	return [accessToken, refreshToken];
};

UserSchema.query.getData = async function () {
	return {
		name: this.name,
		profilePic: this.profilePics,
		socialMedia: this.socialMedia,
	};
};

export const User = model<TUserModel>('User', UserSchema);