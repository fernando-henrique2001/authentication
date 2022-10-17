import { NextFunction, Request, Response } from "express";
import { userService } from "../services";


const create = async (request: Request, response: Response) => {
    const { name, email, password, confirmPassword } = request.body;
    return response
        .status(200)
        .json(await userService.createUser({ name, email, password }, confirmPassword));
};

const login = async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const tokens = await userService.getToken({ email, password });

    return response.status(200).json(tokens);
}

const perfil = async (request: Request, response: Response, next: NextFunction) => {
    return response.status(200).json({ message: "Usuário logado com sucesso!" });
};

export default { create, login, perfil };