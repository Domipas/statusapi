import fs from 'fs';
import { AuthKey, Next, Req, Res } from "../interfaces";
import Lanchano from "@domipas/lanchano";
const logger = new Lanchano();
// Load apikeys
export const keys: AuthKey[] = (fs.existsSync('./config'))? 
    JSON.parse(fs.readFileSync("./config/apikeys.json", "utf8")) : 
    JSON.parse(fs.readFileSync("./tests/test_keys.json", "utf8"));

// API Authorization
export default function auth(req : Req, res : Res, next : Next) : void {
    if (fs.existsSync('./config/Lanchano')) {
        res.once("finish", () => {
            logger.logRequest("StatusAPI", req, res);
        });
    }
    
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