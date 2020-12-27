import express = require('express');
import ClientHandler from "./handlers/ClientHandler";
import ServiceHandler from "./handlers/ServiceHandler";
import ServerHandler from './handlers/ServerHandler';
import LoginHandler from "./handlers/LoginHandler";
import checker from './checker';
import Middleware from './middleware/Middleware';
import { App } from './interfaces';

export default function serverapp(checkscript: checker) : App {
    const app = express();
    
    //Using middleware:
    new Middleware(app);

    //Handle requests:
    new ClientHandler(checkscript).handle(app);
    new ServiceHandler(checkscript).handle(app);
    new ServerHandler(checkscript).handle(app);
    new LoginHandler(checkscript).handle(app);

    return app;
}