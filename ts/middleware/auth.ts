import { Dir } from "mylas";
import { AuthKey, Next, Req, Res } from "../interfaces";

// Load apikeys
export const keys: AuthKey[] = (Dir.checkS('./config')) ?
    JSON.loadS<AuthKey[]>("./config/apikeys.json") :
    JSON.loadS<AuthKey[]>("./tests/test_keys.json");

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