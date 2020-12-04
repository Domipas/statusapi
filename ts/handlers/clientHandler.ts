import { Express } from 'express-serve-static-core';
import { Result } from "../interfaces";
import { checker } from "../checker";
import { Handler } from "./Handler";

export class clientHandler extends Handler {

    constructor(newchecker: checker) {
        super(newchecker);
    }

    public handle(app : Express) : void {
        app.get('/clients',         (q,s)=>{this.allClients(q,s)});
        app.get('/clients/',        (q,s)=>{this.allClients(q,s)});
        app.get('/client',          (q,s)=>{this.client(q,s)});
        app.get('/client/',         (q,s)=>{this.client(q,s)});
        app.get('/clients/time',    (q,s)=>{this.clientTime(q,s)});
        app.get('/clients/time/',   (q,s)=>{this.clientTime(q,s)});
    }

    private allClients(req : any, res : any) : void {
        res.writeHead(200, {'Content-Type': 'application/json'})
        .end(JSON.stringify(this.checkscript.getUsers));
    }
    private clientTime(req : any, res : any) : void {
        try {
            res.writeHead(200, {'Content-Type': 'application/json'})
            .end(JSON.stringify(this.findLatestTime(this.checkscript.getUsers)));
        } catch (error) {
            res.status(500).end(error.message);
        }
    }
    private client(req : any, res : any) : void {
        try {
            if (typeof req.body["client"] == 'undefined') throw new Error("Bad syntax");
            const client: string[] = JSON.parse(req.body["client"]);
            if (typeof client != "object") throw new Error("Bad syntax");
            const results : Result[] = this.findResult(this.checkscript.getUsers, client);
            if (results.length!=0) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(results));
            }
            !(results.length!=0)?res.sendStatus(404):null;
        } catch (error) {
            res.status(417).end(error.message);
        }
    }
}