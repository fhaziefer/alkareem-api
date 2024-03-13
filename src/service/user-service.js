import { registerUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import {prismaClient} from "../application/database.js"
import { ResponseError } from "../error/response-error.js";
import bcrypt from 'bcrypt';

const userRegister = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, "Username is already exist")
    }

    user.password = await bcrypt.hash(user.password, 10);
    user.username = await user.username.toLowerCase();

    return prismaClient.user.create({
        data: user,
        select: {
            id: true,
            username: true,
            password: true
        }
    })

}

export default {
    userRegister
}