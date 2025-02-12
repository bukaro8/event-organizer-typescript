import prisma from '../data/postgres';
import { User } from '@prisma/client';
import { hashPassword } from '../plugins/functions/auth';
import { createAccessToken } from '../plugins/functions/jwt';

interface CreateUserInput {
	name: string;
	password: string;
	role?: 'ADMIN' | 'USER';
	picture?: string;
	email: string;
	phone?: string;
}
export const createUser = async (data: CreateUserInput) => {
	const user = await prisma.user.findUnique({ where: { email: data.email } });
	if (user) throw new Error(`User with ${data.email} already exist`);
	const newUser = await prisma.user.create({
		data: {
			name: data.name,
			password: '',
			role: data.role || 'USER',
			email: data.email,
			picture: data.picture,
			phone: data.phone,
		},
	});
	const token = await createAccessToken({ id: newUser.id });
	const hash = await hashPassword(data.password);

	await prisma.user.update({
		where: { id: newUser.id },
		data: { password: hash },
	});
	const tokenUser = {
		token: token,
		data: newUser,
	};
	return tokenUser;
};
export const allUsers = async () => {
	const users = await prisma.user.findMany({
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			phone: true,
			_count: {
				select: { tickets: true },
			},
		},
	});
	return users;
};

export const userById = async (id: string) => {
	const user = await prisma.user.findUnique({
		where: { id },
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			_count: {
				select: { tickets: true },
			},
			tickets: {
				select: {
					id: true,
					status: true,
				},
			},
		},
	});
	if (!user) {
		throw new Error(`User with id ${id} not found`); // Throw the error
	}
	return user;
};

export const userByEmail = async (email: string): Promise<User> => {
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) throw new Error(`User with email ${email} not found`);
	return user;
};
export const updateUser = async (id: string, data: any): Promise<User> => {
	await userById(id);
	const { name, email, phone } = data;
	const updateUser = await prisma.user.update({
		where: { id },
		data: {
			name,
			email,
			phone,
		},
	});
	return updateUser;
};
export const deleteUser = async (id: string) => {
	await userById(id);
	await prisma.user.delete({ where: { id } });
};
