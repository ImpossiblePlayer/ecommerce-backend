import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_REFRESH_SECRET_KEY } from '@src/constants';
import { Admin, Customer } from '@models';
import type { TUserModel, TSellerModel } from '@models/types';
import { BadRequest_400, Unautorised_401 } from '@services';

import type { NextFunction, Request, Response } from 'express';
import type { Model } from 'mongoose';

interface Req extends Request {
  userId: string;
  cookies: { authentication: string };
}

const CheckAuth = (
  req: Req,
  res: Response,
  next: NextFunction,
  model: Model<TUserModel | TSellerModel>
) => {
  const token = req.cookies.authentication; // вытаскиваем токен из кукис

  if (token) {
    try {
      // проверяем валидность токена
      const decodedToken: JwtPayload = jwt.verify(
        token,
        JWT_REFRESH_SECRET_KEY
      ) as JwtPayload;

      const { userId, email, isActivated } = decodedToken; // и возвращаем id пользователя
      const candidate = model.findOne({ _id: userId, email, isActivated });
      if (!candidate) {
        return BadRequest_400(res, { message: 'wrong token' });
      }

      return next();
    } catch (err) {
      console.log(err);
      return Unautorised_401(res, { message: 'not authorized' });
    }
  }

  return Unautorised_401(res, { message: 'can not access' });
};

export const CustomerMiddleware = (
  req: Req,
  res: Response,
  next: NextFunction
) => CheckAuth(req, res, next, Customer);

export const AdminMiddleware = (req: Req, res: Response, next: NextFunction) =>
  CheckAuth(req, res, next, Admin);
