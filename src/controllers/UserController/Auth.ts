import { User } from '../../models/UserModel';

import {
	BadRequest_400,
	InternalError_500,
	OK_200,
} from '../../services/ApiService';

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

		const candidate = await User.findOne({ email });
		if (candidate) {
			return BadRequest_400(res, { message: 'user already exists' });
		}

		const doc = new User({ name, email });
		doc.setPassword(password);
		await doc.save();
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
		const user = await User.findOne({ email: email });
		if (user) {
			const isCorrectPassword: boolean = await user.comparePassword(password);
			return isCorrectPassword
				? OK_200(res, { message: 'successfully authorized' })
				: BadRequest_400(res, { message: 'incorrect password' });
		}
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

		const user = await User.findOne({ email: email });
		if (user.comparePassword(password)) {
			return user._doc;
		}
	} catch (err) {
		return InternalError_500(res);
	}
};
