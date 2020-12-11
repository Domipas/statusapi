import http = require('http');
import Test from './Test';

export default class HttpTest extends Test {
  
    adres: string;

    constructor(Name: string, Adres: string) {
        super(Name);
        this.adres = Adres;
    }

    public async checkTest() {
        http.request(this.adres, (res : any) => {
            this.status = res.statusCode;
            this.timeChecked = new Date();
        }).end();
    }
}