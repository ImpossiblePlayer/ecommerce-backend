import { model } from 'mongoose';

import { UserSchema } from '@models';

import { IAdminSchema } from './types';

export const AdminSchema = new UserSchema<IAdminSchema>(
  {
    admin: Boolean,
  },
  {}
);

export const Admin = model('Admin', AdminSchema);
