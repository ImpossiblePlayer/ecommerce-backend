import { Router } from 'express';
import { CheckAuthentication } from '../utils/CheckAuth.util';
import { Authorize, Register } from '../controllers/Auth.controller';

export const UserRouter = Router();

UserRouter.use(CheckAuthentication);

UserRouter.post('/login', Authorize);
UserRouter.post('/register', Register);
