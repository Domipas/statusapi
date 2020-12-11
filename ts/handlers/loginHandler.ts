import { AuthKey } from "../interfaces";
import { keys } from "../auth";
import checker from '../checker';
import Handler from './Handler';
import { Express } from 'express-serve-static-core';

export default class loginHandler extends Handler {
    
    private key: AuthKey;

    constructor(newchecker: checker) {
        super(newchecker);
        this.key = {name: "", endpoints: [], key: ""};
        keys.forEach(element => {
            if (element.name == "login") {
                this.key = element;
            }
        });
    }

    public handle(app: Express): void {
        app.get('/login',   (q,s)=>{this.authLogin(q,s)});
        app.get('/login/',  (q,s)=>{this.authLogin(q,s)});
        app.post('/login',  (q,s)=>{this.authLogin(q,s)});
        app.post('/login/', (q,s)=>{this.authLogin(q,s)});
    }

    private login(loginKey : string) : boolean {
        if (loginKey == this.key.key) {
            return true;
        } else {
            return false;
        }
    }
    private authLogin(req : any, res : any) : void {
        try {
            if (typeof req.body["loginkey"] == 'undefined') throw new Error("Bad syntax");
            const loginkey: string = req.body["loginkey"];
            if (typeof loginkey != "string") throw new Error("Bad syntax");
            this.login(loginkey)? res.sendStatus(200) : res.sendStatus(403);
        } catch (error) {
            res.status(417).end(error.message);
        }
    }
}