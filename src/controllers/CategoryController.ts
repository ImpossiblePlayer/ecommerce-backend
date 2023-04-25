import { Category } from '../models/CategoryModel';

import { HTTP_STATUSE_CODES } from '../constants';

import type { Request, Response } from 'express';

export const GetCategories = async (req: Request, res: Response) => {
	try {
		const { categoryName } = req.params;
		const candidate = await Category.findOne({ name: categoryName });
	} catch (err) {
		return res.status(HTTP_STATUSE_CODES.ITERNAL_ERROR_500);
	}
};
