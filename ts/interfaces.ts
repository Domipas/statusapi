export enum TypeTest {
    IP,
    HTTP,
    HTTPS
}
export interface Test {
    name: string;
    adres: string;
    type: TypeTest;
    status: number;
    latency?: number;
    response?: any;
    timeChecked?: Date;
}
export interface Result {
    name: string;
    status: number;
    latency?: number;
    timeChecked?: Date;
}
export interface AuthKey {
    name: string;
    endpoints: string[];
    key: string;
}