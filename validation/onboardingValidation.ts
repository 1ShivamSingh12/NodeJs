import Joi from "joi";

export const registerSchema = Joi.object({
  first_Name: Joi.string().trim().min(3).max(50).required(),
  last_Name: Joi.string().trim().min(3).max(50).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
  password: Joi.string().token().min(5).max(30).required(),
  profilePic: Joi.binary().required(),
  phone_number: Joi.string().max(10).required(),
  gender: Joi.string().valid("Male", "Female", "other").required(),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().token().min(5).max(30).required(),
});


export const updateProfileSchema = Joi.object({
  first_Name: Joi.string().trim().min(3).max(50).optional(),
  last_Name: Joi.string().trim().min(3).max(50).optional(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).optional(),
  profilePic: Joi.binary().optional(),
  phone_number: Joi.string().max(10).optional(),
  gender: Joi.string().valid("Male", "Female", "other").optional(),
});


export const addressSchema = Joi.object({
  street1: Joi.string().alphanum().trim().min(3).max(50).required(),
  street2: Joi.string().alphanum().trim().min(3).max(50).required(),
  landmark: Joi.string().regex(/^[A-Za-z]+$/).trim().min(3).max(50).required(),
  city: Joi.string().regex(/^[A-Za-z]+$/).trim().min(3).max(50).required(),
  state: Joi.string().regex(/^[A-Za-z]+$/).trim().min(3).max(50).required(),
  address_type: Joi.string().valid("home","work","default").required(),
  zip_code: Joi.number().max(6).required(),
});


export const forgetPasswordSchema = Joi.object({
  newPassword: Joi.string().token().min(5).max(30).required(),
  confirmPassword: Joi.string().token().min(5).max(30).required(),
});



export const addProductSchema = Joi.object({
  name: Joi.string().alphanum().max(30).required(),
  description: Joi.string().alphanum().min(5).max(100).required(),
  price:Joi.number().required().max(10)
});