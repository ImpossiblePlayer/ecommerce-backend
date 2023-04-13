import { Router } from 'express';
import { GetProduct } from '../controllers/Product.controller';

export const ProductRouter = Router();

ProductRouter.get('/:productId', GetProduct);
