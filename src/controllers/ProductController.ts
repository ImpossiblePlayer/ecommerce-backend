import { Product } from '../models/ProductModel';

import { HTTP_STATUSE_CODES } from '../constants';

import type { Request, Response } from 'express';
import { OK_200 } from '../services/ApiService';

export const GetProduct = async (req: Request, res: Response) => {
	try {
		const { productId } = req.params;

		const product = await Product.findById(productId);
		if (!product) {
			return res
				.status(HTTP_STATUSE_CODES.NOT_FOUND_404)
				.json({ message: `there is no product with id '${productId}'` });
		}
		const productData = product._doc;
		return OK_200(res, { ...productData, id: product._id });
	} catch (err) {
		return res.status(HTTP_STATUSE_CODES.ITERNAL_ERROR_500);
	}
};

export const CreateProduct = async (req: Request, res: Response) => {
	try {
	} catch (err) {}
};

export const UpdateProduct = async (req: Request, res: Response) => {};
