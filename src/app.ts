import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import Server from './server';
import { envs } from './plugins/envs/envs.plugin';
import { app } from './server';
Server();

//*Middlewares===============
envs.NODE_ENV === 'development' && app.use(morgan('dev'));

app.use(express.json());

//*Middlewares===============
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
//?Routes====================

//?Routes====================

export default app;
