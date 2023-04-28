import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

import type {
	TUserAddress,
	TUserSocialMedia,
	TUserQueries,
	TUserMethods,
	TUserModel,
	IUserSchema,
} from './UserTypes';
import { JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY } from '../../constants';

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

UserSchema.query.compareRefreshToken = async function (
	token: string
): Promise<boolean> {
	return this.refreshToken.filter(
		(refreshToken: string) => refreshToken == token
	);
};

UserSchema.query.generateTokens = async function (): Promise<string[]> {
	const payload = {
		_id: this._id,
		email: this.email,
		isActivated: this.isActivated,
	};

	const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET_KEY, {
		expiresIn: '15m',
	});
	const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, {
		expiresIn: '30d',
	});

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
