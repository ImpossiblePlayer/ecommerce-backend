import { Router } from 'express';

import { HTTP_STATUSE_CODES } from '../constants';
import { GetCategories } from '../controllers/Category.controller';

const CategoryRouter = Router();

CategoryRouter.get(
	'/:categoryName',
	async (req, res, next) => {
		try {
			return res.status(HTTP_STATUSE_CODES.OK_200).json({
				id: 1,
				text: 'Home',
				to: '/',
				children: [
					{
						id: 2,
						text: 'Electronics',
						to: 'electronics',
						children: [
							{
								id: 3,
								text: 'Computers',
								to: 'computers',
								children: [
									{
										id: 4,
										text: 'Laptops',
										to: 'laptops',
									},
									{
										id: 5,
										text: 'Desktops',
										to: 'desktops',
									},
								],
							},
							{
								id: 6,
								text: 'Phones',
								to: '/electronics/phones',
								children: [
									{
										id: 7,
										text: 'Smartphones',
										to: '/electronics/phones/smartphones',
									},
									{
										id: 8,
										text: 'Feature Phones',
										to: '/electronics/phones/feature-phones',
									},
								],
							},
							{
								id: 9,
								text: 'Wearable Devices',
								to: '/electronics/wearable-devices',
							},
						],
					},
					{
						id: 10,
						text: 'Clothing',
						to: '/clothing',
						children: [
							{
								id: 11,
								text: 'Men',
								to: '/clothing/men',
								children: [
									{
										id: 12,
										text: 'T-Shirts',
										to: '/clothing/men/t-shirts',
									},
									{
										id: 13,
										text: 'Jeans',
										to: '/clothing/men/jeans',
									},
								],
							},
							{
								id: 14,
								text: 'Women',
								to: '/clothing/women',
								children: [
									{
										id: 15,
										text: 'Dresses',
										to: '/clothing/women/dresses',
									},
									{
										id: 16,
										text: 'Skirts',
										to: '/clothing/women/skirts',
									},
								],
							},
						],
					},
					{
						id: 17,
						text: 'Furniture',
						to: '/furniture',
						children: [
							{
								id: 18,
								text: 'Living Room Furniture',
								to: '/furniture/living-room-furniture',
								children: [
									{
										id: 19,
										text: 'Sofas',
										to: '/furniture/living-room-furniture/sofas',
									},
									{
										id: 20,
										text: 'Chairs',
										to: '/furniture/living-room-furniture/chairs',
									},
								],
							},
							{
								id: 21,
								text: 'Bedroom Furniture',
								to: '/furniture/bedroom-furniture',
								children: [
									{
										id: 22,
										text: 'Beds',
										to: '/furniture/bedroom-furniture/beds',
									},
									{
										id: 23,
										text: 'Dressers',
										to: '/furniture/bedroom-furniture/dressers',
									},
									{
										id: 24,
										text: 'Nightstands',
										to: '/furniture/bedroom-furniture/nightstands',
									},
								],
							},
							{
								id: 25,
								text: 'Home Goods',
								to: '/home-goods',
								children: [
									{
										id: 31,
										text: 'Kitchen & Dining',
										to: '/home-goods/kitchen-dining',
										children: [
											{
												id: 301,
												text: 'Cookware',
												to: '/home-goods/kitchen-dining/cookware',
											},
											{
												id: 302,
												text: 'Utensils',
												to: '/home-goods/kitchen-dining/utensils',
											},
											{
												id: 303,
												text: 'Dinnerware',
												to: '/home-goods/kitchen-dining/dinnerware',
											},
										],
									},
									{
										id: 32,
										text: 'Bath',
										to: '/home-goods/bath',
										children: [
											{
												id: 321,
												text: 'Towels',
												to: '/home-goods/bath/towels',
											},
											{
												id: 322,
												text: 'Bathroom Accessories',
												to: '/home-goods/bath/bathroom-accessories',
											},
										],
									},
								],
							},
							{
								id: 26,
								text: 'Kids',
								to: '/kids',
								children: [
									{
										id: 41,
										text: 'Toys & Games',
										to: '/kids/toys-games',
									},
									{
										id: 42,
										text: 'Clothing',
										to: '/kids/clothing',
										children: [
											{
												id: 421,
												text: 'Boys',
												to: '/kids/clothing/boys',
											},
											{
												id: 422,
												text: 'Girls',
												to: '/kids/clothing/girls',
											},
										],
									},
									{
										id: 43,
										text: 'Baby',
										to: '/kids/baby',
										children: [
											{
												id: 431,
												text: 'Nursery Furniture',
												to: '/kids/baby/nursery-furniture',
											},
											{
												id: 432,
												text: 'Strollers',
												to: '/kids/baby/strollers',
											},
										],
									},
								],
							},
						],
					},
				],
			});
		} catch (err) {
			res.status(HTTP_STATUSE_CODES.ITERNAL_ERROR_500);
			next();
		}
	},
	GetCategories
);

export { CategoryRouter };
