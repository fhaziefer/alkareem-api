import { getUserValidation, loginUserValidation, logoutUserValidation, registerUserValidation, updateUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import {prismaClient} from "../application/database.js"
import { ResponseError } from "../error/response-error.js";
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid'


//* UNTUK REGISTRASI USER BARU

const userRegister = async (request) => {
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

//* UNTUK LOGIN USER DENGAN MENAMBAHKAN VALUE DI TOKEN

const userLogin = async (request) => {
    const loginRequest = validate(loginUserValidation, request);
    const user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true
        }
    });

       if (!user){
        throw new ResponseError(401, "Username or password is wrong");
       } 

       const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
       if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password is wrong");
       }

       const token = uuid().toString()
       return prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: {
            id: true,
            username: true,
            token: true
        }
       })

}

//* UNTUK GET DATA USER YANG LOGIN

const userGet = async (username) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        },
        select: {
            id: true,
            username: true,
            profil: {
                select: {
                    name : true,
                    avatar: true
                }
            }
        }
    });

    if (!user) {
        throw new ResponseError(404, "User is not found")
    }

    return user;

}

//* UNTUK UPDATE DATA USER YANG ADA DI DATABASE BERDASARKAN ROLE
//! SEMENTARA HANYA BISA UPDATE PASSWORD DOANG

const userUpdate = async (request) => {
    
    const user = validate(updateUserValidation, request);
    
    const totalUserInDatabase = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if (totalUserInDatabase !== 1) {
        throw new ResponseError(404, "User is not found")
    }

    const data = {}

    if (user.password){
        data.password = await bcrypt.hash(user.password, 10);
    }

    return prismaClient.user.update({
        where: {
            username: user.username
        },
        data: data,
        select: {
            id: true,
            username: true
        }
    })

}

//* UNTUK LOGOUT USER DENGAN MENGHAPUS TOKEN USER

const userLogout = async (username) => {
    username = validate(logoutUserValidation, username);

    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        }
    });

    if (!user) {
        throw new ResponseError(404, "User is not found");
    }

    return prismaClient.user.update({
        where: {
            username: username
        },
        data: {
            token: null
        },
        select: {
            id: true,
            username: true
        }
    })

}

//* UNTUK SEARCH USER BY QUERY

const userSearch = async (request) => {

    const searchQuery = request

    const user = await prismaClient.user.findMany({
        where: {
            AND: {
                role: "USER",
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
                select:{
                    name: true,
                    avatar: true,
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
                    generasi: {
                        select: {
                            generasi_name: true
                        }
                    },
                    bani: {
                        select: {
                            bani_name: true
                        }
                    },
                    contact: {
                        select: {
                            phone: true,
                            instagram: true,
                            email: true
                        }
                    },
                    address: {
                        select: {
                            street: true,
                            village: true,
                            district: true,
                            city: true,
                            province: true
                        }
                    }
                }
            }
        }
    })

    return user

}

//* UNTUK GET USER BY ID

const userGetById = async (request) => {
    const userId = validate(getUserValidation, request)

    const user = await prismaClient.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            username: true,
            profil: {
                select:{
                    name: true,
                    avatar: true,
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
                    generasi: {
                        select: {
                            generasi_name: true
                        }
                    },
                    bani: {
                        select: {
                            bani_name: true
                        }
                    },
                    contact: {
                        select: {
                            phone: true,
                            instagram: true,
                            email: true
                        }
                    },
                    address: {
                        select: {
                            street: true,
                            village: true,
                            district: true,
                            city: true,
                            province: true
                        }
                    }
                }
            }
        }

    })

    if (!user) {
        throw new ResponseError(400, "User is not found")
    }

    return user;

}

export default {
    userRegister,
    userLogin,
    userGet,
    userUpdate,
    userLogout,
    userSearch,
    userGetById
}