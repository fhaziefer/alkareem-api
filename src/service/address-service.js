import { createAddressValidation, updateAddressValidation } from "../validation/address-validation.js"
import { validate } from "../validation/validation.js"
import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js";

//* CREATE ADDRESS

const createAddress = async (user, request) => {
    
    const address = validate(createAddressValidation, request);

    const profile = await prismaClient.profile.findFirst({
        where: {
            userId: user.id
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

//* GET ADDRESS

const getAddress = async (user) => {

    const profile = await prismaClient.profile.findFirst({
        where: {
            userId: user.id
        }
    });

    const profileId = profile.id

    const countAddress = await prismaClient.address.count({
        where: {
            profileId: profileId
        }
    })

    if (countAddress !== 1) {
        throw new ResponseError(400, "Address is not found")
    }

    return prismaClient.address.findUnique({
        where: {
            profileId: profileId
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

//* UPDATE ADDRESS

const updateAddress = async (user, request) => {
    
    const address = validate(updateAddressValidation, request);

    const profile = await prismaClient.profile.findFirst({
        where: {
            userId: user.id
        }
    });

    const profileId = profile.id

    const countAddress = await prismaClient.address.count({
        where: {
            profileId: profileId
        }
    })

    if (countAddress !== 1) {
        throw new ResponseError(403, "Address is not found")
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

//* DELETE ADDRESS

const deleteAddress = async (user) => {

    const profile = await prismaClient.profile.findFirst({
        where: {
            userId: user.id
        }
    });

    const profileId = profile.id

    const countAddress = await prismaClient.address.count({
        where: {
            profileId: profileId
        }
    })

    if (countAddress !== 1) {
        throw new ResponseError(400, "Address is not found")
    }

    return prismaClient.address.delete({
        where: {
            profileId: profileId
        }
    })
    
}

export default {
    createAddress,
    getAddress,
    updateAddress,
    deleteAddress
}