import Joi from 'joi'

const registerUserValidation = Joi.object({
    id: Joi.string().optional(),
    username: Joi.string().min(3).max(30).alphanum().required(),
    password: Joi.string().min(8).max(30).required(),
    role: Joi.string().optional()
});

const updateUserValidation = Joi.object({
    id: Joi.string().optional(),
    username: Joi.string().min(3).max(30).alphanum().optional(),
    password: Joi.string().min(8).max(30).optional()
});

const userIdValidation = Joi.string().min(5).max(50).required()

const createProfileValidation = Joi.object({
    name : Joi.string().min(3).max(50).required(),
    gender: Joi.string().min(4).max(10).optional(),
    anak_ke: Joi.number().min(1).optional(),
    birthday: Joi.date().optional(),
    pendidikan: Joi.string().min(2).max(20).optional(),
    alive_status: Joi.boolean().optional(),
    avatar: Joi.string().min(3).max(100).optional(),
    baniId: Joi.number().min(1).optional(),
    generasiId: Joi.number().min(1).optional(),
    parentId: Joi.string().min(1).max(2).optional(),
    husbandId: Joi.string().min(1).max(2).optional(),
    subscriptionId: Joi.string().min(1).max(2).optional(),
    status: Joi.string().min(3).max(10).optional()
});

const updateProfileValidation = Joi.object({
    name : Joi.string().min(3).max(50).optional(),
    gender: Joi.string().min(4).max(10).optional(),
    anak_ke: Joi.number().min(1).optional(),
    birthday: Joi.date().optional(),
    pendidikan: Joi.string().min(2).max(20).optional(),
    alive_status: Joi.boolean().optional(),
    avatar: Joi.string().min(3).max(100).optional(),
    baniId: Joi.number().min(1).optional(),
    generasiId: Joi.number().min(1).optional(),
    parentId: Joi.string().min(1).max(50).optional(),
    husbandId: Joi.string().min(1).max(2).optional(),
    subscriptionId: Joi.string().min(1).max(2).optional(),
    status: Joi.string().min(3).max(10).optional()
});

const createAddressValidation = Joi.object({
    street: Joi.string().min(3).max(30).optional(),
    village: Joi.string().min(3).max(30).optional(),
    district: Joi.string().min(3).max(30).optional(),
    city: Joi.string().min(3).max(30).optional(),
    province: Joi.string().min(3).max(30).optional(),
    postal_code: Joi.string().min(3).max(30).optional()
})

const updateAddressValidation = Joi.object({
    street: Joi.string().min(3).max(30).optional(),
    village: Joi.string().min(3).max(30).optional(),
    district: Joi.string().min(3).max(30).optional(),
    city: Joi.string().min(3).max(30).optional(),
    province: Joi.string().min(3).max(30).optional(),
    postal_code: Joi.string().min(3).max(30).optional()
})

const createContactValidation = Joi.object({
    phone: Joi.string().regex(/^[0-9]{12,14}$/).min(8).max(14).optional(),
    email: Joi.string().min(3).max(30).email().optional(),
    instagram: Joi.string().min(3).max(30).optional()
})

const updateContactValidation = Joi.object({
    phone: Joi.string().regex(/^[0-9]{12,14}$/).min(8).max(14).optional(),
    email: Joi.string().min(3).max(30).email().optional(),
    instagram: Joi.string().min(3).max(30).optional()
})

export {
    registerUserValidation,
    updateUserValidation,
    userIdValidation,
    createProfileValidation,
    updateProfileValidation,
    createAddressValidation,
    updateAddressValidation,
    createContactValidation,
    updateContactValidation
}