import userRepository from "../repositories/user";
import ErrorAPI from "../middleware/error/ErrorAPI";
import { userType, loginUserType, userRegisterValidation, loginValidation } from "../types/userTypes";
import bcryptService from "./bcrypt";
import validateService from "./validator";
import jwtService from "./jwt";


const verifyEmailExists = async (email: string) => {
    if (!email) {
        throw new ErrorAPI("BAD_REQUEST")
    }

    return await userRepository.getUser(email);
}

const createUser = async (user: userType, confirmPassword: string) => {
    validateService.validateObject<userType>(userRegisterValidation, user);

    if (user.password !== confirmPassword) {
        throw new ErrorAPI("BAD_REQUEST", "Different passwords")
    }

    if (await verifyEmailExists(user.email)) {
        throw new ErrorAPI("CONFLICT", "Email already exists")
    }

    const passwordEncrypted = await bcryptService.encryptPassword(user.password);

    return await userRepository.createUser({ ...user, password: passwordEncrypted });
}

const checkPassword = async (password: string, passwordEncrypted: string) => {
    const validPass = await bcryptService.compareWithEncrypted(password, passwordEncrypted);

    if (!validPass) throw new ErrorAPI('FORBIDDEN', 'Invalid password');
};

const getToken = async (loginUser: loginUserType) => {
    validateService.validateObject<loginUserType>(loginValidation, loginUser);

    const user = await verifyEmailExists(loginUser.email)

    if (!user) {
        throw new ErrorAPI("NOT_FOUND", "User not found")
    }

    await checkPassword(loginUser.password, user.password);

    const userId = user.id;
    console.log(userId);

    return { token: jwtService.generateJwtToken({ userId }) };
}

export { createUser, getToken }

