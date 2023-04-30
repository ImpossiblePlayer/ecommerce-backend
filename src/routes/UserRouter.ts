import { Router } from 'express';
import {
	Authorize,
	DeleteAccount,
	RegisterAccount,
} from '../controllers/UserController';
import { GetUserData } from '../controllers/UserController';
import { AuthenticationMiddleware } from '../middleware/AuthMiddleware';

const UserRouter = Router();

UserRouter.post('/login', AuthenticationMiddleware, Authorize);
UserRouter.post('/', RegisterAccount);
UserRouter.delete('/', AuthenticationMiddleware, DeleteAccount);
UserRouter.get('/:userId', GetUserData);

export { UserRouter };
