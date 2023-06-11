import { IDocument } from '@models/types';

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
	generateTokens(): Promise<string[]>;
	comparePassword(password: string): Promise<boolean>;
	compareRefreshToken(token: string): Promise<boolean>;
};

export type TUserQueries = {};

export type TUserModel = IUserSchema & TUserMethods & TUserQueries;

export * from './admin/types';
export * from './customer/types';
export * from './seller/types';
