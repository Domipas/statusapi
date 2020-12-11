import https from 'https';
import Test from './Test';

export default class HttpsTest extends Test {
  
    adres: string;

    constructor(Name: string, Adres: string) {
        super(Name);
        this.adres = Adres;
    }
    
    public async checkTest() {
        https.request(this.adres, (res : any) => {
            this.status = res.statusCode;
            this.timeChecked = new Date();
        }).end();
    }
}