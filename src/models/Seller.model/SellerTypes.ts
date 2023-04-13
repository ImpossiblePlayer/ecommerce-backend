import { TSellerReview } from '../Review.model/ReviewTypes';
import { TUserSchema, TUserModel } from '../User.model/UserTypes';

export type TSellerDelivery = {
	cost: number;
	regions: string[]; // Массив регионов, в которые осуществляется доставка
};

export type TSellerSchema = TUserSchema & {
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
};
export type TSellerModel = TUserModel & TSellerSchema;
