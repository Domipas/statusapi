import { App, AuthKey, Req, Res } from "../interfaces";
import { keys } from "../middleware/auth";
import checker from '../checker';
import Handler from './Handler';

export default class LoginHandler extends Handler {

    private authKey: AuthKey;

    constructor(newchecker: checker) {
        super(newchecker);
        this.authKey = { name: "", endpoints: [], key: "" };
        keys.forEach(element => {
            if (element.name == "login") {
                this.authKey = element;
            }
        });
    }

    public handle(app: App): void {
        app.get('/login', (q, s) => { this.authLogin(q, s); });
        app.get('/login/', (q, s) => { this.authLogin(q, s); });
        app.post('/login', (q, s) => { this.authLogin(q, s); });
        app.post('/login/', (q, s) => { this.authLogin(q, s); });
    }

    private login(loginKey: string): boolean {
        return loginKey == this.authKey.key;
    }
    private authLogin(req: Req, res: Res): void {
        try {
            if (typeof req.body["loginkey"] == 'undefined') throw new Error("Bad syntax");
            const loginkey: string = req.body["loginkey"];
            if (typeof loginkey != "string") throw new Error("Bad syntax");
            this.login(loginkey) ? res.sendStatus(200) : res.sendStatus(403);
        } catch (error) {
            if (error instanceof Error) res.status(417).end(error.message);
        }
    }
}