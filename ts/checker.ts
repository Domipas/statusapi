import { TypeTest, Result } from "./interfaces";
import fs = require('fs');
import { Test } from "./tests/Test";
import { HttpTest } from "./tests/HttpTest";
import { HttpsTest } from "./tests/HttpsTest";
import { IPTest } from "./tests/IPTest";
export class checker {

    private clientTests: Test[];
    private tests: Test[];

    constructor() {
        (!fs.existsSync('./tmp'))? fs.mkdirSync('./tmp') : null;
        if (fs.existsSync('./config')){
            this.clientTests = this.generateTests(
                (fs.existsSync("./config/users.json"))? 
                JSON.parse(fs.readFileSync("./config/users.json", "utf8")) : []
            );
            this.tests = this.generateTests(
                (fs.existsSync("./config/tests.json"))? 
                JSON.parse(fs.readFileSync("./config/tests.json", "utf8")) : []
            )
        } else { this.clientTests = this.tests = [] }
    }

    private generateTests(jsonData: any) : Test[] {
        let data : Test[] = [];
        for (let i = 0; i < jsonData.length; i++) {
            const element = jsonData[i];
            switch (element.type) {
                case TypeTest.IP:
                    data.push(new IPTest(element.name, element.adres));
                    break;
                case TypeTest.HTTP:
                    data.push(new HttpTest(element.name, element.adres));
                    break;
                case TypeTest.HTTPS:
                    data.push(new HttpsTest(element.name, element.adres));
                    break;
                default:
                    console.log("Unknown test");
                    break;
            }
        }
        return data;
    }
   
    /** Getters: */
    public get getTests() : Test[] {
        return this.tests;
    }
    public get getUsers() : Test[] {
        return this.clientTests
    }
    public get testsResult() : Result[] {
        let results : Result[] = [];
        for (let i = 0; i < this.tests.length; i++) {
            const element = this.tests[i];
            results.push(element.result);
        }
        return results;
    }
    public get usersResult() : Result[] {
        let results : Result[] = [];
        for (let i = 0; i < this.clientTests.length; i++) {
            const element = this.clientTests[i];
            results.push(element.result);
        }
        return results; 
    }

    /** Methods: */
    async check() {
        for await (let element of this.tests) {
            element.checkTest();
        }
        for await (let element of this.clientTests) {
            element.checkTest();
        }
    }
    async checkClients() {
        for await (let element of this.clientTests) {
            element.checkTest();
        }
    }
}