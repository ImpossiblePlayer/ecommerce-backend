import { IUserSchema } from '@models';

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
export type TCustomerAddress = {
  country: string;
  city: string;
  street: string;
  house: string;
  postalCode: string;
};

export type ICustomerSchema = IUserSchema;

export type TCustomerQueries = {
  getData(): Promise<
    Pick<IUserSchema, 'name' & 'profilePic' & 'socialMedia' & 'role'>
  >;
};

export type TCustomerMethods = unknown;

export type TCustomerModel = ICustomerSchema &
  TCustomerQueries &
  TCustomerMethods;
