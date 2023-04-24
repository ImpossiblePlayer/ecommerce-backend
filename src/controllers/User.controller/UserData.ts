import { User } from '../../models/User.model';

import { HTTP_STATUSE_CODES } from '../../constants';

import type { Request, Response } from 'express';

export const GetUserData = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(HTTP_STATUSE_CODES.NOT_FOUND_404);
		}
		const data = await user.getData();
		return res.status(HTTP_STATUSE_CODES.OK_200).json({ data });
	} catch (err) {}
};
