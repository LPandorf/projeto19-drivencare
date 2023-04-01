import Joi from "joi";

const patientSingInSchema=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    username: Joi.string().required(),
    phone: Joi.string().min(10).max(11).required(),
    cpf: Joi.number().required()
});

const patientSingUpSchema=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});