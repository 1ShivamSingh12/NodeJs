import Joi from "joi";
// import validate from "koa-joi-validate";

const validate = require("koa-joi-validate");

export const loginSchema = validate({
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().token().min(5).max(30).required(),
  },
});

export const registerValidator = validate({
  body: {
    first_name: Joi.string()
      .trim()
      // .pattern(/^[A-Za-z]+(?: [A-Za-z]+)+$/)
      .min(3)
      .max(20)
      .required(),
    last_name: Joi.string()
      .trim()
      // .pattern(/^[A-Za-z]+(?: [A-Za-z]+)+$/)
      .min(3)
      .max(20)
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().token().min(5).max(30).required(),
  },
});
