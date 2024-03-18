import { createProfileValidation } from "../validation/profile-validation.js"
import { validate } from "../validation/validation.js"
import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js";

const createProfile = async (user, request)=> {

    const profile = validate(createProfileValidation, request);

    const countProfile = await prismaClient.profile.count({
        where: {
            userId: user.id
        }
    });

    if (countProfile === 1) {
        throw new ResponseError(400, "Profile is already exist")
    }

    profile.userId = user.id;

    return prismaClient.profile.create({
        data: profile,
        select: {
            name : true,
            gender: true,
            anak_ke: true,
            alive_status: true,
            avatar: true,
            status: true,
            userId: true
        }
    })

}

export default {
    createProfile
}