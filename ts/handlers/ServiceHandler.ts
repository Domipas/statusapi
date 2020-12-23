import { Result, App, Req, Res } from "../interfaces";
import checker from "../checker";
import Handler from "./Handler";
import { Lanchano } from "@domipas/lanchano";
const lanchano = new Lanchano();

export default class ServiceHandler extends Handler {

    constructor(newchecker: checker) {
        super(newchecker);
    }

    public handle(app : App): void {
        app.get('/',            (q,s)=>{this.allServices(q,s)});
        app.get('/time',        (q,s)=>{this.servicesTime(q,s)});
        app.get('/time/',       (q,s)=>{this.servicesTime(q,s)});
        app.get('/service',     (q,s)=>{this.service(q,s)});
        app.get('/service/',    (q,s)=>{this.service(q,s)});
    }

    private allServices(req : Req, res : Res) {
        res.writeHead(200, {'Content-Type': 'application/json'})
        .end(JSON.stringify(this.checkscript.testsResult));
    }
    private servicesTime(req : Req, res : Res) {
        try {
            res.writeHead(200, {'Content-Type': 'application/json'})
            .end(JSON.stringify(this.findLatestTime(this.checkscript.testsResult)));
        } catch (error) {
            lanchano.logError("StatusAPI", error);
            res.status(500).end(error.message);
        }
    }
    private service(req : Req, res : Res) : void {
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
            lanchano.logError("StatusAPI", error);
            res.status(417).end(error.message);
        }
    }
}