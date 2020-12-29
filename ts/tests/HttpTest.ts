import http, { IncomingMessage } from 'http';
import Test from './Test';
import _Lanchano from "@domipas/lanchano";
import fs from "fs";
const isLogging = fs.existsSync('./config/Lanchano/config.json');
const lanchano = isLogging ? new _Lanchano.Lanchano() : undefined;

export default class HttpTest extends Test {

    adres: string;
    constructor(Name: string, Adres: string) {
        super(Name);
        this.adres = Adres;
    }

    public async checkTest(): Promise<void> {
        try {
            http.request(this.adres, (res: IncomingMessage) => {
                this.status = res.statusCode ?? 0;
                this.timeChecked = new Date();
            }).end();
        } catch (error) {
            this.status = 503;
            this.timeChecked = new Date();
            if (isLogging) lanchano.logError("StatusAPI", error);
        }
    }
}