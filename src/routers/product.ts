import { Router } from 'express';

import { CreateProduct, GetProduct, UpdateProduct } from '@controllers';
import { CreateImages } from '@src/middleware/create-images';

const ProductRouter = Router();

ProductRouter.get('/:productId', GetProduct);
ProductRouter.put('/:productId', UpdateProduct);
ProductRouter.post('/', CreateImages, CreateProduct);

export { ProductRouter };
