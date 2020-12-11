import { Express } from 'express-serve-static-core';
import checker from "../checker";
import Handler from "./Handler";

export default class serverHandler extends Handler {

    constructor(newchecker: checker) {
        super(newchecker)
    }

    public handle(app : Express): void {
        app.get('/version',         (q,s)=>{this.version(q,s)});
        app.get('/version/',        (q,s)=>{this.version(q,s)});
        app.post('/update',         (q,s)=>{this.update(q,s)});
        app.post('/update/',        (q,s)=>{this.update(q,s)});
        app.post('/clients/update', (q,s)=>{this.updateClients(q,s)});
        app.post('/clients/update/',(q,s)=>{this.updateClients(q,s)});
    }

    private version(req : any, res : any) : void {
        res.status(200).end(process.env.npm_package_version);
    }
    private update(req : any, res : any) : void {
        this.checkscript.check();
        res.sendStatus(200);
    }
    private updateClients(req : any, res : any) : void {
        this.checkscript.checkClients();
        res.sendStatus(200);
    }
}