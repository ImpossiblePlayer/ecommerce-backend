import { Router } from 'express';

import {
  CreateCategory,
  DeleteCategory,
  GetCategories,
  GetFeaturedCategories,
  UpdateCategory,
} from '@controllers';
import { AdminMiddleware } from '@middleware';

const CategoryRouter = Router();

CategoryRouter.get('/all', GetCategories);
CategoryRouter.get('/featured', GetFeaturedCategories);

CategoryRouter.post('/create', AdminMiddleware, CreateCategory);
CategoryRouter.put('/update', AdminMiddleware, UpdateCategory);
CategoryRouter.delete('/:categoryId', AdminMiddleware, DeleteCategory);

export { CategoryRouter };
