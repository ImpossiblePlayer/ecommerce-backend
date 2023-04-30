import { Router } from 'express';
import {
	CreateProduct,
	GetProduct,
	UpdateProduct,
} from '../controllers/ProductController';

const ProductRouter = Router();

ProductRouter.get('/:productId', GetProduct);
ProductRouter.put('/:productId', UpdateProduct);
ProductRouter.post('/', CreateProduct);

export { ProductRouter };
