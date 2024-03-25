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

export default {
    createAddress
}