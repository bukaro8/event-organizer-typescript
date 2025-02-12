import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: any, res: Response, next: NextFunction) => {
	try {
		if (req.user.role !== 'ADMIN')
			throw new Error('Access denied Only admin zone');
		next();
	} catch (error: any) {
		res.status(401).send({
			status: 'fail',
			message: error.message,
		});
	}
};
