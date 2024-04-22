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

const profileBaniValidation = Joi.number().min(1).optional()

export {
    createProfileValidation,
    updateProfileValidation,
    addBaniValidation,
    profileBaniValidation
}