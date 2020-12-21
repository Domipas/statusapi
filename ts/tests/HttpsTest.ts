import { IncomingMessage } from 'http';
import https from 'https';
import Test from './Test';

export default class HttpsTest extends Test {
  
    adres: string;

    constructor(Name: string, Adres: string) {
        super(Name);
        this.adres = Adres;
    }
    
    public async checkTest() : Promise<void> {
        https.request(this.adres, (res : IncomingMessage) => {
            this.status = res.statusCode ?? 0;
            this.timeChecked = new Date();
        }).end();
    }
}