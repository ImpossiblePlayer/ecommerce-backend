import { Schema } from 'mongoose';

import { User } from '@models';

export const AdminSchema = new Schema();

export const Admin = User.discriminator('Admin', AdminSchema);
