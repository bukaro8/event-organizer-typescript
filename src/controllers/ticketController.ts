import { Request, Response } from 'express';
import {
	allActiveTickets,
	allRaffleTickets,
	allTickets,
	createTicket,
	deleteTicket,
	getTicketById,
	updateTicket,
} from '../services/ticketService';
import { Raffle } from '../plugins/functions/raffle';
import { EmailService } from '../plugins/email/email.service';
import { htmlBodyRaffleWinner } from '../plugins/email/emailTemplate';

export const createTicketController = async (req: any, res: Response) => {
	try {
		const { id } = req.user;
		const { type } = req.body;
		const ticket = await createTicket(id, type);
		res.status(201).send({
			status: 'success',
			data: ticket,
		});
	} catch (error: any) {
		res.status(400).send({ status: 'fail', message: error.message });
	}
};
export const getAllTicketsController = async (req: any, res: Response) => {
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
export const raffleTicketController = async (req: Request, res: Response) => {
	try {
		//?get all active Raffle tickets
		const tickets = await allRaffleTickets();
		//?send the tickets to be randomly selected
		const raffleManager = new Raffle(tickets);
		const randomTicket = raffleManager.selectRandomTicket();
		//?update the ticket status to false so It can't play again
		await updateTicket(randomTicket.id, false);
		//?create and send an email to the winner
		const emailWinner = new EmailService();
		emailWinner.sendEmail({
			from: 'Raffle Organization <notifications.mailer.app@gmail.com>',
			to: randomTicket.user.email,
			subject: 'Congratulations! You Won the Raffle!',
			htmlBody: htmlBodyRaffleWinner(randomTicket),
		});
		//*finally the response
		res.status(200).send({ status: 'success', data: randomTicket });
	} catch (error: any) {
		res.status(400).send(error.message);
	}
};
