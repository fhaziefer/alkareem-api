import { createProfileValidation, updateProfileValidation } from "../validation/profile-validation.js"
import { validate } from "../validation/validation.js"
import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js";

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

    if (request.gender === "MALE") {
        profile.avatar = "/images/avatar/male.jpg"
    } else if (request.gender === "FEMALE") {
        profile.avatar = "/images/avatar/female.jpg"
    } else {
        profile.avatar = "/images/avatar/unknown.jpg"
    }

    profile.userId = user.id;

    return prismaClient.profile.create({
        data: profile,
        select: {
            name: true,
            gender: true,
            anak_ke: true,
            birthday: true,
            alive_status: true,
            status: true,
            avatar: true,
            user: {
                select: {
                    username: true
                }
            },
            husband: {
                select: {
                    name: true
                }
            },
            wife: {
                select: {
                    name: true
                }
            },
            parent: {
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
            avatar: true,
            user: {
                select: {
                    username: true
                }
            },
            husband: {
                select: {
                    name: true
                }
            },
            wife: {
                select: {
                    name: true
                }
            },
            parent: {
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
            baniId: profile.baniId,
            husbandId: profile.husbandId,
            parentId: profile.parentId,
            generasiId: profile.generasiId,
            pendidikan: profile.pendidikan,
            bio: profile.bio
        },
        select: {
            name: true,
            gender: true,
            anak_ke: true,
            birthday: true,
            alive_status: true,
            status: true,
            avatar: true,
            bio: true,
            user: {
                select: {
                    username: true
                }
            },
            husband: {
                select: {
                    name: true
                }
            },
            wife: {
                select: {
                    name: true
                }
            },
            parent: {
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

}

//* UNTUK UPLOAD AVATAR PROFILE

const uploadAvatarProfile = async (user, avatar) => {
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
            avatar: avatar
        },
        select: {
            name: true,
            avatar: true
        }
    })
}

//* UNTUK REMOVE AVATAR PROFILE

const removeAvatarProfile = async (user) => {
    const profile = await prismaClient.profile.findFirst({
        where: {
            userId: user.id
        }
    })

    if (!profile) {
        throw new ResponseError(404, "Profile is not found")
    }

    const gender = profile.gender
    var newAvatar = profile.avatar

    if (gender === "MALE") {
        newAvatar = "/images/avatar/male.jpg"
    } else if (gender === "FEMALE") {
        newAvatar = "/images/avatar/female.jpg"
    } else {
        newAvatar = "/images/avatar/unknown.jpg"
    }

    return prismaClient.profile.update({
        where: {
            userId: user.id
        },
        data: {
            avatar: newAvatar
        },
        select: {
            name: true,
            avatar: true
        }
    })
}

//* UNTUK DELETE PROFILE

const deleteProfile = async (user) => {
    const profile = await prismaClient.profile.findFirst({
        where: {
            userId: user.id
        }
    })

    if (!profile) {
        throw new ResponseError(404, "Profile is not found")
    }

    return prismaClient.profile.delete({
        where: {
            userId: user.id
        }
    })
}

export default {
    createProfile,
    getProfile,
    updateProfile,
    uploadAvatarProfile,
    removeAvatarProfile,
    deleteProfile
}