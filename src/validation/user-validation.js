import Joi from 'joi'

const registerUserValidation = Joi.object({
    id: Joi.string().optional(),
    username: Joi.string().min(3).max(30).alphanum().required(),
    password: Joi.string().min(8).max(30).required()
});

const loginUserValidation = Joi.object({
    id: Joi.string().optional(),
    username: Joi.string().min(3).max(30).alphanum().required(),
    password: Joi.string().min(8).max(30).required()
});

export {
    registerUserValidation,
    loginUserValidation
}