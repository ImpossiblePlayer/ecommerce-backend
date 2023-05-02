import { IDocument } from '../models';

export type TUserSocialMedia = {
	facebook: string;
	twitter: string;
	instagram: string;
};
export type TUserContacts = {
	phone: string;
	email: string;
	socialMedia: Partial<TUserSocialMedia>;
};
export type TUserAddress = {
	country: string;
	city: string;
	street: string;
	house: string;
	postalCode: string;
};
export interface IUserSchema extends IDocument<IUserSchema> {
	name: string;
	role: 'customer' | 'seller' | 'admin';
	profilePic: string;
	address?: Partial<TUserAddress>;
	socialMedia?: Partial<TUserContacts>;
	email: string;
	hash: string;
	refreshTokens: string[];
	isActivated: boolean;
}

export type TUserMethods = {
	setPassword(password: string): Promise<void>;
};

export type TUserQueries = {
	generateTokens(): Promise<string[]>;
	comparePassword(password: string): Promise<boolean>;
	compareRefreshToken(token: string): Promise<boolean>;
	getData(): Promise<
		Pick<IUserSchema, 'name' & 'profilePic' & 'socialMedia' & 'role'>
	>;
};

export type TUserModel = IUserSchema & TUserMethods & TUserQueries;
