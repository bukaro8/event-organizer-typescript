import { Router } from 'express';
import {
	createTicketController,
	deleteTicketController,
	getActiveTicketsController,
	getAllTicketsController,
	getTicketByIdController,
	raffleTicketController,
	updateTicketController,
} from '../controllers/ticketController';
import { isAdmin } from '../plugins/functions/isAdmin.middleware';
import { validateToken } from '../plugins/functions/validateToken.middleware';

const ticketRouter = Router();

ticketRouter.get('/tickets', isAdmin, getAllTicketsController);
ticketRouter.get('/tickets/active', isAdmin, getActiveTicketsController);
ticketRouter.post('/create-ticket', createTicketController);
ticketRouter
	.route('/:ticketId')
	.get(getTicketByIdController)
	.put(isAdmin, updateTicketController)
	.delete(isAdmin, deleteTicketController);
ticketRouter.get('/admin/raffle', isAdmin, raffleTicketController);

export default ticketRouter;
