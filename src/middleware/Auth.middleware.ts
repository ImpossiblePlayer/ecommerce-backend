import jwt, { JwtPayload } from 'jsonwebtoken';

import { HTTP_STATUSE_CODES, JWT_REFRESH_SECRET_KEY } from '../constants';

import { User } from '../models/User.model';
import type { NextFunction, Request, Response } from 'express';

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
				return res
					.status(HTTP_STATUSE_CODES.BAD_REQUEST_400)
					.json({ message: 'wrong token' });
			}
			return next();
		} catch (err) {
			console.log(err);
			return res
				.status(HTTP_STATUSE_CODES.FORBIDDEN_403)
				.json({ message: 'not authorized' });
		}
	}

	return res
		.status(HTTP_STATUSE_CODES.FORBIDDEN_403)
		.json({ message: 'can not access' });
};
