import prisma from '../data/postgres';
import { Ticket } from '@prisma/client';
import { userById } from './userService';
import simpleUUID from '../plugins/functions/simpleUUID';

export const createTicket = async (
	userId: string,
	type: any
): Promise<Ticket> => {
	await userById(userId);
	const initialTicket = await prisma.ticket.create({
		data: {
			userId,
			type,
			simpleId: '',
		},
	});
	const ticket = await prisma.ticket.update({
		where: { id: initialTicket.id },
		data: {
			simpleId: simpleUUID(initialTicket.id),
		},
	});
	return ticket;
};

export const allTickets = async () => {
	const tickets = await prisma.ticket.findMany({
		select: {
			id: true,
			status: true,
			type: true,
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

export const allActiveTickets = async () => {
	const tickets = await prisma.ticket.findMany({
		where: {
			status: true,
		},
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

export const allRaffleTickets = async () => {
	const tickets = await prisma.ticket.findMany({
		where: {
			type: 'RAFFLE',
			status: true,
		},
		select: {
			id: true,
			status: true,
			type: true,
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
		throw new Error(`Ticket with id ${id} not found`);
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

export const deleteTicket = async (id: string): Promise<void> => {
	await getTicketById(id);
	await prisma.ticket.delete({ where: { id } });
};
