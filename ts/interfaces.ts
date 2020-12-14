import { Request, Response, Application, NextFunction } from "express";

export type Res = Response;
export type Req = Request;
export type Next = NextFunction;
export type App = Application;

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