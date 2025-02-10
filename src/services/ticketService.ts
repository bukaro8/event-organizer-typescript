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

export const allTickets = async () => {
	const tickets = await prisma.ticket.findMany({
		select: {
			id: true,
			status: true,
			user: {
				select: {
					name: true,
					email: true,
				},
			},
		},
	});
	return tickets;
};
