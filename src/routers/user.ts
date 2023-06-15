import { Router } from 'express';

import {
  Authorize,
  DeleteAccount,
  RegisterAccount,
  GetUserData,
} from '@controllers';
import { CustomerMiddleware } from '@middleware';

const UserRouter = Router();

UserRouter.post('/login', Authorize);
UserRouter.post('/', RegisterAccount);
UserRouter.delete('/', CustomerMiddleware, DeleteAccount);
UserRouter.get('/:userId', GetUserData);

export { UserRouter };
