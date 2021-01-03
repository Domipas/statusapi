import fs from 'fs';
import mylas from "@raouldeheer/mylas";
import { AuthKey } from "../interfaces";
import { Next, Req, Res } from "@raouldeheer/tstypes";

// Load apikeys
export const keys: AuthKey[] = (fs.existsSync('./config')) ?
    JSON.parse(mylas.loadS("./config/apikeys.json")) :
    JSON.parse(mylas.loadS("./tests/test_keys.json"));

// API Authorization
export default function auth(req: Req, res: Res, next: Next): void {

    if (req.method == "OPTIONS") {
        next();
    } else {
        const auth = req.header("Authorization");
        const apikey = (auth == null) ? "null" : auth.split(" ")[1];
        (auth == null) ? null : ((auth.split(" ")[0] != "Bearer") ? res.status(401).end() : null);
        let found = false;
        keys.forEach(element => {
            if (element.key == apikey) {
                found = true;
                (element.endpoints.includes(req.url)) ? next() : res.writeHead(405, { 'Content-Type': 'text/plain' }).end('Method Not Allowed\n');
            }
        });
        !found ? res.status(401).end() : null;
    }
}