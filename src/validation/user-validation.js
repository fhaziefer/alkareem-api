import Joi from 'joi';

const registerUserValidation = Joi.object({
    id: Joi.string().optional(),
    username: Joi.string()
        .min(3)
        .max(30)
        .pattern(/^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){1,28}[a-zA-Z0-9._](?:_[a-zA-Z0-9]{1,3})?$/)
        .required(),
    password: Joi.string().min(8).max(30).required(),
    role: Joi.string().min(8).max(30).optional(),
});


const loginUserValidation = Joi.object({
    id: Joi.string().optional(),
    username: Joi.string()
        .min(3)
        .max(30)
        .pattern(/^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){1,28}[a-zA-Z0-9._](?:_[a-zA-Z0-9]{1,3})?$/)
        .required(),
    password: Joi.string().min(8).max(30).required()
});

const getUserValidation = Joi.string().max(100).required()

const logoutUserValidation = Joi.string().max(100).required()

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
    query: Joi.string().min(0).max(20).optional(),
    bani: Joi.string().min(0).max(20).optional(),
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10)
})

const getAllValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10)
})

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation,
    logoutUserValidation,
    searchValidation,
    getAllValidation
}