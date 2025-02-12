import { Request, Response } from 'express';
import { login } from '../services/authService';

export const loginController = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const result = await login(email, password);
		res.cookie('token', result.token);
		res.status(200).send({
			status: 'success',
			data: result.data,
		});
	} catch (error: any) {
		res.status(404).send(error.message);
	}
};

//!logout doesn't have any service
export const logoutController = (req: Request, res: Response) => {
	res.cookie('token', '', {
		expires: new Date(0),
	});
	res.sendStatus(200);
};
