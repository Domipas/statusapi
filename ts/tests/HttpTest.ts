import http, { IncomingMessage } from 'http';
import Test from './Test';

export default class HttpTest extends Test {
  
    adres: string;
    constructor(Name: string, Adres: string) {
        super(Name);
        this.adres = Adres;
    }

    public async checkTest() : Promise<void> {
        http.request(this.adres, (res : IncomingMessage) => {
            this.status = res.statusCode ?? 0;
            this.timeChecked = new Date();
        }).end();
    }
}