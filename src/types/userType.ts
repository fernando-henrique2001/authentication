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

export { userType, loginUserType, TokenPayload }