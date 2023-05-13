import { Schema } from 'mongoose';

import { User } from '@models';

import type {
  ICustomerSchema,
  TCustomerModel,
  TCustomerQueries,
  TUserAddress,
  TUserSocialMedia,
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

const CustomerSchema = new Schema<
  ICustomerSchema,
  unknown,
  unknown,
  TCustomerQueries
>({
  profilePic: {
    type: String,
    default: '/src/shared/assets/userPics/default.png',
  },
  address: AddressSchema,
  socialMedia: SocialMediasSchema,
});

CustomerSchema.query.getData = async function () {
  return {
    name: this.name,
    profilePic: this.profilePics,
    socialMedia: this.socialMedia,
  };
};

export const Customer = User.discriminator<TCustomerModel>(
  'User',
  CustomerSchema
);
