import * as yup from 'yup';

type userType = {
    name: string,
    email: string,
    password: string
}

type loginUserType = {
    email: string,
    password: string
}

type TokenPayload = {
    userId: string;
}

const userRegisterValidation: yup.SchemaOf<userType> = yup.object().shape({
    name: yup.string().required().matches(/^[aA-zZ\s]+$/),
    email: yup.string().email().required(),
    password: yup.string().min(8).required().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/),
});

const loginValidation: yup.SchemaOf<loginUserType> = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required().matches(/^[aA-zZ0-9!@#$%&*\s]*$/),
});

export { userType, loginUserType, TokenPayload, userRegisterValidation, loginValidation }