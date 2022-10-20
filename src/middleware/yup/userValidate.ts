import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import ErrorAPI from '../error/ErrorAPI';
import { userType, loginUserType } from '../../types/userType';

const register: yup.SchemaOf<userType> = yup.object().shape({
    name: yup.string().required().matches(/^[aA-zZ\s]+$/),
    email: yup.string().email().required(),
    password: yup.string().min(8).required().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/),
});

const login: yup.SchemaOf<loginUserType> = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required().matches(/^[aA-zZ0-9!@#$%&*\s]*$/),
});

const loginValidation = (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request.body;
    const userLogin = {
        email,
        password,
    }
    if (!(login.isValidSync(userLogin))) throw new ErrorAPI('BAD_REQUEST');
    next()
};

const registerValidation = (request: Request, response: Response, next: NextFunction) => {
    const { name, email, password } = request.body;
    const userRegister = {
        name,
        email,
        password,
    }
    if (!(register.isValidSync(userRegister))) throw new ErrorAPI('BAD_REQUEST');
    next()
};

export { loginValidation, registerValidation };