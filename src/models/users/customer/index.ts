import { model } from 'mongoose';

import { UserSchema } from '@models';

import type {
  ICustomerSchema,
  TCustomerMethods,
  TCustomerModel,
  TCustomerQueries,
} from './types';

const CustomerSchema = new UserSchema<
  ICustomerSchema,
  TCustomerMethods,
  TCustomerQueries
>(
  {
    profilePic: {
      type: String,
      default: '/src/shared/assets/userPics/default.png',
    },
    address: {
      country: String,
      city: String,
      street: String,
      house: String,
      postalCode: String,
    },
    socialMedia: {
      instagram: String,
      facebook: String,
      twitter: String,
    },
  },
  {
    query: {
      getData: async function () {
        return {
          name: this.name,
          profilePic: this.profilePics,
          socialMedia: this.socialMedia,
        };
      },
    },
  }
);
export const Customer = model<TCustomerModel>('User', CustomerSchema);
