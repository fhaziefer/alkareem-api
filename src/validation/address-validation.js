import Joi from 'joi'

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

export {
    createAddressValidation,
    updateAddressValidation
}