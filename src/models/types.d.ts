import { Document } from 'mongoose';

export interface IDocument<T> extends Document {
  _doc: T;
}

export * from './category/types';
export * from './users/types';
export * from './review/types';
export * from './product/types';
