import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import express from 'express';
import auth from './auth';
import { App } from "@raouldeheer/tstypes";

export default class Middleware {

    limiter = RateLimit({
        windowMs: 1 * 60 * 1000, // 1 minute
        max: 200
    });

    constructor(app: App) {
        app.use(this.limiter);
        app.use(helmet());
        app.use(morgan('common'));
        app.use(express.json()); // for parsing application/json
        app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        app.use(cors());
        app.use(auth); // for API Authorization
    }
}