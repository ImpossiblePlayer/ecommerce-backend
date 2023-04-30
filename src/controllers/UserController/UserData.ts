import { User } from '../../models/UserModel';

import { NotFound_404, OK_200 } from '../../services/ApiService';
import type { Request, Response } from 'express';

export const GetUserData = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;

		const user = await User.findById(userId);
		if (!user) {
			return NotFound_404;
		}
		const data = await user.getData();
		return OK_200(res, { data });
	} catch (err) {}
};
