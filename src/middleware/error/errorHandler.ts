import { NextFunction, Request, Response } from 'express';
import ErrorAPI from './ErrorAPI';
import HttpStatusCode from '../../utils/HttpStatusCode';

// eslint-disable-next-line no-unused-vars
function errorHandler(error: ErrorAPI, request: Request, response: Response, next: NextFunction) {
    if (error instanceof ErrorAPI && error.code !== "INTERNAL_SERVER_ERROR") {
        response.status(HttpStatusCode[error.code]).json({
            message: error.message,
        });
    } else {
        console.error({ error });
        response.status(500).json({
            message: error.message,
            stackError: error.stack
        });
    }
}

export default errorHandler;