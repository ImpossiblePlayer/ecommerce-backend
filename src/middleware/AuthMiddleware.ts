import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_REFRESH_SECRET_KEY } from '../constants';

import { User } from '../models/UserModel';
import type { NextFunction, Request, Response } from 'express';
import { BadRequest_400, Forbidden_403 } from '../services/ApiService';

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

			req.userId = decodedToken._id; // и возвращаем id пользователя
			const candidate = User.findOne({});
			if (!candidate) {
				return BadRequest_400(res, { message: 'wrong token' });
			}
			return next();
		} catch (err) {
			console.log(err);
			return Forbidden_403(res, { message: 'not authorized' });
		}
	}

	return Forbidden_403(res, { message: 'can not access' });
};
