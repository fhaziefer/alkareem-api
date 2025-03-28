import Joi from 'joi'

const createProfileValidation = Joi.object({
    name : Joi.string().min(3).max(50).required(),
    gender: Joi.string().min(4).max(10).optional(),
    anak_ke: Joi.number().min(1).optional(),
    istri_ke: Joi.number().min(1).optional(),
    birthday: Joi.date().optional(),
    pendidikan: Joi.string().min(2).max(20).optional(),
    alive_status: Joi.boolean().optional(),
    avatar: Joi.string().min(3).max(100).optional(),
    baniId: Joi.number().min(1).optional(),
    generasiId: Joi.number().min(1).optional(),
    parentId: Joi.string().min(1).max(50).optional(),
    husbandId: Joi.string().min(1).max(50).optional(),
    subscriptionId: Joi.string().min(1).max(2).optional(),
    status: Joi.string().min(3).max(10).optional(),
    bio: Joi.string().max(100).optional()
});

const updateProfileValidation = Joi.object({
    name : Joi.string().min(3).max(50).optional(),
    gender: Joi.string().min(4).max(10).optional(),
    anak_ke: Joi.number().min(1).optional(),
    istri_ke: Joi.number().min(1).optional(),
    birthday: Joi.date().optional(),
    pendidikan: Joi.string().min(2).max(20).optional(),
    alive_status: Joi.boolean().optional(),
    avatar: Joi.string().min(3).max(100).optional(),
    baniId: Joi.number().min(1).optional(),
    generasiId: Joi.number().min(1).optional(),
    parentId: Joi.string().min(1).max(50).optional(),
    husbandId: Joi.string().min(1).max(50).optional(),
    subscriptionId: Joi.string().min(1).max(2).optional(),
    status: Joi.string().min(3).max(10).optional(),
    bio: Joi.string().max(100).optional()
});

const addBaniValidation = Joi.object({
    baniId: Joi.number().min(1).optional(),
    profileId: Joi.string().min(1).max(50).optional()
})

const profileSearchValidation = Joi.string().min(0).max(30).optional()

const profileSearchHusbandValidation = Joi.object({
    query: Joi.string().min(0).max(50).optional(),
    generasi: Joi.number().min(0).optional(),
    gender: Joi.string().min(0).optional(),
})

const profileSearchParentValidation = Joi.object({
    query: Joi.string().min(0).max(50).optional(),
    generasi: Joi.number().min(0).optional(),
})

const profileBaniValidation = Joi.number().min(1).optional()

const profileGenerasiValidation = Joi.number().min(1).required()

export {
    createProfileValidation,
    updateProfileValidation,
    addBaniValidation,
    profileSearchValidation,
    profileBaniValidation,
    profileGenerasiValidation,
    profileSearchHusbandValidation,
    profileSearchParentValidation
}