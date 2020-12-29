import { Result, App, Req, Res } from "../interfaces";
import checker from "../checker";
import Handler from "./Handler";
import { Lanchano } from "@domipas/lanchano";
const lanchano = new Lanchano();

export default class ClientHandler extends Handler {

    constructor(newchecker: checker) {
        super(newchecker);
    }

    public handle(app: App): void {
        app.get('/clients', (q, s) => { this.allClients(q, s) });
        app.get('/clients/', (q, s) => { this.allClients(q, s) });
        app.get('/client', (q, s) => { this.client(q, s) });
        app.get('/client/', (q, s) => { this.client(q, s) });
        app.get('/clients/time', (q, s) => { this.clientTime(q, s) });
        app.get('/clients/time/', (q, s) => { this.clientTime(q, s) });
    }

    private allClients(_req: Req, res: Res): void {
        res.writeHead(200, { 'Content-Type': 'application/json' })
            .end(JSON.stringify(this.checkscript.usersResult));
    }
    private clientTime(_req: Req, res: Res): void {
        try {
            res.writeHead(200, { 'Content-Type': 'application/json' })
                .end(JSON.stringify(this.findLatestTime(this.checkscript.usersResult)));
        } catch (error) {
            lanchano.logError("StatusAPI", error);
            res.status(500).end(error.message);
        }
    }
    private client(req: Req, res: Res): void {
        try {
            if (typeof req.body["client"] == 'undefined') throw new Error("Bad syntax");
            const client: string[] = JSON.parse(req.body["client"]);
            if (typeof client != "object") throw new Error("Bad syntax");
            const results: Result[] = this.findResult(this.checkscript.usersResult, client);
            if (results.length != 0) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(results));
            }
            !(results.length != 0) ? res.sendStatus(404) : null;
        } catch (error) {
            lanchano.logError("StatusAPI", error);
            res.status(417).end(error.message);
        }
    }
}