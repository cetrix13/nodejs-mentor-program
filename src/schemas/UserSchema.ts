import Joi from '@hapi/joi';

export const createUserSchema = Joi.object().keys({
    id: Joi.number().required(),
    login: Joi.string().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});

export const updateUserSchema = Joi.object().keys({
    id: Joi.number(),
    login: Joi.string(),
    password: Joi.string().alphanum(),
    age: Joi.number().min(4).max(130),
    isDeleted: Joi.boolean()
});
