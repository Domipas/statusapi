import fs = require('fs');
import { AuthKey } from "./interfaces";

// Load apikeys
export const keys: AuthKey[] = (fs.existsSync('./config') && fs.existsSync('./ssl'))? 
    JSON.parse(fs.readFileSync("./config/apikeys.json", "utf8")) : 
    JSON.parse(fs.readFileSync("./tests/test_keys.json", "utf8"));

// API Authorization
export function auth(req : any, res : any, next : any) : void {
    if (req.method == "OPTIONS") {
        next();
    } else {
        const auth = req.header("Authorization");
        const apikey = (auth == null)? "null" : auth.split(" ")[1];
        (auth == null)? null : ((auth.split(" ")[0] != "Bearer")? res.status(401).end():null);
        let found = false;
        keys.forEach(element => {
            if (element.key==apikey) {
                found = true;
                (element.endpoints.includes(req.url))? next() : res.writeHead(405, {'Content-Type': 'text/plain'}).end('Method Not Allowed\n');
            }
        });
        !found?res.status(401).end():null;
    }
}