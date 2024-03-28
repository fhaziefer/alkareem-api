import {prismaClient} from "../application/database.js";

export const authAdminMiddleware = async (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end();
    } else {
        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            }
        });
        if (!user) {
            res.status(401).json({
                errors: "Unauthorized"
            }).end();
        } else if (user.role === "USER") {
            res.status(401).json({
                errors: "You are not Admin"
            }).end();
        } else {
            req.user = user;
            next();
        }
    }
}