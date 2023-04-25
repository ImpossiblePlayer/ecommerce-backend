import { Router } from 'express';
import {
	Authorize,
	DeleteAccount,
	RegisterAccount,
} from '../controllers/UserController';
import { GetUserData } from '../controllers/UserController';
import { AuthenticationMiddleware } from '../middleware/AuthMiddleware';

const UserRouter = Router();

UserRouter.use(AuthenticationMiddleware);

UserRouter.post('/login', Authorize);
UserRouter.post('/', RegisterAccount);
UserRouter.delete('/', DeleteAccount);
UserRouter.get('/:userId', GetUserData);

export { UserRouter };
