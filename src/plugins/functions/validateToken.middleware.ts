import { Request, Response, NextFunction } from 'express';

import { verifyAccessToken } from './jwt';

export const validateToken = (req: any, res: Response, next: NextFunction) => {
	const { token } = req.cookies;
	try {
		if (!token) throw new Error('No token, authorization denied ');
		//?get the token and decode it and get the user info
		const verifiedUser = verifyAccessToken(token);

		//?set the user info as req.user to be use on the req across the application
		req.user = verifiedUser;
		next();
	} catch (error: any) {
		res.status(401).send({
			status: 'fail',
			message: error.message,
		});
	}
};
