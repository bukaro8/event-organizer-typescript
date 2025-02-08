import prisma from '../data/postgres';
import { User } from '@prisma/client';
import { envs } from '../plugins/envs/envs.plugin';
interface CreateUserInput {
	name: string;
	role?: 'ADMIN' | 'USER';
	picture?: string;
	email?: string;
	phone?: string;
}
export const createUser = async (data: CreateUserInput): Promise<User> => {
	return await prisma.user.create({
		data: {
			name: data.name,
			role: data.role || 'USER',
			email: data.email || envs.SCHOOL_EMAIL,
			picture: data.picture || null,
			phone: data.phone || null,
		},
	});
};
export const allUsers = async (): Promise<User[]> => {
	return await prisma.user.findMany();
};
export const userById = async (id: string): Promise<User> => {
	const user = await prisma.user.findUnique({ where: { id: id } });
	if (!user) throw new Error(`User with id ${id} not found`);
	return user;
};
