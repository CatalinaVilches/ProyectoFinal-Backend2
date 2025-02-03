import express from 'express';
import path from 'path';
import { __dirname } from './utils.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import viewsRouter from './routes/views.router.js';
import sessionRouter from './routes/session.router.js';
import mailRouter from './routes/mail.router.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', viewsRouter);
app.use('/session', sessionRouter);
app.use('/api/mail', mailRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
