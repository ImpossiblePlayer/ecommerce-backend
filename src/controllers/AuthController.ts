import { Request, Response } from 'express';
import { HTTP_STATUSE_CODES } from 'src/constants';
import { User } from 'src/models/User';

export const Register = async (req: Request, res: Response) => {
	try {
		const name = req.body.name.trim();
		const email = req.body.email.trim();
		const password = req.body.password;
		if (!name || !email || !password) {
			return res.status(HTTP_STATUSE_CODES.BAD_REQUEST_400).json({
				message: `'name', 'email', or/and 'password' fields are empty`,
			});
		}
		const candidate = await User.findOne({ email });
		if (candidate) {
			return res
				.status(HTTP_STATUSE_CODES.BAD_REQUEST_400)
				.json({ message: 'user already exists' });
		}

		const doc = new User({ name, email });
		doc.setPassword(password);
		const user = await doc.save();
	} catch (err) {
		return res.status(HTTP_STATUSE_CODES.ITERNAL_ERROR_500);
	}
};

export const Authorize = async (req, res) => {
	const email = req.body.email.trim();
	const password = req.body.password;
	if (!(email && password)) {
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
};
