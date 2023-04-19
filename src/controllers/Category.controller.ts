import type { Request, Response } from 'express';
import { HTTP_STATUSE_CODES } from '../constants';
import { Category } from '../models/Category.model';

export const GetCategories = async (req: Request, res: Response) => {
	try {
		const candidate = await Category.findOne({});
	} catch (err) {
		return res.status(HTTP_STATUSE_CODES.ITERNAL_ERROR_500);
	}
};
