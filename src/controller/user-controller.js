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

export default {
    userRegister,
    userLogin
}