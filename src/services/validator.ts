import { SchemaOf } from 'yup';
import ErrorAPI from '../middleware/error/ErrorAPI';

const validateObject = <T>(model: SchemaOf<T>, objectToCheck: T) => {
    if (!(model.isValidSync(objectToCheck))) throw new ErrorAPI('BAD_REQUEST');
};

export default { validateObject };