import { Router } from 'express';
import { GetProduct } from '../controllers/Product.controller';

const ProductRouter = Router();

ProductRouter.get('/:productId', GetProduct);

export { ProductRouter };
