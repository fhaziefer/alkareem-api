import { createProfileValidation, updateProfileValidation } from "../validation/profile-validation.js"
import { validate } from "../validation/validation.js"
import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js";

//* UNTUK MEMBUAT PROFILE UNTUK USER
//! By UserId
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

//* UNTUK UPDATE PROFILE DARI USER
//! By UserId
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
            pendidikan: profile.pendidikan,
            alive_status: profile.alive_status,
            subcription: profile.subcription,
            status: profile.status,
            bani: profile.bani,
            generasi: profile.generasi
        },
        select: {
            name: true,
            gender: true,
            anak_ke: true,
            birthday: true,
            pendidikan: true,
            alive_status: true,
            subcription: true,
            status: true,
            bani: true,
            generasi: true
        }
    })

}

export default {
    createProfile,
    updateProfile
}