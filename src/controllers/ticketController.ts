import { Request, Response } from 'express';
import { allTickets, createTicket } from '../services/ticketService';

export const createTicketController = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		const ticket = await createTicket(userId);
		res.status(201).send({
			status: 'success',
			data: ticket,
		});
	} catch (error: any) {
		res.status(400).send({ status: 'fail', message: error.message });
	}
};
export const getAllTicketsController = async (req: Request, res: Response) => {
	try {
		const tickets = await allTickets();
		res.status(201).send({
			status: 'success',
			data: tickets,
		});
	} catch (error: any) {
		res.status(400).send({ status: 'fail', message: error.message });
	}
};
