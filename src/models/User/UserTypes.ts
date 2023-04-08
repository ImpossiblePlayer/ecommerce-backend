export type TUserSocialMedia = {
	facebook: string;
	twitter: string;
	instagram: string;
};
export type TUserContacts = {
	phone: string;
	email: string;
	socialMedia?: Partial<TUserSocialMedia>;
};
export type TUserAddress = {
	country: string;
	city: string;
	street: string;
	house: string;
	postalCode: string;
};
export type TUserSchema = {
	name: string;
	role: 'admin' | 'user' | 'seller';
	profilePic: string;
	address?: Partial<TUserAddress>;
	socialMedia?: Partial<TUserContacts>;
	email: string;
	hash: string;
	refreshToken?: string[];
};

export type TUserMethods = {
	setPassword(password: string): Promise<void>;
};

export type TUserQueries = {
	comparePassword(password: string): Promise<boolean>;
	compareRefreshToken(token: string): Promise<boolean>;
};

export type TUserModel = TUserSchema & TUserMethods & TUserQueries;
