import { Request, Response, NextFunction } from 'express';
// Maybe RequestService have wrong responsibility here
import { jwtService } from '../../services/';

const verifyAuthentication = (request: Request, response: Response, next: NextFunction) => {
    response.locals.user = jwtService.checkUserLogged(request.headers.authorization);
    next();
}

export { verifyAuthentication };
