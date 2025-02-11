import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import Server from './server';
import { envs } from './plugins/envs/envs.plugin';
import { app } from './server';
import userRouter from './routes/userRouter';
import ticketRouter from './routes/ticketRouter';
import authRouter from './routes/authRouter';
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
app.use(`${version}/ticket`, ticketRouter);
//?Routes====================

export default app;
