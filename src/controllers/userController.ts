import { Request, Response } from 'express';
import prisma from '../data/postgres';

import { createUser } from '../services/userService';
interface UserProps {
	name: string;
	phone: string | null;
	picture?: string | null;
}

export const getAllUsersController = async (req: Request, res: Response) => {
	res.status(200).send('response');
};

export const createUserController = async (req: Request, res: Response) => {
	try {
		const { name, picture, phone } = req.body;
		if (!name) throw 'Name is required';
		const newUser = await createUser({ name, picture, phone });
		res.status(201).send({ status: 'success', data: newUser });
	} catch (error) {
		res.status(400).send({ status: 'fail' });
	}
};
