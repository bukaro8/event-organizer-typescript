import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import Server from './server';
import { envs } from './plugins/envs/envs.plugin';
import { app } from './server';
import userRouter from './routes/userRouter';
import ticketRouter from './routes/ticketRouter';
import authRouter from './routes/authRouter';
import { validateToken as isAuthenticated } from './plugins/functions/validateToken.middleware';
import { EmailService } from './plugins/email/email.service';
Server();
const version = '/api/v1';

//*Middlewares===============
envs.NODE_ENV === 'development' && app.use(morgan('dev'));
app.use(express.json());

//*Middlewares===============
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
//?Routes====================
app.use(`${version}/auth`, authRouter);
app.use(`${version}/user`, userRouter);
app.use(`${version}/ticket`, isAuthenticated, ticketRouter);
//?Routes====================

//?email
// const emailService = new EmailService();

// emailService.sendEmail({
// 	from: '"Account Created" <notifications.mailer.app@gmail.com>',
// 	to: 'bukaro83@gmail.com',
// 	subject: 'prueva inicial de correos',
// 	htmlBody: `<!DOCTYPE html>
// 	<html>
// 	<head>
// 			<style>
// 					body {
// 							font-family: Arial, sans-serif;
// 							margin: 0;
// 							padding: 0;
// 							background-color: #f4f4f4;
// 					}
// 					.container {
// 							width: 80%;
// 							margin: auto;
// 							overflow: hidden;
// 					}
// 					.header {
// 							background: #333;
// 							color: #fff;
// 							padding-top: 30px;
// 							min-height: 70px;
// 							border-bottom: #77aaff 3px solid;
// 					}
// 					.header a {
// 							color: #fff;
// 							text-decoration: none;
// 							text-transform: uppercase;
// 							font-size: 16px;
// 					}
// 					.header ul {
// 							padding: 0;
// 							list-style: none;
// 					}
// 					.header li {
// 							float: left;
// 							display: inline;
// 							padding: 0 20px 0 20px;
// 					}
// 					.header #branding {
// 							float: left;
// 					}
// 					.header #branding h1 {
// 							margin: 0;
// 					}
// 					.header nav {
// 							float: right;
// 							margin-top: 10px;
// 					}
// 					.banner {
// 							text-align: center;
// 							margin-bottom: 50px;
// 					}
// 					.banner img {
// 							width: 100%;
// 							height: auto;
// 					}
// 					.content {
// 							padding: 20px;
// 							background: #fff;
// 					}
// 					.content h2 {
// 							margin: 0;
// 							padding-bottom: 20px;
// 							color: #333;
// 							text-align: center;
// 					}
// 					.content p {
// 							text-align: center;
// 							font-size: 18px;
// 							line-height: 1.6;
// 					}
// 					.footer {
// 							background: #333;
// 							color: #fff;
// 							text-align: center;
// 							padding: 10px;
// 							margin-top: 20px;
// 					}
// 			</style>
// 	</head>
// 	<body>
// 			<div class="container">
// 					<div class="header">
// 							<div id="branding">
// 									<h1>School Fun Fair</h1>
// 							</div>
// 							<nav>
// 									<ul>
// 											<li><a href="#">Home</a></li>
// 											<li><a href="#">About</a></li>
// 											<li><a href="#">Contact</a></li>
// 									</ul>
// 							</nav>
// 					</div>
// 					<div class="banner">
// 							<img src="https://media.istockphoto.com/id/1322196888/vector/funfair-banner-with-typography-design-vector-illustration-with-retro-light-bulbs-font-streamers.jpg?s=612x612&w=0&k=20&c=ZJl78V22Z3067j6W3Y87jyh5-F5_yKZ63kF9KZOqDXc=" alt="Fun Fair Banner">
// 					</div>
// 					<div class="content">
// 							<h2>Welcome to Our School Fun Fair!</h2>
// 							<p>Join us for a day filled with fun, games, and excitement!</p>
// 							<img src="https://media.istockphoto.com/id/1322196888/vector/funfair-banner-with-typography-design-vector-illustration-with-retro-light-bulbs-font-streamers.jpg?s=612x612&w=0&k=20&c=ZJl78V22Z3067j6W3Y87jyh5-F5_yKZ63kF9KZOqDXc=" alt="Fun Fair Activities">
// 							<p>Enjoy various activities like face painting, carnival games, and delicious treats!</p>
// 					</div>
// 					<div class="footer">
// 							<p>© 2023 School Fun Fair. All rights reserved.</p>
// 					</div>
// 			</div>
// 	</body>
// 	</html>`,
// });

export default app;
