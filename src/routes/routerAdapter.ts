import { Handler, Request, Response, NextFunction } from "express";

export default (handlerFn: Handler) =>
    (request: Request, response: Response, next: NextFunction) =>
        Promise.resolve(handlerFn(request, response, next)).catch((e) => next(e));
