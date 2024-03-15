import userService from "../service/user-service.js";

const userRegister = async (req, res, next) => {
    try {
        const result = await userService.userRegister(req.body);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const userLogin = async (req, res, next) =>{
    try {
        const result = await userService.userLogin(req.body);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const userGet = async (req, res, next) =>{
    try {
        const username = req.user.username;
        const result = await userService.userGet(username);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const userGetAll = async (req, res, next) =>{
    try {
        const role = req.user.role
        const result = await userService.userGetAll(role);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const userUpdate = async (req, res, next) =>{
    try {
        
        const username = req.user.username
        const request = req.body;
        request.username = username;

        await userService.userUpdate(request);
        res.status(200).json({
            data: "User data is successfuly updated"
        })
    } catch (e) {
        next(e)
    }
}

const userLogout = async (req, res, next) =>{
    try {
        await userService.userLogout(req.user.username);
        res.status(200).json({
            data: "User is logged out"
        })
    } catch (e) {
        next(e)
    }
}

export default {
    userRegister,
    userLogin,
    userGet,
    userGetAll,
    userUpdate,
    userLogout
}