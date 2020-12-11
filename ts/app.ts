import http = require('http');
import https = require('https');
import fs = require('fs');
import express = require('express');
import ClientHandler from "./handlers/ClientHandler";
import ServiceHandler from "./handlers/ServiceHandler";
import ServerHandler from './handlers/ServerHandler';
import LoginHandler from "./handlers/LoginHandler";
import checker from './checker';
import Middleware from './middleware/Middleware';

export default function serverapp(checkscript: checker) : void {
    const app = express();
    
    //Using middleware:
    new Middleware(app);

    //Handle requests:
    new ClientHandler(checkscript).handle(app);
    new ServiceHandler(checkscript).handle(app);
    new ServerHandler(checkscript).handle(app);
    new LoginHandler(checkscript).handle(app);

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