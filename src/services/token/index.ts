import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../../models/user';
import {
	JWT_ACCESS_SECRET_KEY,
	JWT_ACCESS_TOKEN_LIFETIME,
	JWT_REFRESH_SECRET_KEY,
	JWT_REFRESH_TOKEN_LIFETIME,
} from '../../constants';

export const GenerateTokens = (payload: JwtPayload) => {
	const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET_KEY, {
		expiresIn: JWT_ACCESS_TOKEN_LIFETIME,
	});
	const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, {
		expiresIn: JWT_REFRESH_TOKEN_LIFETIME,
	});

	return [accessToken, refreshToken];
};

export const SaveToken = async (userId: string, refreshToken: string) => {
	const user = await User.findById(userId);

	if (user) {
		user.refreshTokens.push(refreshToken);
		return user.save();
	}

	return;
};

export const RemoveToken = async (refreshToken: string) => {
	const user = await User.findOne({ refreshToken });
	if (!user || !user.refreshTokens) return null;
};

export const ValidateAccessToken = async (token) => {
	try {
		const userData = jwt.verify(token, JWT_ACCESS_SECRET_KEY);
		return userData;
	} catch (err) {
		return;
	}
};

export const ValidateRefreshToken = async (token) => {
	try {
		const userData = jwt.verify(token, JWT_REFRESH_SECRET_KEY);
		return userData;
	} catch (err) {
		return null;
	}
};

export const FindToken = async (refreshToken) => {
	const user = await User.findOne({ refreshToken });

	return user ? true : false;
};