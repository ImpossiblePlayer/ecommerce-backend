import { model, Schema } from 'mongoose';

import { ProductReview, ProductReviewSchema } from '@models';

import type {
	TProductPhoto,
	TProductPrice,
	TProductSpecification,
	IProductSchema,
	TProductMethods,
	TProductQueries,
} from './types';

const ProductPhotoSchema = new Schema<TProductPhoto>({
	url: { type: Schema.Types.UUID, required: true },
	thumbUrl: { type: Schema.Types.UUID, required: false },
});
const ProductSpecificationSchema = new Schema<TProductSpecification>({
	name: { type: String, required: true },
	value: { type: String, required: true },
});

export const ProductSchema = new Schema<
  IProductSchema,
  unknown,
  TProductMethods,
  TProductQueries
>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, required: true, trim: true },
    quantity: { type: Number, required: true },
    params: [ProductSpecificationSchema],
    mainPhoto: { type: ProductPhotoSchema, required: true },
    additionalPhotos: [ProductPhotoSchema],
    price: {
      type: {
        current: { type: Number, required: true },
        old: { type: Number, required: false },
      },
      required: true,
    },
    // comments: {
    //   type: [Schema.Types.ObjectId],
    //   ref: 'ProductReview',
    // },
    rating: { type: Number, required: true },
    soldQuantity: { type: Number, required: true },
    orders: { type: Number, required: true },
    advantages: { type: [String], required: true },
    reviewsCount: { type: Number, required: true },
    reviews: { type: [ProductReviewSchema], ref: 'ProductReview' },
    sellerId: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
  },
  {
    methods: {
      createProduct: async function (
        name: string,
        description: string,
        categories: string[],
        quantity: number,
        photos: string[],
        price: TProductPrice
      ): Promise<void> {
        this.name = name;
        this.description = description;
        this.categories = categories;
        this.quantity = quantity;
        this.mainPhoto = photos[0];
        this.additionalPhotos = photos;
        this.price = price;
      },
    },
    query: {
      updateProduct: async function (
        name: string,
        description: string,
        categories: string[],
        quantity: number,
        photos: string[],
        price: TProductPrice
      ): Promise<boolean> {
        if (
          name == this.name ||
          description == this.description ||
          categories == this.categories ||
          quantity == this.quantity ||
          price.current == this.price.current ||
          price.old == this.price.old ||
          photos == this.photos
        ) {
          return false;
        }

				this.name = name;
				this.description = description;
				this.categories = categories;
				this.quantity = quantity;
				this.mainPhoto = photos[0];
				this.additionalPhotos = photos;
				this.price = price;
				return true;
			},
		},
	}
);

export const Product = model<IProductSchema>('Product', ProductSchema);
