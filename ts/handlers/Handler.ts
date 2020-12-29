import checker from "../checker";
import { Result, App } from '../interfaces';

export default abstract class Handler {
    protected checkscript: checker;

    constructor(newchecker: checker) {
        this.checkscript = newchecker;
    }

    public abstract handle(app: App): void

    protected findLatestTime(data: Result[]): Date {
        let checkTime: Date = new Date(0);
        data.forEach((element: Result) => {
            if ((checkTime.getTime() < (element.timeChecked.getTime()))) {
                checkTime = element.timeChecked;
            }
        });
        return checkTime;
    }
    protected findResult(data: Result[], names: string[]): Result[] {
        const results: Result[] = [];
        data.forEach((element: Result) => {
            names.forEach((dataToCheck: string) => {
                if (element.name == dataToCheck) {
                    results.push(element);
                }
            });
        });
        return results;
    }
}