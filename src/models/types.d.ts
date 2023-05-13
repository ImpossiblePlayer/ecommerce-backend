import { Schema } from 'mongoose';

export interface IDocument<T> extends Document {
  _doc: T & { _id: Schema.Types.ObjectId };
}

export * from './category/types';
export * from './users/types';
export * from './review/types';
export * from './product/types';
