import { NextFunction, Request, Response } from "express";
import { userService } from "../services";


const create = async (request: Request, response: Response) => {
    const { name, email, password, confirmPassword } = request.body;
    const log = await userService.createUser({ name, email, password }, confirmPassword)
    console.log(log);
    return response
        .status(200)
        .json({ message: "User registered successfully" });
};

const login = async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const tokens = await userService.getToken({ email, password });

    return response.status(200).json(tokens);
}

const perfil = async (request: Request, response: Response, next: NextFunction) => {
    const { userId } = response.locals.user;
    return response.status(200).json(await userService.getUserById(userId));
};

export default { create, login, perfil };