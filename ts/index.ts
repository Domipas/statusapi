import schedule = require('node-schedule');
import checker from "./checker";
import serverapp from "./app";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
const checkscript = new checker();
checkscript.check();
setTimeout(() => { checkscript.check(); }, 5000);
schedule.scheduleJob('* */3 * * *', () => { checkscript.check(); });
serverapp(checkscript);