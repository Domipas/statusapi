import { IncomingMessage } from 'http';
import https from 'https';
import Test from './Test';
import Lanchano from "@domipas/lanchano";
const lanchano = new Lanchano.Lanchano()

export default class HttpsTest extends Test {

    adres: string;

    constructor(Name: string, Adres: string) {
        super(Name);
        this.adres = Adres;
    }

    public async checkTest(): Promise<void> {
        try {
            https.request(this.adres, (res: IncomingMessage) => {
                this.status = res.statusCode ?? 0;
                this.timeChecked = new Date();
            }).end();
        } catch (error) {
            this.status = 503;
            this.timeChecked = new Date();
            lanchano.logError("StatusAPI", error);
        }
    }
}