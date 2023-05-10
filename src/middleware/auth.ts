import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_REFRESH_SECRET_KEY } from '@src/constants';

import { Customer } from '@models/customer';
import type { NextFunction, Request, Response } from 'express';
import { BadRequest_400, Unautorised_401 } from '@services/api';

interface Req extends Request {
	userId: string;
	cookies: { authentication: string };
}

export const AuthenticationMiddleware = (
	req: Req,
	res: Response,
	next: NextFunction
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
			const candidate = Customer.findOne({ _id: userId, email, isActivated });
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
