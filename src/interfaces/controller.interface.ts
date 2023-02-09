import { Request, Response } from "express";

export type Controller = (req: Request|any, res: Response|any) => Promise<any>;
export type ControllerBuilder = (...args :any[]) => Controller;
