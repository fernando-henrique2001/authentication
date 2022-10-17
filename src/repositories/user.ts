import db from "../data/db-config";
import ErrorAPI from "../middleware/error/ErrorAPI";
import { userType } from "../types/userTypes";

const createUser = async (user: userType) => {
    if (!user) {
        throw new ErrorAPI("BAD_REQUEST")
    }

    return db.table("user").insert(user);
}

const getUser = async (email: string) => {
    if (!email) {
        throw new ErrorAPI("BAD_REQUEST")
    }
    const user: any = await db.select().where({
        email,
    }).table("user").first();
    const formattedUser = JSON.parse(JSON.stringify(user))
    return formattedUser;

};

export default { createUser, getUser };