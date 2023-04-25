import { Router } from 'express';
import {
	CreateProduct,
	GetProduct,
	UpdateProduct,
} from '../controllers/ProductController';

const ProductRouter = Router();

ProductRouter.get('/:productId', GetProduct);
ProductRouter.post('/', CreateProduct);
ProductRouter.put('/', UpdateProduct);

export { ProductRouter };
