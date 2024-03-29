import { createAddressValidation, createContactValidation, createProfileValidation, registerUserValidation, updateAddressValidation, updateContactValidation, updateProfileValidation, updateUserValidation, userIdValidation } from "../validation/admin-validation.js"
import { validate } from "../validation/validation.js"
import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js";
import bcrypt from 'bcrypt';

//* UNTUK SEARCH USER BY QUERY

const userRegisterAdmin = async (request) => {
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
            username: true
        }
    });

}

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
        orderBy: [{
            profil: {
                bani: {
                    id: 'asc'
                }
            },
            profil: {
                generasi: {
                    id: 'asc'
                }
            }
        }],
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
                    children: {orderBy: {anak_ke: "asc"}},
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

const userDeleteAdmin = async (userId) => {
    userId = validate(userIdValidation, userId);

    const totalUserInDatabase = await prismaClient.user.count({
        where: {
            id: userId
        }
    });

    if (totalUserInDatabase !== 1) {
        throw new ResponseError(404, "User is not found")
    }

    return prismaClient.user.delete({
        where: {
            id: userId
        }
    })

}

const profileCreateAdmin = async (userId, profilData) => {

    userId = validate(userIdValidation, userId);
    const profile = validate(createProfileValidation, profilData)

    const countProfile = await prismaClient.profile.count({
        where: {
            userId: userId
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

    profile.userId = userId;

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

const uploadAvatarProfileAdmin = async (userId, avatar) => {
    
    userId = validate(userIdValidation, userId)

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
            avatar: avatar
        },
        select: {
            name: true,
            avatar: true
        }
    })
}

const removeAvatarProfileAdmin = async (userId) => {
    
    userId = validate(userIdValidation, userId)
    
    const profile = await prismaClient.profile.findFirst({
        where: {
            userId: userId
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
            userId: userId
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

const contactCreateAdmin = async (userId, contactData) => {
    userId = validate(userIdValidation, userId);
    const contact = validate(createContactValidation, contactData)

    const profile = await prismaClient.profile.findFirst({
        where: {
            userId: userId
        }
    })

    const profileId = profile.id

    const countContact = await prismaClient.contact.count({
        where: {
            profileId: profileId
        }
    })

    if (countContact === 1) {
        throw new ResponseError(400, "Contact is already exist")
    }

    contact.profileId = profileId

    return prismaClient.contact.create({
        data: contact,
        select: {
            email: true,
            phone: true,
            instagram: true,
            profile: {
                select: {
                    name: true,
                }
            }
        }
    })

}

const contactUpdateAdmin = async (userId, contactData) => {
    userId = validate(userIdValidation, userId);
    const contact = validate(updateContactValidation, contactData);

    const profile = await prismaClient.profile.findUnique({
        where: {
            userId: userId
        }
    })

    const profileId = profile.id

    const totalContactInDatabase = await prismaClient.contact.count({
        where: {
            profileId: profileId
        }
    })
    
    if (totalContactInDatabase !== 1) {
        throw new ResponseError(404, "Contact is not found")
    }

    return prismaClient.contact.update({
        where: {
            profileId: profileId
        },
        data: {
            phone: contact.phone,
            email: contact.email,
            instagram: contact.instagram
        },
        select: {
            email: true,
            phone: true,
            instagram: true,
            profile: {
                select: {
                    name: true,
                }
            }
        }
    })

}

const addressCreateAdmin = async (userId, addressData) => {
    userId = validate(userIdValidation, userId);
    const address = validate(createAddressValidation, addressData);

    const profile = await prismaClient.profile.findFirst({
        where: {
            userId: userId
        }
    });

    const profileId = profile.id

    const countAddress = await prismaClient.address.count({
        where: {
            profileId: profileId
        }
    })

    if (countAddress === 1) {
        throw new ResponseError(400, "Address is already exist")
    }

    address.profileId = profileId

    return prismaClient.address.create({
        data: address,
        select: {
            street: true,
            village: true,
            district: true,
            city: true,
            province: true,
            postal_code: true,
            profile: {
                select: {
                    name: true
                }
            }
        }
    })
}

const addressUpdateAdmin = async (userId, addressData) => {
    userId = validate(userIdValidation, userId);
    const address = validate(updateAddressValidation, addressData);

    const profile = await prismaClient.profile.findUnique({
        where: {
            userId: userId
        }
    })

    const profileId = profile.id

    const totalAddressInDatabase = await prismaClient.address.count({
        where: {
            profileId: profileId
        }
    })
    
    if (totalAddressInDatabase !== 1) {
        throw new ResponseError(404, "Address is not found")
    }

    return prismaClient.address.update({
        where: {
            profileId: profileId
        },
        data: {
            street: address.street,
            village: address.village,
            district: address.district,
            city: address.city,
            province: address.province,
            postal_code: address.postal_code
        },
        select: {
            street: true,
            village: true,
            district: true,
            city: true,
            province: true,
            postal_code: true,
            profile: {
                select: {
                    name: true
                }
            }
        }
    })

}

export default {
    userRegisterAdmin,
    userSearchAdmin,
    userGetByIdAdmin,
    userUpdateAdmin,
    userDeleteAdmin,
    profileCreateAdmin,
    profileUpdateAdmin,
    uploadAvatarProfileAdmin,
    removeAvatarProfileAdmin,
    contactCreateAdmin,
    contactUpdateAdmin,
    addressCreateAdmin,
    addressUpdateAdmin
}