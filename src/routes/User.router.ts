import { Router } from 'express';
import {
	Authorize,
	DeleteAccount,
	RegisterAccount,
} from '../controllers/User.controller';
import { GetUserData } from '../controllers/User.controller/';
import { AuthenticationMiddleware } from '../middleware/Auth.middleware';

const UserRouter = Router();

UserRouter.use(AuthenticationMiddleware);

UserRouter.post('/login', Authorize);
UserRouter.post('/', RegisterAccount);
UserRouter.delete('/', DeleteAccount);
UserRouter.get('/:userId', GetUserData);

export { UserRouter };
