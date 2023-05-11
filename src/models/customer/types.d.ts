import { TUserQueries, IUserSchema } from '@models/user/types';

export type ICustomerSchema = IUserSchema

export type TCustomerQueries = TUserQueries & {
	getData(): Promise<
		Pick<IUserSchema, 'name' & 'profilePic' & 'socialMedia' & 'role'>
	>;
};

export type TCustomerModel = ICustomerSchema & TCustomerQueries;
