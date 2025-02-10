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

export const getTicketById = async (id: string) => {
	const ticket = await prisma.ticket.findUnique({ where: { id } });
	if (!ticket) {
		throw new Error(`User with id ${ticket}} not found`);
	}
	return ticket;
};

export const updateTicket = async (
	id: string,
	status: boolean
): Promise<Ticket> => {
	const checkTicket = await getTicketById(id);
	if (checkTicket.status === false) throw new Error('Ticket was used already ');
	const ticket = await prisma.ticket.update({
		where: { id },
		data: { status },
	});
	return ticket;
};
