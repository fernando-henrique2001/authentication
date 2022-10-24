import db from "../data/db-config";
import ErrorAPI from "../middleware/error/ErrorAPI";
import { userType } from "../types/userType";
import { parseObject } from "../utils/utils";

const createUser = async (user: userType) => {

    return db.table("user").insert(user);
}

const getUser = async (email: string) => {

    let user: any = await db.select().where({
        email,
    }).table("user").first();

    if (user) user = parseObject(user);
    console.log(user);
    return user;

};

const getUserById = async (userId: string) => {
    if (!userId) {
        throw new ErrorAPI("BAD_REQUEST")
    }
    let user: any = await db.select(["name", "email"]).where({
        id: userId,
    }).table("user").first();

    if (user) user = parseObject(user);

    return user;

};

export default { createUser, getUser, getUserById };