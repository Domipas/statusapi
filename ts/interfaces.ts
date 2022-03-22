import { Application, Request, Response, NextFunction } from "express";

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

export type App = Application;
export type Req = Request;
export type Res = Response;
export type Next = NextFunction;
