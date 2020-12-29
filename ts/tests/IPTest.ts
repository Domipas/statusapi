import ping = require('ping');
import { Result } from "../interfaces";
import Test from './Test';
import _Lanchano from "@domipas/lanchano";
import fs from "fs";
const isLogging = fs.existsSync('./config/Lanchano/config.json');
const lanchano = isLogging ? new _Lanchano() : undefined;

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
            }).catch((error) => {
                this.status = 503;
                this.timeChecked = new Date();
                if (isLogging) lanchano.logError("StatusAPI", error);
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