import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().token().min(5).max(30).required(),
});

export const registerSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  username: Joi.string().alphanum().min(3).max(25).trim(true).required(),
  name: Joi.string()
    .trim()
    .pattern(/^[A-Za-z]+(?: [A-Za-z]+)+$/)
    .min(3)
    .max(100)
    .required(),
  password: Joi.string().token().min(5).max(30).required(),
  bio: Joi.string().trim().max(150).required(),
  profilePic: Joi.string(),
  followerCount: Joi.number().integer().min(0),
  followingCount: Joi.number().integer().min(0),
  postCount: Joi.number().integer().min(0),
});
