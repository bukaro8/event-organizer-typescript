import { Request, Response } from 'express';
import {
	allActiveTickets,
	allTickets,
	createTicket,
	deleteTicket,
	getTicketById,
	updateTicket,
} from '../services/ticketService';

export const createTicketController = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		const { type } = req.body;
		const ticket = await createTicket(userId, type);
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
			count: tickets.length,
			data: tickets,
		});
	} catch (error: any) {
		res.status(400).send({ status: 'fail', message: error.message });
	}
};

export const getActiveTicketsController = async (
	req: Request,
	res: Response
) => {
	try {
		const tickets = await allActiveTickets();
		res.status(201).send({
			status: 'success',
			count: tickets.length,
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

export const deleteTicketController = async (req: Request, res: Response) => {
	try {
		const id = req.params.ticketId;
		await deleteTicket(id);
		res.status(200).send({
			status: 'success',
			data: 'Ticket deleted successfully ',
		});
	} catch (error: any) {
		res.status(400).send({ status: 'fail', message: error.message });
	}
};
