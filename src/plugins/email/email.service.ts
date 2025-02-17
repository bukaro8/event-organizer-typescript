import nodemailer from 'nodemailer';
import { envs } from '../envs/envs.plugin';

interface SendMailOptions {
	from: string;
	to: string;
	subject: string;
	htmlBody: string;
	//todo: attachments
}

export class EmailService {
	private transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: envs.MAILER_EMAIL,
			pass: envs.MAILER_SECRET_KEY,
		},
	});
	async show() {
		console.log({ user: envs.MAILER_EMAIL, pass: envs.MAILER_SECRET_KEY });
	}
	async sendEmail(options: SendMailOptions): Promise<boolean> {
		const { from, to, subject, htmlBody } = options;
		try {
			// console.log('Enviando correo...');
			const sendInformation = await this.transporter.sendMail({
				from: from,
				to: to,
				subject: subject,
				html: htmlBody,
			});

			return true;
		} catch (error) {
			console.error('error sending email:', error);
			return false;
		}
	}
}
