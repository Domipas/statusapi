import { Result } from "../interfaces";

export default abstract class Test {
    
    name: string;
    status: number;
    timeChecked: Date;

    constructor(Name: string) {
        this.name = Name;
        this.status = 0;
        this.timeChecked = new Date();
    }

    public abstract checkTest() : void

    public get result() : Result {
        return {
            name: this.name,
            status: this.status,
            timeChecked: this.timeChecked
        }
    }
}