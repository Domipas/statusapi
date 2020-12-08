import { TypeTest, Test } from "./interfaces";
import http = require('http');
import https = require('https');
import fs = require('fs');
import ping = require('ping');
export class checker {

    clientTests: Test[];
    tests: Test[];

    constructor() {
        (!fs.existsSync('./tmp'))? fs.mkdirSync('./tmp') : null;
        if (fs.existsSync('./config')){
            this.clientTests    = (fs.existsSync("./config/users.json"))? JSON.parse(fs.readFileSync("./config/users.json", "utf8")) : [];
            this.tests          = (fs.existsSync("./config/tests.json"))? JSON.parse(fs.readFileSync("./config/tests.json", "utf8")) : [];
        } else { this.clientTests = this.tests = [] }
    }
   
    /** Getters: */
    public get getTests() : Test[] {
        return this.tests;
    }
    public get getUsers() : Test[] {
        return this.clientTests
    }

    /** Methods: */
    async check() {
        this.checktests(this.tests).then((res : Test[]) =>{
            fs.writeFileSync("./tmp/tests.json", JSON.stringify(res), "utf8");
        })
        this.checktests(this.clientTests).then(function(res : Test[]){
            fs.writeFileSync("./tmp/clientstests.json", JSON.stringify(res), "utf8");
        })
    }
    async checkClients() {
        this.checktests(this.clientTests).then(function(res : Test[]){
            fs.writeFileSync("./tmp/clientstests.json", JSON.stringify(res), "utf8");
        })
    }
    async checktests(array : Test[]) {
        for await (let element of array) {
            element = await this.checktest(element);
        }
        return array; 
    }
    async checktest(element : Test) {
        switch (element.type) {
            case TypeTest.IP:
                await ping.promise.probe(element.adres, {min_reply: 5})
                .then(function(res : any){
                    if (res.alive) {
                    element.status = 200;
                    element.latency = parseInt(res.avg);
                    element.timeChecked = new Date();
                    } else {
                    element.status = 503;
                    }
                });
                break;
            case TypeTest.HTTP:
                http.request(element.adres, (res : any) => {
                    element.status = res.statusCode;
                    element.timeChecked = new Date();
                    }).end();
                break;
            case TypeTest.HTTPS:
                https.request(element.adres, (res : any) => {
                    element.status = res.statusCode;
                    element.timeChecked = new Date();
                }).end();
                break;
            default:
                element.status = 503;
                break;
        }
        return element;
    }
}