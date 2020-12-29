import checker from "../checker";
import { App, Req, Res } from '../interfaces';
import Handler from "./Handler";

export default class ServerHandler extends Handler {

    constructor(newchecker: checker) {
        super(newchecker)
    }

    public handle(app: App): void {
        app.get('/version', (q, s) => { this.version(q, s) });
        app.get('/version/', (q, s) => { this.version(q, s) });
        app.post('/update', (q, s) => { this.update(q, s) });
        app.post('/update/', (q, s) => { this.update(q, s) });
        app.post('/clients/update', (q, s) => { this.updateClients(q, s) });
        app.post('/clients/update/', (q, s) => { this.updateClients(q, s) });
    }

    private version(_req: Req, res: Res): void {
        res.status(200).end(process.env.npm_package_version);
    }
    private update(_req: Req, res: Res): void {
        this.checkscript.check();
        res.sendStatus(200);
    }
    private updateClients(_req: Req, res: Res): void {
        this.checkscript.checkClients();
        res.sendStatus(200);
    }
}