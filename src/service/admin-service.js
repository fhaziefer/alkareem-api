import { updateProfileValidation, updateUserValidation, userIdValidation } from "../validation/admin-validation.js"
import { validate } from "../validation/validation.js"
import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js";
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid'

//* UNTUK SEARCH USER BY QUERY

const userSearchAdmin = async (request) => {

    const searchQuery = request

    const user = await prismaClient.user.findMany({
        where: {
            AND: {
                OR: [
                    {
                        username: {
                            contains: searchQuery
                        }
                    },{
                        profil: {
                            name: {
                                contains: searchQuery
                            }
                        }
                    },{
                        profil: {
                            bani: {
                                bani_name:{
                                    contains: searchQuery
                                }
                            }
                        }
                    },{
                        profil: {
                            address: {
                                village:{
                                    contains: searchQuery
                                }
                            }
                        }
                    },{
                        profil: {
                            address: {
                                district:{
                                    contains: searchQuery
                                }
                            }
                        }
                    },{
                        profil: {
                            address: {
                                city: {
                                    contains: searchQuery
                                }
                            }
                        }
                    },{
                        profil: {
                            address: {
                                province:{
                                    contains: searchQuery
                                }
                            }
                        }
                    }
                ]
            }
        },
        orderBy: {
            profil: {
                name: 'asc'
            }
        },
        select: {
            id: true,
            username: true,
            profil: {
                select: {
                    id: true,
                    name: true,
                    alive_status: true,
                    anak_ke: true,
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
                    },
                    address: {
                        select: {
                            village: true,
                            district: true,
                            city: true
                        }
                    }
                }
            }
        }
    })

    return user

}

const userGetByIdAdmin = async (request) => {

    const userId = validate(userIdValidation, request)

    const user = await prismaClient.user.findUnique({
        where: {
            id: userId
        },
        include: {
            profil: true,
            profil: {
                include: {
                    bani: true,
                    generasi: true,
                    subcription: true,
                    parent: true,
                    husband: true,
                    wife: true,
                    address: true,
                    contact: true
                }
            }
        }
    })

    if (!user) {
        throw new ResponseError (400, "User is not found")
    }

    return user
}

const userUpdateAdmin = async (userId, user) => {
    
    userId = validate(userIdValidation, userId);
    user = validate(updateUserValidation, user);
    
    const totalUserInDatabase = await prismaClient.user.count({
        where: {
            id: userId
        }
    });

    if (totalUserInDatabase !== 1) {
        throw new ResponseError(404, "User is not found")
    }

    const data = {
        username : user.username
    }

    if (user.password){
        data.password = await bcrypt.hash(user.password, 10);
    }

    return prismaClient.user.update({
        where: {
            id: userId
        },
        data: data,
        select: {
            id: true,
            username: true,
            password: true
        }
    })

}

const profileUpdateAdmin = async (userId, profilData) => {

    userId = validate(userIdValidation, userId);
    const profil = validate(updateProfileValidation, profilData);

    const totalProfileInDatabase = await prismaClient.profile.count({
        where: {
            userId: userId
        }
    })
    
    if (totalProfileInDatabase !== 1) {
        throw new ResponseError(404, "Profile is not found")
    }
    
    return prismaClient.profile.update({
        where: {
            userId: userId
        },
        data: {
            name: profil.name,
            gender: profil.gender,
            anak_ke: profil.anak_ke,
            birthday: profil.birthday,
            alive_status: profil.alive_status,
            status: profil.status,
            baniId: profil.baniId,
            husbandId: profil.husbandId,
            parentId: profil.parentId,
            generasiId: profil.generasiId,
            pendidikan: profil.pendidikan
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
    
}

export default {
    userSearchAdmin,
    userGetByIdAdmin,
    userUpdateAdmin,
    profileUpdateAdmin
}