import { createContactValidation, updateContactValidation } from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js"
import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js";

//* CREATE CONTACT

const createContact = async (user, request) => {

    const contact = validate(createContactValidation, request);

    const profile = await prismaClient.profile.findFirst({
        where: {
            userId: user.id
        }
    })

    const profileId = profile.id

    const countContact = await prismaClient.contact.count({
        where: {
            profileId: profileId
        }
    })

    if (countContact === 1) {
        throw new ResponseError(403, "Contact is already exist")
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

//* GET CONTACT

const getContact = async (user) => {

    const profile = await prismaClient.profile.findFirst({
        where: {
            userId: user.id
        }
    })

    const profileId = profile.id

    const countContact = await prismaClient.contact.count({
        where: {
            profileId: profileId
        }
    })

    if (countContact !== 1) {
        throw new ResponseError(403, "Contact is not found")
    }

    return prismaClient.contact.findUnique({
        where: {
            profileId: profileId
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

//* UPDATE CONTACT

const updateContact = async (user,request) => {
    const contact = validate(updateContactValidation, request);

    const profile = await prismaClient.profile.findFirst({
        where: {
            userId: user.id
        }
    })

    const profileId = profile.id

    const countContact = await prismaClient.contact.count({
        where: {
            profileId: profileId
        }
    })

    if (countContact !== 1) {
        throw new ResponseError(403, "Contact is not found")
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

//* DELETE CONTACT

const deleteContact = async (user) => {

    const profile = await prismaClient.profile.findFirst({
        where: {
            userId: user.id
        }
    })

    const profileId = profile.id

    const countContact = await prismaClient.contact.count({
        where: {
            profileId: profileId
        }
    })

    if (countContact !== 1) {
        throw new ResponseError(400, "Contact is not found")
    }

    return prismaClient.contact.delete({
        where: {
            profileId: profileId
        }
    })
}

export default {
    createContact,
    updateContact,
    getContact,
    deleteContact
}

