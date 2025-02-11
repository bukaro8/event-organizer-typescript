import { Request, Response } from 'express';
import { login } from '../services/authService';

export const loginController = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const result = await login(email, password);
		res.send(result);
	} catch (error: any) {
		res.status(404).send(error.message);
	}
};
