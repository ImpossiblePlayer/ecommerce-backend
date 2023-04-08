import { Router } from 'express';
import { CheckAuthentication } from 'utils/CheckAuth';
import { Authorize, Register } from 'controllers/AuthController';

export const UserRouter = Router();

UserRouter.use(CheckAuthentication);

UserRouter.post('/login', Authorize);
UserRouter.post('/register', Register);
