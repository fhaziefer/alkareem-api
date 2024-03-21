import { createProfileValidation, updateProfileValidation } from "../validation/profile-validation.js"
import { validate } from "../validation/validation.js"
import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js";
import { logger } from "../application/logging.js";

//* UNTUK MEMBUAT PROFILE UNTUK USER

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
            parentId: true,
            husbandId: true,
            userId: true
        }
    })

}

//* UNTUK GET PROFILE DARI USER

const getProfile = async (user) => {

    const profile = await prismaClient.profile.findUnique({
        where: {
            userId : user.id
        },
        select: {
            name: true,
            gender: true,
            anak_ke: true,
            birthday: true,
            alive_status: true,
            status: true,
            husband: {
                select: {
                    name: true
                }
            },
            parent: {
                select: {
                    name: true
                }
            },
            wife: {
                select: {
                    name: true
                }
            },
            bani: {
                select: {
                    bani_name: true
                }
            },
            generasi: {
                select: {
                    generasi_name: true
                }
            }
        }
    })
    logger.info(user.id)

    if (!profile) {
        throw new ResponseError(404, "Profile is not found")
    }

    return profile;

}

//* UNTUK UPDATE PROFILE DARI USER

const updateProfile = async (user, request) => {
    
    const profile = validate(updateProfileValidation, request)

    const totalProfileInDatabase = await prismaClient.profile.count({
        where: {
            userId: user.id
        }
    })

    if (totalProfileInDatabase !== 1) {
        throw new ResponseError(404, "Profile is not found")
    }

    return prismaClient.profile.update({
        where: {
            userId: user.id
        },
        data: {
            name: profile.name,
            gender: profile.gender,
            anak_ke: profile.anak_ke,
            birthday: profile.birthday,
            alive_status: profile.alive_status,
            status: profile.status,
            bani: profile.bani,
            generasi: profile.generasi
        },
        select: {
            name: true,
            gender: true,
            anak_ke: true,
            birthday: true,
            alive_status: true,
            status: true,
            bani: true,
            generasi: true
        }
    })

}

export default {
    createProfile,
    getProfile,
    updateProfile
}