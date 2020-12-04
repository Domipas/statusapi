import { Express } from 'express-serve-static-core';
import { checker } from "../checker";
import { Result } from '../interfaces';

export abstract class Handler {
    protected checkscript: checker;

    constructor(newchecker: checker) {
        this.checkscript = newchecker;
    }

    public abstract handle(app : Express) : void

    protected findLatestTime(jsonData : any) : Date {
        let checkTime : Date = new Date(0);
        jsonData.forEach((element: any) => {
            if ((typeof element["timeChecked"] !== 'undefined') && (checkTime.getTime() < (new Date(element["timeChecked"]).getTime()))) {
                checkTime = new Date(element["timeChecked"]);
            }
        });
        return checkTime;
    }
    protected findResult(jsonData : any, names : string[]) : Result[] {
        let results : Result[] = [];
        jsonData.forEach((element: any) => {
            names.forEach((dataToCheck: string) => {
                if (element["name"]==dataToCheck) {
                    let resultResponse : Result = {name: element["name"], status: element["status"]};
                    (typeof element["latency"] !== 'undefined')? resultResponse.latency = element["latency"] : null;
                    (typeof element["timeChecked"] !== 'undefined')? resultResponse.timeChecked = element["timeChecked"] : null;
                    results.push(resultResponse);
                }
            });
        });
        return results;
    }
}