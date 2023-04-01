import Joi from "joi";

const doctorSignInSchema=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const doctorSignUpSchema=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    phone: Joi.string().min(10).max(11).required(),
    crm: Joi.string().min(6).max(6).required(),
    crm_state: Joi.string().min(2).required(),
    specialty: Joi.string().required()
});

export {doctorSignInSchema, doctorSignUpSchema};