import { Request, Response } from 'express';
import { createTicket } from '../services/ticketService';

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
