import { IUserSchema, TUserModel } from '@models/customer/types';
import { TSellerReview } from '@models/review/types';

export type TSellerDelivery = {
  cost: number;
  regions: string[]; // Массив регионов, в которые осуществляется доставка
};

export interface ISellerSchema extends IUserSchema {
  supplierCompany: string; // Комнания-поставщик
  isVerified: boolean;
  isWorldwideShipping: boolean;
  description: string;
  delivery: TSellerDelivery;
  paymentMethods: string[]; // Массив способов оплаты
  returnPolicy: string; // Описание политики возврата товара
  categories: string[]; // Массив категорий товаров
  brands: string[]; // Массив брендов товаров
  rating: number;
  reviews: TSellerReview[]; // Массив отзывов покупателей
}
export type TSellerModel = TUserModel & ISellerSchema;
