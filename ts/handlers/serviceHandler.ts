import { Express } from 'express-serve-static-core';
import { Result } from "../interfaces";
import { checker } from "../checker";
import { Handler } from "./Handler";

export class serviceHandler extends Handler {

    constructor(newchecker: checker) {
        super(newchecker);
    }

    public handle(app : Express): void {
        app.get('/',            (q,s)=>{this.allServices(q,s)});
        app.get('/time',        (q,s)=>{this.servicesTime(q,s)});
        app.get('/time/',       (q,s)=>{this.servicesTime(q,s)});
        app.get('/service',     (q,s)=>{this.service(q,s)});
        app.get('/service/',    (q,s)=>{this.service(q,s)});
    }

    private allServices(req : any, res : any) {
        res.writeHead(200, {'Content-Type': 'application/json'})
        .end(JSON.stringify(this.checkscript.testsResult));
    }
    private servicesTime(req : any, res : any) {
        try {
            res.writeHead(200, {'Content-Type': 'application/json'})
            .end(JSON.stringify(this.findLatestTime(this.checkscript.testsResult)));
        } catch (error) {
            res.status(500).end(error.message);
        }
    }
    private service(req : any, res : any) : void {
        try {
            if (typeof req.body["service"] == 'undefined') throw new Error("Bad syntax");
            const service: string[] = JSON.parse(req.body["service"]);
            if (typeof service != "object") throw new Error("Bad syntax");
            const results : Result[] = this.findResult(this.checkscript.testsResult, service);
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