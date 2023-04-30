import { Router } from 'express';

import { HTTP_STATUSE_CODES } from '../constants';

import { GetCategories } from '../controllers/CategoryController';

const fakeCategories = [
	{
		id: 2,
		text: 'Electronics',
		children: [
			{
				id: 3,
				text: 'Computers',
				children: [
					{
						id: 4,
						text: 'Laptops',
					},
					{
						id: 5,
						text: 'Desktops',
					},
				],
			},
			{
				id: 6,
				text: 'Phones',
				children: [
					{
						id: 7,
						text: 'Smartphones',
					},
					{
						id: 8,
						text: 'Features Phones',
					},
				],
			},
			{
				id: 9,
				text: 'Wearable Devices',
			},
		],
	},
	{
		id: 10,
		text: 'Clothing',
		children: [
			{
				id: 11,
				text: 'Men',
				children: [
					{
						id: 12,
						text: 'T-Shirts',
					},
					{
						id: 13,
						text: 'Jeans',
					},
				],
			},
			{
				id: 14,
				text: 'Women',
				children: [
					{
						id: 15,
						text: 'Dresses',
					},
					{
						id: 16,
						text: 'Skirts',
					},
				],
			},
		],
	},
	{
		id: 17,
		text: 'Furniture',
		children: [
			{
				id: 18,
				text: 'Living Room Furniture',
				children: [
					{
						id: 19,
						text: 'Sofas',
					},
					{
						id: 20,
						text: 'Chairs',
					},
				],
			},
			{
				id: 21,
				text: 'Bedroom Furniture',
				children: [
					{
						id: 22,
						text: 'Beds',
					},
					{
						id: 23,
						text: 'Dressers',
					},
					{
						id: 24,
						text: 'Nightstands',
					},
				],
			},
			{
				id: 25,
				text: 'Home Goods',
				children: [
					{
						id: 31,
						text: 'Kitchen & Dining',
						children: [
							{
								id: 301,
								text: 'Cookware',
							},
							{
								id: 302,
								text: 'Utensils',
							},
							{
								id: 303,
								text: 'Dinnerware',
							},
						],
					},
					{
						id: 32,
						text: 'Bath',
						children: [
							{
								id: 321,
								text: 'Towels',
							},
							{
								id: 322,
								text: 'Bathroom Accessories',
							},
						],
					},
				],
			},
			{
				id: 26,
				text: 'Kids',
				children: [
					{
						id: 41,
						text: 'Toys & Games',
					},
					{
						id: 42,
						text: 'Clothing',
						children: [
							{
								id: 421,
								text: 'Boys',
							},
							{
								id: 422,
								text: 'Girls',
							},
						],
					},
					{
						id: 43,
						text: 'Baby',
						children: [
							{
								id: 431,
								text: 'Nursery Furniture',
							},
							{
								id: 432,
								text: 'Strollers',
							},
						],
					},
				],
			},
		],
	},
]

// minPrice - минимальная цена из продуктов из этой категории
const fakeCategoriesWithPrice = [
	{
		id: 2,
		text: 'Electronics',
		image: 'https://i.postimg.cc/Hk1TRkcW/bg1.png',
		minPrice: 49,
		children: [
			{
				id: 3,
				text: 'Computers',
				image: 'https://static.eldorado.ru/photos/mv/Big/20083580bb.jpg/resize/380x240/',
				minPrice: 525,
				children: [
					{
						id: 4,
						text: 'Laptops',
						image: 'https://static.eldorado.ru/photos/mv/Big/20083580bb.jpg/resize/380x240/',
						minPrice: 511,
					},
					{
						id: 5,
						text: 'Desktops',
						image: 'https://static.eldorado.ru/photos/mv/Big/20083580bb.jpg/resize/380x240/',
						minPrice: 312,
					},
				],
			},
			{
				id: 6,
				text: 'Phones',
				image: 'https://static.eldorado.ru/photos/mv/Big/20083580bb.jpg/resize/380x240/',
				minPrice: 949,
				children: [
					{
						id: 263467,
						text: 'Smartphones',
						image: 'https://static.eldorado.ru/photos/mv/Big/20083580bb.jpg/resize/380x240/',
						minPrice: 649,
					},
					{
						id: 654878,
						text: 'Features Phones',
						image: 'https://static.eldorado.ru/photos/mv/Big/20083580bb.jpg/resize/380x240/',
						minPrice: 459,
					},
				],
			},
			{
				id: 65784569,
				text: 'Wearable Devices',
				image: 'https://static.eldorado.ru/photos/mv/Big/20083580bb.jpg/resize/380x240/',
				minPrice: 4129,
				children: [
					{
						id: 761326,
						text: 'Watches',
						image: 'https://static.eldorado.ru/photos/mv/Big/20083580bb.jpg/resize/380x240/',
						minPrice: 849,
					},
					{
						id: 7354678,
						text: 'Another wearing items',
						image: 'https://static.eldorado.ru/photos/mv/Big/20083580bb.jpg/resize/380x240/',
						minPrice: 4749,
					},
				],
			},
		],
	},
	{
		id: 26,
		text: 'Kids',
		image: 'https://i.postimg.cc/rwGqk2x1/bg2.png',
		minPrice: 469,
		children: [
			{
				id: 41,
				text: 'Toys & Games',
				image: 'https://static.eldorado.ru/photos/mv/Big/20083580bb.jpg/resize/380x240/',
				minPrice: 749,
			},
			{
				id: 42,
				text: 'Clothing',
				image: 'https://static.eldorado.ru/photos/mv/Big/20083580bb.jpg/resize/380x240/',
				minPrice: 149,
				children: [
					{
						id: 421,
						text: 'Boys',
						image: 'https://static.eldorado.ru/photos/mv/Big/20083580bb.jpg/resize/380x240/',
						minPrice: 29,
					},
					{
						id: 422,
						text: 'Girls',
						image: 'https://static.eldorado.ru/photos/mv/Big/20083580bb.jpg/resize/380x240/',
						minPrice: 69,
					},
				],
			},
			{
				id: 43,
				text: 'Baby',
				image: 'https://static.eldorado.ru/photos/mv/Big/20083580bb.jpg/resize/380x240/',
				minPrice: 89,
				children: [
					{
						id: 431,
						text: 'Nursery Furniture',
						image: 'https://static.eldorado.ru/photos/mv/Big/20083580bb.jpg/resize/380x240/',
						minPrice: 359,
					},
					{
						id: 432,
						text: 'Strollers',
						image: 'https://static.eldorado.ru/photos/mv/Big/20083580bb.jpg/resize/380x240/',
						minPrice: 889,
					},
					{
						id: 435122,
						text: 'Categoryyy',
						image: 'https://static.eldorado.ru/photos/mv/Big/20083580bb.jpg/resize/380x240/',
						minPrice: 289,
					},
				],
			},
		],
	},
]

const CategoryRouter = Router();

CategoryRouter.get(
	'/all',
	async (req, res, next) => {
		try {
			return res.status(HTTP_STATUSE_CODES.OK_200).json(fakeCategories);
		} catch (err) {
			res.status(HTTP_STATUSE_CODES.ITERNAL_ERROR_500);
			// next();
		}
	}
	// GetCategories
);


CategoryRouter.get(
	'/featured',
	async (req, res, next) => {
		try {
			return res.status(HTTP_STATUSE_CODES.OK_200).json(fakeCategoriesWithPrice);
		} catch (err) {
			res.status(HTTP_STATUSE_CODES.ITERNAL_ERROR_500);
			// next();
		}
	}
	// GetCategories
);

export { CategoryRouter };
