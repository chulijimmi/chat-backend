import Joi from 'joi';

export const preJoinSchema = Joi.object({
    userName: Joi.string().max(50).required(),
    roomName: Joi.string().max(30).required(),
});
