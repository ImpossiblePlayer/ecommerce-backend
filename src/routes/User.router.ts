import { Router } from 'express';
import { AuthenticationMiddleware } from '../middleware/Auth.middleware';
import { Authorize, Register } from '../controllers/User.controller';

const UserRouter = Router();

UserRouter.use(AuthenticationMiddleware);

UserRouter.post('/login', Authorize);
UserRouter.post('/', Register);
UserRouter.delete('/');

export { UserRouter };
