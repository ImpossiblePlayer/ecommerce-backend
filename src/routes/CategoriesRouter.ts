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

const CategoryRouter = Router();

CategoryRouter.get(
	'/:categoryName',
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

export { CategoryRouter };
