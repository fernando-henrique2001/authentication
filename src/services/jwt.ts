import jwt, { TokenExpiredError } from 'jsonwebtoken';
import ErrorAPI from '../middleware/error/ErrorAPI';
import { TokenPayload } from '../types/userTypes';

const generateJwtToken = (data: any) => {
    if (process.env.SECRET === undefined || process.env.EXPIRES_TOKEN_SECONDS === undefined) {
        throw new ErrorAPI('INTERNAL_SERVER_ERROR');
    }

    return jwt.sign(
        data,
        process.env.SECRET,
        {
            expiresIn: parseInt(process.env.EXPIRES_TOKEN_SECONDS, 10),
        },
    );
};

const authenticateUser = (token: string) => {
    try {
        return jwt.verify(token as string, process.env.SECRET as string) as TokenPayload;
    } catch (error) {
        if (error instanceof TokenExpiredError) throw new ErrorAPI('UNAUTHORIZED', 'Expired token');

        throw new ErrorAPI('UNAUTHORIZED', 'Problem found in token verify');
    }
}

const getAuthorization = (headerAuthorization: string | undefined) => {
    if (!headerAuthorization) throw new ErrorAPI('UNAUTHORIZED', 'Token is missing in header of request');

    const [verifyType, token] = headerAuthorization.split(' ');

    if (verifyType !== 'Bearer') throw new ErrorAPI('UNAUTHORIZED', 'Bearer is missing in header of request');

    return token;
}

const checkUserLogged = (headerAuthorization: string | undefined) => {
    const token = getAuthorization(headerAuthorization);

    return authenticateUser(token);
}

export default { generateJwtToken, checkUserLogged }