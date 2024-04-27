import Joi from 'joi'

const registerUserValidation = Joi.object({
    id: Joi.string().optional(),
    username: Joi.string()
        .min(3)
        .max(30)
        .pattern(/^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){1,28}[a-zA-Z0-9._](?:_[a-zA-Z0-9]{1,3})?$/)
        .required(),
    password: Joi.string().min(8).max(30).required(),
    role: Joi.string().optional()
});

const updateUserValidation = Joi.object({
    id: Joi.string().optional(),
    username: Joi.string()
        .min(3)
        .max(30)
        .pattern(/^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){1,28}[a-zA-Z0-9._](?:_[a-zA-Z0-9]{1,3})?$/)
        .optional(),
    password: Joi.string().min(8).max(30).optional()
});

const searchValidation = Joi.object({
    query: Joi.string().min(0).max(20),
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10)
})

const userIdValidation = Joi.string().min(5).max(50).required()
const usernameValidation = Joi.string().min(5).max(50).required()

const profileBaniValidation = Joi.number().min(1).optional()

const addBaniValidation = Joi.object({
    baniId: Joi.number().min(1).optional(),
    profileId: Joi.string().min(1).max(50).optional()
})

const createProfileValidation = Joi.object({
    name : Joi.string().min(3).max(50).required(),
    gender: Joi.string().min(4).max(10).optional(),
    anak_ke: Joi.number().min(1).optional(),
    birthday: Joi.date().optional(),
    istri_ke: Joi.number().min(1).optional(),
    pendidikan: Joi.string().min(2).max(20).optional(),
    alive_status: Joi.boolean().optional(),
    avatar: Joi.string().min(3).max(100).optional(),
    baniId: Joi.number().min(1).optional(),
    generasiId: Joi.number().min(1).optional(),
    parentId: Joi.string().min(1).max(50).optional(),
    husbandId: Joi.string().min(1).max(50).optional(),
    subscriptionId: Joi.string().min(1).max(2).optional(),
    status: Joi.string().min(3).max(10).optional()
});

const updateProfileValidation = Joi.object({
    name : Joi.string().min(3).max(50).optional(),
    gender: Joi.string().min(4).max(10).optional(),
    anak_ke: Joi.number().min(1).optional(),
    birthday: Joi.date().optional(),
    istri_ke: Joi.number().min(1).optional(),
    pendidikan: Joi.string().min(2).max(20).optional(),
    alive_status: Joi.boolean().optional(),
    avatar: Joi.string().min(3).max(100).optional(),
    baniId: Joi.number().min(1).optional(),
    generasiId: Joi.number().min(1).optional(),
    parentId: Joi.string().min(1).max(50).optional(),
    husbandId: Joi.string().min(1).max(50).optional(),
    subscriptionId: Joi.string().min(1).max(2).optional(),
    status: Joi.string().min(3).max(10).optional()
});

const createAddressValidation = Joi.object({
    street: Joi.string().min(3).max(50).optional(),
    village: Joi.string().min(3).max(30).optional(),
    district: Joi.string().min(3).max(30).optional(),
    city: Joi.string().min(3).max(30).optional(),
    province: Joi.string().min(3).max(30).optional(),
    postal_code: Joi.string().min(3).max(30).optional()
})

const updateAddressValidation = Joi.object({
    street: Joi.string().min(3).max(50).optional(),
    village: Joi.string().min(3).max(30).optional(),
    district: Joi.string().min(3).max(30).optional(),
    city: Joi.string().min(3).max(30).optional(),
    province: Joi.string().min(3).max(30).optional(),
    postal_code: Joi.string().min(3).max(30).optional()
})

const createContactValidation = Joi.object({
    phone: Joi.string().min(8).max(14).optional(),
    email: Joi.string().min(3).max(30).email().optional(),
    instagram: Joi.string().min(3).max(30).optional()
})

const updateContactValidation = Joi.object({
    phone: Joi.string().min(8).max(14).optional(),
    email: Joi.string().min(0).max(30).email().optional(),
    instagram: Joi.string().min(0).max(30).optional()
})

export {
    registerUserValidation,
    updateUserValidation,
    searchValidation,
    userIdValidation,
    usernameValidation,
    createProfileValidation,
    updateProfileValidation,
    createAddressValidation,
    updateAddressValidation,
    createContactValidation,
    updateContactValidation,
    profileBaniValidation,
    addBaniValidation
}