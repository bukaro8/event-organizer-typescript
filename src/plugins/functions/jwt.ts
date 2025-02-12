import jwt from 'jsonwebtoken';
import { envs } from '../envs/envs.plugin';

export const createAccessToken = (payload: any) => {
	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			envs.SECRET_KEY,
			{
				expiresIn: '1d',
			},
			(err, token) => {
				if (err) reject(err);
				resolve(token);
			}
		);
	});
};

export const verifyAccessToken = (token: string) => {
	try {
		const user = jwt.verify(token, envs.SECRET_KEY);
		return user;
	} catch (err) {
		throw new Error('Invalid or expired token');
	}
};
