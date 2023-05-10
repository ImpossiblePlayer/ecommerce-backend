import { Customer } from '@models/customer';

import { BadRequest_400, InternalError_500, OK_200 } from '@services/api';

import type { Request, Response } from 'express';

export const RegisterAccount = async (req: Request, res: Response) => {
	try {
		const name = req.body.name.trim();
		const email = req.body.email.trim();
		const password = req.body.password;
		if (!name || !email || !password) {
			return BadRequest_400(res, {
				message: `'name', 'email', or/and 'password' fields are empty`,
			});
		}

		if (!/\S+@\S+\.\S+/.test(email) || !/^[a-zA-Z0-9]+$/.test(name)) {
			return BadRequest_400(res, {
				message: `fields 'name' or 'email' contain invalid values`,
			});
		}

		const candidate = await Customer.findOne({ email });
		if (candidate) {
			return BadRequest_400(res, { message: 'user already exists' });
		}

		const doc = new Customer({ name, email });
		// doc.setPassword(password);
		await doc.save();

		return OK_200(res, { message: 'successfully registered account' });
	} catch (err) {
		return InternalError_500(res);
	}
};

export const Authorize = async (req: Request, res: Response) => {
	try {
		const email = req.body.email.trim();
		const password = req.body.password;
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

export const DeleteAccount = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return BadRequest_400(res, {
				message: `both fields 'email' and 'password' are required`,
			});
		}

		const user = await Customer.findOne({ email });
		if (!user) return BadRequest_400(res, { message: 'user not found' });

		const isCorrectPassword = await user.comparePassword(password);

		if (!isCorrectPassword) return BadRequest_400(res, { message: '' });

		Customer.deleteOne({ email });

		return OK_200(res, { message: 'successfully deleted user' });
	} catch (err) {
		return InternalError_500(res);
	}
};

export const Authenticate = async (req: Request, res: Response) => {
	try {
	} catch (err) {}
};
