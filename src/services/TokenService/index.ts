import jwt from 'jsonwebtoken';
import { User } from '../../models/User.model/index.js';
import {
	JWT_ACCESS_SECRET_KEY,
	JWT_REFRESH_SECRET_KEY,
} from '../../constants.js';

export const generateTokens = (payload) => {
	const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET_KEY, {
		expiresIn: '15m',
	});
	const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, {
		expiresIn: '30d',
	});

	return {
		accessToken,
		refreshToken,
	};
};

export const saveToken = async (userId, refreshToken) => {
	const user = await User.findById(userId);

	if (user) {
		user.refreshToken = refreshToken;
		return user.save();
	}

	return null;
};

export const removeToken = async (refreshToken) => {
	const user = await User.findOne({ refreshToken });
	if (user && user.refreshToken) user.refreshToken = null;
};

export const decodeAccessToken = async (token) => {
	try {
		const userData = jwt.verify(token, JWT_ACCESS_SECRET_KEY);
		return userData;
	} catch (err) {
		return null;
	}
};

export const decodeRefreshToken = async (token) => {
	try {
		const userData = jwt.verify(token, JWT_REFRESH_SECRET_KEY);
		return userData;
	} catch (err) {
		return null;
	}
};

export const findToken = async (refreshToken) => {
	const user = await User.findOne({ refreshToken });

	return user ? true : false;
};
