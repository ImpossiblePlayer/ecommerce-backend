import { Customer } from '@models';
import { BadRequest_400, OK_200, InternalError_500 } from '@src/services';

import type { Request, Response } from 'express';

export const Authorize = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		email.trim();

		if (!email || !password) {
			return BadRequest_400(res, {
				message: 'email or/and password fields are empty',
			});
		}

		const user = await Customer.findOne({ email: email });
		if (!user) {
			return BadRequest_400(res, {
				message: 'email or/and password fields are incorrect',
			});
		}

		const isCorrectPassword: boolean = await user.comparePassword(password);
		console.log(124);
		if (!isCorrectPassword)
			return BadRequest_400(res, { message: 'incorrect password' });

		const [accessToken, refreshToken] = await user.generateTokens();

		return OK_200(res, {
			message: 'successfully authorized',
			accessToken,
		}).cookie('refreshToken', refreshToken);
	} catch (err) {
		return InternalError_500(res);
	}
};

export const Authenticate = async (req: Request, res: Response) => {
	try {
		console.log();
	} catch (err) {
		return InternalError_500(res);
	}
};
