import userRepository from "../repositories/user";
import ErrorAPI from "../middleware/error/ErrorAPI";
import { userType, loginUserType } from "../types/userType";
import bcryptService from "./bcrypt";
import { jwtService } from "./";


const verifyEmailExists = async (email: string) => {
    if (!email) {
        throw new ErrorAPI("BAD_REQUEST")
    }

    return await userRepository.getUser(email);
}

const getUserById = async (userId: string) => {
    if (!userId) {
        throw new ErrorAPI("BAD_REQUEST")
    }

    return await userRepository.getUserById(userId);
}


const createUser = async (user: userType, confirmPassword: string) => {
    //validateService.validateObject<userType>(userRegisterValidation, user);

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

    if (!validPass) throw new ErrorAPI('FORBIDDEN', 'Invalid email or password');
};

const getToken = async (loginUser: loginUserType) => {
    //validateService.validateObject<loginUserType>(loginValidation, loginUser);

    const user = await verifyEmailExists(loginUser.email)

    if (!user) {
        throw new ErrorAPI("UNAUTHORIZED", "Invalid email or password")
    }

    await checkPassword(loginUser.password, user.password);

    const userId = user.id;

    return { message: "success", token: jwtService.generateJwtToken({ userId }) };
}

export { createUser, getToken, getUserById }

