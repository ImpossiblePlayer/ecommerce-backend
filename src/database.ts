import mongoose from 'mongoose';

import { MONGODB_URI } from '@src/constants';

mongoose.set('strictQuery', false);

export class Database {
  static connect = async () => {
    await mongoose
      .connect(MONGODB_URI)
      .then(() => {
        console.log('DB ok');
      })
      .catch((err) => {
        console.log(`DB error: ${err}`);
      });
  };
}
