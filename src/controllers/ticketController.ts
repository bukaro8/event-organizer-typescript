import { Request, Response } from 'express';
import {
	allTickets,
	createTicket,
	getTicketById,
	updateTicket,
} from '../services/ticketService';

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
export const getTicketByIdController = async (req: Request, res: Response) => {
	try {
		const id = req.params.ticketId;
		const ticket = await getTicketById(id);
		res.status(201).send({
			status: 'success',
			data: ticket,
		});
	} catch (error: any) {
		res.status(400).send({ status: 'fail', message: error.message });
	}
};
export const updateTicketController = async (req: Request, res: Response) => {
	try {
		const id = req.params.ticketId;
		const ticketUpdated = await updateTicket(id, false);
		res.status(200).send({
			status: 'success',
			data: 'Ticket status has been updated ',
		});
	} catch (error: any) {
		res.status(400).send({ status: 'fail', message: error.message });
	}
};
