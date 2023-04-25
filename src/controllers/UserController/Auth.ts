import { User } from '../../models/UserModel';

import { HTTP_STATUSE_CODES } from '../../constants';

import type { Request, Response } from 'express';

export const RegisterAccount = async (req: Request, res: Response) => {
	try {
		const name = req.body.name.trim();
		const email = req.body.email.trim();
		const password = req.body.password;
		if (!name || !email || !password) {
			return res.status(HTTP_STATUSE_CODES.BAD_REQUEST_400).json({
				message: `'name', 'email', or/and 'password' fields are empty`,
			});
		}

		if (!/\S+@\S+\.\S+/.test(email) || !/^[a-zA-Z0-9]+$/.test(name)) {
			return res
				.status(HTTP_STATUSE_CODES.BAD_REQUEST_400)
				.json({ message: `fields 'name' or 'email' contain invalid values` });
		}

		const candidate = await User.findOne({ email });
		if (candidate) {
			return res
				.status(HTTP_STATUSE_CODES.BAD_REQUEST_400)
				.json({ message: 'user already exists' });
		}

		const doc = new User({ name, email });
		doc.setPassword(password);
		await doc.save();
	} catch (err) {
		return res.status(HTTP_STATUSE_CODES.ITERNAL_ERROR_500);
	}
};

export const Authorize = async (req: Request, res: Response) => {
	try {
		const email = req.body.email.trim();
		const password = req.body.password;
		if (!email || !password) {
			return res
				.status(HTTP_STATUSE_CODES.BAD_REQUEST_400)
				.json({ message: 'email or/and password fields are empty' });
		}
		const user = await User.findOne({ email: email });
		if (user) {
			const isCorrectPassword: boolean = await user.comparePassword(password);
			return isCorrectPassword
				? res
						.status(HTTP_STATUSE_CODES.OK_200)
						.json({ message: 'successfully authorized' })
				: res
						.status(HTTP_STATUSE_CODES.BAD_REQUEST_400)
						.json({ message: 'incorrect password' });
		}
	} catch (err) {
		return res.status(HTTP_STATUSE_CODES.ITERNAL_ERROR_500);
	}
};

export const DeleteAccount = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(HTTP_STATUSE_CODES.BAD_REQUEST_400)
				.json({ message: `both fields 'email' and 'password' are required` });
		}

		const user = await User.findOne({ email: email });
		if (user.comparePassword(password)) {
			return user._doc;
		}
	} catch (err) {
		return res.status(HTTP_STATUSE_CODES.ITERNAL_ERROR_500);
	}
};
