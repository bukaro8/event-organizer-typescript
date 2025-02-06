import express from 'express';
import morgan from 'morgan';
import Server from './server';
import { envs } from './plugins/envs/envs.plugin';
import { app } from './server';
Server();

//*Middlewares===============
envs.NODE_ENV === 'development' && app.use(morgan('dev'));

app.use(express.json());

//*Middlewares===============

//?Routes====================

//?Routes====================

export default app;
