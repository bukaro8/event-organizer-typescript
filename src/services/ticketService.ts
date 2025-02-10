import prisma from '../data/postgres';
import { Ticket } from '@prisma/client';
import { userById } from './userService';

export const createTicket = async (userId: string): Promise<Ticket> => {
	await userById(userId);
	const ticket = await prisma.ticket.create({
		data: {
			userId,
		},
	});
	return ticket;
};
