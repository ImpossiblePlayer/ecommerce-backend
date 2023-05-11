import { Router } from 'express';

import { Authorize, DeleteAccount, RegisterAccount , GetUserData } from '@controllers/user';
import { AuthenticationMiddleware } from '@middleware/auth';


const UserRouter = Router();

UserRouter.post('/login', Authorize);
UserRouter.post('/', RegisterAccount);
UserRouter.delete('/', AuthenticationMiddleware, DeleteAccount);
UserRouter.get('/:userId', GetUserData);

export { UserRouter };
