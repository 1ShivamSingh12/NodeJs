import Joi from "joi";

export const registerSchema = Joi.object({
    name: Joi.string().pattern(new RegExp(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/)).trim().min(2).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
    password: Joi.string().token().min(5).max(30).required(),
})



export const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
    password: Joi.string().token().min(5).max(30).required(),
})