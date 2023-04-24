import { Schema } from 'mongoose';

export interface IDocument<T> extends Document {
	_doc: T & { _id: Schema.Types.ObjectId };
}
