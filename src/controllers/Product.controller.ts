import type { Request, Response } from 'express';
import { HTTP_STATUSE_CODES } from '../constants';
import { Product } from '../models/Product.model';

export const GetProduct = async (req: Request, res: Response) => {
	try {
		const candidate = await Product.findById(req.params.productId);
		if (candidate) {
			return res.status(HTTP_STATUSE_CODES.OK_200).json({ ...candidate._doc });
		}
	} catch (err) {
		return res.status(HTTP_STATUSE_CODES.ITERNAL_ERROR_500);
	}
};
