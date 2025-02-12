import jwt from 'jsonwebtoken';
import { envs } from '../envs/envs.plugin';

const createAccessToken = (payload: any) => {
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
export default createAccessToken;
