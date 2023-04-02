import Joi from "joi";

const patientSignInSchema=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const patientSignUpSchema=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    phone: Joi.string().min(10).max(11).required(),
    cpf: Joi.string().required()
});

export {patientSignInSchema, patientSignUpSchema};