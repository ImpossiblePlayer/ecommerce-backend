import { Schema, model } from 'mongoose';
import { UserModel, UserSchema } from '@models/user';
import { ICustomerSchema, TCustomerModel, TCustomerQueries } from './types';

const CustomerSchema = new Schema<ICustomerSchema, {}, {}, TCustomerQueries>(
	{}
);

CustomerSchema.query.getData = async function () {
	return {
		name: this.name,
		profilePic: this.profilePics,
		socialMedia: this.socialMedia,
	};
};

export const Customer = UserModel.discriminator<TCustomerModel>(
	'User',
	CustomerSchema
);
