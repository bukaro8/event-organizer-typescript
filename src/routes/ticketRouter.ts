import { Router } from 'express';
import {
	createTicketController,
	getAllTicketsController,
} from '../controllers/ticketController';

const ticketRouter = Router();

ticketRouter.get('/tickets', getAllTicketsController);
ticketRouter.post('/create-ticket/:userId', createTicketController);

export default ticketRouter;
