import type { TProductReview, IDocument } from '@models/types';

import type { Schema } from 'mongoose';

export type TProductPhoto = {
  url: Schema.Types.UUID;
  thumbUrl?: Schema.Types.UUID;
};
export type TProductSpecification = {
  name: string;
  value: string;
  order: number;
};
export type TProductPrice = {
  current: number;
  old?: number;
};

export interface IProductSchema extends IDocument<IProductSchema> {
  name: string;
  category: Schema.Types.ObjectId;
  quantity: number;
  mainPhoto: TProductPhoto;
  additionalPhotos: TProductPhoto[];
  price: TProductPrice;
  comments: Schema.Types.ObjectId;
  rating: number;
  soldQuantity: number;
  description: string;
  orders: number;
  params: TProductSpecification[];
  advantages: string[];
  reviewsCount: number;
  reviews: TProductReview[];
  sellerId: Schema.Types.ObjectId;
}

export type TProductMethods = {
  createProduct(
    name: string,
    description: string,
    categories: string[],
    quantity: number,
    photos: string[],
    price: TProductPrice
  ): Promise<void>;
};

export type TProductQueries = {
  updateProduct(
    name: string,
    description: string,
    categories: string[],
    quantity: number,
    photos: string[],
    price: TProductPrice
  ): Promise<boolean>;
};

export type TProductModel = IProductSchema & TProductMethods & TProductQueries;
