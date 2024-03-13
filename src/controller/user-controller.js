import userService from "../service/user-service";

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

export default {
    userRegister
}