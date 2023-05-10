import { Router } from 'express';

import {
	CreateCategory,
	DeleteCategory,
	GetCategories,
	GetFeaturedCategories,
	UpdateCategory
} from '../controllers/category';

const CategoryRouter = Router();

CategoryRouter.get('/all', GetCategories)
CategoryRouter.get('/featured', GetFeaturedCategories)

CategoryRouter.post('/create', CreateCategory)
CategoryRouter.put('/update', UpdateCategory)
CategoryRouter.delete('/:categoryId', DeleteCategory)

export { CategoryRouter };
