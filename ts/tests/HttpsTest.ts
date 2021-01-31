import { IncomingMessage } from 'http';
import https from 'https';
import Test from './Test';
import { lanchano } from "../middleware/Middleware";
import { promises as dns } from 'dns';

export default class HttpsTest extends Test {

    adres: string;

    constructor(Name: string, Adres: string) {
        super(Name);
        this.adres = Adres;
    }

    public async checkTest(): Promise<void> {
        try {
            await dns.resolve4(this.adres);
            https.request(this.adres, (res: IncomingMessage) => {
                this.status = res.statusCode ?? 0;
                this.timeChecked = new Date();
            }).end();
        } catch (error) {
            this.status = 503;
            this.timeChecked = new Date();
            lanchano?.logError("StatusAPI", error);
        }
    }
}