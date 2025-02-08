import { Request, Response } from 'express';
import prisma from '../data/postgres';

import { allUsers, createUser, userById } from '../services/userService';
interface UserProps {
	name: string;
	phone: string | null;
	picture?: string | null;
}

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
export const getAllUsersController = async (req: Request, res: Response) => {
	try {
		const users = await allUsers();
		res
			.status(200)
			.send({ status: 'success', count: users.length, data: users });
	} catch (error) {
		res.status(400).send({ status: 'fail' });
	}
};
export const getUserById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		if (!id) throw Error('error');
		console.log(req.params);
		const user = await userById(id);
		res.status(200).send({ status: 'success', data: user });
	} catch (error) {
		res.status(400).send({ status: 'fail', message: error });
	}
};
