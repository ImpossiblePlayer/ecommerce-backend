import { Router } from 'express';
import { Product } from 'models/Product';
import { HTTP_STATUSE_CODES } from 'src/constants';

export const ProductRouter = Router();

ProductRouter.get('/:productId', async (req, res) => {
	try {
		const candidate = await Product.findById(req.params.productId);
		if (candidate) {
			return res.status(HTTP_STATUSE_CODES.OK_200).json({ ...candidate._doc });
		}
	} catch (err) {
		return res.status(HTTP_STATUSE_CODES.ITERNAL_ERROR_500);
	}
});
