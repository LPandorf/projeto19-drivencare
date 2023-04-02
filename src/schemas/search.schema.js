import Joi from "joi";

export const searchSchema=Joi.object({
    data: Joi.string().required()
});