import { TypeTest, Result } from "./interfaces";
import fs from 'fs';
import Test from "./tests/Test";
import HttpTest from "./tests/HttpTest";
import HttpsTest from "./tests/HttpsTest";
import IPTest from "./tests/IPTest";
export default class checker {

    private _clientTests: Test[];
    private _tests: Test[];

    constructor() {
        (!fs.existsSync('./tmp')) ? fs.mkdirSync('./tmp') : null;
        if (fs.existsSync('./config')) {
            this._clientTests = this.generateTests(
                (fs.existsSync("./config/users.json")) ?
                    JSON.parse(fs.readFileSync("./config/users.json", "utf8")) : []
            );
            this._tests = this.generateTests(
                (fs.existsSync("./config/tests.json")) ?
                    JSON.parse(fs.readFileSync("./config/tests.json", "utf8")) : []
            )
        } else { this._clientTests = this._tests = [] }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private generateTests(jsonData: any): Test[] {
        const data: Test[] = [];
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
    public get tests(): Test[] {
        return this._tests;
    }
    public get users(): Test[] {
        return this._clientTests
    }
    public get testsResult(): Result[] {
        const results: Result[] = [];
        for (let i = 0; i < this._tests.length; i++) {
            const element = this._tests[i];
            results.push(element.result);
        }
        return results;
    }
    public get usersResult(): Result[] {
        const results: Result[] = [];
        for (let i = 0; i < this._clientTests.length; i++) {
            const element = this._clientTests[i];
            results.push(element.result);
        }
        return results;
    }

    /** Methods: */
    public async check(): Promise<void> {
        for await (const element of this._tests) {
            element.checkTest();
        }
        for await (const element of this._clientTests) {
            element.checkTest();
        }
    }
    public async checkClients(): Promise<void> {
        for await (const element of this._clientTests) {
            element.checkTest();
        }
    }
}