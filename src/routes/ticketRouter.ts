import { Router } from 'express';
import {
	createTicketController,
	deleteTicketController,
	getActiveTicketsController,
	getAllTicketsController,
	getTicketByIdController,
	updateTicketController,
} from '../controllers/ticketController';

const ticketRouter = Router();

ticketRouter.get('/tickets', getAllTicketsController);
ticketRouter.get('/tickets/active', getActiveTicketsController);
ticketRouter.post('/create-ticket/:userId', createTicketController);
ticketRouter
	.route('/:ticketId')
	.get(getTicketByIdController)
	.put(updateTicketController)
	.delete(deleteTicketController);

export default ticketRouter;
