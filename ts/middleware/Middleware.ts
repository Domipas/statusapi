import fs from 'fs';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import express from 'express';
import auth from './auth';
import { App } from '../interfaces';
import { middleware } from "@domipas/lanchano";
const isLogging = fs.existsSync('./config/Lanchano');

export default class Middleware {

    limiter = RateLimit({
        windowMs: 1*60*1000, // 1 minute
        max: 15
    });

    constructor(app: App) {
        app.use(this.limiter);
        app.use(helmet());
        app.use(morgan('common'));
        app.use(express.json()); // for parsing application/json
        app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        app.use(cors());
        isLogging? app.use(middleware("StatusAPI")): null;
        app.use(auth); // for API Authorization
    }
}