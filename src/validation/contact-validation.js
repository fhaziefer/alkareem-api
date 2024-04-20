import Joi from 'joi'

const createContactValidation = Joi.object({
    phone: Joi.string().min(8).max(14).optional(),
    email: Joi.string().min(3).max(30).email().optional(),
    instagram: Joi.string().min(3).max(30).optional()
})

const updateContactValidation = Joi.object({
    phone: Joi.string().min(8).max(14).optional(),
    email: Joi.string().min(3).max(30).email().optional(),
    instagram: Joi.string().min(3).max(30).optional()
})

export {
    createContactValidation,
    updateContactValidation
}