import ping = require('ping');
import { Result } from "../interfaces";
import Test from './Test';

export default class IPTest extends Test {
  
    adres: string;
    latency: number;

    constructor(Name: string, Adres: string) {
        super(Name);
        this.adres = Adres;
        this.latency = -1;
    }

    public async checkTest() {
        await ping.promise.probe(this.adres, {min_reply: 5})
        .then((res : any) =>{
            if (res.alive) {
            this.status = 200;
            this.latency = parseInt(res.avg);
            this.timeChecked = new Date();
            } else {
            this.status = 503;
            }
        });
    }

    public get result() : Result {
        return {
            name: this.name,
            status: this.status,
            latency: this.latency,
            timeChecked: this.timeChecked
        }
    }
}