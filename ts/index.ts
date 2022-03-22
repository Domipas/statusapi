import http from 'http';
import https from 'https';
import mylas from "mylas";
import schedule from 'node-schedule';
import checker from "./checker";
import serverapp from "./app";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
const checkscript = new checker();
checkscript.check();
setTimeout(checkscript.check, 5000);
schedule.scheduleJob('* */3 * * *', checkscript.check);
const app = serverapp(checkscript);
//Server options and starting.
http.createServer(app).listen(process.env.PORT || 8284);
console.log('Server running on port ' + (process.env.PORT || 8284));
if (mylas.dir.checkS('./ssl')) {
    const options = {
        key: mylas.loadS("./ssl/key.pem"),
        cert: mylas.loadS("./ssl/server.crt"),
    };
    https.createServer(options, app).listen(process.env.SSLPORT || 8285);
    console.log('SSL Server running on port ' + (process.env.SSLPORT || 8285));
}