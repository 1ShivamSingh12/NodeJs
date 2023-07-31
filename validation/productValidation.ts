// import Joi from "joi";

// export const registerSchema = Joi.object({
//   first_Name: Joi.string().trim().min(3).max(50).required(),
//   last_Name: Joi.string().trim().min(3).max(50).required(),
//   email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
//   password: Joi.string().token().min(5).max(30).required(),
//   profilePic: Joi.binary().required(),
//   phone_number: Joi.string().max(10).required(),
//   gender: Joi.string().valid("Male", "Female", "other").required(),
// });
