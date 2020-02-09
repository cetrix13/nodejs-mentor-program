import Joi from '@hapi/joi';

export const createGroupSchema = Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string()).required(),
});

export const updateGroupSchema = Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string(),
    permissions: Joi.array().items(Joi.string()),
});
