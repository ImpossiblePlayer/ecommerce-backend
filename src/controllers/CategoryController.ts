import { Category } from '../models/CategoryModel';

import { InternalError_500, NotFound_404 } from '../services/ApiService';
import type { Request, Response } from 'express';

export const GetCategories = async (req: Request, res: Response) => {
	try {
		const { categoryName } = req.params;
		const candidate = await Category.findOne({ name: categoryName });
		if (!candidate) {
			return NotFound_404(res);
		}
	} catch (err) {
		return InternalError_500(res);
	}
};
