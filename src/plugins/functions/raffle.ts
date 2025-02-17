import prisma from '../../data/postgres';
import { allRaffleTickets } from '../../services/ticketService';

export class Raffle {
	constructor(public tickets: Awaited<ReturnType<typeof allRaffleTickets>>) {}
	public selectRandomTicket() {
		if (this.tickets.length === 0) throw new Error('Not tickets found');
		const randomIndex = Math.floor(Math.random() * this.tickets.length);
		const selectedTicket = this.tickets[randomIndex];
		//? remove ticket form the list
		this.tickets.splice(randomIndex, 1);
		return selectedTicket;
	}
}
