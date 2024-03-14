import { getUserValidation, loginUserValidation, registerUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import {prismaClient} from "../application/database.js"
import { ResponseError } from "../error/response-error.js";
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid'


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
    });

}

const userLogin = async (request) => {
    const loginRequest = validate(loginUserValidation, request);
    const user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true
        }
    });

       if (!user){
        throw new ResponseError(401, "Username or password is wrong");
       } 

       const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
       if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password is wrong");
       }

       const token = uuid().toString()
       return prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: {
            id: true,
            token: true
        }
       })

}

const userGet = async (username) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        },
        select: {
            id: true,
            username: true
        }
    });

    if (!user) {
        throw new ResponseError(404, "User is not found")
    }

    return user;

}

const userGetAll = async (role) => {
    
    role = validate(getUserValidation, role)
    const isBasicUser = role === "USER"

    const user = await prismaClient.user.findMany({
        where: {
            ...(isBasicUser ? {role : role}: {})
        },
        select: {
            id: true,
            username: true
        }
    });

    if (!user) {
        throw new ResponseError(404, "User is not found")
    }

    return user;

}

export default {
    userRegister,
    userLogin,
    userGet,
    userGetAll
}