import http, { IncomingMessage } from 'http';
import Test from './Test';
import { promises as dns } from 'dns';

export default class HttpTest extends Test {

    adres: string;
    constructor(Name: string, Adres: string) {
        super(Name);
        this.adres = Adres;
    }

    public async checkTest(): Promise<void> {
        try {
            await dns.resolve4(this.adres.replace("http://", ""));
            http.request(this.adres, (res: IncomingMessage) => {
                this.status = res.statusCode ?? 0;
                this.timeChecked = new Date();
            }).end();
        } catch (error) {
            this.status = 503;
            this.timeChecked = new Date();
        }
    }
}