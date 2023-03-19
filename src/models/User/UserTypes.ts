import { SellerReviewType } from '../Product/ProductModelTypes';

type SocialMediaType = {
	facebook: string;
	twitter: string;
	instagram: string;
};

type ContactDetailsType = {
	phone: string;
	email: string;
	socialMedia?: Partial<SocialMediaType>;
};

export type AddressType = {
	country: string;
	city: string;
	street: string;
	house: string;
	zipCode: string;
};

export type DeliverySellerType = {
	cost: number;
	regions: string[]; // Массив регионов, в которые осуществляется доставка
};

export type UserType = {
	name: string;
	photo: string;
	address?: Partial<AddressType>;
	contacts?: Partial<ContactDetailsType>;
};

export type SellerType = UserType & {
	supplierCompany: string;
	isVerified: boolean;
	isWorldwideShipping: boolean;
	description: string;
	delivery: DeliverySellerType;
	paymentMethods: string[]; // Массив способов оплаты
	returnPolicy: string; // Описание политики возврата товара
	categories: string[]; // Массив категорий товаров
	brands: string[]; // Массив брендов товаров
	rating: number;
	reviews: SellerReviewType[]; // Массив отзывов покупателей
};
