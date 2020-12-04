import http = require('http');
import https = require('https');
import fs = require('fs');
import cors = require('cors');
import morgan = require('morgan');
import helmet = require('helmet');
import express = require('express');
import { auth } from "./auth";
import { clientHandler } from "./handlers/clientHandler";
import { serviceHandler } from "./handlers/serviceHandler";
import { serverHandler } from './handlers/serverHandler';
import { loginHandler } from "./handlers/loginHandler";
import { checker } from './checker';

export function serverapp(checkscript: checker) : void {
    const app = express();
    
    //Using middleware:
    app.use(helmet());
    app.use(morgan('common'));
    app.use(express.json()); // for parsing application/json
    app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(cors());
    app.use(auth); // for API Authorization

    //Handle requests:
    new clientHandler(checkscript).handle(app);
    new serviceHandler(checkscript).handle(app);
    new serverHandler(checkscript).handle(app);
    new loginHandler(checkscript).handle(app);

    //Server options and starting.
    http.createServer(app).listen(process.env.PORT || 8284);
    console.log('Server running on port '+ (process.env.PORT || 8284));
    if (fs.existsSync('./ssl')) {
        var options = {
            key: fs.readFileSync('./ssl/key.pem', 'utf8'),
            cert: fs.readFileSync('./ssl/server.crt', 'utf8')
        };
        https.createServer(options , app).listen(process.env.SSLPORT || 8285);
        console.log('SSL Server running on port '+ (process.env.SSLPORT || 8285)); 
    }
}