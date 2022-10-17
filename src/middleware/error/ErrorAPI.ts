import { httpStatusType } from '../../utils/HttpStatusCode';

class ErrorAPI extends Error {
    public code: httpStatusType;

    constructor(
        status: httpStatusType,
        message?: string,
    ) {
        super(message);
        this.code = status;
    }
}

export default ErrorAPI;
export const defaultError = new ErrorAPI('INTERNAL_SERVER_ERROR', 'Erro inesperado no servidor');