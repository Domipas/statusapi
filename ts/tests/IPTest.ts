import ping from 'ping';
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

    public async checkTest(): Promise<void> {
        await ping.promise.probe(this.adres, { min_reply: 5 })
            .then((res: ping.PingResponse) => {
                if (res.alive) {
                    this.status = 200;
                    this.latency = parseInt(res.avg);
                    this.timeChecked = new Date();
                } else {
                    this.status = 503;
                }
            }).catch(() => {
                this.status = 503;
                this.timeChecked = new Date();
            })
    }

    public get result(): Result {
        return {
            name: this.name,
            status: this.status,
            latency: this.latency,
            timeChecked: this.timeChecked
        }
    }
}