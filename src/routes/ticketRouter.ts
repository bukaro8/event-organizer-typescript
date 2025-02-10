import { Router } from 'express';
import { createTicketController } from '../controllers/ticketController';

const ticketRouter = Router();

ticketRouter.post('/create-ticket/:userId', createTicketController);

export default ticketRouter;
