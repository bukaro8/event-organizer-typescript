import { Router } from 'express';
import {
	createTicketController,
	getAllTicketsController,
	getTicketByIdController,
	updateTicketController,
} from '../controllers/ticketController';

const ticketRouter = Router();

ticketRouter.get('/tickets', getAllTicketsController);
ticketRouter.post('/create-ticket/:userId', createTicketController);
ticketRouter
	.route('/:ticketId')
	.get(getTicketByIdController)
	.put(updateTicketController);

export default ticketRouter;
