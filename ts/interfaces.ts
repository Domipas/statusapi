export enum TypeTest {
    IP,
    HTTP,
    HTTPS
}
export interface Result {
    name: string;
    status: number;
    latency?: number;
    timeChecked: Date;
}
export interface AuthKey {
    name: string;
    endpoints: string[];
    key: string;
}