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
// 	htmlBody: `
// <!DOCTYPE html>
// <html lang="es">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Bienvenido a [Nombre de tu App]</title>
//     <style>
//         /* Estilos aquí */
//     </style>
// </head>
// <body>
//     <div class="email-container">
//         <!-- Encabezado -->
//         <div class="header">
//             <h1>¡Bienvenido a [Nombre de tu App]!</h1>
//         </div>

//         <!-- Contenido -->
//         <div class="content">
//             <h2>Hola [Nombre del Usuario],</h2>
//             <p>
//                 Gracias por registrarte en [Nombre de tu App]. Estamos emocionados de tenerte con nosotros.
//                 Ahora puedes disfrutar de todas las funcionalidades que ofrecemos.
//             </p>
//             <p>
//                 Para comenzar, te invitamos a explorar nuestro sitio web y descubrir todo lo que tenemos para ti.
//             </p>
//             <a href="[Enlace al sitio web]" class="cta-button">Visitar nuestro sitio</a>
//             <p>
//                 Si tienes alguna pregunta, no dudes en contactarnos en <a href="mailto:soporte@tudominio.com">soporte@tudominio.com</a>.
//             </p>
//         </div>

//         <!-- Pie de página -->
//         <div class="footer">
//             <p>
//                 Este correo fue enviado por [Nombre de tu App]. Si no deseas recibir más correos,
//                 <a href="[Enlace para darse de baja]">darse de baja</a>.
//             </p>
//             <p>
//                 &copy; 2023 [Nombre de tu App]. Todos los derechos reservados.
//             </p>
//         </div>
//     </div>
// </body>
// </html>
// `,
// });

export default app;
